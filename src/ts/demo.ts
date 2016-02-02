/// <reference path="./typings/jquery.d.ts"/>


class DemoClass{
	winEl: JQuery;
	constructor(){
		this.winEl = $(window);

	}
    boom(){
        alert("Demo !" + this.winEl.width());
    }
}



declare var module: any;
(module).exports = DemoClass;