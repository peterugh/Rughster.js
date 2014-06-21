'use strict';

/***********************

Helper methods, many replace jQuery

Speed, speed, speed

Methods: 

listType
addClass
removeClass
browserAppropriateAddEventListener
browserAppropriateRemoveEventListener
browserAppropriateStyleComputation
getRelationship
ajax

***********************/

var Rughster =
{
	listType: function(list)
	{
		switch (Object.prototype.toString.call(list))
		{
			case '[object Array]' :
				return 'array';
				break;
			case '[object Object]' :
				return 'object';
				break;
			case '[object NodeList]' :
				return 'nodes';
				break;
			default :
				return false;
				break;
		}
	},
	addClass: function(element, classes)
	{
		var classesArray = element.className.split(' ');
		var currentlyAssigned = classesArray.indexOf(classes);
		var listOfClasses = '';

		if(currentlyAssigned === -1)
		{
			classesArray.push(classes);
		}
		for(var i=0, numClasses = classesArray.length; i< numClasses; i++)
		{
			listOfClasses += ' ';
			listOfClasses += classesArray[i];
			
		}
		var cleanList = listOfClasses.trim();
		element.className = cleanList;

		return true;
	},
	hasClass: function(element, potentialClass)
	{
		var classesArray = element.className.split(' ');
		if(classesArray.indexOf(potentialClass) !== -1)
		{
			return true;
		}
		else
		{
			return false;
		}

	},
	removeClass: function(element, classes)
	{
		var classesArray = element.className.split(' ');
		var currentlyAssigned = classesArray.indexOf(classes);
		var listOfClasses = '';

		for(var i=0, numClasses = classesArray.length; i< numClasses; i++)
		{
			if(classesArray[i] != classes)
			{
				listOfClasses += ' ';
				listOfClasses += classesArray[i];	
			}			
		}
		var cleanList = listOfClasses.trim();
		element.className = cleanList;

		return true;
	},
	browserAppropriateAddEventListener: function()
	{
		var testElement = document.createElement('a');
		if(testElement.addEventListener)
		{
			return 'addEventListener';
		}
		else if(testElement.attachEvent)
		{
			return 'attachEvent';
		}
	},
	browserAppropriateRemoveEventListener: function()
	{
		var testElement = document.createElement('a');
		if(testElement.addEventListener)
		{
			return 'removeEventListener';
		}
		else if(testElement.attachEvent)
		{
			return 'detachEvent';
		}
	},
	browserAppropriateStyleComputation: function()
	{
		var testComputed = document.createElement('span');
		
		if(window.getComputedStyle)
		{
			return 'getComputedStyle';
		}
		else
		{
			return 'currentStyle';
		}
	},
	getRelationship: function(subject, potentialRelative)
	{
		// returns the SUBJECT's relationship to the potentialRelative linearly (no cousins/aunts/uncles)
		var relationship = 'unrelated';
		var failSafe = 0;
		var currentParent = null;
		var currentPrevSibling = null;
		var currentNextSibling = null;
		
		if(subject == potentialRelative)
		{
			relationship = 'self';
			return relationship;
		}
		/* check if child */
		if(subject.parentElement)
		{
			currentParent = subject.parentElement;
		}
		while(currentParent && failSafe < 200)
		{
			if(currentParent == potentialRelative)
			{
				relationship = 'child';
				return relationship;
			}
			currentParent = currentParent.parentElement;

			failSafe++;
		}

		/* check if parent */
		failSafe = 0;
		if(subject.parentElement)
		{
			currentParent = subject.parentElement;
		}
		while(currentParent && failSafe < 200)
		{
			if(currentParent == subject)
			{
				relationship = 'parent';
				return relationship;
			}
			currentParent = currentParent.parentElement;

			failSafe++;
		}

		/* check if sibling */
		failSafe = 0;
		if(subject.previousElementSibling)
		{
			currentPrevSibling = subject.previousElementSibling;
		}
		while(currentPrevSibling && failSafe < 200)
		{
			if(currentPrevSibling == potentialRelative)
			{
				relationship = 'sibling';
				return relationship;
			}
			currentPrevSibling = currentPrevSibling.previousElementSibling;

			failSafe++;
		}

		/* check if sibling */
		failSafe = 0;
		if(subject.nextElementSibling)
		{
			currentNextSibling = subject.nextElementSibling;
		}
		while(currentNextSibling && failSafe < 200)
		{
			if(currentNextSibling == potentialRelative)
			{
				relationship = 'sibling';
				return relationship;
			}
			currentNextSibling = currentNextSibling.nextElementSibling;

			failSafe++;
		}
		return relationship;
	},
	ajax: function(requestMethod, url, params, callback)
	{
		/*
			requestMethod: 'GET' or 'POST'

			url: ajax URL

			params: object/string (we just pass this along)

			callback: function to execute with results
				This method returns 3 arguments to the callback function
				Arg1: Text returned from AJAX call or FALSE
				Arg2: Http response status or FALSE
				Arg3: Error description or FALSE
		*/

		var httpRequest;

		/*
			Check if Browser has AJAX Capabilities
		*/
		if(window.XMLHttpRequest)
		{
			httpRequest = new XMLHttpRequest();
		}
		else if(window.ActiveXObject)
		{
			try 
			{
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (err)
			{
				try
				{
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} 
				catch (err) {}
			}
		}
		if(!httpRequest)
		{
			// return 
			return callback(false, false, 'Browser does not support ajax requests');
		}

		// event listener
		httpRequest.onreadystatechange = ajaxEvent;
		
		// set up headers for POST request
		if(requestMethod == 'POST')
		{
			httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		// Prepare request
		httpRequest.open(requestMethod, url, true);
		// send data
		httpRequest.send(params);

		// event handler
		function ajaxEvent()
		{
			// ajax request has fully run
			if(httpRequest.readyState === 4)
			{
				if (httpRequest.status === 200)
				{
					// successfull reply
					return callback(httpRequest.responseText, httpRequest.status, false);
				}
				else
				{
					// something bad happened. Pass response status into callback
					return callback(false, httpRequest.status, 'Request Failed');
				}
			}

		}
	}
}