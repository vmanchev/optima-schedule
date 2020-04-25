import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OptimaScheduleComponent } from "./optima-schedule.component";

describe("OptimaScheduleComponent", () => {
  let component: OptimaScheduleComponent;
  let fixture: ComponentFixture<OptimaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptimaScheduleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
