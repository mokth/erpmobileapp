import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { itemroutes } from './item-master-routes';
import { ItemMasterComponent } from './item/item-master.component';
import { ItemListComponent } from './item-lists/item-list/item-list.component';
import { ProddefListComponent } from './proddef/proddef-list/proddef-list.component';
import { ProddefDetailComponent } from './proddef/proddef-detail/proddef-detail.component';

@NgModule({
  declarations: [
    ItemMasterComponent,
    ItemListComponent,
    ProddefListComponent,
    ProddefDetailComponent
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
    ProddefDetailComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemMasterModule { }
