import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from "./auth/login/login.component";
import { SalesOrderComponent } from "./salesorder/sales-order/sales-order.component";
import { CustomerLookupComponent } from "./salesorder/lookup/customer-lookup/customer-lookup.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ItemLookupComponent } from "./salesorder/lookup/item-lookup/item-lookup.component";
import { SalesOrderListComponent } from "./salesorder/sales-order-list/sales-order-list.component";
import { AuthguardService } from "./auth/authguard/auth-guard-service";
import { DailyOutputComponent } from "./production/daily-output/daily-output.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "saleslist", component: SalesOrderListComponent,canActivate: [AuthguardService] },
    { path: "sales", component: SalesOrderComponent,canActivate: [AuthguardService] },
    { path: "sales/:sono", component: SalesOrderComponent,canActivate: [AuthguardService] },
    { path: "lookcust", component: CustomerLookupComponent,canActivate: [AuthguardService] },
    { path: "lookitem", component: ItemLookupComponent,canActivate: [AuthguardService] },
    { path: "main", component: MainPageComponent,canActivate: [AuthguardService] },
    { path: "daily", component: DailyOutputComponent,canActivate: [AuthguardService] }
        
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }