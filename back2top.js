var BackToTop = document.createElement("div");
var timer;
var distance2top;

function back()
{
	distance2top = document.documentElement.scrollTop || document.body.scrollTop;
	timer = setInterval("step()", 40);
}

function step()
{
	if(distance2top > 100)
	{
		distance2top -= 100;
		document.documentElement.scrollTop = document.body.scrollTop = distance2top;
	}
	else
	{
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		clearInterval(timer);
	}
}

document.onkeydown = function(event)
{
	if(event && event.keyCode == 84) //T
	{
		back();
	}
}

window.onscroll = function()
{
	if(document.documentElement.scrollTop || document.body.scrollTop > 0)
	{
		BackToTop.style.display = "inline";
	}
	else
	{
		BackToTop.style.display = "none";
	}
}

BackToTop.init = function(obj)
{
	document.body.appendChild(this);
	this.id = "back2top";
	this.addEventListener("click", back, false);
	this.innerHTML = "↑ ↑</br>top";
	this.style.display = "none";
	if(obj.hasOwnProperty("x") && obj.hasOwnProperty("y"))
	{
		this.style.top = obj.x + "px";
		this.style.left = obj.y + "px";
	}
	if(obj.hasOwnProperty("LeftUp") && obj.LeftUp == true)
	{
		this.style.top = "10px";
		this.style.left = "10px";
	}
	if(obj.hasOwnProperty("LeftDown") && obj.LeftDown == true)
	{
		this.style.bottom = "10px";
		this.style.left = "10px";
	}
	if(obj.hasOwnProperty("RightUp") && obj.RightUp == true)
	{
		this.style.top = "10px";
		this.style.right = "10px";
	}
	if(obj.hasOwnProperty("RightDown") && obj.RightDown == true)
	{
		this.style.bottom = "10px";
		this.style.right = "10px";
	}
}