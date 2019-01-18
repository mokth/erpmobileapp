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
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "saleslist", component: sales_order_list_component_1.SalesOrderListComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales/:sono", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookcust", component: customer_lookup_component_1.CustomerLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookitem", component: item_lookup_component_1.ItemLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "main", component: main_page_component_1.MainPageComponent, canActivate: [auth_guard_service_1.AuthguardService] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUl2RSxnRUFBOEQ7QUFDOUQsd0ZBQXFGO0FBQ3JGLDJHQUF3RztBQUN4Ryx1RUFBb0U7QUFDcEUsK0ZBQTRGO0FBQzVGLHVHQUFtRztBQUNuRywwRUFBdUU7QUFFdkUsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNyRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxvREFBdUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQ3pGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtJQUNqRixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7SUFDdkYsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxtREFBdUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQ3hGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtJQUNwRixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLHVDQUFpQixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7Q0FFakYsQ0FBQztBQU1GO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNhbGVzT3JkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9zYWxlc29yZGVyL3NhbGVzLW9yZGVyL3NhbGVzLW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lckxvb2t1cENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvbG9va3VwL2N1c3RvbWVyLWxvb2t1cC9jdXN0b21lci1sb29rdXAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE1haW5QYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFpbi1wYWdlL21haW4tcGFnZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSXRlbUxvb2t1cENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvbG9va3VwL2l0ZW0tbG9va3VwL2l0ZW0tbG9va3VwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvc2FsZXMtb3JkZXItbGlzdC9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBdXRoZ3VhcmRTZXJ2aWNlIH0gZnJvbSBcIi4vYXV0aC9hdXRoZ3VhcmQvYXV0aC1ndWFyZC1zZXJ2aWNlXCI7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbG9naW5cIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxyXG4gICAgeyBwYXRoOiBcImxvZ2luXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJzYWxlc2xpc3RcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyTGlzdENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwic2FsZXNcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfSxcclxuICAgIHsgcGF0aDogXCJzYWxlcy86c29ub1wiLCBjb21wb25lbnQ6IFNhbGVzT3JkZXJDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tjdXN0XCIsIGNvbXBvbmVudDogQ3VzdG9tZXJMb29rdXBDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tpdGVtXCIsIGNvbXBvbmVudDogSXRlbUxvb2t1cENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwibWFpblwiLCBjb21wb25lbnQ6IE1haW5QYWdlQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfVxyXG4gICAgICAgIFxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==