/*
Christopher Cousillas
5/3/20
I pledge my honor that I have abided by the Stevens Honor System
*/
#include <stdio.h> 
#include<string.h> 
#include<stdlib.h> 
#include<unistd.h> 
#include<sys/types.h> 
#include<sys/wait.h> 
#include "cs392_signal.h"


void hdl(int sig, siginfo_t *siginfo, void *context) {
		//handles for CTRL C
		if(sig == SIGINT){
			printf(" Termination Signal Received, Signal is: %d\n", sig);
		}
		//Handles for CTRL Z
		if(sig == SIGTSTP){
			printf(" Stop Signal Received, Signal is: %d\n", sig);

		}
}


void sighandle() {
	struct sigaction act;

	memset(&act, '\0', sizeof(act));

	act.sa_sigaction = &hdl;
	act.sa_flags = SA_SIGINFO;
	//Error checks for CTRL C
	if (sigaction(SIGINT, &act, NULL)<0) {
		perror("Sigaction error SIGTSTP");
		exit(1);
	}
	//Error checks for CTRL Z
	if (sigaction(SIGTSTP, &act, NULL)<0) {
		perror("Sigaction error: SIGTSTP");
		exit(1);
	}
}