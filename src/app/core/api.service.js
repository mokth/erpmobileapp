"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var APIService = /** @class */ (function () {
    function APIService(http) {
        this.http = http;
    }
    APIService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
