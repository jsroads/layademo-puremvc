(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["log4ts"] = factory();
    else
        root["log4ts"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// identity function for calling harmony imports with the correct context
        /******/ 	__webpack_require__.i = function(value) { return value; };
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if(!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, {
                    /******/ 				configurable: false,
                    /******/ 				enumerable: true,
                    /******/ 				get: getter
                    /******/ 			});
                /******/ 		}
            /******/ 	};
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function(module) {
            /******/ 		var getter = module && module.__esModule ?
                /******/ 			function getDefault() { return module['default']; } :
                /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 8);
        /******/ })
    /************************************************************************/
    /******/ ([
        /* 0 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var LogLevel;
            (function (LogLevel) {
                LogLevel[LogLevel["ALL"] = 0] = "ALL";
                LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
                LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
                LogLevel[LogLevel["INFO"] = 3] = "INFO";
                LogLevel[LogLevel["WARN"] = 4] = "WARN";
                LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
                LogLevel[LogLevel["FATAL"] = 6] = "FATAL";
                LogLevel[LogLevel["OFF"] = 7] = "OFF";
            })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
            function logLevelToString(level) {
                return LogLevel[level];
            }
            exports.logLevelToString = logLevelToString;


            /***/ }),
        /* 1 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var LogLevel_1 = __webpack_require__(0);
            var BasicLayout_1 = __webpack_require__(3);
            var ConsoleAppender_1 = __webpack_require__(2);
            var LoggerConfig = /** @class */ (function () {
                function LoggerConfig(appender, level, tag) {
                    if (level === void 0) { level = LogLevel_1.LogLevel.INFO; }
                    if (appender) {
                        this.addAppender(appender);
                        this.level = level;
                        this.tag = tag;
                    }
                }
                LoggerConfig.createFromJson = function (json) {
                    var config = new LoggerConfig(null, LogLevel_1.LogLevel[json.level], json.tag);
                    for (var _i = 0, _a = json.layouts; _i < _a.length; _i++) {
                        var layout_json = _a[_i];
                        var layout = void 0;
                        switch (layout_json.type) {
                            case "basic":
                                layout = new BasicLayout_1["default"]();
                                break;
                            case "html":
                                break;
                        }
                        var appender_json = layout_json.appender;
                        var appender = void 0;
                        switch (appender_json.type) {
                            case "console":
                                appender = new ConsoleAppender_1["default"]();
                                break;
                            case "dom":
                                break;
                        }
                        appender.setLayout(layout);
                        config.addAppender(appender);
                    }
                    return config;
                };
                LoggerConfig.prototype.addAppender = function (appender) {
                    this.appender = (appender);
                };
                LoggerConfig.prototype.setLevel = function (level) {
                    this.level = level;
                };
                LoggerConfig.prototype.getAppender = function () {
                    return this.appender;
                };
                LoggerConfig.prototype.getLevel = function () {
                    return this.level;
                };
                LoggerConfig.prototype.hasTag = function (tag) {
                    if (!this.tag)
                        return true;
                    if (this.tag === tag) {
                        return true;
                    }
                    return false;
                };
                return LoggerConfig;
            }());
            exports["default"] = LoggerConfig;


            /***/ }),
        /* 2 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            var __extends = (this && this.__extends) || (function () {
                var extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() { this.constructor = d; }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            })();
            exports.__esModule = true;
            var BaseAppender_1 = __webpack_require__(7);
            var LogLevel_1 = __webpack_require__(0);
            var LogColor_1 = __webpack_require__(5);
            var ConsoleAppender = /** @class */ (function (_super) {
                __extends(ConsoleAppender, _super);
                function ConsoleAppender(console) {
                    var _this = _super.call(this) || this;
                    _this.console = console;
                    return _this;
                }
                ConsoleAppender.prototype.append = function (entry) {
                    if (entry.useColor) {
                        var color = "#0000000";
                        switch (entry.level) {
                            case LogLevel_1.LogLevel.ERROR:
                                color = LogColor_1.LogColor.ERROR;
                                break;
                            case LogLevel_1.LogLevel.TRACE:
                                color = LogColor_1.LogColor.TRACE;
                                break;
                            case LogLevel_1.LogLevel.INFO:
                                color = LogColor_1.LogColor.INFO;
                                break;
                            case LogLevel_1.LogLevel.WARN:
                                color = LogColor_1.LogColor.WARN;
                                break;
                            case LogLevel_1.LogLevel.DEBUG:
                                color = LogColor_1.LogColor.DEBUG;
                                break;
                            case LogLevel_1.LogLevel.FATAL:
                                color = LogColor_1.LogColor.FATAL;
                                break;
                            default:
                        }
                        this.getConsole().log('%c' + this.layout.format(entry), 'color:' + color);
                    }
                    else {
                        this.getConsole().log(this.layout.format(entry));
                    }
                };
                ConsoleAppender.prototype.clear = function () {
                    this.getConsole().clear();
                };
                ConsoleAppender.prototype.getConsole = function () {
                    return this.console || console;
                };
                return ConsoleAppender;
            }(BaseAppender_1["default"]));
            exports["default"] = ConsoleAppender;


            /***/ }),
        /* 3 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var LogLevel_1 = __webpack_require__(0);
            /**
             * Simple layout, that formats logs as
             * "{time} {level} [{tag}] - {message}"
             */
            var BasicLayout = /** @class */ (function () {
                function BasicLayout() {
                }
                BasicLayout.prototype.format = function (entry) {
                    return this.formatDate(entry.time) + ' ' + LogLevel_1.logLevelToString(entry.level) + ' [' + entry.tag + '] - ' + entry.message;
                };
                BasicLayout.prototype.formatDate = function (date) {
                    function pad(number) {
                        if (number < 10) {
                            return '0' + number;
                        }
                        return number;
                    }
                    return date.getFullYear() +
                        '-' + pad(date.getMonth() + 1) +
                        '-' + pad(date.getDate()) +
                        ' ' + pad(date.getHours()) +
                        ':' + pad(date.getMinutes()) +
                        ':' + pad(date.getSeconds());
                };
                return BasicLayout;
            }());
            exports["default"] = BasicLayout;


            /***/ }),
        /* 4 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var LoggerConfig_1 = __webpack_require__(1);
            var LogLevel_1 = __webpack_require__(0);
            var Utils_1 = __webpack_require__(6);
            var Logger = /** @class */ (function () {
                function Logger(tag, useColor) {
                    this.tag = tag;
                    this.useColor = useColor;
                }
                Logger.setConfig = function (config) {
                    Logger.config = config;
                };
                Logger.getLogger = function (tag) {
                    if (!tag) {
                        return Logger.getLogger('undefined');
                    }
                    if (Logger.loggers[tag]) {
                        return Logger.loggers[tag];
                    }
                    else {
                        return Logger.loggers[tag] = new Logger(tag);
                    }
                };
                Logger.prototype.log = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.INFO, message, object, deep);
                };
                Logger.prototype.info = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.INFO, message, object, deep);
                };
                Logger.prototype.fatal = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.FATAL, message, object, deep);
                };
                Logger.prototype.error = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.ERROR, message, object, deep);
                };
                Logger.prototype.debug = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.DEBUG, message, object, deep);
                };
                Logger.prototype.warn = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.WARN, message, object, deep);
                };
                Logger.prototype.trace = function (message, object, deep) {
                    this.doLog(LogLevel_1.LogLevel.TRACE, message, object, deep);
                };
                Logger.prototype.doLog = function (level, message, object, deep) {
                    if (level >= Logger.config.getLevel() && Logger.config.hasTag(this.tag)) {
                        if (typeof object !== "undefined") {
                            message += ' ' + Utils_1.stringify(object, deep || 1);
                        }
                        var appender = Logger.config.getAppender();
                        appender.append({
                            message: message,
                            time: new Date(),
                            tag: this.tag,
                            level: level,
                            useColor: this.useColor
                        });
                    }
                };
                Logger.loggers = {};
                Logger.config = new LoggerConfig_1["default"]();
                return Logger;
            }());
            exports["default"] = Logger;


            /***/ }),
        /* 5 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            /**
             * Created by jsroads on 2019/9/21 . 2:21 下午
             * Note:
             */
            var LogColor;
            (function (LogColor) {
                LogColor["TRACE"] = "#2eb596";
                LogColor["DEBUG"] = "#3f79e8";
                LogColor["INFO"] = "#000000";
                LogColor["WARN"] = "#bee22b";
                LogColor["FATAL"] = "#ff56d9";
                LogColor["ERROR"] = "#d00000";
            })(LogColor = exports.LogColor || (exports.LogColor = {}));


            /***/ }),
        /* 6 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            function stringify(object, deep) {
                function cut(obj, deep) {
                    if (deep === 0)
                        return undefined;
                    var result = {};
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (typeof obj[key] === 'object') {
                                var cutted = cut(obj[key], deep - 1);
                                if (typeof cutted !== undefined) {
                                    result[key] = cutted;
                                }
                            }
                            else {
                                result[key] = obj[key];
                            }
                        }
                    }
                    return result;
                }
                return JSON.stringify(cut(object, deep), null, 2);
            }
            exports.stringify = stringify;


            /***/ }),
        /* 7 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var BaseAppender = /** @class */ (function () {
                function BaseAppender() {
                }
                BaseAppender.prototype.setLayout = function (layout) {
                    this.layout = layout;
                };
                BaseAppender.prototype.getLayout = function () {
                    return this.layout;
                };
                BaseAppender.prototype.setLayoutFunction = function (layout) {
                    this.layout = {
                        format: layout
                    };
                };
                BaseAppender.prototype.append = function (entry) {
                };
                BaseAppender.prototype.clear = function () {
                };
                return BaseAppender;
            }());
            exports["default"] = BaseAppender;


            /***/ }),
        /* 8 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";

            exports.__esModule = true;
            var Logger_1 = __webpack_require__(4);
            exports.Logger = Logger_1["default"];
            var LoggerConfig_1 = __webpack_require__(1);
            exports.LoggerConfig = LoggerConfig_1["default"];
            var BasicLayout_1 = __webpack_require__(3);
            exports.BasicLayout = BasicLayout_1["default"];
            var ConsoleAppender_1 = __webpack_require__(2);
            exports.ConsoleAppender = ConsoleAppender_1["default"];
            var LogLevel_1 = __webpack_require__(0);
            exports.LogLevel = LogLevel_1.LogLevel;


            /***/ })
        /******/ ]);
});