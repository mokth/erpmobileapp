import { Routes } from "@angular/router";

import { SalesOrderListComponent } from "./sales-order-list/sales-order-list.component";
import { SalesOrderComponent } from "./sales-order/sales-order.component";
import { CustomerLookupComponent } from "./lookup/customer-lookup/customer-lookup.component";
import { ItemLookupComponent } from "./lookup/item-lookup/item-lookup.component";
import { AuthguardService } from "../auth/authguard/auth-guard-service";

export const routes: Routes = [
    { path: "", component: SalesOrderListComponent,canActivate: [AuthguardService]  },
    { path: "saleslist", component: SalesOrderListComponent,canActivate: [AuthguardService] },
   // { path: "sales", component: SalesOrderComponent,canActivate: [AuthguardService] },
    { path: "sales/:sono", component: SalesOrderComponent,canActivate: [AuthguardService] },
    { path: "lookcust", component: CustomerLookupComponent,canActivate: [AuthguardService] },
    { path: "lookitem", component: ItemLookupComponent,canActivate: [AuthguardService] },
     
];

