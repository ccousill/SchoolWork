function mean(array){
	if(!Array.isArray(array)) throw `Error: Not an array`;
	if(array.length == 0) throw 'Error: Empty list';

	sum = 0;
	for(x of array){
		if(typeof x != 'number') throw `${x} is not a number`;
		sum += x;
	}
	return sum/array.length;

}

function medianSquared(array){
		if(!Array.isArray(array)) throw `Error: Not an array`;
	    if(array.length == 0) throw 'Error: Empty list';
	    for(x of array){
		     if(typeof x != 'number') throw `${x} is not a number`;		
	    }

		if(array.length % 2 == 0){
			medianIndex1 = Math.floor((array.length -1)/2);
			medianIndex2 = array.length/2;
			sum = array[medianIndex1] + array[medianIndex2];
			return Math.pow(sum/2,2);
		}

		medianIndex = (array.length-1)/2;
		return Math.pow(array[medianIndex],2);

}

function maxElement(array){
	obj = {};
	if(!Array.isArray(array)) throw `Error: Not an array`;
	    if(array.length == 0) throw 'Error: Empty list';
	    if(array.length == 1){
	    	obj[array[0]] = 0;
	    	return obj
	    } 
	    for(x of array){
		     if(typeof x != 'number') throw `${x} is not a number`;		
	    }

	maxElement;
	for(let i = 0; i < array.length -1; i++){
		if(array[i] > array [i+1]){
			max = array[i];
		}
		else{
			max = array[i+1];
		}

		maxElement = max;
	}
	    // obj[MaxElement] = maxElement;
	    // obj.Index = array.indexOf(max);
	     obj[maxElement] =  array.indexOf(max);
		return obj;


}

function fill(end, value){
	if(end <= 0) throw 'Number must be greater than 1';
	if(typeof end != 'number') throw `${end} is not a number`;

	array = [];
	if(value === undefined){
	
	count=0;

	while(end > 0){
		array.push(count);
		count += 1;
		end -= 1;
	}

	return array;

	}
	else{
		for(i = 0; i< end;i++){
			array.push(value);
		}
		return array;
	}

}

function countRepeating(array){

	if(!Array.isArray(array)) throw `Error: Not an array`;
	if(array.length == 0) throw 'Error: Empty list';


	obj = {};
	for(i = 0;i < array.length;i++){
		count = 0;
		for(j=0;j < array.length;j++){
			if(array[i] == array[j]){
				count += 1;
			}

		}
		if(count >= 2){
			obj[array[i]] = count; 
		}
		
	}
	return obj;
}


function isEqual(arrayOne,arrayTwo){
	if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) throw `Error: Not an array`;
	if(arrayOne.length == 0 || arrayTwo.length ==0) throw 'Error: Empty list';

	if(arrayOne.length == arrayTwo.length){	
		arrayOne = arrayOne.sort();
		arrayTwo = arrayTwo.sort();
		 

			for(let i = 0;i < arrayOne.length;i++){
		
				if(Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])){

					if(!isEqual(arrayOne[i],arrayTwo[i])){
						return false;
					} 
				}
				else if(arrayOne[i] != arrayTwo[i]){
					return false;
				}	
			}
			return true;

	}
return false;
}



module.exports = { mean, medianSquared, maxElement, fill, countRepeating, isEqual };