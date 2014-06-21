Rughster.js
===========

Set of methods commonly used. Written for speed and re-use.

###Available Methods

####ajax

    Rughster.ajax(requestMethod, url, params, callback)
    
Small little ajax method. Limited but easy. If you need robust AJA, don't use this. Serves GET and POST methods. See comments in file.
    
####addClass

    Rughster.addClass(element, classes);
    
Adds a class or string of classes to a DOM element

####browserAppropriateAddEventListener

    Rughster.browserAppropriateAddEventListener()
    
Returns a string of the appropriate add event listener method. 'addEventListener' or 'attachEvent'

####browserAppropriateRemoveEventListener

    Rughster.browserAppropriateRemoveEventListener()
    
Returns a string of the appropriate remove event listener method. 'removeEventListener' or 'detachEvent'

####browserAppropriateStyleComputation

    Rughster.browserAppropriateStyleComputation()
    
Returns a string of the appropriate method for retreiving the computed styles of a DOM element. 'getComputedStyle' or 'currentStyle'

####getRelationship

    Rughster.getRelationship(subject, potentialRelative)
    
Returns the subjects's relationship to the potentialRelative linearly (no cousins/aunts/uncles)

####hasClass

    Rughster.hasClass(element, potentialClass)
    
Checks if DOM element has specified class. Accepts one class at a time to check.

####listType

    Rughster.listType(list);

Return the type of list of the JavaScript variable passed in: Array, Object, Nodes, false

####removeClass

    Rughster.removeClass(element, classes)
    
Removes a class or string of classes to a DOM element



