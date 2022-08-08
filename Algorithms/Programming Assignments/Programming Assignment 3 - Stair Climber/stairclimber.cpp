/*******************************************************************************
 * Name        : stairclimber.cpp
 * Author      : Christopher Cousillas
 * Date        : 9/27/19
 * Description : Lists the number of ways to climb n stairs.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>


using namespace std;

	//returns number of digits given a number
    int num_digits(int num) {
    	int i = 1;
    	int div= num/10;
    	while(div>0){
    		i++;
    		div=div/10;
    	}
    	return i;

    }

//returns the ways of stairs given a number you can climb
vector< vector<int> > get_ways(int num_stairs) {
	vector<vector<int>> ways;
	vector<int> range = {1, 2, 3};
	if(num_stairs <=0){
		ways.push_back({});
	}
	else{
		for( auto i : range){
			if (num_stairs >= i){
				vector<vector<int>> result = get_ways(num_stairs - i);
				for(auto x : result){
					x.push_back(i);
					ways.push_back(x);
				}
				
			}
		}
	}

	return ways;
	


    // TODO: Return a vector of vectors of ints representing
    // the different combinations of ways to climb num_stairs
    // stairs, moving up either 1, 2, or 3 stairs at a time.
}

//displays all the ways to climb the stairs 1, 2, or 3 times
void display_ways(const vector< vector<int> > &ways) {

	vector<vector<int>> sways = ways;
	sort(sways.begin(), sways.end());

	for(unsigned int i = 0; i<sways.size();i++){
		vector<int> list = sways.at(i);


		int width = num_digits(sways.size());

		cout << setw(width);
		cout << i+1;

		cout << ". [";
		for(unsigned int j = 0;j<list.size();j++){

			cout << list.at(j);
			if(list.size()-1!=j){
				cout << ", ";
			}
		}

		cout << "]" << endl;

	}
	

	
    // TODO: Display the ways to climb stairs by iterating over
    // the vector of vectors and printing each combination.
}
 
//main program handling expections
int main(int argc, char * const argv[]) {
	istringstream iss;
	int n;

	if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <number of stairs>"
             << endl;
        return 1;
    }

    iss.str(argv[1]);
	
    if ( !(iss >> n) ) {
        cerr << "Error: Number of stairs must be a positive integer."
             << endl;
        return 1;
    }

    iss.clear(); // clear the error code

    if ( n <= 0 ) {
        cerr << "Error: Number of stairs must be a positive integer."
             << endl;
        return 1;
    }

    else{

    	if(get_ways(n).size()==1){
		cout << get_ways(n).size() << " way to climb " << n << " stair." << endl; 
    	}
    	else{
    	cout << get_ways(n).size() << " ways to climb " << n << " stairs." << endl; 
}
    }


display_ways(get_ways(n));
return 0;




}
