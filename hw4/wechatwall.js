var socket = io.connect("https://wall.cgcgbcbc.com");
socket.on("connect", function()
{
	gethistory();
});
socket.on("new message", function(data)
{
	newmsg(data);
});
socket.on("admin", function(data)
{
	newadmin(data);
});

function gethistory()
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var response = JSON.parse(xmlhttp.responseText);
			for(var i = response.length - 1; i >= 0; i--)
			{
				newmsg(response[i]);
			}
			cmd.started = 1;
		}
	}
	xmlhttp.open("GET", "https://wall.cgcgbcbc.com/api/messages?num=3", true);
	xmlhttp.send();
}

var cmd = new Object();
cmd.admin = 0;
cmd.started = 0;
cmd.moving = 0;
cmd.queue = new Array();

function newmsg(obj)
{
	if(cmd.started == 1)
	{
		if(cmd.moving == 1)
		{
			cmd.queue.unshift(obj);
			return;
		}
		cmd.moving = 1;
		var m = document.getElementsByClassName("move")[0];
		m.addEventListener("webkitAnimationEnd", stop, false);
		m.style.webkitAnimationPlayState = "running";
	}
	
	if(obj.content.length * 50 > document.body.clientWidth - 200)
	{
		obj.content = '<marquee scrollAmount="10">' + obj.content + '</marquee>';
	}
	var msg = document.createElement("div");
	msg.className = "massage";
	msg.innerHTML = 
		'<div class="nickname">' + obj.nickname + '</div>' +
		'<img class="loading" src="loading.gif">' +
		'<img class="headimg" onload="loaded()" src="' + obj.headimgurl + '">' +
		'<div class="content">' + obj.content + '</div>';
	document.getElementsByClassName("move")[0].appendChild(msg);

}

var stop = function()
{
	var m = document.getElementsByClassName("move")[0];
	m.style.webkitAnimationPlayState = "paused";
	m.classList.remove("move");
	m.offsetHeight = m.offsetHeight;
	m.classList.add("move");
	m.removeEventListener("webkitAnimationEnd", stop);
	
	var mags = document.getElementsByClassName("massage");
	mags[0].parentNode.removeChild(mags[0]);
	if(cmd.admin == 1)
	{
		mags[0].style.display = "none";
	}
	
	cmd.moving = 0;
	if(cmd.queue.length != 0)
	{
		newmsg(cmd.queue.pop());
	}
}

function newadmin(obj)
{
	if(obj.content.length * 50 > document.body.clientWidth - 200)
	{
		obj.content = '<marquee scrollAmount="15">' + obj.content + '</marquee>';
	}
	var adm = document.getElementById("admin");
	adm.innerHTML = 
		'<div class="nickname">admin</div>' +
		'<img class="adminimg" src="admin.png">' +
		'<div class="content">' + obj.content + '</div>';
	adm.style.display = "block";
	
	if(cmd.admin == 0)
	{
		cmd.admin = 1;
		cmd.timer = setTimeout("deladmin()", 10 * 1000);
		document.getElementsByClassName("massage")[0].style.display = "none";
		document.getElementById("hide").style.height = "320px";
	}
	else
	{
		clearTimeout(cmd.timer);
		cmd.timer = setTimeout("deladmin()", 10 * 1000);
	}
}

function deladmin()
{
	var adm = document.getElementById("admin");
	adm.innerHTML = "";
	adm.style.display = "none";
	cmd.admin = 0;
	
	document.getElementsByClassName("massage")[0].style.display = "block";
	document.getElementById("hide").style.height = "480px";
}

function loaded()
{
	$(".headimg").css("display", "inline");
	$(".loading").css("display", "none");
}