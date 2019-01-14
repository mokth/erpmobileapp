"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var navigation_service_1 = require("../core/services/navigation.service");
var auth_service_1 = require("../core/services/auth-service");
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
        this.drawer.closeDrawer();
    };
    MainPageComponent.prototype.onLogOut = function () {
        this.auth.signOut();
        this.navigationService.navigate(['/login']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsOERBQTRFO0FBQzVFLHlFQUErRTtBQUMvRSwwRUFBd0U7QUFDeEUsOERBQTREO0FBVTVEO0lBT0UsMkJBQXFCLElBQWdCLEVBQ2hCLGlCQUFvQztRQURwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDdEQsQ0FBQztJQUVKLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRywrQ0FBa0IsQ0FBQyxLQUFLLENBQUM7SUFDMUQsQ0FBQztJQUVDLHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztJQUM3RCxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLE1BQU07UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLEdBQUc7UUFDWCxJQUFJLEdBQUcsSUFBRSxXQUFXLEVBQUM7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDakQ7YUFBTSxJQUFJLEdBQUcsSUFBRSxPQUFPLEVBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDOUM7YUFBTSxJQUFJLEdBQUcsSUFBRSxNQUFNLEVBQUM7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7YUFBTSxJQUFJLEdBQUcsSUFBRSxNQUFNLEVBQUM7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBaERnQztRQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDO2tDQUF5QixnQ0FBc0I7OERBQUM7SUFGdkUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQVEwQiwwQkFBVztZQUNHLHNDQUFpQjtPQVI5QyxpQkFBaUIsQ0FtRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyLCBTaWRlRHJhd2VyTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbWFpbi1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21haW4tcGFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21haW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIE1haW5QYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuICBpY29uQWRkOlN0cmluZztcbiAgaWNvbmxvZ286U3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSlcbiAgIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaWNvbkFkZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlOWJkKTtcbiAgICB0aGlzLmljb25sb2dvPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZWU5MmUpOyAgICBcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgdGhpcy5kcmF3ZXIuZHJhd2VyTG9jYXRpb24gPSBTaWRlRHJhd2VyTG9jYXRpb24uUmlnaHQ7XG59XG5cbiAgc2hvd1NsaWRlb3V0KCkge1xuICAgICAgdGhpcy5kcmF3ZXIubWFpbkNvbnRlbnQuY2xhc3NOYW1lID0gJ2RyYXdlci1jb250ZW50LWluJztcbiAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgfVxuXG4gIG9uRHJhd2VyQ2xvc2luZygpIHtcbiAgICAgIHRoaXMuZHJhd2VyLm1haW5Db250ZW50LmNsYXNzTmFtZSA9ICdkcmF3ZXItY29udGVudC1vdXQnO1xuICB9XG5cbiAgb25DbG9zZU1lbnUoJGV2ZW50KXtcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICB9XG5cbiAgb25UYWJNZW51KGFyZyl7XG4gICAgaWYgKGFyZz09XCJzYWxlc2xpc3RcIil7XG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdCddKTtcbiAgICB9IGVsc2UgaWYgKGFyZz09XCJzYWxlc1wiKXtcbiAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzJ10pO1xuICAgIH0gZWxzZSBpZiAoYXJnPT1cImN1c3RcIil7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2N1c3QnXSk7XG4gICAgfSBlbHNlIGlmIChhcmc9PVwiaXRlbVwiKXtcbiAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbG9va2l0ZW0nXSk7XG4gICAgfVxuICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9ICAgIFxuXG4gICAgb25Mb2dPdXQoKXtcbiAgICAgIHRoaXMuYXV0aC5zaWduT3V0KCk7ICAgICAgXG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgIH1cbn1cbiJdfQ==