import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OptimaScheduleGridComponent } from "./optima-schedule-grid.component";

describe("OptimaScheduleGridComponent", () => {
  let component: OptimaScheduleGridComponent;
  let fixture: ComponentFixture<OptimaScheduleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptimaScheduleGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimaScheduleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
