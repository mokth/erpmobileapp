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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var daily_output_component_1 = require("./daily-output/daily-output.component");
var production_routes_1 = require("./production-routes");
function createBarcodeScanner() {
    return new nativescript_barcodescanner_1.BarcodeScanner();
}
exports.createBarcodeScanner = createBarcodeScanner;
var ProductionModule = /** @class */ (function () {
    function ProductionModule() {
    }
    ProductionModule = __decorate([
        core_1.NgModule({
            declarations: [daily_output_component_1.DailyOutputComponent],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forChild(production_routes_1.prdroutes),
            ],
            providers: [
                { provide: nativescript_barcodescanner_1.BarcodeScanner, useFactory: (createBarcodeScanner) }
            ],
            exports: [
                daily_output_component_1.DailyOutputComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], ProductionModule);
    return ProductionModule;
}());
exports.ProductionModule = ProductionModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsNkRBQXlGO0FBRXpGLDJFQUE2RDtBQUM3RCxnRkFBNkU7QUFDN0UseURBQWdEO0FBRWhELFNBQWdCLG9CQUFvQjtJQUNsQyxPQUFPLElBQUksNENBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGRCxvREFFQztBQWtCRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBaEI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztZQUNwQyxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4Qiw4Q0FBdUI7Z0JBQ3ZCLCtDQUF3QjtnQkFDeEIsK0NBQXdCLENBQUMsUUFBUSxDQUFDLDZCQUFTLENBQUM7YUFDN0M7WUFDRCxTQUFTLEVBQUM7Z0JBQ1IsRUFBRSxPQUFPLEVBQUUsNENBQWMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2FBQ2hFO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDZDQUFvQjthQUNyQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSwgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIjtcbmltcG9ydCB7IERhaWx5T3V0cHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kYWlseS1vdXRwdXQvZGFpbHktb3V0cHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcmRyb3V0ZXMgfSBmcm9tICcuL3Byb2R1Y3Rpb24tcm91dGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhcmNvZGVTY2FubmVyKCkge1xuICByZXR1cm4gbmV3IEJhcmNvZGVTY2FubmVyKCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RhaWx5T3V0cHV0Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHByZHJvdXRlcyksXG4gIF0sXG4gIHByb3ZpZGVyczpbXG4gICAgeyBwcm92aWRlOiBCYXJjb2RlU2Nhbm5lciwgdXNlRmFjdG9yeTogKGNyZWF0ZUJhcmNvZGVTY2FubmVyKSB9XG4gIF0sXG4gIGV4cG9ydHM6W1xuICAgIERhaWx5T3V0cHV0Q29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0aW9uTW9kdWxlIHsgfVxuIl19