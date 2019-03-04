import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { itemroutes } from './item-master-routes';
import { ItemMasterComponent } from './item/item-master.component';
import { ItemListComponent } from './item-lists/item-list/item-list.component';

@NgModule({
  declarations: [
    ItemMasterComponent,
    ItemListComponent
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
    ItemListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemMasterModule { }
