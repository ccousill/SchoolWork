//Christopher Cousillas
//9/8/2020
//CS 546WS
//I pledge my Honor that I have abided by the Stevens Honor System.


const questionOne = function questionOne(arr) {
    //initialize empty object
    let obj = {};

    //empty list case
    if(arr==undefined || arr.length == 0){
        return obj;
    }
    //reads through list and identifies the Prime and not prime and adds o the object
    else{
        for(x of arr){
         obj[x] = isPrime(x);
        }

        return obj;
    }
}

//Generic prime number checking function
function isPrime(n)
{

  if (n===1)
  {
    return false;
  }
  else if(n === 2)
  {
    return true;
  }else
  {
    for(var x = 2; x < n; x++)
    {
      if(n % x === 0)
      {
        return false;
      }
    }
    return true;  
  }
}


const questionTwo = function questionTwo(arr) { 
    //empty list case
    if(arr==undefined || arr.length == 0){
        return 0;
    }
    //maps each element in the array with a squared function
    let sum = 0;
    let arraySquared = arr.map((x) =>{
        return x *x;
    });

    //adds squared array
    for(x of arraySquared){
        sum = sum + x;
    }

    //ending square and square root results
    sum = Math.pow(sum,6);
    sum = Math.pow(sum,0.5);

    return sum;

}


const questionThree = function questionThree(text) {
        //intializing object and all variables to be tallied later
        let obj = {};
        let consonants = 0;
        let vow = 0;
        let numb = 0;
        let sp= 0;
        let punc = 0;
        let sc = 0;

        for(x of text){
            //vowel case
            if(x == 'a' || x== 'e' || x == 'i' || x== 'o' || x == 'u' || x == 'A' || x== 'E' || x == 'I' || x== 'O' || x == 'U'){
                vow +=1;
            }
            //number case
            else if(x== '0' || x == '1'|| x == '2' || x== '3' || x == '4'|| x == '5' || x== '6' || x == '7'|| x == '8' || x== '9'){
                numb +=1;
            }
            //specialCharacter case
            else if(x== '#' || x == '$' || x == '%' || x == '&'|| x == '^' || x== '@' || x== '*' || x=='+' || x== '=' || x == '_' || x == "<" || x == ">" || x== "}" || x=="{" || x=="~"){
                sc +=1;
            }
            //punctuation case
            else if(x == '.' || x == ',' || x == '?' || x== '!' || x == '\'' || x == '\"' || x == ':' || x==';' || x == '-' || x== '[' || x== ']' || x== '(' || x == ')' || x== '/'){
                punc +=1;
            }
            //space case
            else if(x == ' '){
                sp +=1;
            }
            //consonant case
            else{
                consonants += 1;

            }

        }
            //adding each element to the object
            obj.consonants = consonants;
            obj.vowels = vow;
            obj.numbers = numb;
            obj.spaces = sp;
            obj.punctuation = punc;
            obj.specialCharacters = sc;
            return obj;
}

const questionFour = function questionFour(num1,num2,num3) {
    //Compoud monthly payment calculation
    let total = num1;
    let rate = ((num2/100)/12);
    total = (total*rate*Math.pow(1+rate,num3*12))/
                ((Math.pow(1+rate,num3*12))-1);
    total = total.toFixed(2);
    return total;
}



module.exports = {
    firstName: "Christopher", 
    lastName: "Cousillas", 
    studentId: "10435702",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};

