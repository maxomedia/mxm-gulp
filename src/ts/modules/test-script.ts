
module MyDemoModule{
    class MyBase {
        public explode(extra: string) {
            alert("boom " + extra);
        }
    }
    export class Mydemo extends MyBase {
        public static origin = { x: 0, y: 0 };

        private fooElem: HTMLDivElement;
        private mooval: string = "my mooval foovalfkj dksjf ldkjfd";
        private myNum: number = 1;


        constructor() {
            super();
            alert(this.fooElem.clientWidth);
            this.fooElem = <HTMLDivElement>document.querySelector(".foo");
            this.fooElem.addEventListener("click", this.clickHandler);
        }
        public clickHandler(event: Event) {
            console.log("click");
            console.log(event.target);
        }
        public moo(): void {
            alert(this.mooval);
        }
    }

}









