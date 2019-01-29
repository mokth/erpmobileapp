import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthguardService } from "./auth/authguard/auth-guard-service";

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "saleslist",canActivate: [AuthguardService],
            loadChildren: "./salesorder/salesorder.module#SalesorderModule"},
    { path: "daily",canActivate: [AuthguardService],
            loadChildren: "./production/production.module#ProductionModule"},
    { path: "grn",canActivate: [AuthguardService],
            loadChildren: "./good-receipt/good-receipt.module#GoodReciptModule"},
    { path: "main", component: MainPageComponent,canActivate: [AuthguardService] }
        
];

export const routing = NativeScriptRouterModule.forRoot(routes);

// @NgModule({
//     imports: [NativeScriptRouterModule.forRoot(routes)],
//     exports: [NativeScriptRouterModule]
// })
// export class AppRoutingModule { }