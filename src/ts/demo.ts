/// <reference path="./typings/jquery.d.ts"/>


//import StringUtil from "./utils/StringUtil";

//import StringUtil = require("./utils/StringUtil");


class DemoClass{
    winEl: JQuery;
    doc: Document;
	constructor(){
		this.winEl = $(window);
        this.doc = document;
        
	}
    boom(){
		var main:JQuery = $(".main");

		main.on("click", this.mainClick);


        console.log("Demo !" + this.winEl.width());
        var myArray: Array<Number> = [];
        myArray.push(0);
        myArray.push(10);

       /* var strU = new StringUtil();
        strU.foo();
        console.log(myArray.join(", ")); */       
        //var str = strUtil.padLeft("1", "0", 10);
        //var fooStr = strUtil.foo();
        //console.log(fooStr);

        //myArray.pus

    }
    mainClick(event:JQueryEventObject){
		console.log(event.target);
    }
}



declare var module: any;
(module).exports = DemoClass;