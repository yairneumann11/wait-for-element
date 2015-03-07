# wait-for-element
This is a helper function written in pure javascript that calls a callback function once an element is found.

This browser support is:
IE8 and above(document.querySelectorAll is used)
Chrome
Firefox

The function tries to use the Mutation Observer if the browser supports it,
if not it will use a setTimeout that can be configured through an options object that
can pe passed to the function

e.g
```
waitForElement("#foo", function(element){

//callback function
console.log(element)

})
```
