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

#define BUFLEN 1024	//Max length of buffer
#define PORT 1024	//The port on which to send data

int main(int argc, char ** argv){

	//chceks if there are the right amount of arguments (address and port)
	if(argc > 3 || argc < 3){
		printf("Must enter port and address");
		return -1;
	}

	struct sockaddr_in echoserver;
	char port[PORT];
	char buffer[BUFLEN];

	//creates socket and checks if there an error if the value is less than 0
	int clientsock = socket(AF_INET, SOCK_STREAM, 0);
	if(clientsock < 0){
		perror("Error");
		exit(EXIT_FAILURE);
	}


	//intializes port and address using port and address given in command line
	memset(&echoserver, 0, sizeof(echoserver));
		echoserver.sin_family = AF_INET;
		echoserver.sin_addr.s_addr = inet_addr(argv[1]);
		echoserver.sin_port= htons(atoi(argv[2]));


	//connects server and client
	int connector = connect(clientsock, (struct sockaddr*)&echoserver, sizeof(echoserver));
	if(connector < 0){
		perror("Error");
		exit(1);
	}

	//waits for input and stores it to port
	fgets(port, 1024, stdin);

	//sends written memmory port to server
	int sender = send(clientsock, port, strlen(port), 0);
	if(sender < 0){
		perror("Error");
		exit(1);
	}

	//receives buffer memmory from server
	int rec = recv(clientsock, buffer, 1024, 0);
	if(rec < 0){
		perror("Erorr");
		exit(1);
	}

	//prints buffer sent from server to signal completion
	printf("%s", buffer);

	//closes socket
	int c = close(clientsock);
	if(c<0){
		perror("Error");
		exit(1);
	}



}