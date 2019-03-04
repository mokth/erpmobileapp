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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNEU7QUFDNUUsOERBQTRFO0FBQzVFLHlFQUErRTtBQUMvRSwwRUFBd0U7QUFDeEUsOERBQTREO0FBQzVELHFIQUFxSDtBQUNySCw4REFBOEQ7QUFROUQ7SUFPRSwyQkFBcUIsSUFBZ0IsRUFDaEIsaUJBQW9DO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUN0RCxDQUFDO0lBRUosb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLCtDQUFrQixDQUFDLEtBQUssQ0FBQztJQUN4RCxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQzdELENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENB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RSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQXhIZ0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOzhEQUFDO0lBRnZFLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FRMEIsMEJBQVc7WUFDRyxzQ0FBaUI7T0FSOUMsaUJBQWlCLENBMkg3QjtJQUFELHdCQUFDO0NBQUEsQUEzSEQsSUEySEM7QUEzSFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhcic7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIsIFNpZGVEcmF3ZXJMb2NhdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xyXG4vL2ltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uJztcclxuLy9pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1tYWluLXBhZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYWluLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21haW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFpblBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcclxuICBpY29uQWRkOlN0cmluZztcclxuICBpY29ubG9nbzpTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKVxyXG4gICB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTliZCk7XHJcbiAgICB0aGlzLmljb25sb2dvPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZWU5MmUpOyAgICBcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcclxuICAgIHRoaXMuZHJhd2VyLmRyYXdlckxvY2F0aW9uID0gU2lkZURyYXdlckxvY2F0aW9uLlJpZ2h0OyAgIFxyXG4gIH1cclxuXHJcbiAgc2hvd1NsaWRlb3V0KCkge1xyXG4gICAgICB0aGlzLmRyYXdlci5tYWluQ29udGVudC5jbGFzc05hbWUgPSAnZHJhd2VyLWNvbnRlbnQtaW4nO1xyXG4gICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBvbkRyYXdlckNsb3NpbmcoKSB7XHJcbiAgICAgIHRoaXMuZHJhd2VyLm1haW5Db250ZW50LmNsYXNzTmFtZSA9ICdkcmF3ZXItY29udGVudC1vdXQnO1xyXG4gIH1cclxuXHJcbiAgb25DbG9zZU1lbnUoJGV2ZW50KXtcclxuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgfVxyXG5cclxuICBvblRhYk1lbnUoYXJnKXtcclxuICAgICAgaWYgKGFyZz09XCJzYWxlc2xpc3RcIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QnXSxcclxuICAgICAgICB7IGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGFyZz09XCJzYWxlc1wiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzJ10pO1xyXG4gICAgICB9IGVsc2UgaWYgKGFyZz09XCJjdXN0XCIpe1xyXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3QvbG9va2N1c3QnXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJnPT1cIml0ZW1cIil7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYXN0ZXInXSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImRhaWx5XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZGFpbHknXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZsaXAnLCBcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImdyblwiKXtcclxuICAgICAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL2dybiddLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgdHJhbnNpdGlvbjogXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMCwgXHJcbiAgICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cImN5Y2xlXCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlJ10se1xyXG4gICAgICAgICAgY2xlYXJIaXN0b3J5OnRydWUsXHJcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLCBcclxuICAgICAgICAgICAgICBjdXJ2ZTogJ2xpbmVhcidcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGFyZz09XCJjeWNsZW5vbG90XCIpe1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvZ3JuL2N5Y2xlbm9sb3QnXSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLCBcclxuICAgICAgICAgIHRyYW5zaXRpb246IFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdmbGlwJywgXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIFxyXG4gICAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoYXJnPT1cIkxvZ291dFwiKXtcclxuICAgICAgICB0aGlzLm9uTG9nT3V0KCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgb25Mb2dPdXQoKXtcclxuICAgICAgdGhpcy5hdXRoLnNpZ25PdXQoKTsgICAgICBcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9sb2dpbiddLHtcclxuICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcclxuICAgICAgICBhbmltYXRlZDogdHJ1ZSwgXHJcbiAgICAgICAgdHJhbnNpdGlvbjogXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZmxpcCcsIFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMCwgXHJcbiAgICAgICAgICAgIGN1cnZlOiAnbGluZWFyJ1xyXG4gICAgICAgIH0gIFxyXG4gICAgICB9KTtcclxuICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=