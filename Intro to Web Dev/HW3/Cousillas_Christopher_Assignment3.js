//Christopher Cousillas
//I pledge my honor that I have abided by the Stevens Honor System

var currentOp = "";
var result = 0;
var str="";
var buffer="";
setDisplay('0');

/**
 * Resets the state of the calculator and the display
 */
function resetCalc() {
    setDisplay('0');
    currentOp='';
    result=0;
	str='';
    buffer='';
    
}

/**
 * Sets the inner text of the div with id="output"
 * @param {String} str the string to set the inner text to
 */
function setDisplay(str) {
    document.getElementById('output').innerHTML = str;
}

/**
 * Returns the current result of the calculator
 * Hint: you can use a global variable for the result
 */
function getResult() {
    return result;
}

/**
 * Update the calculator state with the next number and sets the display
 * @param {Number} num the number that was pressed
 */
function pressNum(num) {
	str=str+num;
	if (parseFloat(str)>999999999){
	str='999999999';	
	}
	
	else if (parseFloat(str)<-999999999){	
	str='-999999999';
	}

	setDisplay(str);  	
}

/**
 * Operation is pressed, move the current result value to a temporary buffer and
 * set the current result to zero.
 * @param {String} op the operation pressed, either: +,-,*,/
 */
function pressOp(op) {
    currentOp=op;
	
	if (str == ''){
		
		}
	else{
    buffer=str;
	str='';
    setDisplay('0');
	}
	
}
/**
 * Should compute the current operation with the buffer value and current
 * result value based on the current operation. If there is no current
 * operation, do nothing.
 */
function pressEquals() {
   var a = parseFloat(str);
   var b = parseFloat(buffer);
   if (currentOp=='+'){
	result=b + a;
    setDisplay(result);
}
   else if(currentOp=='-'){
	    result=b-a;
	    setDisplay(result);
}
   else if(currentOp=='*'){
	    result=b*a;
		setDisplay(result);
	   
   }
   
   else if(currentOp=='/'){
	   
	   if (a==0){
		setDisplay("ERROR");
	   }
	   else{
		   
	    result= Math.floor(b/a);
		setDisplay(result);
	   }
	   
	   
   }

   
   
   
   
}


