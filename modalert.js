var Modal = new Object()

Modal.init = function(obj)
{
	this.content = "alert";
	this.draggable = true;
	this.closeKey = 27; //Esc
	this.exist = false;
	if(obj.hasOwnProperty("content") && typeof obj.content == "string")
	{
		this.content = obj.content;
	}
	if(obj.hasOwnProperty("draggable") && typeof obj.draggable == "boolean")
	{
		this.draggable = obj.draggable;
	}
	if(obj.hasOwnProperty("closeKey") && typeof obj.closeKey == "number")
	{
		this.closeKey = obj.closeKey;
	}
}

function down(e)
{
	var ma = document.getElementById("modalert");
	Modal.dx = e.clientX - ma.offsetLeft;
	Modal.dy = e.clientY - ma.offsetTop;
	document.addEventListener("mousemove", move, false);
}

function move(e)
{
	var ma = document.getElementById("modalert");
	var left = e.clientX - Modal.dx;
	var top = e.clientY - Modal.dy;

	ma.style.left = left + "px";
	ma.style.top = top + "px";
}

function up(e)
{
	document.removeEventListener("mousemove", move, false);
}

function closeam()
{
	var child = document.getElementById("modalert");
	document.body.removeChild(child);
	Modal.exist = false;
}

document.onkeydown = function(event)
{
	if(event && event.keyCode == Modal.closeKey)
	{
		closeam();
	}
}

function showAlert()
{
	if(Modal.exist == true)
		return;
	Modal.exist = true;
	
	var modalert = document.createElement("div");
	document.body.appendChild(modalert);
	modalert.id = "modalert";
	if(Modal.draggable == true)
	{
		modalert.addEventListener("mousedown", down, false);
		modalert.addEventListener("mouseup", up, false);
	}
	
	var content = document.createElement("div");
	content.innerHTML = "<p>" + Modal.content + "</p>";
	modalert.appendChild(content);
	
	var closebtn = document.createElement("div");
	closebtn.innerHTML = '<input type="button" value="OK" onclick="closeam()"/>';
	modalert.appendChild(closebtn);
}