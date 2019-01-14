"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var NavigationService = /** @class */ (function () {
    function NavigationService(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    NavigationService.prototype.navigate = function (commands, extras) {
        return this.routerExtensions.navigate(commands, extras);
    };
    NavigationService.prototype.back = function () {
        this.routerExtensions.back();
    };
    NavigationService.prototype.backToPreviousPage = function () {
        this.routerExtensions.backToPreviousPage();
    };
    NavigationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
    ], NavigationService);
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZEQUF3RDtBQUl4RDtJQUNJLDJCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFFcEQsb0NBQVEsR0FBZixVQUFnQixRQUFlLEVBQUUsTUFBNkM7UUFDMUUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sZ0NBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sOENBQWtCLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQWJRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUU2Qix1Q0FBZ0I7T0FEN0MsaUJBQWlCLENBYzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9ucy1sb2NhdGlvbi1zdHJhdGVneSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBuYXZpZ2F0ZShjb21tYW5kczogYW55W10sIGV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXMgJiBOYXZpZ2F0aW9uT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoY29tbWFuZHMsIGV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmFja1RvUHJldmlvdXNQYWdlKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxufSJdfQ==