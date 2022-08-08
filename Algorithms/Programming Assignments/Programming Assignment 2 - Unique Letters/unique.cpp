/*******************************************************************************
 * Name        : unique.cpp
 * Author      : Christopher Cousillas
 * Date        : 9/16/19
 * Description : Determining uniqueness of chars with int as bit vector.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <cctype>
#include <sstream>

using namespace std;

bool is_all_lowercase(const string &s) {
    // TODO: returns true if all characters in string are lowercase
	
	for(int i  : s){
    	if(!islower(i)){
    		return false ;
    	}
    }
    return true;
    // letters in the English alphabet; false otherwise.
}

bool all_unique_letters(const string &s) {

    int count = 0; 
    //loops through bit string
    for(int i : s){
    	//calculate diffrence of ascii to determine array location 
		int x = i - 'a';     
		//shifts to left by x to and 'ands' to check if repeated letter
		if((count & (1 << x)) >0) { 
			return false;
		} 
		else{
			//'ors' and adds unique letter to count
     		count = count | (1 << x);
            }
	}  
	return true;
}

    // TODO: returns true if all letters in string are unique, that is
    // no duplicates are found; false otherwise.
    // You may use only a single int for storage and work with bitwise
    // and bitshifting operators.
    // No credit will be given for other solutions.


int main(int argc, char * const argv[]) {
	
	string s;
	istringstream iss;

	if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <string>"
             << endl;
        return 1;
    }

    iss.str(argv[1]);

    if (!(iss >> s)) {
        cerr << "Error: String must contain only lowercase letters."
             << endl;
        return 1;
    }
    if (!is_all_lowercase(s)) {
        cerr << "Error: String must contain only lowercase letters."
             << endl;
        return 1;
}
    if(is_all_lowercase(s)){
    	if(all_unique_letters(s)==true){
    	cerr << "All letters are unique."
             << endl;
         return 1;

    }
    	if(all_unique_letters(s)==false){
    	cerr << "Duplicate letters found."
             << endl;
         return 1;
    }
}

    
    // TODO: reads and parses command line arguments.
    // Calls other functions to produce correct output.


}