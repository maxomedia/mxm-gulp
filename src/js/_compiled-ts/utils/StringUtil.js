var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.padLeft = function (str, padChar, count) {
        if (padChar.length < 1) {
            return null;
        }
        var arr = str.split("");
        var tmp = [];
        for (var i = arr.length; i < count; i++) {
            tmp.push(padChar);
        }
        return tmp.join("") + str;
    };
    StringUtil.getUrlParam = function (url, paramName, defaultStr) {
        if (defaultStr === void 0) { defaultStr = null; }
        var lookFor = paramName + "=";
        var pUrl = url;
        var pIndex = pUrl.indexOf(lookFor);
        if (pIndex == -1) {
            return defaultStr;
        }
        pUrl = pUrl.substr(pIndex + lookFor.length);
        var ampIndex = pUrl.indexOf("&");
        var hashIndex = pUrl.indexOf("#");
        if (ampIndex != -1) {
            return pUrl.substr(0, ampIndex);
        }
        if (hashIndex != -1) {
            return pUrl.substr(0, hashIndex);
        }
        return pUrl;
    };
    return StringUtil;
})();
exports["default"] = StringUtil;
