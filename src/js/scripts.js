var colorSentences = [];

noSentence = 24;
for (var i=0;i<noSentence;i++) {
	colorSentences[i] = "white";
}

var state = 0;
var stateSentenceId = -1; //sentence id corresponding with state
/*
state = 1: 1 sentence is focus
state = 2: 1 sentence is choosen
state = 0: everything is clear
*/
var sentences = document.getElementsByClassName("sentence");
for (var i=0;i<sentences.length;i++) {
	sentences[i].onmouseover = function() {
		if (state == 0 || state ==1) {
			colorSentences[i] = this.style.backgroundColor;
			this.style.backgroundColor = "#f5f91a";
			this.style.borderRadius = "5px";
			this.style.cursor = "pointer";
			state = 1;
			stateSentenceId = this.getAttribute("id");
		}
	}
	sentences[i].onmouseout = function() {
		if (state == 1) {
			this.style.backgroundColor = colorSentences[i];
			this.style.borderRadius = "5px";
			state = 0;
			stateSentenceId = -1;
		}
	}
	sentences[i].onclick = function(event) {
		
		if (state == 1) {
			
			$(".popup").remove();
			
			var popup = document.createElement("div");
			popup.setAttribute("class", "btn-group popup");
			
			var bt1 = document.createElement("button");
			bt1.setAttribute("id", this.getAttribute("id")+"tichcuc");
			bt1.setAttribute("type", "button");
			bt1.setAttribute("class", "btn btn-success");
			var txt1 = document.createTextNode("Tích cực");
			bt1.appendChild(txt1);
			bt1.setAttribute("onclick", "setPositive(event)");

			var bt2 = document.createElement("button");
			bt2.setAttribute("id", this.getAttribute("id")+"trungtinh");
			bt2.setAttribute("type", "button");
			bt2.setAttribute("class", "btn btn-info");
			var txt2 = document.createTextNode("Trung tính");
			bt2.appendChild(txt2);
			bt2.setAttribute("onclick", "setNeutral(event)");

			var bt3 = document.createElement("button");
			bt3.setAttribute("id", this.getAttribute("id")+"tieucuc");
			bt3.setAttribute("type", "button");
			bt3.setAttribute("class", "btn btn-danger");
			var txt3 = document.createTextNode("Tiêu cực");
			bt3.appendChild(txt3);
			bt3.setAttribute("onclick", "setNegative(event)");

			popup.appendChild(bt1);
			popup.appendChild(bt2);
			popup.appendChild(bt3);
			popup.style.width = "300px";
			popup.style.left = (event.clientX - 120) + "px";
			popup.style.top = (event.clientY - 50) + "px";
			console.log(event.clientX);
			console.log(event.clientY);
			popup.style.position = "fixed";
			$(".ndba").append(popup);
			state = 2;
			stateSentenceId = this.getAttribute("id");
			console.log(popup);
		}
		else if (state == 2) {
			clear();
		}
	}
}

$("body").click(function(event) {
	if (state == 1) {
		clear();
	}
	else if (state == 2 && !event.target.className.includes("sentence")) {
		clear();
	}
});

function setPositive(event) {
	var index = parseInt(event.target.id);
	var sen = document.getElementById(index);
	sen.style.backgroundColor = "#5cb85c";
	colorSentences[index] = "#5cb85c";
	clear();
}

function setNegative(event) {
	var index = parseInt(event.target.id);
	var sen = document.getElementById(index);
	sen.style.backgroundColor = "#d9534f";
	colorSentences[index] = "#d9534f";
	clear();
}

function setNeutral(event) {
	var index = parseInt(event.target.id);
	var sen = document.getElementById(index);
	sen.style.backgroundColor = "#5bc0de";
	colorSentences[index] = "#5bc0de";
	clear();
	
}

function clear() {
	console.log("clear");
	$(".popup").remove();
	if (stateSentenceId != -1) {
		var sen = document.getElementById(stateSentenceId);
		sen.style.backgroundColor = colorSentences[stateSentenceId];
		sen.style.borderRadius = "5px";
	}
	state = 0;
}