const axios = require('axios');


async function getWork(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
  const parsedData = data // parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}

async function getPeople(){
  const  {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
  const parsedData = data;// parse the data from JSON into a normal JS Object
  return parsedData // this will be the array of people objects
}

//lists all employees that work at each company
async function listEmployees(){
	const work = await getWork();
	const person = await getPeople();
	bigList = [];
	for(let x in work){
		bigObj = {}
		employees = [];
		bigObj.companyName = work[x]['company_name'];
		for(let y of work[x]['employees']){

			for(let z in person){
				smallObj = {};
				if(y == person[z]['id']){
					
					smallObj.firstName = person[z]['first_name'];
					smallObj.lastName = person[z]['last_name'];
					employees.push(smallObj);
				}


			}
			
		
		}

		bigObj.employees = employees;
		console.log(bigObj);
		//bigList.push(bigObj);
	}
	//wanted to return a list of objects that were pushed to bigList, this does work, however the display in the console showed
	//employees: [ [object],[object],[object],[object] ] the values were correct and set to the right place, but i resorted to
	//printing each object manually as shown above.


}

//returns true if given input is in the format of a phone number
function phonenumber(inputtxt)
{
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneno)){
        return true;
    }
    else{
        return false;
    }
}

//returns the company and address given the company phone number
async function fourOneOne(phoneNumber){
	const work = await getWork();
	if(typeof phoneNumber != 'string') throw 'Error'
	if(!phonenumber(phoneNumber)) throw 'Not in proper ###-###-#### format'

	obj = {};
	for(let x in work){
		if(phoneNumber == work[x]['company_phone']){
			obj.company_name = work[x]['company_name'];
			address = {};
			for(let y in work[x]['company_address']){
				address[y] = work[x]['company_address'][y];
			}
			obj.company_address = address;
		}
	}
	if(JSON.stringify(obj) === '{}') throw 'Nothing exists for this phone number'

	return obj;

}

//returns true if given input is in the format of a social security number
function socialSecurity(inputtxt)
{
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneno)){
        return true;
    }
    else{
        return false;
    }
}

async function whereDoTheyWork(ssn){
	const work = await getWork();
	const person = await getPeople();
	if(typeof ssn != 'string') throw 'Error';
	if(!socialSecurity(ssn)) throw 'Error, not in proper format'

	for(let x in person){
		if(ssn == person[x]['ssn']){

			for(let y in work){

				for(let z of work[y]['employees']){

					if(person[x]['id'] == z ){

						return `${person[x]['first_name']} ${person[x]['last_name']} works at ${work[y]['company_name']}`
					}
				}
			}
		}

		

	}
	return 'Person not found';

}

module.exports = {getWork,listEmployees,fourOneOne,whereDoTheyWork};