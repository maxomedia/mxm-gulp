var AppVars = (function () {
    function AppVars() {
        // code...
    }
    AppVars.isMobile = function () {
        console.log(window.document.body.clientWidth);
    };
    AppVars.GoogleApiKey = "1234567";
    AppVars.liveURL = "http://maxomedia.ch";
    return AppVars;
})();
exports["default"] = AppVars;
