/// <reference path="./typings/jquery.d.ts"/>

import StringUtil from "./utils/StringUtil";
import AppVars from "./AppVars";


export class TSDemo{
	constructor(){

        
        var hello:string = StringUtil.getUrlParam(window.location.href, "hello");
        alert(hello);       
        $(document).on("click",this.handler);
        
        
	}
	handler(event:JQueryEventObject ){
		event.preventDefault();
	}
	//add a message 
    boom(message:string):string{
    	

        return "foo " + message;

    }
    
}

var demo:TSDemo = new TSDemo();

var fobar:string = demo.boom("bar");



alert(fobar);


/*
declare var module: any;
(module).exports = DemoClass;
var result = StringUtil.padLeft("foo", "0", 8);
        console.log(result);

*/