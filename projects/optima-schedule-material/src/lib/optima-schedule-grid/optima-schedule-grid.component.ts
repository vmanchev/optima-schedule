import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from "@angular/core";
import { SlotInterval } from "../models/slot-interval.model";
import { TimeSlot } from "../models/time-slot.model";

@Component({
  selector: "optima-schedule-grid",
  templateUrl: "./optima-schedule-grid.component.html",
  styleUrls: ["./optima-schedule-grid.component.scss"],
})
export class OptimaScheduleGridComponent {
  @Input()
  slotIntervals: SlotInterval[];
  @Input()
  sectors: String[];
  @Input()
  reservedSlots: TimeSlot[];
  @Input()
  startTime: Date;
  @Input()
  endTime: Date;
  @Output()
  cellSelected = new EventEmitter<TimeSlot>();

  @HostBinding("class")
  className = "optima-schedule-grid";

  private dragSlots: any[] = [];
  private dragStarted = false;

  @HostListener("mousedown", ["$event"]) onMouseDown(e) {
    if (e.button !== 0) {
      return;
    }

    // remove all previous orphaned selected slots
    Array.from(
      document.querySelectorAll(".optima-schedule-grid__drag")
    ).forEach((node) => node.classList.remove("optima-schedule-grid__drag"));

    this.dragSlots = [];
    this.dragStarted = true;
    this.addDraggedSlot(e);
  }

  @HostListener("mousemove", ["$event"]) onMouseMove(e) {
    if (!this.dragStarted) {
      return;
    }
    this.addDraggedSlot(e);
  }

  @HostListener("mouseup", ["$event"]) onMouseUp(e) {
    if (!this.dragStarted) {
      return;
    }

    this.addDraggedSlot(e);
    this.dragStarted = false;

    // When first and last slot are the same, do nothing, as the click event handler will do the job
    if (
      JSON.stringify(this.dragSlots[0]) === JSON.stringify(this.dragSlots[1])
    ) {
      this.dragSlots = [];
      e.target.classList.remove("optima-schedule-grid__drag");
      return;
    }

    // sort in ascending order because slots can be selected from bottom to top
    this.dragSlots = this.dragSlots.sort((a, b) => a.slotIndex - b.slotIndex);

    // Create a new TimeSlot, using start time of the first slot and end time of the last slot
    const selectedSlot = new TimeSlot(
      this.slotIntervals[this.dragSlots[0].slotIndex].start,
      this.slotIntervals[this.dragSlots[1].slotIndex].end,
      this.dragSlots[0].sector
    );

    this.selectTimeslot(selectedSlot);
  }

  private addDraggedSlot(event) {
    if (!event.target["dataset"] || !event.target["dataset"].slotIndex) {
      return;
    }

    const slotIndex = parseInt(event.target["dataset"].slotIndex);

    let addIndex = !this.dragSlots[0] ? 0 : 1;

    if (
      addIndex === 1 &&
      this.dragSlots[0].sector !== event.target["dataset"].sector
    ) {
      // selection moved into another sector!
      this.dragSlots = [];
      addIndex = 0;
    }

    this.dragSlots[addIndex] = {
      slotIndex: slotIndex,
      sector: event.target["dataset"].sector,
    };

    event.target.classList.add("optima-schedule-grid__drag");
  }

  /**
   * Get list of appointments for a sector
   * @param sector
   */
  getReservedSlotsPerSector(sector: string): TimeSlot[] {
    if (!this.reservedSlots) {
      return [];
    }
    return this.reservedSlots.filter((rs: TimeSlot) => rs.sector === sector);
  }

  /**
   * Emits the selected time slot to OptimaSchedule parent component
   *
   * When the selected time slot is already booked, it will be emitted as is.
   * When the selected time slot is available, a new TimeSlot object will be
   * created with the selected SlotInterval start and end time, as well as
   * the sector name.
   *
   * @param timeSlot TimeSlot
   * @param slotInterval SlotInterval, optional, only for free time slots
   * @param sector string, Sector identifier, optional, only for free time slots
   */
  selectTimeslot(
    timeSlot: TimeSlot,
    slotInterval?: SlotInterval,
    sector?: string
  ) {
    if (!timeSlot) {
      timeSlot = new TimeSlot(slotInterval.start, slotInterval.end, sector);
    }

    this.cellSelected.emit(timeSlot);
  }

  getRelativeStyle(reservedSlot: TimeSlot) {
    return {
      top:
        ((reservedSlot.startTime.getTime() - this.startTime.getTime()) /
          (this.endTime.getTime() - this.startTime.getTime())) *
        100,
      height:
        ((reservedSlot.endTime.getTime() - reservedSlot.startTime.getTime()) /
          (this.endTime.getTime() - this.startTime.getTime())) *
        100,
    };
  }
}
