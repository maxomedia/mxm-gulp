/// <reference path="./typings/jquery.d.ts"/>
var DemoClass = (function () {
    function DemoClass() {
        this.winEl = $(window);
    }
    DemoClass.prototype.boom = function () {
        alert("Demo !" + this.winEl.width());
    };
    return DemoClass;
})();
(module).exports = DemoClass;

//# sourceMappingURL=demo.js.map
