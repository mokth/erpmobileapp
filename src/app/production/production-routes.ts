import { Routes } from "@angular/router";

import { AuthguardService } from "../auth/authguard/auth-guard-service";
import { DailyOutputComponent } from "./daily-output/daily-output.component";

export const routes: Routes = [
    { path: "", component: DailyOutputComponent,canActivate: [AuthguardService]  },
    { path: "daily", component: DailyOutputComponent,canActivate: [AuthguardService] }
  
];

