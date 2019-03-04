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
var grn_entry_component_1 = require("./grn-entry/grn-entry.component");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var good_receipt_routes_1 = require("./good-receipt-routes");
var cycle_count_component_1 = require("./cycle-count/cycle-count.component");
var cycle_count_nolot_component_1 = require("./cycle-count-nolot/cycle-count-nolot.component");
function createBarcodeScanner() {
    return new nativescript_barcodescanner_1.BarcodeScanner();
}
exports.createBarcodeScanner = createBarcodeScanner;
var GoodReciptModule = /** @class */ (function () {
    function GoodReciptModule() {
    }
    GoodReciptModule = __decorate([
        core_1.NgModule({
            declarations: [
                grn_entry_component_1.GrnEntryComponent,
                cycle_count_component_1.CycleCountComponent,
                cycle_count_nolot_component_1.CycleCountNoLotComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptRouterModule.forChild(good_receipt_routes_1.grnroutes),
            ],
            providers: [
                { provide: nativescript_barcodescanner_1.BarcodeScanner, useFactory: (createBarcodeScanner) }
            ],
            exports: [
                grn_entry_component_1.GrnEntryComponent,
                cycle_count_component_1.CycleCountComponent,
                cycle_count_nolot_component_1.CycleCountNoLotComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], GoodReciptModule);
    return GoodReciptModule;
}());
exports.GoodReciptModule = GoodReciptModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZC1yZWNlaXB0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2QtcmVjZWlwdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLDZEQUF5RjtBQUV6Rix1RUFBb0U7QUFFcEUsMkVBQTZEO0FBQzdELDZEQUFrRDtBQUNsRCw2RUFBMEU7QUFDMUUsK0ZBQTJGO0FBRzNGLFNBQWdCLG9CQUFvQjtJQUNsQyxPQUFPLElBQUksNENBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGRCxvREFFQztBQXdCRDtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBdEI1QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1osdUNBQWlCO2dCQUNqQiwyQ0FBbUI7Z0JBQ25CLHNEQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLDhDQUF1QjtnQkFDdkIsK0NBQXdCO2dCQUN4QiwrQ0FBd0IsQ0FBQyxRQUFRLENBQUMsK0JBQVMsQ0FBQzthQUM3QztZQUNELFNBQVMsRUFBQztnQkFDUixFQUFFLE9BQU8sRUFBRSw0Q0FBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7YUFDaEU7WUFDRCxPQUFPLEVBQUM7Z0JBQ04sdUNBQWlCO2dCQUNqQiwyQ0FBbUI7Z0JBQ25CLHNEQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSwgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBHcm5FbnRyeUNvbXBvbmVudCB9IGZyb20gJy4vZ3JuLWVudHJ5L2dybi1lbnRyeS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIjtcbmltcG9ydCB7IGdybnJvdXRlcyB9IGZyb20gJy4vZ29vZC1yZWNlaXB0LXJvdXRlcyc7XG5pbXBvcnQgeyBDeWNsZUNvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9jeWNsZS1jb3VudC9jeWNsZS1jb3VudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3ljbGVDb3VudE5vTG90Q29tcG9uZW50IH0gZnJvbSAnLi9jeWNsZS1jb3VudC1ub2xvdC9jeWNsZS1jb3VudC1ub2xvdC5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXJjb2RlU2Nhbm5lcigpIHtcbiAgcmV0dXJuIG5ldyBCYXJjb2RlU2Nhbm5lcigpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBHcm5FbnRyeUNvbXBvbmVudCxcbiAgICBDeWNsZUNvdW50Q29tcG9uZW50LFxuICAgIEN5Y2xlQ291bnROb0xvdENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoZ3Jucm91dGVzKSxcbiAgXSxcbiAgcHJvdmlkZXJzOltcbiAgICB7IHByb3ZpZGU6IEJhcmNvZGVTY2FubmVyLCB1c2VGYWN0b3J5OiAoY3JlYXRlQmFyY29kZVNjYW5uZXIpIH1cbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgR3JuRW50cnlDb21wb25lbnQsXG4gICAgQ3ljbGVDb3VudENvbXBvbmVudCxcbiAgICBDeWNsZUNvdW50Tm9Mb3RDb21wb25lbnRcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEdvb2RSZWNpcHRNb2R1bGUgeyB9XG4iXX0=