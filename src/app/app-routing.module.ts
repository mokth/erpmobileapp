import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthguardService } from "./auth/authguard/auth-guard-service";
import { ItemMasterComponent } from "./item-master/item/item-master.component";
import { SettingComponent } from './core/settings/setting/setting.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "setting", component: SettingComponent },
    { path: "saleslist",canActivate: [AuthguardService],
            loadChildren: "./salesorder/salesorder.module#SalesorderModule"},
    { path: "master",canActivate: [AuthguardService],
             loadChildren: "./item-master/item-master.module#ItemMasterModule"}, 
    { path: "daily",canActivate: [AuthguardService],
             loadChildren: "./production/production.module#ProductionModule"},
   
   //{ path: "daily",canActivate: [AuthguardService],component:ItemMasterComponent},
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