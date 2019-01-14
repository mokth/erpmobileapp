"use strict";
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
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRTtBQUcvRSx1Q0FBc0M7QUFZdEM7SUFDRSxvQkFBcUMsWUFBd0I7UUFDM0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ25HO0lBQ0gsQ0FBQztJQUxVLFVBQVU7UUFWdEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLEVBRVI7WUFDRCxTQUFTLEVBQ0osbUJBQVEsUUFDWjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7UUFFYyxXQUFBLGVBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxlQUFRLEVBQUUsQ0FBQTt5Q0FBZSxVQUFVO09BRGxELFVBQVUsQ0FNdEI7SUFBRCxpQkFBQztDQUFBLEFBTkQsSUFNQztBQU5ZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcbmltcG9ydCB7IFNFUlZJQ0VTIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGltcG9ydHM6IFtcbiAgIFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICAuLi5TRVJWSUNFU1xuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IENvcmVNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvcmVNb2R1bGUgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWQuIEltcG9ydCBDb3JlTW9kdWxlIGludG8gdGhlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgIH1cbiAgfVxufVxuIl19