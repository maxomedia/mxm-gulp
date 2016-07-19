/// <reference path="./typings/jquery.d.ts"/>
var StringUtil_1 = require("./utils/StringUtil");
var TSDemo = (function () {
    function TSDemo() {
        var hello = StringUtil_1["default"].getUrlParam(window.location.href, "hello");
        alert(hello);
        $(document).on("click", this.handler);
    }
    TSDemo.prototype.handler = function (event) {
        event.preventDefault();
    };
    //add a message 
    TSDemo.prototype.boom = function (message) {
        return "foo " + message;
    };
    return TSDemo;
})();
exports.TSDemo = TSDemo;
var demo = new TSDemo();
var fobar = demo.boom("bar");
alert(fobar);
/*
declare var module: any;
(module).exports = DemoClass;
var result = StringUtil.padLeft("foo", "0", 8);
        console.log(result);

*/ 
