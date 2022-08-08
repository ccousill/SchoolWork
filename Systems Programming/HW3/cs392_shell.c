/*
Christopher Cousillas
5/3/20
I pledge my honor that I have abided by the Stevens Honor System
*/

#include "cs392_exec.h"
#include "cs392_log.h"
#include "cs392_signal.h"
#include<stdio.h> 
#include<string.h> 
#include<stdlib.h> 
#include<unistd.h> 
#include<errno.h>
#include<sys/types.h> 
#include<sys/wait.h> 
#include<readline/history.h>

void free_mem(char ** x){
    // Free's up all heap memory that was allocated
    for(int i=0; i<100; i++){
        free(x[i]);
    }
    free(x);
    exit(1);
}
//this splits the command given into an array
int parseline(char* cmd, char** params) {
    int i,n=-1;
    for(i=0; i<10; i++) {
        params[i] = strsep(&cmd, " ");
        n++;
        if(params[i] == NULL) break;
    }
    return(n);
};


int main() {    
	//initialize variables to be used
    char cmd[101];    
    char * params[11];    
    char * argv1[11] = {0};    
    char * argv2[11] = {0};    
    int k, y, x;    
    int f = 1;    



    while(1) {

    	//calls signals to handle CTRL-C and CTRL-Z
    	sighandle();
        printf("cs392_shell $: ");  

        //retreives typed commands
        if(fgets(cmd, sizeof(cmd), stdin) == NULL){

        	break; 
        	} 
        if(cmd[strlen(cmd)-1] == '\n') {
            cmd[strlen(cmd)-1] = '\0';    
        }  

        //logs line given to text file
        logFile(cmd);  

        //takes apart the line and splits it into different parameters
        int j=parseline(cmd, params);   

        //checks if user typed exit
        if (strcmp(params[0], "exit") == 0){
        	printf("Bye!\n");
        	break;
        }   

        //checks if pipe was found
        for (k=0; k <j; k++) {   
            if (strcmp(params[k], "|") == 0) {   
                f = 0; y = k; 
                break;

            }               
        }
        
        //case for if piped was found
        if (f==0) {

        	//sets paraamters to argv1 and argv2 to be piped
            for (x=0; x<k; x++) {    
               argv1[x]=params[x];
            }     
            int z = 0;   
            for (x=k+1; x< j; x++) {     
                argv2[z]=params[x];
                z++;
            }    


            //executes piped command
            //After piped argument ends, the outcome its complete and intented however the program ends and the while loop terminates. Could not figure out why
            if (executePipedArgs(argv1, argv2) == 0){
               free_mem(argv1);
               free_mem(argv2);
               break;
            }  

         } 

         else if (f==1) {  


         	//executes single command  
            if (executeArgs(params) == 0){
               free_mem(params);
               break;
            }

         }

    } // end while loop

    return 0;

}


