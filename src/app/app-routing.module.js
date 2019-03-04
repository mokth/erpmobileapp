"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./auth/login/login.component");
var main_page_component_1 = require("./main-page/main-page.component");
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
exports.routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "saleslist", canActivate: [auth_guard_service_1.AuthguardService],
        loadChildren: "./salesorder/salesorder.module#SalesorderModule" },
    { path: "master", canActivate: [auth_guard_service_1.AuthguardService],
        loadChildren: "./item-master/item-master.module#ItemMasterModule" },
    { path: "daily", canActivate: [auth_guard_service_1.AuthguardService],
        loadChildren: "./production/production.module#ProductionModule" },
    { path: "grn", canActivate: [auth_guard_service_1.AuthguardService],
        loadChildren: "./good-receipt/good-receipt.module#GoodReciptModule" },
    { path: "main", component: main_page_component_1.MainPageComponent, canActivate: [auth_guard_service_1.AuthguardService] }
];
exports.routing = router_1.NativeScriptRouterModule.forRoot(exports.routes);
// @NgModule({
//     imports: [NativeScriptRouterModule.forRoot(routes)],
//     exports: [NativeScriptRouterModule]
// })
// export class AppRoutingModule { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0RBQXVFO0FBR3ZFLGdFQUE4RDtBQUM5RCx1RUFBb0U7QUFDcEUsMEVBQXVFO0FBRTFELFFBQUEsTUFBTSxHQUFXO0lBQzFCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQzVDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQztRQUMzQyxZQUFZLEVBQUUsaURBQWlELEVBQUM7SUFDeEUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDO1FBQ3ZDLFlBQVksRUFBRSxtREFBbUQsRUFBQztJQUMzRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUM7UUFDdkMsWUFBWSxFQUFFLGlEQUFpRCxFQUFDO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQztRQUNyQyxZQUFZLEVBQUUscURBQXFELEVBQUM7SUFDNUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0NBRWpGLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsY0FBTSxDQUFDLENBQUM7QUFFaEUsY0FBYztBQUNkLDJEQUEyRDtBQUMzRCwwQ0FBMEM7QUFDMUMsS0FBSztBQUNMLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYWluUGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL21haW4tcGFnZS9tYWluLXBhZ2UuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbG9naW5cIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxyXG4gICAgeyBwYXRoOiBcImxvZ2luXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJzYWxlc2xpc3RcIixjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdLFxyXG4gICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9zYWxlc29yZGVyL3NhbGVzb3JkZXIubW9kdWxlI1NhbGVzb3JkZXJNb2R1bGVcIn0sXHJcbiAgICB7IHBhdGg6IFwibWFzdGVyXCIsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSxcclxuICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL2l0ZW0tbWFzdGVyL2l0ZW0tbWFzdGVyLm1vZHVsZSNJdGVtTWFzdGVyTW9kdWxlXCJ9LCBcclxuICAgIHsgcGF0aDogXCJkYWlseVwiLGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0sXHJcbiAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3Byb2R1Y3Rpb24vcHJvZHVjdGlvbi5tb2R1bGUjUHJvZHVjdGlvbk1vZHVsZVwifSxcclxuICAgIHsgcGF0aDogXCJncm5cIixjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdLFxyXG4gICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9nb29kLXJlY2VpcHQvZ29vZC1yZWNlaXB0Lm1vZHVsZSNHb29kUmVjaXB0TW9kdWxlXCJ9LFxyXG4gICAgeyBwYXRoOiBcIm1haW5cIiwgY29tcG9uZW50OiBNYWluUGFnZUNvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH1cclxuICAgICAgICBcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0aW5nID0gTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKTtcclxuXHJcbi8vIEBOZ01vZHVsZSh7XHJcbi8vICAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXHJcbi8vICAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxyXG4vLyB9KVxyXG4vLyBleHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH0iXX0=