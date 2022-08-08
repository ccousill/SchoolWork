/*
Christopher Cousillas
5/3/20
I pledge my honor that I have abided by the Stevens Honor System
*/
#include <stdio.h> 
#include<string.h> 
#include<stdlib.h> 
#include<unistd.h> 
#include<errno.h>
#include<sys/types.h> 
#include<sys/wait.h> 
#include "cs392_log.h"
#include "cs392_exec.h"


//single argument execution
int executeArgs(char** params) {
	

	//initiates fork process
    pid_t pid = fork();

    //determines error in the fork
    if (pid == -1) { 
        char *error = strerror(errno);
        printf("Fork error\n");
        return 1;
    } 
    //child process 
    else if (pid == 0) {

    	//this executes the command
        execvp(params[0], params); 
        char *error = strerror(errno);
        printf("Unkown Command\n");
        return 0;
    } 
    //parent process
    else { 
        int childstatus;
        waitpid(pid, &childstatus, 0);    
        return 1;
    }
}



//Multiple arguement exectuion with pipe
int executePipedArgs(char ** argv1, char ** argv2) {
    int fds[2];
    pipe(fds);
    int i;
  
    //initialize fork
    pid_t pid = fork();

    //error in fork
    if (pid == -1) { 

        char *error = strerror(errno);
        printf("Fork error\n");
        return 1;
    } 

    //child process
    if (pid == 0) { 
        close(fds[1]);
        dup2(fds[0], 0);
        close(fds[0]);

 		//exectutes command
        if(execvp(argv2[0], argv2)<0){
            char *error = strerror(errno);
            printf("Unkown Command\n");
            return 0;
         }

        return 0;

    } 
    // parent process
    else { 

        close(fds[0]);
        dup2(fds[1], 1);
        close(fds[1]);

        //executes command
        if(execvp(argv1[0], argv1) < 0){
        	char *error = strerror(errno);
        	printf("Unknown command\n");
        	return 0;
        
      }

     return 0;
    }


   
}





