//Christopher Cousillas
//9/8/2020
//CS 546WS
//I pledge my Honor that I have abided by the Stevens Honor System.


const lab1 = require("./lab1");


console.log("Question 1:\n");
//QUESTION 1 TESTS
console.log(lab1.questionOne([4, 8, 10, 13, 17, 1023, 1024])); 
// {'4':false, '8': false, '10': false, '13' : true, '17' : true, '1023' : false, ; '1024' : false} 

console.log(lab1.questionOne([6])); 
// {'6': false} 

console.log(lab1.questionOne([5, 10, 9, 89, 71, 50])); 
// {'5': true, '9': false, '10': false, '50' : false, '71' : true, '89' : true}

console.log(lab1.questionOne([])); 
// {}

console.log(lab1.questionOne()); 
// {}





console.log("\n");
console.log("Question 2:\n");


//QUESTION 2 TESTS
console.log(lab1.questionTwo([4,5,6])); 
// 456533

console.log(lab1.questionTwo([8, 5, 2])); 
//804357

console.log(lab1.questionTwo([5])); 
// 15625

console.log(lab1.questionTwo([6, 6, 10, 10])); 
// 20123648

console.log(lab1.questionTwo([])); 
// 0






console.log("\n");
console.log("Question 3:\n");
//QUESTION 3 TESTS
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("Hello my name is Christopher Cousillas; I am 20 years old and go to Stevens Institute of Technology."));
// {consonants: 49, vowels: 30, numbers: 2, spaces: 17, punctuation: 2, specialCharacters: 0}


console.log(lab1.questionThree("This is a question? Now this is me yelling! (Here is a bunch of random characters &^%$&*][/ @#"));
// {consonants: 39, vowels: 24, numbers: 0, spaces: 17, punctuation: 6, specialCharacters: 8}


console.log(lab1.questionThree("Here is more random text %;:,. [] // - - - *")); 
// {consonants: 12, vowels: 8, numbers: 0, spaces: 11, punctuation: 11, specialCharacters: 2}

console.log(lab1.questionThree("")); 
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}








console.log("\n");
console.log("Question 4:\n");
//QUESTION 4 TESTS
console.log(lab1.questionFour(35000, 3.71, 8)); 
//421.92

console.log(lab1.questionFour(200000, 5.5, 10)); 
//2170.53

console.log(lab1.questionFour(90000, 8, 7)); 
//1402.76

console.log(lab1.questionFour(50000, 2.98, 9)); 
//528.39

console.log(lab1.questionFour(32000, 4.8, 5)); 
//600.95