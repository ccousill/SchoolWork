/*******************************************************************************
 * Name        : inversioncounter.cpp
 * Author      : Christopher Cousillas
 * Version     : 1.0
 * Date        : 10/18/2019
 * Description : Counts the number of inversions in an array.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>

using namespace std;

// Function prototype.
static long mergesort(int array[], int scratch[], int low, int high);



/**
 * Counts the number of inversions in an array in theta(n^2) time.
 */
long count_inversions_slow(int array[], int length) {
    long count = 0;
    for(int i = 0; i < length; i++){
        for(int j= i+1; j < length; j++){
            if(array[i] > array[j]){
                count++;
            }
        }
    }
    return count;
    // TODO
}

/**
 * Counts the number of inversions in an array in theta(n lg n) time.
 */
long count_inversions_fast(int array[], int length) {
    int *scratch = new int[length];
    int high = length - 1;
    int low = 0;
    long result = mergesort(array, scratch, low, high);
    delete [] scratch;
    return result;

    // TODO
    // Hint: Use mergesort!
}
//merge sort function used in fast_inversion
static long mergesort(int array[], int scratch[], int low, int high) {
    long count = 0;

    if(low<high){
        
    int mid = (((high - low)/2))+low;

    count = count + mergesort(array, scratch, low , mid);
    count = count + mergesort(array, scratch, mid+1, high);

    int l = low;
    int m = mid +1;

    for(int i = low; i <= high; i++){
        //dont swap
        if((l <=  mid) && (m > high || array[l] <= array[m])){
            scratch[i] = array[l];
            l++;
        }
        else{
            scratch[i] = array[m];
            m++;
            count = count +  ((mid - l)+1); //counts inversions at that point and adds to total
        }

    }
    for(int i = low; i <= high; i++){
         array[i] = scratch[i];
    }
}
    return count;
     //TODO
}

int main(int argc, char *argv[]) {
    // TODO: parse command-line argument
   
    //checks for arguments given were correct
    if(argc >= 3){
        cerr << "Usage: ./inversioncounter [slow]" << endl;
        return 1;
    }

    //checks if option is "slow" and if theres one given argument
    char slow[] = "slow";
    if(argc == 2 && strcmp(argv[1],slow) !=0) {
        cerr << "Error: Unrecognized option '" << argv[1] << "'." << endl;
        return 1;
    }




    cout << "Enter sequence of integers, each followed by a space: " << flush;

    istringstream iss;
    int value, index = 0;
    vector<int> values;
    string str;
    str.reserve(11);
    char c;
    string z;
    
    while (true) {
        c = getchar();
        const bool eoln = c == '\r' || c == '\n';
        if (isspace(c) || eoln) {
            if (str.length() > 0) {
                iss.str(str);
                if (iss >> value) {
                    values.push_back(value);
                } else {
                    cerr << "Error: Non-integer value '" << str
                         << "' received at index " << index << "." << endl;
                    return 1;
                }
                iss.clear();
                ++index;
            }
            if (eoln) {
                break;
            }
            str.clear();
        } else {
            str += c;
        }
    }

        
    //no numbers given
    if(values.size()==0){
        cerr << "Error: Sequence of integers not received." << endl;
        return 1;
    }
    //prints fast inversion counter
    if(argc == 1){
    long resultfast = count_inversions_fast(&values[0],values.size());
    cout << "Number of inversions: " << resultfast << endl;
    return 0;
} 
    //prints slow inversion counter
    else {
        long result = count_inversions_slow(&values[0],values.size());
        cout << "Number of inversions: " << result << endl;
        return 0;
    }
    
    


    // TODO: produce output
}
