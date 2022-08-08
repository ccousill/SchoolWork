/*******************************************************************************
 * Name        : sieve.cpp
 * Author      : Christopher Cousillas
 * Date        : 9/8/2019
 * Description : Sieve of Eratosthenes
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/



/*initialize to true expect 0 and 1 sqrt of floor of length of list */



#include <cmath>
#include <iomanip>
#include <iostream>
#include <sstream>

using namespace std;

class PrimesSieve {
public:
    PrimesSieve(int limit);

    ~PrimesSieve() {
        delete [] is_prime_;
    }

    int num_primes() const {
        return num_primes_;
    }

    void display_primes() const;

private:
    // Instance variables
    bool * const is_prime_;
    const int limit_;
    int num_primes_, max_prime_;

    // Method declarations
    int count_num_primes() const;
    void sieve();
    static int num_digits(int num);
};

PrimesSieve::PrimesSieve(int limit) :
        is_prime_{new bool[limit + 1]}, limit_{limit} {
    sieve();
}

//displays prime numbers up to the max number of primes given
void PrimesSieve::display_primes() const {

	cout << endl;
	cout << "Number of primes found: " << count_num_primes() << endl;
	cout << "Primes up to " << limit_ << ":"<< endl;

	const int max_prime_width = num_digits(max_prime_),
 	primes_per_row = 80 / (max_prime_width + 1);
 	int count = 0;

 	for(int i = 2; i<=limit_; i++){
 		if(count_num_primes() <=primes_per_row){
 			if(i == max_prime_){
 				cout << i;
 			}
 			else if(is_prime_[i]==true){
 				cout << i << " ";
 			}

 		}
 		else{
			if(is_prime_[i]==true){
				if(count== primes_per_row-1){
					std::cout << std::setw(max_prime_width) << i << endl;
					count = 0;
				}
				else if(i == max_prime_){
					std::cout << std::setw(max_prime_width) << i;
					break;

				}
				else{
					// cout << "Count: " << count << endl;
					// cout << "primes_per_row: " << primes_per_row << endl;
		 			std::cout << std::setw(max_prime_width) << i << " ";
		 			count++;

				}


			}
 		

 		}

}
    // TODO: write code to display the primes in the format specified in the
    // requirements document.
}
//counts total number of primes from 2 to limit given
int PrimesSieve::count_num_primes() const {
	int count = 0;
	for(int j = 0; j<=limit_; j++){
		if(is_prime_[j]==true){
			count++;
		}

	}

    // TODO: write code to count the number of primes found
    return count;
}

//filters an array of numbers given that sets a boolean to each prime number to true and not prime number to false, gets max prime number of list as well
void PrimesSieve::sieve() {
	for(int i = 2; i<=limit_; i++ ){
		is_prime_[i]=true;
	}
	for(int i = 2; i<=sqrt(limit_);i++){
		if(is_prime_[i]==true){
			for(int j = pow(i,2); j <= limit_; j = j+i){
				is_prime_[j] = false;

			}

		}
	}

	for(int i = limit_; i>=2; i--){

		if(is_prime_[i]==true){
			max_prime_= i;
			break;
		}

	}


    // TODO: write sieve algorithm
}
//counts the largest number of digits of the given number in the array
int PrimesSieve::num_digits(int num) {
    	int i = 1;
    	int div= num/10;
    	while(div != 0){
    		i++;
    		div=div/10;
    	}
    	return i;

    // TODO: write code to determine how many digits are in an integer
    // Hint: No strings are needed. Keep dividing by 10.
    
}

int main() {
    cout << "**************************** " <<  "Sieve of Eratosthenes" <<
            " ****************************" << endl;
    cout << "Search for primes up to: ";
    string limit_str;
    cin >> limit_str;
    int limit;

    // Use stringstream for conversion. Don't forget to #include <sstream>
    istringstream iss(limit_str);

    // Check for error.
    if ( !(iss >> limit) ) {
        cerr << "Error: Input is not an integer." << endl;
        return 1;
    }
    if (limit < 2) {
        cerr << "Error: Input must be an integer >= 2." << endl;
        return 1;
    }

   	PrimesSieve test(limit);
    test.display_primes();

    return 0;




    // TODO: write code that uses your class to produce the desired output.
 
}
