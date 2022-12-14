/*******************************************************************************
 * Name    : gcd.cpp
 * Author  : Christopher Cousillas
 * Version : 1.0
 * Date    : August 29, 2019
 * Description : Computes the GCD of two command-line arguments.
 * Pledge : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <sstream>
using namespace std;

//used euclids algorithm

int gcd_recursive(int m, int n){
 	if(m == 0){
 		return n;
 	}

 	if (n == 0){
 		return m;
 	}

 	if(m==n){
 		return m;
 	}

 	if(m%n==0){
 		return abs(n);
 	}


 	else{
 		return gcd_recursive(n , m%n);
 	}


 }

 int gcd_iterative(int m, int n){
 	while(n!=0){
 		int a = m % n;
 		m=n;
 		n = a;

 	}
 	return abs(m);

 }


int main(int argc, char* const argv[]) {
    int m, n;
    istringstream iss;

    if (argc != 3) {
        cerr << "Usage: " << argv[0] << " <integer m> <integer n>"
             << endl;
        return 1;
    }
    iss.str(argv[1]);
    if ( !(iss >> m) ) {
        cerr << "Error: The first argument is not a valid integer."
             << endl;
        return 1;
    }
    iss.clear(); // clear the error code
    iss.str(argv[2]);
    if ( !(iss >> n) ) {
        cerr << "Error: The second argument is not a valid integer."
             << endl;
        return 1;
    }

    cout <<"Iterative: gcd("<<m << ", "<<n <<") = " << gcd_iterative(m, n) << endl;
    cout <<"Recursive: gcd("<<m << ", "<<n <<") = " << gcd_recursive(m, n) << endl;
    return 0;

}
   


    