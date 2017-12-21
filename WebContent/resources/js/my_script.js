var canvas, context;

function draw(e) {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	var r = document.getElementById("form:rSelector").value;
	if (canvas != null) {
		if (isNumber(r)) {
			var pos = getMousePos(canvas, e);
			posx = pos.x;
			posy = pos.y;
			var x, y;
			if (posx >= 160) {
				x = (posx - 160) * 5 / 160;
			} else
				x = -(160 - posx) * 5 / 160;
			if (posy >= 160) {
				y = -(posy - 160) * 5 / 160;
			} else
				y = (160 - posy) * 5 / 160;
			context.clearRect(0, 0, canvas.width, canvas.height);
			draw_graph();
			draw_dote(posx, posy, "blue");
			document.getElementById("canvasWarning").innerHTML = "";
			document.getElementById("form:xSelector").value = x;
			document.getElementById("form:xSelector").innerHTML = x;
			document.getElementById("form:ySelector").value = y;
			document.getElementById("form:checkButton").click();
		} else {
			document.getElementById("canvasWarning").innerHTML = "*Set the \"R\" parameter";
		}
	} else
		alert("Alarm");
}


function draw_dote(posx, posy, color) {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.arc(posx, posy, 2, 0, 2 * Math.PI);
	context.fill();
}

function draw_points() {
	var table = document.getElementById('form:points');
	var rows = table.getElementsByTagName("tbody")[0]
			.getElementsByTagName("tr");
	draw_graph();
	for (var i = 0; i < rows.length; i++) {
		var cells = rows[i].getElementsByTagName("td");
		var x = cells[0].innerHTML.trim();
		if (x != "") {	
		var y = cells[1].innerHTML.trim();
		var hit = (cells[2].innerHTML.trim() == 'true');
		var posx = Math.round(x * 160 / 5 + 160);
		var posy = Math.round(-y * 160 / 5 + 160);
		if (hit) {
			draw_dote(posx, posy, "green");
		} else {
			draw_dote(posx, posy, "red");
		}
	} 
	}
}

function draw_graph(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var grid_size = 320;
	var r = document.getElementById("form:rSelector").value;
	if (canvas != null) {
		if (isNumber(r)) {
			var r1=r*32;
			var x0 = 160;
			var y0 = 160;
			
			ctx.clearRect(0, 0, canvas_width, canvas_height);
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#000000"
			ctx.moveTo(0, grid_size/2);
			ctx.lineTo(canvas_width, grid_size/2);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#000000"
			ctx.moveTo(grid_size/2, 0);
			ctx.lineTo(grid_size/2, canvas_height);
			ctx.stroke();

			ctx.beginPath();
			ctx.rect(x0-r1,y0-r1/2,r1,r1/2);
			ctx.fillStyle = "#66ccff"
			ctx.fill();
			ctx.stroke();

			var radius = r1/2;
			var startAngle = Math.PI*0.5;
			var endAngle = Math.PI;
			var antiClockwise = false;
			ctx.beginPath();
			ctx.arc(x0, y0, radius, startAngle, endAngle, antiClockwise);
			ctx.lineTo(x0, y0);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(x0,y0);
			ctx.lineTo(x0,y0+r1);
			ctx.lineTo(x0+r1/2,y0);
			ctx.lineTo(x0,y0);
			ctx.fill();
			ctx.stroke();
		}
	}
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
}

window.draw = draw;

function validate() {
	var x = Xvalidate();
	var y = Yvalidate();
	var r = Rvalidate();
	if (x == false || y == false || z == false) {
		return false;
	}
}

function Yvalidate() {
	var y = document.forms["form"]["form:ySelector"].value;
	if (y.length == 0) {
		document.getElementById("Ywarning").innerHTML = "*Y coordinate is required";
		return false;
	}
	if (!(y > -3 && y < 3)) {
		document.getElementById("Ywarning").innerHTML = "*Y must be bettwen -3 and 3";
		return false;
	}
	if (isNaN([ +y ])) {
		document.getElementById("Ywarning").innerHTML = "*Y must be a number";
		return false;
	}
}

function Xvalidate() {
	var x = document.forms["form"]["form:xSelector"].value;
	if (isNaN([ +x ])) {
		document.getElementById("Xwarning").innerHTML = "*X must be a number";
		return false;
	}
	if (x.length == 0) {
		document.getElementById("Xwarning").innerHTML = "*X coordinate is required";
		return false;
	}
}

function Rvalidate() {
	var r = document.forms["form"]["form:rSelector"].value;
	if (isNaN([ +r ])) {
		document.getElementById("Rwarning").innerHTML = "*R must be a number";
		return false;
	}
	if (r < 0) {
		document.getElementById("Rwarning").innerHTML = "*R must be positive";
		return false;
	}
	if (r > 5) {
		document.getElementById("Rwarning").innerHTML = "*R must be less than 5";
		return false;
	}
} 