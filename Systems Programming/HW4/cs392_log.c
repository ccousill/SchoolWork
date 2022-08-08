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
#include "cs392_log.h"

void logFile(char * input, int port) {
	// opens file cs392_socket.log, if doesn't exist then it creates it
	FILE *fp = fopen("cs392_socket.log", "a");

	//checks if can open the file
	if (fp == NULL) { 
		perror("Could no open file\n");
	} 
	else {
		//writes to file
		fprintf(fp, "Ip - %s Port - %d\n", input, port);
	}

	// Closes file
	fclose(fp);
}