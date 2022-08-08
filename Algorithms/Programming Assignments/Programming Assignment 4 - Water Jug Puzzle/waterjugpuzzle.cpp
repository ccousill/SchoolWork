/*******************************************************************************
 * Name        : waterjugpuzzle.cpp
 * Author      : Christopher Cousillas
 * Date        : 10/10/19
 * Description : Solves the water jug puzzle using breadth-first search.
 * Pledge      : I pledge my honor that I have abided by the Stevens Honor System.
 ******************************************************************************/

#include <iostream>
#include <sstream>
#include <vector>
#include <string>
#include <queue>

using namespace std;

//Struct to represent state of water in the jugs.
struct State {
    int a, b, c;
    vector<string> directions;
    
    State(int _a, int _b, int _c) : a(_a), b(_b), c(_c) { }
    
    // String representation of state in tuple form.
    string to_string() {
        ostringstream oss;
        oss << "(" << a << ", " << b << ", " << c << ")";
        return oss.str();
    }
};
    
    //Pours C to A
    State pourCtoA(State *curr, State *cap){
        State temp = *curr;
        int amount;

        //Fills up jug a
        if(cap->a-temp.a <= temp.c){
            temp.a = cap->a;
            temp.c -= cap->a-curr->a;
            amount = cap->a-curr->a;
            if(amount == 1){
            temp.directions.push_back("Pour " + to_string(amount) + " gallon from C to A. " + temp.to_string() );
            }
            else{
            temp.directions.push_back("Pour " + to_string(amount) + " gallons from C to A. " + temp.to_string() );
            }

        }
        //empties jug C to A
        else if(cap->a-temp.a > temp.c){
            temp.a += temp.c;
            amount = temp.c;
            temp.c = 0;

            if(amount == 1){
             temp.directions.push_back("Pour " + to_string(amount) + " gallon from C to A. " + temp.to_string() );

            }
            else{

            temp.directions.push_back("Pour " + to_string(amount) + " gallons from C to A. " + temp.to_string() );
        }
        }

        

        return temp;

    }
    //Pours B to A
    State pourBtoA(State *curr, State *cap){
        State temp = *curr;
        int amount;
        //Fills up jug a
        if(cap->a-temp.a <= temp.b){
            temp.a = cap->a;
            temp.b -= cap->a-curr->a;
            amount = cap->a-curr->a;

            if(amount==1){
                 temp.directions.push_back("Pour " + to_string(amount) + " gallon from B to A. " + temp.to_string() );
            }
            else{
                 temp.directions.push_back("Pour " + to_string(amount) + " gallons from B to A. " + temp.to_string() );
            }

        }
        //empties Jug B to A
        else if(cap->a-temp.a > temp.b){
            temp.a += temp.b;
            amount = temp.b;
            temp.b = 0;

            if(amount ==1){
                 temp.directions.push_back("Pour " + to_string(amount) + " gallon from B to A. " + temp.to_string() );
            }
            else{

             temp.directions.push_back("Pour " + to_string(amount) + " gallons from B to A. " + temp.to_string() );
            }

            
        }

       
        return temp;

        
    }

    //Pours C to B
    State pourCtoB(State *curr, State *cap){
        State temp = *curr;
        int amount;

        //Fills up jug a
        if(cap->b-temp.b <= temp.c){
            temp.b = cap->b;
            temp.c -= cap->b-curr->b;
            amount = cap->b-curr->b;

            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from C to B. " + temp.to_string() );
            }
            else{
            temp.directions.push_back("Pour " + to_string(amount) + " gallons from C to B. " + temp.to_string() );
            }
        }
        //empties jug C to B

        else if(cap->b-temp.b > temp.c){
            temp.b += temp.c;
            amount = temp.c;
            temp.c = 0;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from C to B. " + temp.to_string() );
            }
            else{
                temp.directions.push_back("Pour " + to_string(amount) + " gallons from C to B. " + temp.to_string() );
            }
            
        }

        
        return temp;

        
    }
    //Pours A to B
    State pourAtoB(State *curr, State *cap){
        State temp = *curr;
        int amount;

        //Fills up jug a
        if(cap->b-temp.b <= temp.a){
            temp.b = cap->b;
            temp.a -= cap->b-curr->b;
            amount = cap->b-curr->b;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from A to B. " + temp.to_string() );
            }
            else{

             temp.directions.push_back("Pour " + to_string(amount) + " gallons from A to B. " + temp.to_string() );
            }

        }
        //empties Juh A to B
        else if(cap->b-temp.b > temp.a){
            temp.b += temp.a;
            amount = temp.a;
            temp.a = 0;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from A to B. " + temp.to_string() );
            }
            else{

             temp.directions.push_back("Pour " + to_string(amount) + " gallons from A to B. " + temp.to_string() );
            
            }

        }
       
        return temp;

        
    }
    //Pours B to C
    State pourBtoC(State *curr, State *cap){
        State temp = *curr;
        int amount;

        //Fills up jug a
        if(cap->c-temp.c <= temp.b){
            temp.c = cap->c;
            temp.b -= cap->c-curr->c;
            amount = cap->c-curr->c;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from B to C. " + temp.to_string() );
            }
            else{
                temp.directions.push_back("Pour " + to_string(amount) + " gallons from B to C. " + temp.to_string() );
            }

        }
        //empties Jug B to C
        else if(cap->c-temp.c > temp.b){
            temp.c += temp.b;
            amount = temp.b;
            temp.b = 0;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from B to C. " + temp.to_string() );
            }
            else{
                temp.directions.push_back("Pour " + to_string(amount) + " gallons from B to C. " + temp.to_string() );
            }
            
        }

        
        return temp;

        
    }
    //Pours A to C
    State pourAtoC(State *curr, State *cap){
        State temp = *curr;
        int amount;

        //Fills up jug a
        if(cap->c-temp.c <= temp.a){
            temp.c = cap->c;
            temp.a -= cap->c-curr->c;
            amount = cap->c-curr->c;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from A to C. " + temp.to_string() );
            }
            else{
                temp.directions.push_back("Pour " + to_string(amount) + " gallons from A to C. " + temp.to_string() );
            }
        
        }
        //empties jug A to C
        else if(cap->c-temp.c > temp.a){
            temp.c += temp.a;
            amount = temp.a;
            temp.a = 0;
            if(amount==1){
                temp.directions.push_back("Pour " + to_string(amount) + " gallon from A to C. " + temp.to_string() );
            }
            else{
                temp.directions.push_back("Pour " + to_string(amount) + " gallons from A to C. " + temp.to_string() );
            }
        }

        
        return temp;

        
    }







int main(int argc, char* const argv[]) {
    int n;
    
    
  
    istringstream iss;
    char list[] = {'A','B','C','A','B','C'};

    //Checks if number of arguments type is the right amount
    if (argc != 7) {
        cerr << "Usage: ./waterjugpuzzle <cap A> <cap B> <cap C> <goal A> <goal B> <goal C>"<< endl;
        return 1;
    }

    //Checks if there is invalid input in the capacity
    for(int i = 1; i< 4; i++){
        iss.clear();
        iss.str(argv[i]);

        if(!( iss >> n) || n <=0){
            cerr << "Error: Invalid capacity '"<< argv[i] << "' for jug "<< list[i-1] << "." << endl;
            return 1;
        }


    }
    //Checks if there is invalid input in the capacity
    for(int i = 4; i<7;i++){
        iss.clear();
        iss.str(argv[i]);

        if(!(iss >> n) || n < 0){
            cerr << "Error: Invalid goal '"<< argv[i] << "' for jug "<< list[i-1] << "."<< endl;
            return 1;
        }

        
   }
    //setting up variables for all input arguments
    istringstream iuu;
    istringstream ivv;
    istringstream iww;
    istringstream ixx;
    istringstream iyy;
    istringstream izz;
    iuu.str(argv[1]); //a
    ivv.str(argv[2]); //b
    iww.str(argv[3]); //c
    ixx.str(argv[4]); //d
    iyy.str(argv[5]); //e
    izz.str(argv[6]); //f
    int a, b,c,d,e,f;
    iuu >> a;
    ivv >> b;
    iww >> c;
    ixx >> d;
    iyy >> e;
    izz >> f;

    //Checks if Goal is larger than capacity
    if(a < d ){
        cerr << "Error: Goal cannot exceed capacity of jug A." << endl;
        return 1;
    }
    if(b < e ){
        cerr << "Error: Goal cannot exceed capacity of jug B." << endl;
        return 1;
    }
    if(c < f ){
        cerr << "Error: Goal cannot exceed capacity of jug C." << endl;
        return 1;
    }

   
    //Add goals of jugs together
    
    int total = d+e+f;


    if(total != c){
        cerr << "Error: Total gallons in goal state must be equal to the capacity of jug C." << endl;
        return 1;

    }


    //initilizers for States
    queue<State> states; 
    State start(0 , 0 , c);
    State cap(a, b, c);
    State goal(d, e, f);
    State temp = start;
    vector<vector<int>> visit(a+1, vector<int>(b+1,0));


    states.push(start);
    visit[start.a][start.b]=1;
    //main loop for pouring jugs
    while(!(states.empty())){
        State frontQ = states.front();
        //check if the state in the queue is equal to the goal, if not then keeps pouring
        if(!(states.front().a == goal.a && states.front().b == goal.b && states.front().c == goal.c)){
            for(int i = 0; i<6; i++){
                if(i == 0){
                    temp = pourCtoA(&frontQ,&cap);
                }
                else if(i == 1){
                    temp = pourBtoA(&frontQ,&cap);
                }
                else if(i==2){
                    temp = pourCtoB(&frontQ,&cap);

                }
                else if(i==3){
                    temp = pourAtoB(&frontQ,&cap);

                }
                else if(i==4){
                    temp = pourBtoC(&frontQ,&cap);

                }
                else if(i==5){
                    temp = pourAtoC(&frontQ,&cap);
                }
                //marks if jug pour was visited
                if(visit[temp.a][temp.b] == 0){
                    states.push(temp);
                    visit[temp.a][temp.b]=1;

                }


            }    
 
        } 
        else{ 
            //prints directions out if there is a solution
            vector<string> dir = states.front().directions;
            cout << "Initial state. " << start.to_string() << endl;
            for(unsigned int i = 0; i< dir.size(); i++){
            cout << dir[i] << endl;
            
 
          }       
      
          return 0;

        }

           
        states.pop();
    }        
        //if the States queue is empty then the while loop doesn't run and there is no solution
         cerr << "No solution." << endl;
         return 0;

}

