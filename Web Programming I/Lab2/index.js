const arrayUtils = require ("./arrayUtils");
const stringUtils = require ("./stringUtils");
const objUtils = require ("./objUtils");

//Mean tests
console.log("FUNCTION 1 ARRAY:");

try{
	//should pass
	const meanOne = arrayUtils.mean([5,8,454]);
	console.log("mean passed successfully")
}catch(e){
	console.log("mean failed test case");
}

try{
	//should fail
	const meanTwo = arrayUtils.mean([1,"banana",3]);
	console.log("mean did not error")
}catch(e){
	console.log("mean failed successfully");
}



//medianSquared tests
console.log("\nFUNCTION 2 ARRAY:")
try{
	//should pass
	const medianSquaredOne = arrayUtils.medianSquared([1,2,4,6,10,12]);
	console.log('medianSquared passed successfully');
}catch(e){
	console.log('medianSquared failed test case');
}

try{
	//should fail
	const medianSquaredTwo = arrayUtils.medianSquared([1,2,"Chris",5]);
	console.log('medianSquared did not error')
}catch(e){
	console.log("medianSquared failed successfully");
}



//maxElement tests
console.log("\nFUNCTION 3 ARRAY:");
try{
	//should pass
	const maxElementOne = arrayUtils.maxElement([3,3,3,3,3,3]);
	console.log("maxElement passed successfully")
}catch(e){
	console.log("maxElement failed test case" );
}

try{
	//should fail
	const maxElementTwo = arrayUtils.maxElement([]);
	console.log('maxElement did not error')
}catch(e){
	console.log('maxElement failed successfully');
}


//fill tests
console.log("\nFUNCTION 4 ARRAY:");
try{
	//should pass
	const fillOne = arrayUtils.fill(5,"Chris");
	console.log("fill passed successfully")
}catch(e){
	console.log("fill failed test case");
}

try{
	//should fail
	const fillTwo = arrayUtils.fill(-1);
	console.log('fill did not error')
}catch(e){
	console.log('fill failed successfully');
}


//countRepeating tests
console.log("\nFUNCTION 5 ARRAY:");
try{
	//should pass
	const countRepeatingOne = arrayUtils.countRepeating([2,4,2,7,7,"hello","three","three",2,7,7]);
	console.log("countRepeating passed successfully")
}catch(e){
	console.log("countReapting failed test case");
}

try{
	//should fail
	const countRepeatingTwo = arrayUtils.countRepeating(83343);
	console.log("countRepeating did not error")
}catch(e){
	console.log("countRepeating failed successfully");
}


//isEqual tests
console.log("\nFUNCTION 6 ARRAY:");
try{
	//should pass
	const arrayUtilsOne = arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z']);
	console.log("isEqual passed successfully")
}catch(e){
	console.log("isEqual failed test case");
}


try{
	//should fail
	const arrayUtilsTwo = arrayUtils.isEqual(378,56);
	console.log("isEqual did not error")
}catch(e){
	console.log("isEqual failed successfully");
}





//camelCase tests
console.log("\nFUNCTION 1 STRING")

try{
	//should pass
	const camelCaseOne = stringUtils.camelCase('my function rocks');
	console.log("camelCase passed successfully")
}catch(e){
	console.log("camelCase failed test case");
}


try{
	//should fail
	const camelCaseTwo = stringUtils.camelCase(57);
	console.log("camelCase did not error")
}catch(e){
	console.log("camelCase failed successfully");
}


//replaceChar tests
console.log("\nFUNCTION 2 STRING")

try{
	//should pass
	const replaceCharOne = stringUtils.replaceChar('Mommy');
	console.log("replaceChar passed successfully");
}catch(e){
	console.log("replaceChar failed test case");
}

try{
	//should fail
	const replaceCharTwo = stringUtils.replaceChar("");
	console.log("replaceChar did not error");
}catch(e){
	console.log("replaceChar failed successfully");
}



//mashUp tests
console.log("\nFUNCTION 3 STRING")

try{
	//should pass
	const mashUpOne = stringUtils.mashUp("Christopher", "Cousillas");
	console.log("mashUp passed successfully")
}catch(e){
	console.log("mashUp failed test case");
}

try{
	//should fail
	const mashUpTwo = stringUtils.mashUp("C", "Hello");
	console.log("mashUp did not error")
}catch(e){
	console.log("mashUp failed successfully");
}


const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const fourth = { y: 2, x : 2};
const fifth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const sixth  = {c: true, b: 7, d: "Test", a: {sB: "Ther", sC: "Class", sA: "Hello"}}


//makeArrays tests
console.log("\nFUNCTION 1 OBJECT")
try{
	//should pass
	const makeArraysOne = objUtils.makeArrays([first, second, third]);
	console.log("makeArrays passed successfully")
}catch(e){
	console.log("makeArrays failed test case");
}

try{
	//should fail
	const makeArraysTwo = objUtils.makeArrays([first, 24 , third]);
	console.log("makeArrays did not error")
}catch(e){
	console.log("makeArrays failed successfully");
}



//isDeepEqual tests
console.log("\nFUNCTION 2 OBJECT");
try{
	//should pass
	const isDeepEqualOne = objUtils.isDeepEqual(fifth, sixth);
	console.log("isDeepEqual passed successfully")
}catch(e){
	console.log("isDeepEqual failed test case");
}

try{
	//should fail
	const isDeepEqualTwo = objUtils.isDeepEqual(3, sixth);
	console.log("isDeepEqual did not error")
}catch(e){
	console.log("isDeepEqual failed successfully");
}

//computeObject tests
console.log("\nFUNCTION 3 OBJECT");
try{
	//should pass
	const computeObjectOne = objUtils.computeObject(first, n =>n*2);
	console.log("computeObject passed successfully")
}catch(e){
	console.log("computeObject failed test case");
}

try{
	//should fail
	const computeObjectTwo = objUtils.computeObject(845, n =>n*2);
	console.log("computeObject did not error")
}catch(e){
	console.log("computeObject failed successfully");
}


