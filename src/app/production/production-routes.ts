import { Routes } from "@angular/router";

import { AuthguardService } from "../auth/authguard/auth-guard-service";
import { DailyOutputComponent } from "./daily-output/daily-output.component";
import { DailyScanComponent } from "./daily-scan/daily-scan.component";
import { DailyListComponent } from "./daily-list/daily-list.component";

export const prdroutes: Routes = [
    { path: "", component: DailyOutputComponent,canActivate: [AuthguardService]  },
    { path: "daily", component: DailyOutputComponent,canActivate: [AuthguardService] },
    { path: "dailyscan", component: DailyScanComponent,canActivate: [AuthguardService] },
    { path: "dailylist", component: DailyListComponent,canActivate: [AuthguardService] }
     
  
];

