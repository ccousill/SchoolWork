//Christopher Cousillas
//9/24/20
//CS546
const people = require("./people");
const work = require("./work");
const axios = require('axios');


async function main(){

//PEOPLE

    //getPersonById
    console.log("getPersonById:\n")
    try{
        const personId = await people.getPersonById(57);
        console.log(personId);
    }catch(e){
        console.log (e);
    }


    //howManyPerState
    console.log("howManyPerState:\n");
    try{
        const howManyPerState = await people.howManyPerState('NY');
        console.log(howManyPerState);
    }catch(e){
        console.log (e);
    }


    //personByAge
    console.log("personByAge:\n");
    try{
        const personByAge = await people.personByAge(999);
        console.log(personByAge);
    }catch(e){
        console.log (e);
    }


    //peopleMetrics
    console.log("peopleMetrics:\n");
    try{
        const peopleMetrics = await people.peopleMetrics();
        console.log(peopleMetrics);
    }catch(e){
        console.log (e);
    }



//WORK


    //listEmployees
    console.log("listEmployees:\n");
 	try{
        const listEmployees = await work.listEmployees();
    }catch(e){
        console.log (e);
    }



    //fourOneOne
    console.log("fourOneOne:\n");
    try{
        const fourOneOne = await work.fourOneOne('240-144-7553');
        console.log(fourOneOne);
    }catch(e){
        console.log (e);
    }




    //whereDoTheyWork
    console.log("whereDoTheyWork:\n");
    try{
        const whereDoTheyWork = await work.whereDoTheyWork('277-85-0056');
        console.log(whereDoTheyWork);
    }catch(e){
        console.log (e);
    }


}

//call main
main();