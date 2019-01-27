"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var listview_directives_1 = require("nativescript-ui-listview/angular/listview-directives");
var forms_1 = require("nativescript-angular/forms");
var router_1 = require("nativescript-angular/router");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var sales_order_list_component_1 = require("./sales-order-list/sales-order-list.component");
var sales_order_component_1 = require("./sales-order/sales-order.component");
var customer_lookup_component_1 = require("./lookup/customer-lookup/customer-lookup.component");
var item_lookup_component_1 = require("./lookup/item-lookup/item-lookup.component");
var sales_routes_1 = require("./sales-routes");
function createBarcodeScanner() {
    return new nativescript_barcodescanner_1.BarcodeScanner();
}
exports.createBarcodeScanner = createBarcodeScanner;
var SalesorderModule = /** @class */ (function () {
    function SalesorderModule() {
    }
    SalesorderModule = __decorate([
        core_1.NgModule({
            declarations: [
                sales_order_component_1.SalesOrderComponent,
                customer_lookup_component_1.CustomerLookupComponent,
                sales_order_list_component_1.SalesOrderListComponent,
                item_lookup_component_1.ItemLookupComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                listview_directives_1.NativeScriptUIListViewModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forChild(sales_routes_1.routes),
            ],
            providers: [
                { provide: nativescript_barcodescanner_1.BarcodeScanner, useFactory: (createBarcodeScanner) }
            ],
            exports: [
                sales_order_component_1.SalesOrderComponent,
                sales_order_list_component_1.SalesOrderListComponent,
                customer_lookup_component_1.CustomerLookupComponent,
                item_lookup_component_1.ItemLookupComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SalesorderModule);
    return SalesorderModule;
}());
exports.SalesorderModule = SalesorderModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXNvcmRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlc29yZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsNEZBQW9HO0FBQ3BHLG9EQUFxRTtBQUNyRSxzREFBdUU7QUFDdkUsMkVBQTZEO0FBRTdELDRGQUF3RjtBQUN4Riw2RUFBMEU7QUFDMUUsZ0dBQTZGO0FBQzdGLG9GQUFpRjtBQUNqRiwrQ0FBd0M7QUFFeEMsU0FBZ0Isb0JBQW9CO0lBQ2xDLE9BQU8sSUFBSSw0Q0FBYyxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZELG9EQUVDO0FBMkJEO0lBQUE7SUFDQyxDQUFDO0lBRFcsZ0JBQWdCO1FBekI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1osMkNBQW1CO2dCQUNuQixtREFBdUI7Z0JBQ3ZCLG9EQUF1QjtnQkFDdkIsMkNBQW1CO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsK0JBQXVCO2dCQUN2QixrREFBNEI7Z0JBQzVCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLHFCQUFNLENBQUM7YUFDMUM7WUFDRCxTQUFTLEVBQUM7Z0JBQ1IsRUFBRSxPQUFPLEVBQUUsNENBQWMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2FBQ2hFO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjtnQkFDbkIsb0RBQXVCO2dCQUN2QixtREFBdUI7Z0JBQ3ZCLDJDQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FDM0I7SUFBRCx1QkFBQztDQUFBLEFBREYsSUFDRTtBQURXLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhci9saXN0dmlldy1kaXJlY3RpdmVzJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCI7XHJcblxyXG5pbXBvcnQgeyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vc2FsZXMtb3JkZXItbGlzdC9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNhbGVzT3JkZXJDb21wb25lbnQgfSBmcm9tICcuL3NhbGVzLW9yZGVyL3NhbGVzLW9yZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEN1c3RvbWVyTG9va3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sb29rdXAvY3VzdG9tZXItbG9va3VwL2N1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJdGVtTG9va3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sb29rdXAvaXRlbS1sb29rdXAvaXRlbS1sb29rdXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9zYWxlcy1yb3V0ZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhcmNvZGVTY2FubmVyKCkge1xyXG4gIHJldHVybiBuZXcgQmFyY29kZVNjYW5uZXIoKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFsgICAgXHJcbiAgICBTYWxlc09yZGVyQ29tcG9uZW50LCBcclxuICAgIEN1c3RvbWVyTG9va3VwQ29tcG9uZW50LCBcclxuICAgIFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50LCBcclxuICAgIEl0ZW1Mb29rdXBDb21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpLFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOltcclxuICAgIHsgcHJvdmlkZTogQmFyY29kZVNjYW5uZXIsIHVzZUZhY3Rvcnk6IChjcmVhdGVCYXJjb2RlU2Nhbm5lcikgfVxyXG4gIF0sXHJcbiAgZXhwb3J0czpbXHJcbiAgICBTYWxlc09yZGVyQ29tcG9uZW50LFxyXG4gICAgU2FsZXNPcmRlckxpc3RDb21wb25lbnQsXHJcbiAgICBDdXN0b21lckxvb2t1cENvbXBvbmVudCxcclxuICAgIEl0ZW1Mb29rdXBDb21wb25lbnQgICBcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FsZXNvcmRlck1vZHVsZSB7IFxyXG4gfVxyXG4iXX0=