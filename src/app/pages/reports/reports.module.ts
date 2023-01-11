import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports/reports.component";

import { ChartModule } from "primeng/chart";
import { MonthlyListComponent } from './monthly-list/monthly-list.component';

@NgModule({
  imports: [SharedModule, ReportsRoutingModule, ChartModule],
  declarations: [ReportsComponent, MonthlyListComponent],
})
export class ReportsModule {}
