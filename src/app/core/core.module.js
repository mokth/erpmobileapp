"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("./services");
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import CoreModule into the AppModule only.');
        }
    }
    CoreModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [],
            providers: services_1.SERVICES.slice(),
            exports: [],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUErRTtBQUcvRSx1Q0FBc0M7QUFldEM7SUFDRSxvQkFBcUMsWUFBd0I7UUFDM0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ25HO0lBQ0gsQ0FBQztJQUxVLFVBQVU7UUFadEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLEVBRVI7WUFDRCxTQUFTLEVBQ0osbUJBQVEsUUFDWjtZQUNELE9BQU8sRUFBQyxFQUNQO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztRQUVjLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGVBQVEsRUFBRSxDQUFBO3lDQUFlLFVBQVU7T0FEbEQsVUFBVSxDQU10QjtJQUFELGlCQUFDO0NBQUEsQUFORCxJQU1DO0FBTlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgU0VSVklDRVMgfSBmcm9tICcuL3NlcnZpY2VzJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW10sXHJcbiAgaW1wb3J0czogW1xyXG4gICBcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLi4uU0VSVklDRVNcclxuICBdLFxyXG4gIGV4cG9ydHM6WyAgICBcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XHJcbiAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQ29yZU1vZHVsZSkge1xyXG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvcmVNb2R1bGUgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWQuIEltcG9ydCBDb3JlTW9kdWxlIGludG8gdGhlIEFwcE1vZHVsZSBvbmx5LicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=