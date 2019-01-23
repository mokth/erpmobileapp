"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./auth/login/login.component");
var sales_order_component_1 = require("./salesorder/sales-order/sales-order.component");
var customer_lookup_component_1 = require("./salesorder/lookup/customer-lookup/customer-lookup.component");
var main_page_component_1 = require("./main-page/main-page.component");
var item_lookup_component_1 = require("./salesorder/lookup/item-lookup/item-lookup.component");
var sales_order_list_component_1 = require("./salesorder/sales-order-list/sales-order-list.component");
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
var daily_output_component_1 = require("./production/daily-output/daily-output.component");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "saleslist", component: sales_order_list_component_1.SalesOrderListComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales/:sono", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookcust", component: customer_lookup_component_1.CustomerLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookitem", component: item_lookup_component_1.ItemLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "main", component: main_page_component_1.MainPageComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "daily", component: daily_output_component_1.DailyOutputComponent, canActivate: [auth_guard_service_1.AuthguardService] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUl2RSxnRUFBOEQ7QUFDOUQsd0ZBQXFGO0FBQ3JGLDJHQUF3RztBQUN4Ryx1RUFBb0U7QUFDcEUsK0ZBQTRGO0FBQzVGLHVHQUFtRztBQUNuRywwRUFBdUU7QUFDdkUsMkZBQXdGO0FBRXhGLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQzVDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsb0RBQXVCLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtJQUN6RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7SUFDakYsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQ3ZGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsbURBQXVCLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtJQUN4RixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7SUFDcEYsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQzlFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsNkNBQW9CLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtDQUVyRixDQUFDO0FBTUY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2FsZXNPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvc2FsZXMtb3JkZXIvc2FsZXMtb3JkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyTG9va3VwQ29tcG9uZW50IH0gZnJvbSBcIi4vc2FsZXNvcmRlci9sb29rdXAvY3VzdG9tZXItbG9va3VwL2N1c3RvbWVyLWxvb2t1cC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTWFpblBhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi9tYWluLXBhZ2UvbWFpbi1wYWdlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtTG9va3VwQ29tcG9uZW50IH0gZnJvbSBcIi4vc2FsZXNvcmRlci9sb29rdXAvaXRlbS1sb29rdXAvaXRlbS1sb29rdXAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vc2FsZXNvcmRlci9zYWxlcy1vcmRlci1saXN0L3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGFpbHlPdXRwdXRDb21wb25lbnQgfSBmcm9tIFwiLi9wcm9kdWN0aW9uL2RhaWx5LW91dHB1dC9kYWlseS1vdXRwdXQuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbG9naW5cIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxyXG4gICAgeyBwYXRoOiBcImxvZ2luXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJzYWxlc2xpc3RcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyTGlzdENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwic2FsZXNcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfSxcclxuICAgIHsgcGF0aDogXCJzYWxlcy86c29ub1wiLCBjb21wb25lbnQ6IFNhbGVzT3JkZXJDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tjdXN0XCIsIGNvbXBvbmVudDogQ3VzdG9tZXJMb29rdXBDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tpdGVtXCIsIGNvbXBvbmVudDogSXRlbUxvb2t1cENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwibWFpblwiLCBjb21wb25lbnQ6IE1haW5QYWdlQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfSxcclxuICAgIHsgcGF0aDogXCJkYWlseVwiLCBjb21wb25lbnQ6IERhaWx5T3V0cHV0Q29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfVxyXG4gICAgICAgIFxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==