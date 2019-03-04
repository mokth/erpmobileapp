import { Routes } from "@angular/router";
import { AuthguardService } from "../auth/authguard/auth-guard-service";
import { ItemMasterComponent } from "./item/item-master.component";
import { ItemListComponent } from "./item-lists/item-list/item-list.component";

export const itemroutes: Routes = [
    { path: "master", component: ItemListComponent ,canActivate: [AuthguardService] },
    { path: "itemdetail", component: ItemMasterComponent ,canActivate: [AuthguardService] },
  
];