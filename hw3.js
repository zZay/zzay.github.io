function $(arg)
{
	var result
	if(arg[0] == '#')
	{
		return document.getElementById(arg.substring(1));
		
	}
	else if(arg[0] == '.')
	{
		result = document.getElementsByClassName(arg.substring(1));
		if(result.length == 1)
			return result[0];
		else return result;
	}
	else
	{
		result = document.getElementsByTagName(arg);
		if(result.length == 1)
			return result[0];
		else return result;
	}
}

Object.prototype.attr = function(attributeName,value)
{
	if(arguments.length == 1)
	{
		if(typeof arguments[0] != "string")
			return false;
		if(this.hasOwnProperty(attributeName) != 1)
			return false;
		else return this[attributeName];
	}
	else if(arguments.length == 2)
	{
		if(typeof arguments[0] != "string" || typeof arguments[1] != "string")
			return false;
		if(this.hasOwnProperty(attributeName) != 1)
			return false;
		else this[attributeName] = value;
	}
}