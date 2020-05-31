import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { OptimaScheduleComponent } from "./optima-schedule.component";
import { OptimaScheduleHeaderComponent } from "./optima-schedule-header/optima-schedule-header.component";
import { OptimaScheduleGridComponent } from "./optima-schedule-grid/optima-schedule-grid.component";

@NgModule({
  declarations: [
    OptimaScheduleComponent,
    OptimaScheduleHeaderComponent,
    OptimaScheduleGridComponent,
  ],
  imports: [CommonModule],
  exports: [
    OptimaScheduleComponent,
    OptimaScheduleHeaderComponent,
    OptimaScheduleGridComponent,
  ],
  bootstrap: [OptimaScheduleComponent],
})
export class OptimaScheduleModule {}
