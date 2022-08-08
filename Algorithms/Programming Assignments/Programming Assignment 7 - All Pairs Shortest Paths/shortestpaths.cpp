/*******************************************************************************
 * Name        : testshortestpaths.cpp
 * Author      : Christopher Cousillas and Corinne Wisniewski
 * Date        : 11/20/19
 * Description : Using Floyds algorithm computes shortest path between two points given graph
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <fstream>
#include <cstdlib>
#include <exception>
#include <string>
#include <sstream>
#include <algorithm>
#include <utility>
#include <math.h>
#include <vector>
#include <limits.h>
#include <iomanip>
using namespace std;
//Long_max is the infinity that is being portrayed in this program
const long INF = LONG_MAX;

long** D;
long** I; 
//floyds main algorithm, sets the path lengths(D) and intermidiate vertices(I) given the distance matrix
void floyd(long** W, int size){
    D = W;
    int n = size;
    for(int k = 0; k < n; k++){
        for(int i = 0;i < n; i++){
            for(int j = 0; j < n; j++ ){

                if((D[i][k] != INF) && (D[k][j] != INF)){
                    if(D[i][j] <= D[i][k]+D[k][j]){
                        D[i][j] = D[i][j];
                    }
                    else{
                        D[i][j] = D[i][k] + D[k][j];
                        I[i][j] = k;
                    }

                }
            }
        }
    }
}

//deletes a 2d array, preventing memory leaks
void deleteD(long ** D, int size){
    for (int i = 0; i < size; i++){
        delete [] D[i];
    }
    delete [] D;
}

//recursively displays the steps needed to reach from the first point to the last point
void display_steps(int i, int j, char first, char last){

    if(i == j){
        return;
    }

    if(I[i][j] == INF){
        cout << last;
        return;
    }
    display_steps(i, I[i][j], first, I[i][j]+ 'A' );

    cout << " -> ";
    display_steps(I[i][j], j, I[i][j]+ 'A', last);


    
}

//gives the length of digits in an integer
long len(long num){
    int i = 1;
    int div= num/10;
    while(div != 0){
        i++;
        div=div/10;
    }
    return i;
}

//converts a given vector to an array
long** vector_to_array(vector<vector<long> > &vals, int N, int M)
{
  long** temp;
  temp = new long*[N];
  for(size_t i=0; (i < (size_t)N); i++)
 {
    temp[i] = new long[M];
    for(size_t j=0; (j < (size_t)M); j++)
    {
        temp[i][j] = vals[i][j];
    }

 }
 return temp;
}

//main display table function
void display_table(long** const matrix, const string &label, const int size, const bool use_letters = false ){
    int num_vertices = size;
    cout << label << endl;
    long max_val = 0;
    for (int i = 0; i < num_vertices; i++) {
        for (int j = 0; j < num_vertices; j++) {
            long cell = matrix[i][j];
            if (cell < INF && cell > max_val) {
                 max_val = matrix[i][j];
            }
        }
    }
    long max_cell_width = use_letters ? len(max_val) :
            len(max(static_cast<long>(num_vertices), max_val));
    cout << ' ';
    for (int j = 0; j < num_vertices; j++) {
        cout << setw(max_cell_width + 1) << static_cast<char>(j + 'A');
    }
    cout << endl;
    for (int i = 0; i < num_vertices; i++) {
        cout << static_cast<char>(i + 'A');
        for (int j = 0; j < num_vertices; j++) {
            cout << " " << setw(max_cell_width);
            if (matrix[i][j] == INF) {
                cout << "-";
            } else if (use_letters) {
                cout << static_cast<char>(matrix[i][j] + 'A');
            } else {
                cout << matrix[i][j];
            }
        }
        cout << endl;
    }
    cout << endl;
}
    



int main(int argc, const char *argv[]) {

    vector<vector<long>> distance_matrix; 
    // Make sure the right number of command line arguments exist.
    if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }


    // Create an ifstream object.
    ifstream input_file(argv[1]);
    // If it does not exist, print an error message.
    if (!input_file) {
        cerr << "Error: Cannot open file '" << argv[1] << "'." << endl;
        return 1;
    }


    // Add read errors to the list of exceptions the ifstream will handle.
    input_file.exceptions(ifstream::badbit);
    string line;
    int size;
    try {
        unsigned int line_number = 1;
        istringstream iss;
        //reads through every line in the text file
        while (getline(input_file, line)) {
            iss.str(line);
            if(line_number == 1){

                if(!(iss >> size) || ((size >26) || (size < 1))){
                    cerr << "Error: Invalid number of vertices '"<< line <<"' on line 1." <<endl;
                    return 1;
                }

                else{
                    //Creates the size of the vector distance matrix using the first line in the text file
                    for(int i = 0; i < size; i++){

                        vector<long> v;
                        for(int j = 0; j < size; j++){
                            if (i == j){
                                v.push_back(0);
                            }
                            else{

                            v.push_back(INF);

                            }

                        }
                        distance_matrix.push_back(v);
                    }

                }


            }
            //every line that isnt the first line
            else{
                stringstream ss(line);
                vector<string> num_elements;
                string var;
                while(ss >> var ){
                num_elements.push_back(var);
                }
                
                //checks if format in given text is correct
                if(num_elements.size() != 3){
                    cerr << "Error: Invalid edge data '"<< line <<"' on line "<< line_number << "." << endl;
                    return 1;

                }


                char max = size+64;
                char *first_vertex = &num_elements.at(0)[0u];
                char *last_vertex = &num_elements.at(1)[0u];

                //checks first vertex given if it is in range
                if(max < *first_vertex || *first_vertex < 64){
                    cerr << "Error: Starting vertex '"<< num_elements.at(0) <<"' on line "<< line_number <<" is not among valid values A-" << max << "." <<endl;
                    return 1;
                }
                //checks second vertex given if it is in range
                if(max < *last_vertex || *last_vertex < 64){
                    cerr << "Error: Ending vertex '"<< num_elements.at(1) <<"' on line "<< line_number <<" is not among valid values A-" << max << "."<< endl;
                    return 1;

                    }
                iss.clear();
                long edge_weight;
                iss.str(num_elements.at(2));
                //checks weight if it is in range
                if(!(iss >> edge_weight) ||edge_weight <=0){
                    cerr << "Error: Invalid edge weight '"<< num_elements.at(2) <<"' on line " << line_number <<"."<< endl;
                    return 1;
                }
                //places elements inside the distance matrix
                int i = *first_vertex - 'A';
                int j = *last_vertex - 'A';
                distance_matrix[i][j] = edge_weight;

            }
            //iterates line number
            ++line_number;
        }

        long** distance_matrix_array = vector_to_array(distance_matrix, size, size);
        //displats distance matrix
        display_table(distance_matrix_array, "Distance matrix:", size);

        //initializes the intermidiate steps to be infinity
        I = new long*[size];
        for(int i = 0; i < size; i++){
            I[i] = new long [size];
            for(int j = 0; j< size; j++){
                I[i][j] = INF;           
            }
        }


        floyd(distance_matrix_array, size);
        //displays path lengths
        display_table(D,"Path lengths:", size);
        //displays intermidiate vertices
        display_table(I, "Intermediate vertices:", size, true);

        //prints path taken from a vertice to another
        for(int i = 0; i < size; i++){
            for(int j = 0; j < size; j++){
                long path_length = D[i][j];

                char first = i + 'A';
                char last = j + 'A';
                cout << first << " -> " << last << ", distance: ";
                if(path_length == INF){
                    cout << "infinity, path: none";
                }
                else{

                cout << path_length << ", path: " << first;
                if(i!=j){
                    cout << " -> ";
                    display_steps(i,j,first,last);
                }
                }
                cout << endl;
            }

        }

        //deletes memory leaks
        deleteD(I, size);
        deleteD(D, size);
        
        //closes file
        input_file.close();
    } catch (const ifstream::failure &f) {
        cerr << "Error: An I/O error occurred reading '" << argv[1] << "'.";
        return 1;
    }


    return 0;
}
