webpackJsonp([0,4],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(519);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__journals_service__ = __webpack_require__(518);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__journals_service__["a"]; });


//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/index.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var AppConfig = (function () {
    function AppConfig() {
        this.apiURL = 'https://diare.herokuapp.com';
        this.devURL = 'http://localhost:4000';
    }
    return AppConfig;
}());

;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/app.config.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomepageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomepageComponent = (function () {
    function HomepageComponent() {
    }
    return HomepageComponent;
}());
HomepageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'homepage',
        template: __webpack_require__(695),
        styles: [__webpack_require__(683)]
    })
], HomepageComponent);

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/homepage.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JournalsPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JournalsPageComponent = (function () {
    function JournalsPageComponent(journalsService) {
        this.journalsService = journalsService;
        this.journals = ['Mindfulness', 'Work', 'CSGO'];
    }
    //Runs functions as soon as the page starts to load
    JournalsPageComponent.prototype.ngOnInit = function () {
        this.getJournals();
    };
    //Function to get all journals tied to a userid
    JournalsPageComponent.prototype.getJournals = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('currentUser'));
        var userid = user._id;
        this.journalsService.getAllJournals(userid)
            .subscribe(function (data) {
            _this.journals = JSON.parse(localStorage.getItem('userJournals'));
            console.log(_this.journals);
        }, function (error) {
            console.log("Getting journals failed:  " + error._body);
        });
    };
    return JournalsPageComponent;
}());
JournalsPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'journals-page',
        template: __webpack_require__(698),
        styles: [__webpack_require__(686)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */]) === "function" && _a || Object])
], JournalsPageComponent);

var _a;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/journals-page.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//Regex email validator
var emailValidator = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var RegisterComponent = (function () {
    function RegisterComponent(fb, userService, route, router) {
        this.fb = fb;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */];
        this.formErrors = {
            'email1': '',
            'email2': '',
            'password1': '',
            'password2': ''
        };
        this.validationMessages = {
            'email1': {
                'pattern': 'Email Address is not valid.',
                'required': 'Email Address is required.'
            },
            'email2': {
                'pattern': 'Confirm Email Address is not valid.',
                'required': 'Confirm Email Address is required.'
            },
            'password1': {
                'minlength': 'Password must be at least 8 characters long.',
                'required': 'Password is required.'
            },
            'password2': {
                'minlength': 'Password must be at least 8 characters long.',
                'required': 'Confirm Password is required.'
            }
        };
    }
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.user.email = this.registrationForm.value.email1;
        this.user.password = this.registrationForm.value.password1;
        this.user.admin = false;
        this.userService.create(this.user)
            .subscribe(function (data) {
            _this.registrationForm.reset();
            _this.router.navigate(['/home']);
        }, function (error) {
            console.log(error._body);
        });
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterComponent.prototype.buildForm = function () {
        var _this = this;
        this.registrationForm = this.fb.group({
            'email1': ['', [emailValidator, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]],
            'email2': ['', [emailValidator, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]],
            'password1': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]],
            'password2': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]]
        });
        this.registrationForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    RegisterComponent.prototype.onValueChanged = function (data) {
        if (!this.registrationForm) {
            return;
        }
        var form = this.registrationForm;
        for (var field in this.formErrors) {
            // clear any previous error messages
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'registration-form',
        template: __webpack_require__(700),
        styles: [__webpack_require__(688)],
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_index__["b" /* UserService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_index__["b" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_index__["b" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/register.component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 395;


/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(522);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/main.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/user.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JournalsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JournalsService = (function () {
    function JournalsService(http, config) {
        this.http = http;
        this.config = config;
    }
    //------------------------------------------------------------------------------------------------------------------------------
    // Creates new journal
    // Will return either an error or {id: journalID, message: string talking about how adding journal was successful}
    JournalsService.prototype.create = function (userid, title) {
        return this.http.post(this.config.apiURL + '/journals/create', { id: userid, title: title }, this.jwt())
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    //------------------------------------------------------------------------------------------------------------------------------
    // Gets all journals tied to a user id
    // Will load an array of journal objects into userJournals local storage item
    JournalsService.prototype.getAllJournals = function (userid) {
        return this.http.get(this.config.apiURL + '/journals/getAll/' + userid, this.jwt())
            .map(function (response) {
            var data = response.json();
            if (data) {
                // store array of journal objects in local storage
                localStorage.setItem('userJournals', JSON.stringify(data));
            }
        });
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Creates request header with JWT token - needed so that you can hit protected api routes
    JournalsService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        }
    };
    return JournalsService;
}());
JournalsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */]) === "function" && _b || Object])
], JournalsService);

var _a, _b;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/journals.service.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(http, config) {
        this.http = http;
        this.config = config;
    }
    //------------------------------------------------------------------------------------------------------------------------------
    //Logs user into website
    UserService.prototype.login = function (username, password) {
        return this.http.post(this.config.apiURL + '/users/authenticate', { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Logs user out of website
    UserService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Creates new user account
    UserService.prototype.create = function (user) {
        return this.http.post(this.config.apiURL + '/users/register', user, this.jwt());
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Creates request header with JWT token
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/user.service.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homepage_homepage_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__journals_page_journals_page_component__ = __webpack_require__(337);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var appRoutes = [
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_3__register_register_component__["a" /* RegisterComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__homepage_homepage_component__["a" /* HomepageComponent */] },
    { path: 'journals', component: __WEBPACK_IMPORTED_MODULE_4__journals_page_journals_page_component__["a" /* JournalsPageComponent */] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/app-routing.module.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'DIARE';
    }
    AppComponent.prototype.userLoggedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else {
            return false;
        }
    };
    AppComponent.prototype.userLoggedOut = function () {
        if (!(localStorage.getItem('currentUser'))) {
            return true;
        }
        else {
            return false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(694),
        styles: [__webpack_require__(682)]
    })
], AppComponent);

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/app.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__homepage_homepage_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__homepage_login_login_component__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__register_register_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__journals_page_journals_page_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__journals_page_add_journal_add_journal_component__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__journals_page_user_journal_user_journal_component__ = __webpack_require__(525);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__homepage_homepage_component__["a" /* HomepageComponent */],
            __WEBPACK_IMPORTED_MODULE_8__homepage_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_9__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_10__journals_page_journals_page_component__["a" /* JournalsPageComponent */],
            __WEBPACK_IMPORTED_MODULE_11__journals_page_add_journal_add_journal_component__["a" /* AddJournalComponent */],
            __WEBPACK_IMPORTED_MODULE_12__journals_page_user_journal_user_journal_component__["a" /* UserJournalComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* AppConfig */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/app.module.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Regex email validator
var emailValidator = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var LoginComponent = (function () {
    function LoginComponent(fb, userService, route, router) {
        this.fb = fb;
        this.userService = userService;
        this.route = route;
        this.router = router;
        //------------------------------------------------------------------------------------------------------------------------------
        this.formErrors = {
            'email': '',
            'password': ''
        };
        this.validationMessages = {
            'email': {
                'pattern': 'Email Address is not valid.',
                'required': 'Email Address is required.'
            },
            'password': {
                'required': 'Password is required.'
            }
        };
    }
    //------------------------------------------------------------------------------------------------------------------------------
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.userService.logout();
        //create login form
        this.buildForm();
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Build the login form
    LoginComponent.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.fb.group({
            'email': ['', [emailValidator, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]]
        });
        this.loginForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Validate form if any form values changed
    LoginComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear any previous error messages
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Submit login data to backend, act accordingly for success or failure response
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(function (data) {
            _this.router.navigate(['/journals']);
        }, function (error) {
            console.log("Login failed:  " + error._body);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'login-form',
        template: __webpack_require__(696),
        styles: [__webpack_require__(684)],
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_index__["b" /* UserService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_index__["b" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_index__["b" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/login.component.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(152);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddJournalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddJournalComponent = (function () {
    function AddJournalComponent(journalsService) {
        this.journalsService = journalsService;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.userid = this.user._id;
    }
    //------------------------------------------------------------------------------------------------------------------------------
    //Adds journal to database, tied to user's id
    AddJournalComponent.prototype.addJournal = function (newTitle) {
        var _this = this;
        this.journalsService.create(this.userid, newTitle)
            .subscribe(function (data) {
            console.log(data.message);
            console.log("ID of new journal:  " + data.id);
            //update journals in local storage
            _this.getJournals();
        }, function (error) {
            console.log("Adding journal failed:  " + error._body);
        });
    };
    //------------------------------------------------------------------------------------------------------------------------------
    //Gets all journals tied to a userid
    AddJournalComponent.prototype.getJournals = function () {
        this.journalsService.getAllJournals(this.userid)
            .subscribe(function (data) {
            //output updated local storage
            console.log(JSON.parse(localStorage.getItem('userJournals')));
        }, function (error) {
            console.log("Getting journals failed:  " + error._body);
        });
    };
    return AddJournalComponent;
}());
AddJournalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'add-journal',
        template: __webpack_require__(697),
        styles: [__webpack_require__(685)],
        providers: [__WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* JournalsService */]) === "function" && _a || Object])
], AddJournalComponent);

var _a;
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/add-journal.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserJournalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserJournalComponent = (function () {
    function UserJournalComponent() {
    }
    UserJournalComponent.prototype.ngOnInit = function () {
    };
    return UserJournalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Input */])(),
    __metadata("design:type", String)
], UserJournalComponent.prototype, "journal", void 0);
UserJournalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'user-journal',
        template: __webpack_require__(699),
        styles: [__webpack_require__(687)]
    }),
    __metadata("design:paramtypes", [])
], UserJournalComponent);

//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/user-journal.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/environment.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=D:/OneDrive/Documents/Projects/D.I.A.R.E/src/angular2-client/src/polyfills.js.map

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ":host .navbar {\r\n\tmargin-bottom: 0;\r\n}\r\n\r\n.white-icon {\r\n  color: #d7efec;\r\n}\r\n\r\n#search-li {\r\n  margin-right: 30px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 684:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ".center-login {\r\n  padding-top: 30px;\r\n  float: none;\r\n  margin: 0 auto;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ":host form {\r\n\tpadding-top: 5px;\r\n\ttext-align: center;\r\n}\r\n\r\n:host form .form-group {\r\n\ttext-align: left;\r\n}\r\n\r\n:host form .form-group input {\r\n\tcolor: #fff;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ":host {\r\n\tposition: absolute;\r\n\ttop: 50px;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tdisplay: block;\r\n}\r\n\r\n@media only screen and (min-width : 768px) {\r\n\t:host {\r\n\t\ttop: 57px;\r\n\t}\r\n}\r\n\r\n@media only screen and (min-width : 1200px) {\r\n\t:host {\r\n\t\ttop: 63px;\r\n\t}\r\n}\r\n\r\n:host .sidebar {\r\n\tposition: relative;\r\n\tdisplay: block;\r\n\twidth: 350px;\r\n\theight: 100%;\r\n\tpadding: 0 15px;\r\n\tbackground-color: #343a40;\r\n\t-webkit-transition: ease-out 0.3s width;\r\n\ttransition: ease-out 0.3s width;\r\n}\r\n\r\n:host .sidebar h1 {\r\n\tpadding-top: 20px;\r\n\tpadding-bottom: 12px;\r\n\tmargin: 0;\r\n\tfont-size: 22px;\r\n\tcolor: white;\r\n}\r\n\r\n:host .sidebar ul {\r\n\tpadding: 0;\r\n}\r\n\r\n:host .sidebar .sidebar-footer {\r\n\tposition: absolute;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tfont-size: 15px;\r\n\tcolor: white;\r\n\ttext-align: center;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ":host {\r\n\tdisplay: block;\r\n\tpadding: 12px;\r\n\tmargin-bottom: 10px;\r\n\tbackground-color: #464b50;\r\n}\r\n\r\n:host p {\n\tdisplay: inline-block;\r\n\tmargin: 0;\r\n\tfont-size: 18px;\r\r\n\tline-height: 35px;\r\n\tcolor: white;\r\n}\r\n\r\n:host .options {\r\n\tfloat: right;\r\n\tline-height: 35px;\r\n}\r\n\r\n:host .options i {\r\n\tcolor: grey;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)();
// imports


// module
exports.push([module.i, ".center-register {\r\n  padding-top: 30px;\r\n  float: none;\r\n  margin: 0 auto;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\r\n  <div class=\"navbar navbar-default\">\r\n    <div class=\"container-fluid\">\r\n      <!-- Mobile screen navigation button -->\r\n      <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse\">\r\n\t        <span class=\"icon-bar\"></span>\r\n\t        <span class=\"icon-bar\"></span>\r\n\t        <span class=\"icon-bar\"></span>\r\n\t\t\t\t</button>\r\n        <a routerLink=\"/journals\" routerLinkActive=\"active\" class=\"navbar-brand\" *ngIf=\"userLoggedIn()\">{{ title }}</a>\r\n        <a routerLink=\"/home\" routerLinkActive=\"active\" class=\"navbar-brand\" *ngIf=\"userLoggedOut()\">{{ title }}</a>\r\n      </div>\r\n\r\n      <!-- Items in Navbar -->\r\n      <div class=\"navbar-collapse collapse navbar-responsive-collapse\">\r\n        <ul class=\"nav navbar-nav navbar-right\" *ngIf=\"userLoggedIn()\">\r\n          <li id=\"search-li\">\r\n            <form class=\"navbar-form\">\r\n              <div class=\"form-group form-group-lg\">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-addon\"><i class=\"material-icons white-icon\">search</i></span>\r\n                  <input type=\"text\" class=\"form-control col-sm-8\" id=\"search-bar\" placeholder=\"Search\">\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </li>\r\n          <li class=\"active\"><a routerLink=\"/journals\" routerLinkActive=\"active\">Journals</a></li>\r\n          <li><a href=\"javascript:void(0)\">About</a></li>\r\n\r\n          <li class=\"dropdown\">\r\n            <a href=\"javascript:void(0)\" class=\"dropdown-toggle\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n              User Account<b class=\"caret\"></b>\r\n            </a>\r\n\r\n            <ul class=\"dropdown-menu\" id=\"dropdownMenu1\">\r\n              <li><a routerLink=\"/home\" routerLinkActive=\"active\">Logout</a></li>\r\n              <li><a href=\"javascript:void(0)\">Account Settings</a></li>\r\n            </ul>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\r\n<!-- Needed in order for Angular2 Routing to work. ****************************************************************************-->\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<login-form></login-form>\r\n"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-12 col-sm-6 col-md-5 col-lg-4 center-login\">\r\n\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Login</h3>\r\n        </div>\r\n\r\n        <div class=\"panel-body\">\r\n          <form [formGroup]=\"loginForm\"  (ngSubmit)=\"onSubmit()\">\r\n\r\n            <!-- Email Input **************************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"email\" class=\"control-label\">Email Address *</label>\r\n\r\n              <input name=\"email\" type=\"text\" class=\"form-control\" formControlName=\"email\" id=\"email\">\r\n\r\n              <div *ngIf=\"formErrors.email\" class=\"formInputError\">\r\n                {{ formErrors.email }}\r\n              </div>\r\n            </div>\r\n            <!-- Password Input ***********************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"password\" class=\"control-label\">Password *</label>\r\n\r\n              <input name=\"password\" type=\"password\" class=\"form-control\" formControlName=\"password\" id=\"password\">\r\n\r\n              <div *ngIf=\"formErrors.password\" class=\"formInputError\">\r\n                {{ formErrors.password }}\r\n              </div>\r\n            </div>\r\n            <!-- Submit Button ************************************************************************************************-->\r\n            <div class=\"text-center\">\r\n              <button class=\"btn btn-raised btn-primary\" type=\"submit\" [disabled]=\"!loginForm.valid\">Submit</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n\r\n        <!-- New User Footer **********************************************************************************************-->\r\n        <div class=\"panel-footer\">\r\n          <div class=\"text-center\">\r\n            <a routerLink=\"/register\" routerLinkActive=\"active\" class=\"btn btn-primary\">New user? Register here.</a>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<form>\r\n\t<div class=\"form-group label-floating is-empty\">\r\n\t\t<label for=\"title\" class=\"control-label\" >Journal Title</label>\r\n\t\t<input type=\"string\" name=\"title\" class=\"form-control\" #newTitle>\r\n\t</div>\r\n\r\n\t<button class=\"btn btn-raised btn-primary\" (click)=\"addJournal(newTitle.value)\">\r\n\t\tCreate Journal\r\n\t</button>\r\n</form>\r\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<aside class=\"sidebar\">\r\n\t<div class=\"sidebar-container\">\r\n\t\t<h1>My Journals</h1>\r\n\t\t<ul>\r\n\t\t\t<user-journal\r\n\t\t\t\t*ngFor=\"let individual_journal of journals\"\r\n\t\t\t\t[journal] = \"individual_journal\">\r\n\t\t\t</user-journal>\r\n\t\t</ul>\r\n\r\n\t\t<add-journal></add-journal>\r\n\t</div>\r\n\t<div class=\"sidebar-footer\">\r\n\t\t<p>Some sort of footer message</p>\r\n\t</div>\r\n</aside>\r\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<p>{{journal['title']}}</p>\r\n<div class=\"dropdown options\">\r\n\t<a href=\"javascript:void(0)\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n\t\t<i class=\"material-icons\">more_vert</i>\r\n\t</a>\r\n\t<ul class=\"dropdown-menu dropdown-menu-right\">\r\n\t\t<li><a href=\"javascript:void(0)\">Delete</a></li>\r\n\t</ul>\r\n</div>\r\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-12 col-sm-6 col-md-5 col-lg-4 center-register\">\r\n\r\n      <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">\r\n          <h3 class=\"panel-title\">Register</h3>\r\n        </div>\r\n\r\n        <div class=\"panel-body\">\r\n          <form [formGroup]=\"registrationForm\"  (ngSubmit)=\"onSubmit()\">\r\n\r\n            <!-- Email 1 Input ************************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"email1\" class=\"control-label\">Email Address *</label>\r\n\r\n              <input name=\"email1\" type=\"text\" class=\"form-control\" formControlName=\"email1\" id=\"email1\">\r\n\r\n              <div *ngIf=\"formErrors.email1\" class=\"formInputError\">\r\n                {{ formErrors.email1 }}\r\n              </div>\r\n\r\n            </div>\r\n            <!-- Email 2 Input ************************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"email2\" class=\"control-label\">Confirm Email Address *</label>\r\n\r\n              <input name=\"email2\" type=\"text\" class=\"form-control\" formControlName=\"email2\" id=\"email2\">\r\n\r\n              <div *ngIf=\"formErrors.email2\" class=\"formInputError\">\r\n                {{ formErrors.email2 }}\r\n              </div>\r\n\r\n            </div>\r\n            <!-- Password 1 Input *********************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"password1\" class=\"control-label\">Password *</label>\r\n\r\n              <input name=\"password1\" type=\"password\" class=\"form-control\" formControlName=\"password1\" id=\"password1\">\r\n\r\n              <div *ngIf=\"formErrors.password1\" class=\"formInputError\">\r\n                {{ formErrors.password1 }}\r\n              </div>\r\n\r\n            </div>\r\n            <!-- Password 2 Input *********************************************************************************************-->\r\n            <div class=\"form-group label-floating\">\r\n              <label for=\"password2\" class=\"control-label\">Confirm Password *</label>\r\n\r\n              <input name=\"password2\" type=\"password\" class=\"form-control\" formControlName=\"password2\" id=\"password2\">\r\n\r\n              <div *ngIf=\"formErrors.password2\" class=\"formInputError\">\r\n                {{ formErrors.password2 }}\r\n              </div>\r\n\r\n            </div>\r\n            <!-- Submit Button ************************************************************************************************-->\r\n            <div class=\"text-center\">\r\n              <button class=\"btn btn-raised btn-primary\" type=\"submit\" [disabled]=\"!registrationForm.valid\">Submit</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 721:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(400);


/***/ })

},[721]);
//# sourceMappingURL=main.bundle.js.map