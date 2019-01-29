import { Routes } from "@angular/router";
import { AuthguardService } from "../auth/authguard/auth-guard-service";
import { GrnEntryComponent } from "./grn-entry/grn-entry.component";

export const grnroutes: Routes = [
    { path: "", component: GrnEntryComponent ,canActivate: [AuthguardService]  },
    { path: "grn", component: GrnEntryComponent ,canActivate: [AuthguardService] }
  
];
