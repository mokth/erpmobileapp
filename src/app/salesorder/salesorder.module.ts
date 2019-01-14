import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { CustomerLookupComponent } from './lookup/customer-lookup/customer-lookup.component';
import { ItemLookupComponent } from './lookup/item-lookup/item-lookup.component';


@NgModule({
  declarations: [SalesOrderComponent, CustomerLookupComponent, SalesOrderListComponent, ItemLookupComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
    NativeScriptFormsModule
  ],
  providers:[
   
  ],
  exports:[
    SalesOrderComponent,
    SalesOrderListComponent,
    CustomerLookupComponent,
    ItemLookupComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SalesorderModule { 
 }
