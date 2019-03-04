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
var ItemMasterModule = /** @class */ (function () {
    function ItemMasterModule() {
    }
    ItemMasterModule = __decorate([
        core_1.NgModule({
            declarations: [
                item_master_component_1.ItemMasterComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forChild(item_master_routes_1.itemroutes),
            ],
            exports: [
                item_master_component_1.ItemMasterComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ItemMasterModule);
    return ItemMasterModule;
}());
exports.ItemMasterModule = ItemMasterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw2REFBeUY7QUFFekYsMkRBQWtEO0FBQ2xELHNFQUFtRTtBQWlCbkU7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWY1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1osMkNBQW1CO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjtnQkFDeEIsOENBQXVCO2dCQUN2QiwrQ0FBd0I7Z0JBQ3hCLCtDQUF3QixDQUFDLFFBQVEsQ0FBQywrQkFBVSxDQUFDO2FBQzlDO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDJDQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSwgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBpdGVtcm91dGVzIH0gZnJvbSAnLi9pdGVtLW1hc3Rlci1yb3V0ZXMnO1xuaW1wb3J0IHsgSXRlbU1hc3RlckNvbXBvbmVudCB9IGZyb20gJy4vaXRlbS9pdGVtLW1hc3Rlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBJdGVtTWFzdGVyQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChpdGVtcm91dGVzKSxcbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgSXRlbU1hc3RlckNvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbU1hc3Rlck1vZHVsZSB7IH1cbiJdfQ==