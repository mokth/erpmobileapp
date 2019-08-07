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
var application = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var MainPageComponent = /** @class */ (function () {
    function MainPageComponent(auth, page, navigationService) {
        this.auth = auth;
        this.page = page;
        this.navigationService = navigationService;
        this.page.actionBarHidden = true;
        //  console.log(screen.mainScreen.heightDIPs);
        //  console.log(screen.mainScreen.widthDIPs);
        //  console.log(screen.mainScreen.heightDIPs);
        //  console.log(screen.mainScreen.heightPixels);
    }
    MainPageComponent.prototype.ngOnInit = function () {
        this.iconAdd = String.fromCharCode(0xe9bd);
        this.iconlogo = String.fromCharCode(0xee92e);
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    MainPageComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this.drawer.drawerLocation = nativescript_ui_sidedrawer_1.SideDrawerLocation.Right;
    };
    MainPageComponent.prototype.ngAfterViewChecked = function () {
        // const topmostFrame: Frame = topmost();
        // var _actionbar = topmostFrame.currentPage.actionBar;
        //console.dir(topmostFrame);
        // console.dir(_actionbar);
        //actionbar.backgroundImage = new LinearGradient();
        //var navBar = controller.navigationBar;
        //navBar.shadowImage = new Image();
        //navBar.setBackgroundImageForBarMetrics(new Image(),null);
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
            this.navigationService.navigate(['/saleslist'], { animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "sales") {
            this.navigationService.navigate(['/sales']);
        }
        else if (arg == "cust") {
            this.navigationService.navigate(['/saleslist/lookcust']);
        }
        else if (arg == "item") {
            this.navigationService.navigate(['/master'], {
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "proddef") {
            this.navigationService.navigate(['/proddef'], {
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "proddef2") {
            this.navigationService.navigate(['/proddef2'], {
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "daily") {
            this.navigationService.navigate(['/daily'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "grn") {
            this.navigationService.navigate(['/grn'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "cycle") {
            this.navigationService.navigate(['/grn/cycle'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "cyclenolot") {
            this.navigationService.navigate(['/grn/cyclenolot'], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "setting") {
            this.navigationService.navigate(['/setting'], {
                animated: true,
                transition: {
                    name: 'flip',
                    duration: 1000,
                    curve: 'linear'
                }
            });
        }
        else if (arg == "Logout") {
            this.onLogOut();
        }
        this.drawer.closeDrawer();
    };
    MainPageComponent.prototype.onLogOut = function () {
        this.auth.signOut();
        this.navigationService.navigate(['/login'], {
            clearHistory: true,
            animated: true,
            transition: {
                name: 'flip',
                duration: 1000,
                curve: 'linear'
            }
        });
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
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            page_1.Page,
            navigation_service_1.NavigationService])
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsOERBQTRFO0FBQzVFLHlFQUErRTtBQUUvRSwwRUFBd0U7QUFDeEUsOERBQTREO0FBQzVELDBEQUE0RDtBQUM1RCxpREFBZ0Q7QUFRaEQ7SUFPRSwyQkFBcUIsSUFBZ0IsRUFDaEIsSUFBVSxFQUNWLGlCQUFvQztRQUZwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM3Qyw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDhDQUE4QztRQUM5QyxnREFBZ0Q7SUFDakQsQ0FBQztJQUVGLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN2QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUFTO2dCQUN2RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLCtDQUFrQixDQUFD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YUFDSSxJQUFJLEdBQUcsSUFBRSxRQUFRLEVBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDO1lBQ3pDLFlBQVksRUFBQyxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUNWO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQTVMZ0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOzhEQUFDO0lBRnZFLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FRMEIsMEJBQVc7WUFDVixXQUFJO1lBQ1Msc0NBQWlCO09BVDlDLGlCQUFpQixDQStMN0I7SUFBRCx3QkFBQztDQUFBLEFBL0xELElBK0xDO0FBL0xZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyLCBTaWRlRHJhd2VyTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XHJcblxyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1tYWluLXBhZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYWluLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21haW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFpblBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcclxuICBpY29uQWRkOlN0cmluZztcclxuICBpY29ubG9nbzpTdHJpbmc7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMpO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMpO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscyk7XHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTliZCk7XHJcbiAgICB0aGlzLmljb25sb2dvPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZWU5MmUpOyBcclxuICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XHJcbiAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSAgIFxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xyXG4gICAgdGhpcy5kcmF3ZXIuZHJhd2VyTG9jYXRpb24gPSBTaWRlRHJhd2VyTG9jYXRpb24uUmlnaHQ7ICAgXHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgIC8vIGNvbnN0IHRvcG1vc3RGcmFtZTogRnJhbWUgPSB0b3Btb3N0KCk7XHJcbiAgIC8vIHZhciBfYWN0aW9uYmFyID0gdG9wbW9zdEZyYW1lLmN1cnJlbnRQYWdlLmFjdGlvbkJhcjtcclxuICAgIC8vY29uc29sZS5kaXIodG9wbW9zdEZyYW1lKTtcclxuICAgLy8gY29uc29sZS5kaXIoX2FjdGlvbmJhcik7XHJcbiAgICAvL2FjdGlvbmJhci5iYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgTGluZWFyR3JhZGllbnQoKTtcclxuICAgIC8vdmFyIG5hdkJhciA9IGNvbnRyb2xsZXIubmF2aWdhdGlvbkJhcjtcclxuICAgIC8vbmF2QmFyLnNoYWRvd0ltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAvL25hdkJhci5zZXRCYWNrZ3JvdW5kSW1hZ2VGb3JCYXJNZXRyaWNzKG5ldyBJbWFnZSgpLG51bGwpO1xyXG4gICAgXHJcbiAgIH1cclxuXHJcbiAgc2hvd1NsaWRlb3V0KCkge1xyXG4gICAgICB0aGlzLmRyYXdlci5tYWluQ29udGVudC5jbGFzc05hbWUgPSAnZHJhd2VyLWNvbnRlbnQtaW4nO1xyXG4gICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBvbkRyYXdlckNsb3NpbmcoKSB7XHJcbiAgICAgIHRoaXMuZHJhd2VyLm1haW5Db250ZW50LmNsYXNzTmFtZSA9ICdkcmF3ZXItY29udGVudC1vdXQnO1xyXG4gIH1cclxuXHJcbiAgb25DbG9zZU1lbnUoJGV2ZW50KXtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBvblRhYk1lbnUoYXJnKXtcclxuICAgICAgaWYgKGFyZz09XCJzYWxlc2xpc3RcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSxcclxuICAgICAgICB7IGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgIH0gZWxzZSBpZiAoYXJnPT1cInNhbGVzXCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXMnXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJnPT1cImN1c3RcIil7XHJcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzbGlzdC9sb29rY3VzdCddKTtcclxuICAgICAgfSBlbHNlIGlmIChhcmc9PVwiaXRlbVwiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL21hc3RlciddLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cInByb2RkZWZcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9wcm9kZGVmJ10sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsIFxyXG4gICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLCBcclxuICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgICBjdXJ2ZTogJ2xpbmVhcidcclxuICAgICAgICAgICB9ICBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChhcmc9PVwicHJvZGRlZjJcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9wcm9kZGVmMiddLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImRhaWx5XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZGFpbHknXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLCBcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImdyblwiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2dybiddLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgdHJhbnNpdGlvbjogXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCwgXHJcbiAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImN5Y2xlXCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlJ10se1xyXG4gICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICBjdXJ2ZTogJ2xpbmVhcidcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFyZz09XCJjeWNsZW5vbG90XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlbm9sb3QnXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cInNldHRpbmdcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zZXR0aW5nJ10sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChhcmc9PVwiTG9nb3V0XCIpe1xyXG4gICAgICAgIHRoaXMub25Mb2dPdXQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBvbkxvZ091dCgpe1xyXG4gICAgICB0aGlzLmF1dGguc2lnbk91dCgpOyAgICAgIFxyXG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvZ2luJ10se1xyXG4gICAgICAgIGNsZWFySGlzdG9yeTp0cnVlLFxyXG4gICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgfSAgXHJcbiAgICAgIH0pO1xyXG4gICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==