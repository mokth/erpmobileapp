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
var nativescript_angular_1 = require("nativescript-angular");
var item_master_routes_1 = require("./item-master-routes");
var item_master_component_1 = require("./item/item-master.component");
var item_list_component_1 = require("./item-lists/item-list.component");
var proddef_list_component_1 = require("./proddef/proddef-list/proddef-list.component");
var proddef_detail_component_1 = require("./proddef/proddef-detail/proddef-detail.component");
var item_balance_component_1 = require("./item-balance/item-balance.component");
var prod_defination_component_1 = require("./proddef/prod-defination/prod-defination.component");
var ItemMasterModule = /** @class */ (function () {
    function ItemMasterModule() {
    }
    ItemMasterModule = __decorate([
        core_1.NgModule({
            declarations: [
                item_master_component_1.ItemMasterComponent,
                item_list_component_1.ItemListComponent,
                proddef_list_component_1.ProddefListComponent,
                proddef_detail_component_1.ProddefDetailComponent,
                prod_defination_component_1.ProdDefinationComponent,
                item_balance_component_1.ItemBalanceComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forChild(item_master_routes_1.itemroutes),
            ],
            providers: [],
            exports: [
                item_master_component_1.ItemMasterComponent,
                item_list_component_1.ItemListComponent,
                proddef_list_component_1.ProddefListComponent,
                proddef_detail_component_1.ProddefDetailComponent,
                prod_defination_component_1.ProdDefinationComponent,
                item_balance_component_1.ItemBalanceComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ItemMasterModule);
    return ItemMasterModule;
}());
exports.ItemMasterModule = ItemMasterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw2REFBeUY7QUFHekYsMkRBQWtEO0FBQ2xELHNFQUFtRTtBQUNuRSx3RUFBcUU7QUFDckUsd0ZBQXFGO0FBQ3JGLDhGQUEyRjtBQUMzRixnRkFBNkU7QUFDN0UsaUdBQThGO0FBNEI5RjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBMUI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1osMkNBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLDZDQUFvQjtnQkFDcEIsaURBQXNCO2dCQUN0QixtREFBdUI7Z0JBQ3ZCLDZDQUFvQjthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLDhDQUF1QjtnQkFDdkIsK0NBQXdCO2dCQUN4QiwrQ0FBd0IsQ0FBQyxRQUFRLENBQUMsK0JBQVUsQ0FBQzthQUM5QztZQUNELFNBQVMsRUFBQyxFQUFFO1lBQ1osT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiw2Q0FBb0I7Z0JBQ3BCLGlEQUFzQjtnQkFDdEIsbURBQXVCO2dCQUN2Qiw2Q0FBb0I7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcblxuXG5pbXBvcnQgeyBpdGVtcm91dGVzIH0gZnJvbSAnLi9pdGVtLW1hc3Rlci1yb3V0ZXMnO1xuaW1wb3J0IHsgSXRlbU1hc3RlckNvbXBvbmVudCB9IGZyb20gJy4vaXRlbS9pdGVtLW1hc3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2l0ZW0tbGlzdHMvaXRlbS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kZGVmTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcHJvZGRlZi9wcm9kZGVmLWxpc3QvcHJvZGRlZi1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kZGVmRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kZGVmL3Byb2RkZWYtZGV0YWlsL3Byb2RkZWYtZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtQmFsYW5jZUNvbXBvbmVudCB9IGZyb20gJy4vaXRlbS1iYWxhbmNlL2l0ZW0tYmFsYW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZERlZmluYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3Byb2RkZWYvcHJvZC1kZWZpbmF0aW9uL3Byb2QtZGVmaW5hdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBJdGVtTWFzdGVyQ29tcG9uZW50LFxuICAgIEl0ZW1MaXN0Q29tcG9uZW50LFxuICAgIFByb2RkZWZMaXN0Q29tcG9uZW50LFxuICAgIFByb2RkZWZEZXRhaWxDb21wb25lbnQsXG4gICAgUHJvZERlZmluYXRpb25Db21wb25lbnQsXG4gICAgSXRlbUJhbGFuY2VDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsICAgXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKGl0ZW1yb3V0ZXMpLFxuICBdLFxuICBwcm92aWRlcnM6W10sXG4gIGV4cG9ydHM6W1xuICAgIEl0ZW1NYXN0ZXJDb21wb25lbnQsXG4gICAgSXRlbUxpc3RDb21wb25lbnQsXG4gICAgUHJvZGRlZkxpc3RDb21wb25lbnQsXG4gICAgUHJvZGRlZkRldGFpbENvbXBvbmVudCxcbiAgICBQcm9kRGVmaW5hdGlvbkNvbXBvbmVudCxcbiAgICBJdGVtQmFsYW5jZUNvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbU1hc3Rlck1vZHVsZSB7IH1cbiJdfQ==