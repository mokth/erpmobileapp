"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var sales_order_list_component_1 = require("./sales-order-list/sales-order-list.component");
var sales_order_component_1 = require("./sales-order/sales-order.component");
var customer_lookup_component_1 = require("./lookup/customer-lookup/customer-lookup.component");
var item_lookup_component_1 = require("./lookup/item-lookup/item-lookup.component");
var auth_guard_service_1 = require("../auth/authguard/auth-guard-service");
var routes = [
    { path: "", component: sales_order_list_component_1.SalesOrderListComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "saleslist", component: sales_order_list_component_1.SalesOrderListComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "sales/:sono", component: sales_order_component_1.SalesOrderComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookcust", component: customer_lookup_component_1.CustomerLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
    { path: "lookitem", component: item_lookup_component_1.ItemLookupComponent, canActivate: [auth_guard_service_1.AuthguardService] },
];
var SalesRoutingModule = /** @class */ (function () {
    function SalesRoutingModule() {
    }
    SalesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forChild(routes)
            ],
            exports: [nativescript_angular_1.NativeScriptRouterModule]
        })
    ], SalesRoutingModule);
    return SalesRoutingModule;
}());
exports.SalesRoutingModule = SalesRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtcm91dGluZy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1yb3V0aW5nLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyw2REFBZ0U7QUFHaEUsNEZBQXdGO0FBQ3hGLDZFQUEwRTtBQUMxRSxnR0FBNkY7QUFDN0Ysb0ZBQWlGO0FBQ2pGLDJFQUF3RTtBQUV4RSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLG9EQUF1QixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUc7SUFDakYsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxvREFBdUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQ3pGLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtJQUNqRixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFDLFdBQVcsRUFBRSxDQUFDLHFDQUFnQixDQUFDLEVBQUU7SUFDdkYsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxtREFBdUIsRUFBQyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQyxFQUFFO0lBQ3hGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUMsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBRTtDQUV2RixDQUFDO0FBVUY7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQVI5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsK0NBQXdCO2dCQUN4QiwrQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxFQUFFLENBQUMsK0NBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUVXLGtCQUFrQixDQUFJO0lBQUQseUJBQUM7Q0FBQSxBQUFuQyxJQUFtQztBQUF0QixnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzLW9yZGVyLWxpc3Qvc2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2FsZXNPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzLW9yZGVyL3NhbGVzLW9yZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lckxvb2t1cENvbXBvbmVudCB9IGZyb20gXCIuL2xvb2t1cC9jdXN0b21lci1sb29rdXAvY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBJdGVtTG9va3VwQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9va3VwL2l0ZW0tbG9va3VwL2l0ZW0tbG9va3VwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBdXRoZ3VhcmRTZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGgvYXV0aGd1YXJkL2F1dGgtZ3VhcmQtc2VydmljZVwiO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogU2FsZXNPcmRlckxpc3RDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSAgfSxcclxuICAgIHsgcGF0aDogXCJzYWxlc2xpc3RcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyTGlzdENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICB7IHBhdGg6IFwic2FsZXNcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aGd1YXJkU2VydmljZV0gfSxcclxuICAgIHsgcGF0aDogXCJzYWxlcy86c29ub1wiLCBjb21wb25lbnQ6IFNhbGVzT3JkZXJDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tjdXN0XCIsIGNvbXBvbmVudDogQ3VzdG9tZXJMb29rdXBDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoZ3VhcmRTZXJ2aWNlXSB9LFxyXG4gICAgeyBwYXRoOiBcImxvb2tpdGVtXCIsIGNvbXBvbmVudDogSXRlbUxvb2t1cENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhndWFyZFNlcnZpY2VdIH0sXHJcbiAgICAgXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2FsZXNSb3V0aW5nTW9kdWxlIHsgfSJdfQ==