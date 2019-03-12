import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { itemroutes } from './item-master-routes';
import { ItemMasterComponent } from './item/item-master.component';
import { ItemListComponent } from './item-lists/item-list.component';
import { ProddefListComponent } from './proddef/proddef-list/proddef-list.component';
import { ProddefDetailComponent } from './proddef/proddef-detail/proddef-detail.component';
import { ItemBalanceComponent } from './item-balance/item-balance.component';

@NgModule({
  declarations: [
    ItemMasterComponent,
    ItemListComponent,
    ProddefListComponent,
    ProddefDetailComponent,
    ItemBalanceComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(itemroutes),
  ],
  providers:[],
  exports:[
    ItemMasterComponent,
    ItemListComponent,
    ProddefListComponent,
    ProddefDetailComponent,
    ItemBalanceComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemMasterModule { }
