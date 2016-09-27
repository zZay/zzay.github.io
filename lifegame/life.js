var living;
var will_live;
var size = 10; //px for each cell
var timer;
var running = 0;

$(function()
{
	$('#world').click(function(e)
	{
		var id = $(e.target).attr('id');
		var	x = parseInt(id.substring(1, id.indexOf('-'))); 
		var	y = parseInt(id.substring(id.indexOf('-') + 1));
		var cell = $('#c' + x + '-' + y);
		if(living[x][y] == 1)
		{
			living[x][y] = 0;
			cell.removeClass('white');
			cell.addClass('black');
		}
		else if(living[x][y] == 0)
		{
			living[x][y] = 1;
			cell.removeClass('black');
			cell.addClass('white');
		}
	});
	
	//initial(50, 80);
});

function initial(x, y)
{
	living = new Array(x);
	will_live = new Array(x);
	for(var i = 0; i < living.length; i++)
	{
		living[i] = new Array(y);
		will_live[i] = new Array(y);
		for(var j = 0; j < living[0].length; j++)
		{
			living[i][j] = 0;
			will_live[i][j] = 0;
		}
	}
	
	var area = '';
	for(var i = 0; i < living.length; i++)
	{
		for(var j = 0; j < living[0].length; j++)
		{
			var color = '';
			if(living[i][j] == 1)
				color = 'white';
			else color = 'black';
			area += "<div id = 'c" + i + '-' + j + 
				"' style = 'left: " + j * size + 
				"px; top: " + i * size + "px;' class ='" + color + "'></div>";
		}
	}
	$('#world').html(area).width(living[0].length * size).height(living.length * size).show();
	stop();
	
	return living;
}

function random_life()
{
	for(var i = 0; i < living.length; i++)
	{
		for(var j = 0; j < living[0].length; j++)
		{
			will_live[i][j] = Math.round(Math.random());
		}
	}
	refresh();
}

function next()
{
	var cnt = 0;
	var p = 0, q = 0;
	for(var x = 0; x < living.length; x++) //外两重for循环遍历游戏中的每一格
	{
		for(var y = 0; y < living[0].length; y++)
		{
			cnt = 0;
			for(var i = -1; i <= 1; i++) //内两重for循环遍历每格周围的8个格
			{
				for(var j = -1; j <= 1; j++)
				{
					if(i == 0 && j == 0) continue;
					p = i + x;
					q = j + y;
					if(p < 0) p = living.length - 1;
					if(p >= living.length) p = 0;
					if(q < 0) q = living[0].length - 1;
					if(q >= living[0].length) q = 0;
					if(living[p][q] == 1) cnt++;
				}
			}
			if(cnt == 3) will_live[x][y] = 1;
			else if(cnt == 2) will_live[x][y] = living[x][y];
			else will_live[x][y] = 0;
		}
	}
	return will_live;
}

function refresh()
{
	var cell;
	for(var x = 0; x < living.length; x++)
	{
		for(var y = 0; y < living[0].length; y++)
		{
			cell = $('#c' + x + '-' + y);
			living[x][y] = will_live[x][y];
			if(living[x][y] == 1)
			{
				if(cell.hasClass('black'))
				{
					cell.removeClass('black');
					cell.addClass('white');
				}
			}
			else if(living[x][y] == 0)
			{
				if(cell.hasClass('white'))
				{
					cell.removeClass('white');
					cell.addClass('black');
				}
			}
		}
	}
}

function start()
{
	if(running == 1) return;
	running = 1;
	tick();
}

function tick()
{
	next();
	refresh();
	timer = setTimeout("tick()", 300);
}

function stop()
{
	if(running == 0) return;
	clearTimeout(timer);
	running = 0;
}