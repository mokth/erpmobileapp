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
var item_list_component_1 = require("./item-lists/item-list/item-list.component");
var ItemMasterModule = /** @class */ (function () {
    function ItemMasterModule() {
    }
    ItemMasterModule = __decorate([
        core_1.NgModule({
            declarations: [
                item_master_component_1.ItemMasterComponent,
                item_list_component_1.ItemListComponent
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
                item_list_component_1.ItemListComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ItemMasterModule);
    return ItemMasterModule;
}());
exports.ItemMasterModule = ItemMasterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw2REFBeUY7QUFFekYsMkRBQWtEO0FBQ2xELHNFQUFtRTtBQUNuRSxrRkFBK0U7QUFvQi9FO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFsQjVCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWiwyQ0FBbUI7Z0JBQ25CLHVDQUFpQjthQUNsQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLDhDQUF1QjtnQkFDdkIsK0NBQXdCO2dCQUN4QiwrQ0FBd0IsQ0FBQyxRQUFRLENBQUMsK0JBQVUsQ0FBQzthQUM5QztZQUNELFNBQVMsRUFBQyxFQUFFO1lBQ1osT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjtnQkFDbkIsdUNBQWlCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLCBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5cbmltcG9ydCB7IGl0ZW1yb3V0ZXMgfSBmcm9tICcuL2l0ZW0tbWFzdGVyLXJvdXRlcyc7XG5pbXBvcnQgeyBJdGVtTWFzdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9pdGVtL2l0ZW0tbWFzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaXRlbS1saXN0cy9pdGVtLWxpc3QvaXRlbS1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEl0ZW1NYXN0ZXJDb21wb25lbnQsXG4gICAgSXRlbUxpc3RDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKGl0ZW1yb3V0ZXMpLFxuICBdLFxuICBwcm92aWRlcnM6W10sXG4gIGV4cG9ydHM6W1xuICAgIEl0ZW1NYXN0ZXJDb21wb25lbnQsXG4gICAgSXRlbUxpc3RDb21wb25lbnRcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1NYXN0ZXJNb2R1bGUgeyB9XG4iXX0=