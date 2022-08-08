const axios = require('axios');


async function getPeople(){
  const  {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}


//returns person information given id number
async function getPersonById(id){
	const person = await getPeople();
	if(typeof id != 'number') throw 'Error, not a valid number'
	if(id >= 1001 || id < 1) throw 'Error, id does not exist'

	return person[id-1];
}

//returns the number of times a certain state appears in an entry of people
async function howManyPerState(stateAbbrv){
	const person = await getPeople();
	count = 0;

	if(typeof(stateAbbrv) != 'string') throw 'Error';

	for(x in person){
	 	if(person[x]['address']['state'] == stateAbbrv) count++;
	}

	if(count <= 0) throw `Error since there are no people in ${stateAbbrv}`;


	 return count;
}


//returns a person given a number with relation to age 
async function personByAge(index){
	if(typeof index != 'number') throw 'Error';
	if(index < 0 || index > 999) throw 'Error';
	const person = await getPeople();

	person.sort((a,b) => {
		numb1 = a.date_of_birth;
		numb2 = b.date_of_birth;
		var ageOfPerson1 = new Date(numb1);
		var ageOfPerson2 = new Date(numb2);

		return ageOfPerson1 - ageOfPerson2;
	});

		return person[index];

}


//function that counts the consonants in a string
function countConsonants(string){
	count = 0;
	for(x of string){
		if(x != 'a' && x!= 'e' && x != 'i' && x!= 'o' && x != 'u' && x != 'A' && x!= 'E' && x != 'I' && x!= 'O' && x != 'U'){
			count++;
		}
	}
	return count;
}

//function that counts the vowels in a string
function countVowels(string){
	count = 0;
	for(x of string){
		if(x == 'a' || x== 'e' || x == 'i' || x== 'o' || x == 'u' || x == 'A' || x== 'E' || x == 'I' || x== 'O' || x == 'U'){
			count ++;
		}
	}
	return count;
}

//returns certain metrics given an entry of people
async function peopleMetrics(){
	const person = await getPeople();
	obj = {};
	totalLetters = 0;
	totalVowels = 0;
	totalConsonants = 0;
	longestName = '';
	shortestName = person[0]['first_name'] + ' ' + person[0]['last_name'];
	totalAge = 0;
	size = 0;

	finalCityCount = 0;

	for(let x in person){
		//gets Vowels
		totalVowels = totalVowels + countVowels(person[x]['first_name']) + countVowels(person[x]['last_name']);		
		//gets Consonants
		totalConsonants = totalConsonants + countConsonants(person[x]['first_name']) + countConsonants(person[x]['last_name']);

		nameCurrent = person[x]['first_name'] + ' ' + person[x]['last_name'];
		//gets longest name
		if(longestName.length < nameCurrent.length){
			longestName = nameCurrent;
		}
		//gets shortest name
		if(shortestName.length > nameCurrent.length){
			shortestName = nameCurrent
		}


		//most repeating city
		currentCity = person[x]['address']['city'];
		currentCityCount = 0;
		for(let y in person){
			if(person[y]['address']['city'] == currentCity){
				currentCityCount++;
			}
		}

		if(finalCityCount < currentCityCount){
			finalCityCount = currentCityCount;
			finalCity = currentCity;
		}

		//adds all ages
		currentAge = new Date(person[x]['date_of_birth']);
		var cur = new Date();
		var diff = cur-currentAge
		var age = Math.floor(diff/31557600000);
		totalAge = totalAge + age;

		//size counter
		size++;
	}


	obj.totalLetters = totalVowels + totalConsonants;
	obj.Vowels = totalVowels;
	obj.Consonants = totalConsonants;
	obj.longestName = longestName;
	obj.shortestName = shortestName;
	obj.mostRepeatingCity = finalCity
	averageAge = totalAge/size
	obj.averageAge = averageAge.toFixed(2);
	return obj;


}

module.exports = {getPeople, getPersonById, howManyPerState, personByAge, peopleMetrics};