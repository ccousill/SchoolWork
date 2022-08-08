// Christopher Cousillas
// I pledge my honor that I have abided by the Stevens Honor System
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <sys/time.h>
#include <arpa/inet.h>
#include <sys/select.h>
#include "cs392_log.c"


#define BUFLEN 512	//Max length of buffer
#define PORT 1024	//The port on which to listen for incoming data


int main(int argc, char ** argv){
	//checks if there are the right amount of arguments
	if(argc > 2 || argc < 2){
		printf("Must enter port number");
		return -1;
	}

	//sets structure echoserver and echoclient
	struct sockaddr_in echoserver, echoclient;

	//creates socket and checks error if its value o
	int serversock = socket(AF_INET, SOCK_STREAM, 0);
	if(serversock < 0){
		perror("Error");
		exit(1);
	}

	//intitializes port and addresses
	memset(&echoserver, 0, sizeof(echoserver)); 
	echoserver.sin_family = AF_INET; 
	echoserver.sin_addr.s_addr = INADDR_ANY; 
	echoserver.sin_port = htons(atoi(argv[1]));


	//binds socket to address
	int binding = bind(serversock, (struct sockaddr *)&echoserver, sizeof(echoserver));
	if(binding < 0){
		perror("Error");
		exit(1);
	}

	//listens to socket up to at most 5 clients
	int l = listen(serversock, 5);
	if(l<0){
		perror("Error");
		exit(1);
	}

   char buffer[PORT];
   int clientlength = sizeof(echoclient);

        //loop to constantly check if a message is sent from the same port
		while(1){
		int new_sock = accept(serversock, (struct sockaddr *)&echoclient,&clientlength);
		if(new_sock < 0){
			perror("Error");
			exit(1);
		}

		//converts address and port to be written to log
		logFile(inet_ntoa(echoclient.sin_addr), ntohs(echoclient.sin_port));

		//receives message and stores to buffer
		int rec = recv(new_sock, buffer, 1024, 0);
		if(rec < 0){
			perror("Error");
			exit(1);
		}

		//prints message sent from client
		printf("%s", buffer);

		//sends message back
		int sender = send(new_sock, buffer, strlen(buffer), 0);
		if(sender < 0){
			perror("Error");
			exit(1);
		}

		//closes socket
		int c = close(new_sock);
		if(c<0){
			perror("Error");
			exit(1);
		}

		//resets buffer
		int size = 0;
		while(buffer[size]!='\0'){
		buffer[size]='\0';
		size++;
	    }

	}


}