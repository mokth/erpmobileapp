import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthguardService } from "./auth/authguard/auth-guard-service";

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "saleslist",
      loadChildren: "./salesorder/salesorder.module#SalesorderModule"},
       { path: "main", component: MainPageComponent,canActivate: [AuthguardService] },
    { path: "daily",
       loadChildren: "./production/production.module#ProductionModule"},
        
];

export const routing = NativeScriptRouterModule.forRoot(routes);

// @NgModule({
//     imports: [NativeScriptRouterModule.forRoot(routes)],
//     exports: [NativeScriptRouterModule]
// })
// export class AppRoutingModule { }