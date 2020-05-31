import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OptimaScheduleHeaderComponent } from "./optima-schedule-header.component";

describe("OptimaScheduleHeaderComponent", () => {
  let component: OptimaScheduleHeaderComponent;
  let fixture: ComponentFixture<OptimaScheduleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptimaScheduleHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimaScheduleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
