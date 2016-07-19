export default class StringUtil{

	constructor(){
	}

	static padLeft(str:string, padChar:string, count:Number) {
		if (padChar.length < 1) {
			return null;
		}		
		var arr: Array<string> = str.split("");
		var tmp: Array<string> = [];
		for (var i = arr.length; i < count; i++) {
			tmp.push(padChar);
		}
		return tmp.join("") + str;
	}

	static getUrlParam(url:string, paramName:string, defaultStr:string = null) {
		var lookFor:string = paramName + "=";
		var pUrl:string = url;
		var pIndex:number = pUrl.indexOf(lookFor);
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
	}
}
