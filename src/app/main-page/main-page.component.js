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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var navigation_service_1 = require("../core/services/navigation.service");
var auth_service_1 = require("../core/services/auth-service");
//import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application/application';
//import * as application from "tns-core-modules/application";
var MainPageComponent = /** @class */ (function () {
    function MainPageComponent(auth, navigationService) {
        this.auth = auth;
        this.navigationService = navigationService;
    }
    MainPageComponent.prototype.ngOnInit = function () {
        this.iconAdd = String.fromCharCode(0xe9bd);
        this.iconlogo = String.fromCharCode(0xee92e);
    };
    MainPageComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this.drawer.drawerLocation = nativescript_ui_sidedrawer_1.SideDrawerLocation.Right;
    };
    MainPageComponent.prototype.showSlideout = function () {
        this.drawer.mainContent.className = 'drawer-content-in';
        this.drawer.showDrawer();
    };
    MainPageComponent.prototype.onDrawerClosing = function () {
        this.drawer.mainContent.className = 'drawer-content-out';
    };
    MainPageComponent.prototype.onCloseMenu = function ($event) {
        this.drawer.closeDrawer();
    };
    MainPageComponent.prototype.onTabMenu = function (arg) {
        if (arg == "saleslist") {
            this.navigationService.navigate(['/saleslist']);
        }
        else if (arg == "sales") {
            this.navigationService.navigate(['/sales']);
        }
        else if (arg == "cust") {
            this.navigationService.navigate(['/lookcust']);
        }
        else if (arg == "item") {
            this.navigationService.navigate(['/lookitem']);
        }
        else if (arg == "daily") {
            this.navigationService.navigate(['/daily']);
        }
        this.drawer.closeDrawer();
    };
    MainPageComponent.prototype.onLogOut = function () {
        this.auth.signOut();
        this.navigationService.navigate(['/login'], { clearHistory: true });
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], MainPageComponent.prototype, "drawerComponent", void 0);
    MainPageComponent = __decorate([
        core_1.Component({
            selector: 'ns-main-page',
            templateUrl: './main-page.component.html',
            styleUrls: ['./main-page.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            navigation_service_1.NavigationService])
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNEU7QUFDNUUsOERBQTRFO0FBQzVFLHlFQUErRTtBQUMvRSwwRUFBd0U7QUFDeEUsOERBQTREO0FBQzVELHFIQUFxSDtBQUNySCw4REFBOEQ7QUFROUQ7SUFPRSwyQkFBcUIsSUFBZ0IsRUFDaEIsaUJBQW9DO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUN0RCxDQUFDO0lBRUosb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLCtDQUFrQixDQUFDLEtBQUssQ0FBQztJQUN4RCxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQzdELENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxxQ0FBUyxHQUFULFVBQVUsR0FBRztRQUNYLElBQUksR0FBRyxJQUFFLFdBQVcsRUFBQztZQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUFNLElBQUksR0FBRyxJQUFFLE9BQU8sRUFBQztZQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksR0FBRyxJQUFFLE1BQU0sRUFBQztZQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNsRDthQUFNLElBQUksR0FBRyxJQUFFLE1BQU0sRUFBQztZQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNoRDthQUNJLElBQUksR0FBRyxJQUFFLE9BQU8sRUFBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBRWxFLENBQUM7SUFwRGdDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjs4REFBQztJQUZ2RSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7WUFDeEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBUTBCLDBCQUFXO1lBQ0csc0NBQWlCO09BUjlDLGlCQUFpQixDQXVEN0I7SUFBRCx3QkFBQztDQUFBLEFBdkRELElBdURDO0FBdkRZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyLCBTaWRlRHJhd2VyTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlJztcclxuLy9pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbic7XHJcbi8vaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtbWFpbi1wYWdlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFpbi1wYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYWluLXBhZ2UuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYWluUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG4gIGljb25BZGQ6U3RyaW5nO1xyXG4gIGljb25sb2dvOlN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpXHJcbiAgIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaWNvbkFkZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlOWJkKTtcclxuICAgIHRoaXMuaWNvbmxvZ289IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlZTkyZSk7ICAgIFxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5kcmF3ZXIuZHJhd2VyTG9jYXRpb24gPSBTaWRlRHJhd2VyTG9jYXRpb24uUmlnaHQ7ICAgXHJcbiAgfVxyXG5cclxuICBzaG93U2xpZGVvdXQoKSB7XHJcbiAgICAgIHRoaXMuZHJhd2VyLm1haW5Db250ZW50LmNsYXNzTmFtZSA9ICdkcmF3ZXItY29udGVudC1pbic7XHJcbiAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIG9uRHJhd2VyQ2xvc2luZygpIHtcclxuICAgICAgdGhpcy5kcmF3ZXIubWFpbkNvbnRlbnQuY2xhc3NOYW1lID0gJ2RyYXdlci1jb250ZW50LW91dCc7XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlTWVudSgkZXZlbnQpe1xyXG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICB9XHJcblxyXG4gIG9uVGFiTWVudShhcmcpe1xyXG4gICAgaWYgKGFyZz09XCJzYWxlc2xpc3RcIil7XHJcbiAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10pO1xyXG4gICAgfSBlbHNlIGlmIChhcmc9PVwic2FsZXNcIil7XHJcbiAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzJ10pO1xyXG4gICAgfSBlbHNlIGlmIChhcmc9PVwiY3VzdFwiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvb2tjdXN0J10pO1xyXG4gICAgfSBlbHNlIGlmIChhcmc9PVwiaXRlbVwiKXtcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9sb29raXRlbSddKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFyZz09XCJkYWlseVwiKXtcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9kYWlseSddKTtcclxuICAgIH1cclxuICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgb25Mb2dPdXQoKXtcclxuICAgICAgdGhpcy5hdXRoLnNpZ25PdXQoKTsgICAgICBcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9sb2dpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==