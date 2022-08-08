let myForm = document.getElementById("myForm")
let myInput = document.getElementById("num_input")
let myOl = document.getElementById("results")
if(myForm){

	myForm.addEventListener('submit',(event)=>{
		event.preventDefault();
		if(myInput.value){
			var a = parseInt(myInput.value)
			let final = fibonacci(a)

			let li = document.createElement('li')
			li.innerHTML = "The Fibonacci of " + a +" is " + final + "."
			if(isPrime(final)){
				li.className = "is-prime"
			}
			else{
				li.className = "not-prime"
			}


			myOl.appendChild(li)
		}

	});



}

function fibonacci(num){
	if(num == 0){
		return 0
	}
	if(num == 1){
		return 1
	}

	return fibonacci(num - 2) + fibonacci(num -1)
}

function isPrime(num){
	if(num == 0){
		return false
	}
	if(num == 1){
		return false
	}
	for(var i = 2; i < num; i++){
		if(num % i === 0){
			return false
		}
	}
	return true;
}

