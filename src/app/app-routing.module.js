"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./auth/login/login.component");
var sales_order_component_1 = require("./salesorder/sales-order/sales-order.component");
var customer_lookup_component_1 = require("./salesorder/lookup/customer-lookup/customer-lookup.component");
var main_page_component_1 = require("./main-page/main-page.component");
var item_lookup_component_1 = require("./salesorder/lookup/item-lookup/item-lookup.component");
var sales_order_list_component_1 = require("./salesorder/sales-order-list/sales-order-list.component");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "saleslist", component: sales_order_list_component_1.SalesOrderListComponent },
    { path: "sales", component: sales_order_component_1.SalesOrderComponent },
    { path: "sales/:sono", component: sales_order_component_1.SalesOrderComponent },
    { path: "lookcust", component: customer_lookup_component_1.CustomerLookupComponent },
    { path: "lookitem", component: item_lookup_component_1.ItemLookupComponent },
    { path: "main", component: main_page_component_1.MainPageComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUl2RSxnRUFBOEQ7QUFDOUQsd0ZBQXFGO0FBQ3JGLDJHQUF3RztBQUN4Ryx1RUFBb0U7QUFDcEUsK0ZBQTRGO0FBQzVGLHVHQUFtRztBQUVuRyxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG9EQUF1QixFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLG1EQUF1QixFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMkNBQW1CLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSx1Q0FBaUIsRUFBRTtDQUdqRCxDQUFDO0FBTUY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cblxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2FsZXNPcmRlckNvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvc2FsZXMtb3JkZXIvc2FsZXMtb3JkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDdXN0b21lckxvb2t1cENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvbG9va3VwL2N1c3RvbWVyLWxvb2t1cC9jdXN0b21lci1sb29rdXAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYWluUGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL21haW4tcGFnZS9tYWluLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJdGVtTG9va3VwQ29tcG9uZW50IH0gZnJvbSBcIi4vc2FsZXNvcmRlci9sb29rdXAvaXRlbS1sb29rdXAvaXRlbS1sb29rdXAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3NhbGVzb3JkZXIvc2FsZXMtb3JkZXItbGlzdC9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7IHBhdGg6IFwibG9naW5cIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJzYWxlc2xpc3RcIiwgY29tcG9uZW50OiBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJzYWxlc1wiLCBjb21wb25lbnQ6IFNhbGVzT3JkZXJDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwic2FsZXMvOnNvbm9cIiwgY29tcG9uZW50OiBTYWxlc09yZGVyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImxvb2tjdXN0XCIsIGNvbXBvbmVudDogQ3VzdG9tZXJMb29rdXBDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwibG9va2l0ZW1cIiwgY29tcG9uZW50OiBJdGVtTG9va3VwQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcIm1haW5cIiwgY29tcG9uZW50OiBNYWluUGFnZUNvbXBvbmVudCB9XG4gICAgXG4gICAgXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==