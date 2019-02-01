import { Routes } from "@angular/router";
import { AuthguardService } from "../auth/authguard/auth-guard-service";
import { GrnEntryComponent } from "./grn-entry/grn-entry.component";
import { CycleCountComponent } from "./cycle-count/cycle-count.component";
import { CycleCountNoLotComponent } from "./cycle-count-nolot/cycle-count-nolot.component";
export const grnroutes: Routes = [
    { path: "", component: GrnEntryComponent ,canActivate: [AuthguardService]  },
    { path: "grn", component: GrnEntryComponent ,canActivate: [AuthguardService] },
    { path: "cycle", component: CycleCountComponent ,canActivate: [AuthguardService] },
    { path: "cyclenolot", component: CycleCountNoLotComponent ,canActivate: [AuthguardService] }
  
];
