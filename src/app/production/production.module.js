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
var daily_output_component_1 = require("./daily-output/daily-output.component");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsZ0ZBQTZFO0FBQzdFLDZEQUF5RjtBQUN6RiwyRUFBNkQ7QUFDN0QseURBQWdEO0FBRWhELFNBQWdCLG9CQUFvQjtJQUNsQyxPQUFPLElBQUksNENBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGRCxvREFFQztBQWtCRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBaEI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztZQUNwQyxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4Qiw4Q0FBdUI7Z0JBQ3ZCLCtDQUF3QjtnQkFDeEIsK0NBQXdCLENBQUMsUUFBUSxDQUFDLDZCQUFTLENBQUM7YUFDN0M7WUFDRCxTQUFTLEVBQUM7Z0JBQ1IsRUFBRSxPQUFPLEVBQUUsNENBQWMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2FBQ2hFO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLDZDQUFvQjthQUNyQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYWlseU91dHB1dENvbXBvbmVudCB9IGZyb20gJy4vZGFpbHktb3V0cHV0L2RhaWx5LW91dHB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xuaW1wb3J0IHsgcHJkcm91dGVzIH0gZnJvbSAnLi9wcm9kdWN0aW9uLXJvdXRlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXJjb2RlU2Nhbm5lcigpIHtcbiAgcmV0dXJuIG5ldyBCYXJjb2RlU2Nhbm5lcigpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtEYWlseU91dHB1dENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChwcmRyb3V0ZXMpLFxuICBdLFxuICBwcm92aWRlcnM6W1xuICAgIHsgcHJvdmlkZTogQmFyY29kZVNjYW5uZXIsIHVzZUZhY3Rvcnk6IChjcmVhdGVCYXJjb2RlU2Nhbm5lcikgfVxuICBdLFxuICBleHBvcnRzOltcbiAgICBEYWlseU91dHB1dENvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdGlvbk1vZHVsZSB7IH1cbiJdfQ==