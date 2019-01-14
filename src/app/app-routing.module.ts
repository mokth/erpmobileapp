import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from "./auth/login/login.component";
import { SalesOrderComponent } from "./salesorder/sales-order/sales-order.component";
import { CustomerLookupComponent } from "./salesorder/lookup/customer-lookup/customer-lookup.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ItemLookupComponent } from "./salesorder/lookup/item-lookup/item-lookup.component";
import { SalesOrderListComponent } from "./salesorder/sales-order-list/sales-order-list.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "saleslist", component: SalesOrderListComponent },
    { path: "sales", component: SalesOrderComponent },
    { path: "sales/:sono", component: SalesOrderComponent },
    { path: "lookcust", component: CustomerLookupComponent },
    { path: "lookitem", component: ItemLookupComponent },
    { path: "main", component: MainPageComponent }
    
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }