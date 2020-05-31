import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "optima-schedule-header",
  templateUrl: "./optima-schedule-header.component.html",
  styleUrls: ["./optima-schedule-header.component.scss"],
})
export class OptimaScheduleHeaderComponent {
  @Input()
  sectors: string[];
  @Output()
  txSelectedSector = new EventEmitter<String>();

  txSetSector($event) {
    this.txSelectedSector.emit($event.target.value);
  }
}
