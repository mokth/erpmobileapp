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
var frame_1 = require("tns-core-modules/ui/frame");
var MainPageComponent = /** @class */ (function () {
    function MainPageComponent(auth, navigationService) {
        this.auth = auth;
        this.navigationService = navigationService;
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
        var topmostFrame = frame_1.topmost();
        var actionbar = topmostFrame.android.actionBar;
        actionbar.color = new frame_1.Color('#000000');
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
            this.navigationService.navigate(['/master']);
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
            navigation_service_1.NavigationService])
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsOERBQTRFO0FBQzVFLHlFQUErRTtBQUUvRSwwRUFBd0U7QUFDeEUsOERBQTREO0FBQzVELDBEQUE0RDtBQUM1RCxtREFBa0U7QUFRbEU7SUFPRSwyQkFBcUIsSUFBZ0IsRUFFaEIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFFaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUV2RCw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDhDQUE4QztRQUM5QyxnREFBZ0Q7SUFDakQsQ0FBQztJQUVGLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN2QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUFTO2dCQUN2RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLCtDQUFrQixDQUFDLEtBQUssQ0FBQztJQUV4RCxDQUFDO0lBRUQsOENBQWtCLEdBQWxCO1FBQ0UsSUFBTSxZQUFZLEdBQVUsZUFBTyxFQUFFLENBQUM7UUFDdEMs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QUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FRMEIsMEJBQVc7WUFFRyxzQ0FBaUI7T0FUOUMsaUJBQWlCLENBNko3QjtJQUFELHdCQUFDO0NBQUEsQUE3SkQsSUE2SkM7QUE3SlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhcic7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIsIFNpZGVEcmF3ZXJMb2NhdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcclxuXHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XHJcbmltcG9ydCB7IEZyYW1lLCB0b3Btb3N0LCBDb2xvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLW1haW4tcGFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21haW4tcGFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFpbi1wYWdlLmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLnRvU3RyaW5nKCksXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYWluUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xyXG4gIGljb25BZGQ6U3RyaW5nO1xyXG4gIGljb25sb2dvOlN0cmluZztcclxuICBcclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSl7XHJcbiAgIFxyXG4gICAgLy8gIGNvbnNvbGUubG9nKHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMpO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzKTtcclxuICAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaWNvbkFkZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlOWJkKTtcclxuICAgIHRoaXMuaWNvbmxvZ289IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlZTkyZSk7IFxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9ICAgXHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XHJcbiAgICB0aGlzLmRyYXdlci5kcmF3ZXJMb2NhdGlvbiA9IFNpZGVEcmF3ZXJMb2NhdGlvbi5SaWdodDsgICBcclxuICAgXHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICBjb25zdCB0b3Btb3N0RnJhbWU6IEZyYW1lID0gdG9wbW9zdCgpO1xyXG4gICAgdmFyIGFjdGlvbmJhciA9IHRvcG1vc3RGcmFtZS5hbmRyb2lkLmFjdGlvbkJhcjtcclxuICAgIGFjdGlvbmJhci5jb2xvcj0gbmV3IENvbG9yKCcjMDAwMDAwJyk7XHJcbiAgICAvL3ZhciBuYXZCYXIgPSBjb250cm9sbGVyLm5hdmlnYXRpb25CYXI7XHJcbiAgICAvL25hdkJhci5zaGFkb3dJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgLy9uYXZCYXIuc2V0QmFja2dyb3VuZEltYWdlRm9yQmFyTWV0cmljcyhuZXcgSW1hZ2UoKSxudWxsKTtcclxuICAgIFxyXG4gICB9XHJcblxyXG4gIHNob3dTbGlkZW91dCgpIHtcclxuICAgICAgdGhpcy5kcmF3ZXIubWFpbkNvbnRlbnQuY2xhc3NOYW1lID0gJ2RyYXdlci1jb250ZW50LWluJztcclxuICAgICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgb25EcmF3ZXJDbG9zaW5nKCkge1xyXG4gICAgICB0aGlzLmRyYXdlci5tYWluQ29udGVudC5jbGFzc05hbWUgPSAnZHJhd2VyLWNvbnRlbnQtb3V0JztcclxuICB9XHJcblxyXG4gIG9uQ2xvc2VNZW51KCRldmVudCl7XHJcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gIH1cclxuXHJcbiAgb25UYWJNZW51KGFyZyl7XHJcbiAgICAgIGlmIChhcmc9PVwic2FsZXNsaXN0XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXNsaXN0J10sXHJcbiAgICAgICAgeyBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICBjdXJ2ZTogJ2xpbmVhcidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICB9IGVsc2UgaWYgKGFyZz09XCJzYWxlc1wiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzJ10pO1xyXG4gICAgICB9IGVsc2UgaWYgKGFyZz09XCJjdXN0XCIpe1xyXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QvbG9va2N1c3QnXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJnPT1cIml0ZW1cIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYXN0ZXInXSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImRhaWx5XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZGFpbHknXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLCBcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImdyblwiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2dybiddLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgdHJhbnNpdGlvbjogXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCwgXHJcbiAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImN5Y2xlXCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlJ10se1xyXG4gICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICBjdXJ2ZTogJ2xpbmVhcidcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFyZz09XCJjeWNsZW5vbG90XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlbm9sb3QnXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cInNldHRpbmdcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zZXR0aW5nJ10sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChhcmc9PVwiTG9nb3V0XCIpe1xyXG4gICAgICAgIHRoaXMub25Mb2dPdXQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBvbkxvZ091dCgpe1xyXG4gICAgICB0aGlzLmF1dGguc2lnbk91dCgpOyAgICAgIFxyXG4gICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2xvZ2luJ10se1xyXG4gICAgICAgIGNsZWFySGlzdG9yeTp0cnVlLFxyXG4gICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgY3VydmU6ICdsaW5lYXInXHJcbiAgICAgICAgfSAgXHJcbiAgICAgIH0pO1xyXG4gICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==