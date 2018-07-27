
var time;
var interval; 
var siren;

document.addEventListener("DOMContentLoaded", function(){
	console.log("DOM got loaded");
	document.getElementById("reset").addEventListener("click", start);	
});

function start() {
	console.log("starting game!");
	clearInterval(interval);
	addWireListeners();

	time = 30; 

	interval = setInterval(tick, 1000);
	this.textContent = "Try Again";

	document.getElementsByTagName("body")[0].classList.remove("exploded");
	document.getElementsByTagName("body")[0].classList.add("unexploded");
	document.getElementById("message").textContent = "";
	document.getElementById("timer").style.color = "chartreuse";

	siren = document.getElementById("siren");
	siren.play();
}

function tick(){
	time -= 1;
	document.getElementById("timer").textContent = time;
	if (time === 3) {
		document.getElementById("timer").style.color = "red";
	}
	if(time <= 0) {
		loseGame();
	}
}

function addWireListeners() {
	var wireImages = document.querySelectorAll("#box img"); //refers to any image that is nested in class "box"

	for (var i = 0; i < wireImages.length; i++) {
		wireImages[i].src = "./img/uncut-" + wireImages[i].id + "-wire.png";
		wireImages[i].setAttribute("data-cut", (Math.random() > .5).toString());
		console.log(wireImages[i]); //console log true or false
		wireImages[i].addEventListener("click", clickWire);
		//console.log(wireImages);
	}
	if(checkWin()){
		start();
	}
}

function removeWireListeners() {
	wireImages = document.querySelectorAll("#box img");

	for (var i = 0; i < wireImages.length; i++) {
		wireImages[i].removeEventListener("click", clickWire);
	}
}

function clickWire(){
	console.log("wire clicked", this.id);  //this.id will reference the id of what got clicked, red, white etc
	this.src = "./img/cut-" + this.id + "-wire.png";
	this.removeEventListener("click", clickWire);
	var electricity = document.getElementById("electricity");
	electricity.play();

	if(this.getAttribute("data-cut") === "true") {
		this.setAttribute("data-cut", "false");

		if(checkWin()){
			winGame();
		} 
	}
	
	else {
		loseGame();
	}
}

function checkWin() {
	var wireImages = document.querySelectorAll("#box img");

	for (var i = 0; i < wireImages.length; i++) {
		if (wireImages[i].getAttribute("data-cut") === "true") {
			return false;
		}
	}
	return true;
	
}

function stopGame(message) {
	removeWireListeners();
	clearInterval(interval);
	siren.pause();
	document.getElementById("message").textContent = message;
}

function loseGame() {
	stopGame("You've failed this city.");
	document.getElementsByTagName("body")[0].classList.remove("unexploded");
	document.getElementsByTagName("body")[0].classList.add("exploded");
	var explodeSound = document.getElementById("explode");
	explodeSound.play();

}

function winGame() {
	stopGame("You're a hero!");
	var cheer = document.getElementById("cheer");
	cheer.addEventListener("ended", function(){
		document.getElementById("success").play();
	});
	cheer.play();

	
	

};
