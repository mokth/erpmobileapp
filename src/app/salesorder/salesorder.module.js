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
var sales_order_list_component_1 = require("./sales-order-list/sales-order-list.component");
var sales_order_component_1 = require("./sales-order/sales-order.component");
var customer_lookup_component_1 = require("./lookup/customer-lookup/customer-lookup.component");
var item_lookup_component_1 = require("./lookup/item-lookup/item-lookup.component");
var SalesorderModule = /** @class */ (function () {
    function SalesorderModule() {
    }
    SalesorderModule = __decorate([
        core_1.NgModule({
            declarations: [sales_order_component_1.SalesOrderComponent, customer_lookup_component_1.CustomerLookupComponent, sales_order_list_component_1.SalesOrderListComponent, item_lookup_component_1.ItemLookupComponent],
            imports: [
                common_1.NativeScriptCommonModule,
                listview_directives_1.NativeScriptUIListViewModule,
                forms_1.NativeScriptFormsModule
            ],
            providers: [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXNvcmRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlc29yZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsNEZBQW9HO0FBQ3BHLG9EQUFxRTtBQUVyRSw0RkFBd0Y7QUFDeEYsNkVBQTBFO0FBQzFFLGdHQUE2RjtBQUM3RixvRkFBaUY7QUFxQmpGO0lBQUE7SUFDQyxDQUFDO0lBRFcsZ0JBQWdCO1FBbEI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQywyQ0FBbUIsRUFBRSxtREFBdUIsRUFBRSxvREFBdUIsRUFBRSwyQ0FBbUIsQ0FBQztZQUMxRyxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixrREFBNEI7Z0JBQzVCLCtCQUF1QjthQUN4QjtZQUNELFNBQVMsRUFBQyxFQUVUO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjtnQkFDbkIsb0RBQXVCO2dCQUN2QixtREFBdUI7Z0JBQ3ZCLDJDQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FDM0I7SUFBRCx1QkFBQztDQUFBLEFBREYsSUFDRTtBQURXLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhci9saXN0dmlldy1kaXJlY3RpdmVzJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vc2FsZXMtb3JkZXItbGlzdC9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNhbGVzT3JkZXJDb21wb25lbnQgfSBmcm9tICcuL3NhbGVzLW9yZGVyL3NhbGVzLW9yZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEN1c3RvbWVyTG9va3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sb29rdXAvY3VzdG9tZXItbG9va3VwL2N1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJdGVtTG9va3VwQ29tcG9uZW50IH0gZnJvbSAnLi9sb29rdXAvaXRlbS1sb29rdXAvaXRlbS1sb29rdXAuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1NhbGVzT3JkZXJDb21wb25lbnQsIEN1c3RvbWVyTG9va3VwQ29tcG9uZW50LCBTYWxlc09yZGVyTGlzdENvbXBvbmVudCwgSXRlbUxvb2t1cENvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6W1xyXG4gICBcclxuICBdLFxyXG4gIGV4cG9ydHM6W1xyXG4gICAgU2FsZXNPcmRlckNvbXBvbmVudCxcclxuICAgIFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgQ3VzdG9tZXJMb29rdXBDb21wb25lbnQsXHJcbiAgICBJdGVtTG9va3VwQ29tcG9uZW50XHJcbiAgXSxcclxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNhbGVzb3JkZXJNb2R1bGUgeyBcclxuIH1cclxuIl19