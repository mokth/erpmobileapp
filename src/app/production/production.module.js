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
var ProductionModule = /** @class */ (function () {
    function ProductionModule() {
    }
    ProductionModule = __decorate([
        core_1.NgModule({
            declarations: [daily_output_component_1.DailyOutputComponent],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_angular_1.NativeScriptFormsModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsZ0ZBQTZFO0FBQzdFLDZEQUErRDtBQWEvRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBWDVCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLDZDQUFvQixDQUFDO1lBQ3BDLE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLDhDQUF1QjthQUN4QjtZQUNELE9BQU8sRUFBQztnQkFDTiw2Q0FBb0I7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGFpbHlPdXRwdXRDb21wb25lbnQgfSBmcm9tICcuL2RhaWx5LW91dHB1dC9kYWlseS1vdXRwdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtEYWlseU91dHB1dENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgRGFpbHlPdXRwdXRDb21wb25lbnRcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3Rpb25Nb2R1bGUgeyB9XG4iXX0=