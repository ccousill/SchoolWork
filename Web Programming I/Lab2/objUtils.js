function makeArrays(objects){

	for(x of objects){
		if(typeof x != 'object') throw `${x} is not an object`
	    if(Object.keys(x).length <= 0) throw `Error: One or more objects are empty`
	}

	list = [];
	for(let i = 0;i < objects.length; i++){
		for(x in objects[i]){

			smallList = [];
			smallList = [x,objects[i][x]];
			list.push(smallList);

		}
	}

	return list;

}

function isDeepEqual(obj1,obj2){
	if(typeof obj1 != 'object' || typeof obj2 != 'object') throw 'Error: Inputs must both be objects'

	bool = true;
	for(let x in obj1){
		if(typeof(obj1[x]) == 'object'){
			if(!isDeepEqual(obj1[x],obj2[x])){
				return false;
			}

		}

		else{
			if(obj1[x] == obj2[x]){
				bool = true;
			}
			else{
				return false;
			}
		}

		

	}
	return bool;


}

function computeObject(object,func){
if(typeof object != 'object') throw `${object} is not an object`
if(typeof func != 'function') throw `${func} is not a function`
obj = {};

for(let x in object){
	mapped = func(object[x]);
	obj[x] = mapped;
}

return obj;

}








module.exports = { makeArrays, isDeepEqual, computeObject};