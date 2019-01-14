"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXNvcmRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlc29yZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsNEZBQW9HO0FBQ3BHLG9EQUFxRTtBQUVyRSw0RkFBd0Y7QUFDeEYsNkVBQTBFO0FBQzFFLGdHQUE2RjtBQUM3RixvRkFBaUY7QUFxQmpGO0lBQUE7SUFDQyxDQUFDO0lBRFcsZ0JBQWdCO1FBbEI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQywyQ0FBbUIsRUFBRSxtREFBdUIsRUFBRSxvREFBdUIsRUFBRSwyQ0FBbUIsQ0FBQztZQUMxRyxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QixrREFBNEI7Z0JBQzVCLCtCQUF1QjthQUN4QjtZQUNELFNBQVMsRUFBQyxFQUVUO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjtnQkFDbkIsb0RBQXVCO2dCQUN2QixtREFBdUI7Z0JBQ3ZCLDJDQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FDM0I7SUFBRCx1QkFBQztDQUFBLEFBREYsSUFDRTtBQURXLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyL2xpc3R2aWV3LWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zYWxlcy1vcmRlci1saXN0L3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFNhbGVzT3JkZXJDb21wb25lbnQgfSBmcm9tICcuL3NhbGVzLW9yZGVyL3NhbGVzLW9yZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lckxvb2t1cENvbXBvbmVudCB9IGZyb20gJy4vbG9va3VwL2N1c3RvbWVyLWxvb2t1cC9jdXN0b21lci1sb29rdXAuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1Mb29rdXBDb21wb25lbnQgfSBmcm9tICcuL2xvb2t1cC9pdGVtLWxvb2t1cC9pdGVtLWxvb2t1cC5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NhbGVzT3JkZXJDb21wb25lbnQsIEN1c3RvbWVyTG9va3VwQ29tcG9uZW50LCBTYWxlc09yZGVyTGlzdENvbXBvbmVudCwgSXRlbUxvb2t1cENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6W1xuICAgXG4gIF0sXG4gIGV4cG9ydHM6W1xuICAgIFNhbGVzT3JkZXJDb21wb25lbnQsXG4gICAgU2FsZXNPcmRlckxpc3RDb21wb25lbnQsXG4gICAgQ3VzdG9tZXJMb29rdXBDb21wb25lbnQsXG4gICAgSXRlbUxvb2t1cENvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2FsZXNvcmRlck1vZHVsZSB7IFxuIH1cbiJdfQ==