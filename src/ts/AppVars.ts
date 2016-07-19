export default class AppVars{
	public static GoogleApiKey = "1234567";
	public static liveURL = "http://maxomedia.ch"

	constructor() {
		// code...
	}
	public static isMobile(){
		console.log(window.document.body.clientWidth);
	}
}