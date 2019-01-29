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
                grn_entry_component_1.GrnEntryComponent
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
                grn_entry_component_1.GrnEntryComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], GoodReciptModule);
    return GoodReciptModule;
}());
exports.GoodReciptModule = GoodReciptModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZC1yZWNlaXB0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2QtcmVjZWlwdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLDZEQUF5RjtBQUV6Rix1RUFBb0U7QUFFcEUsMkVBQTZEO0FBQzdELDZEQUFrRDtBQUdsRCxTQUFnQixvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLDRDQUFjLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkQsb0RBRUM7QUFvQkQ7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWxCNUIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLHVDQUFpQjthQUNsQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQ0FBd0I7Z0JBQ3hCLDhDQUF1QjtnQkFDdkIsK0NBQXdCO2dCQUN4QiwrQ0FBd0IsQ0FBQyxRQUFRLENBQUMsK0JBQVMsQ0FBQzthQUM3QztZQUNELFNBQVMsRUFBQztnQkFDUixFQUFFLE9BQU8sRUFBRSw0Q0FBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7YUFDaEU7WUFDRCxPQUFPLEVBQUM7Z0JBQ04sdUNBQWlCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLCBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5cbmltcG9ydCB7IEdybkVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9ncm4tZW50cnkvZ3JuLWVudHJ5LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xuaW1wb3J0IHsgZ3Jucm91dGVzIH0gZnJvbSAnLi9nb29kLXJlY2VpcHQtcm91dGVzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFyY29kZVNjYW5uZXIoKSB7XG4gIHJldHVybiBuZXcgQmFyY29kZVNjYW5uZXIoKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR3JuRW50cnlDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKGdybnJvdXRlcyksXG4gIF0sXG4gIHByb3ZpZGVyczpbXG4gICAgeyBwcm92aWRlOiBCYXJjb2RlU2Nhbm5lciwgdXNlRmFjdG9yeTogKGNyZWF0ZUJhcmNvZGVTY2FubmVyKSB9XG4gIF0sXG4gIGV4cG9ydHM6W1xuICAgIEdybkVudHJ5Q29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBHb29kUmVjaXB0TW9kdWxlIHsgfVxuIl19