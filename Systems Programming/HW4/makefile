##I pledge my Honor that I have abided by the Stevens Honor System
##Christopher Cousillas
all: cs392_echoclient cs392_echoserver 

cs392_echoserver: cs392_echoserver.o cs392_log.o cs392_log.h 
	gcc -g cs392_echoserver.o -o cs392_echoserver

cs392_echoclient: cs392_echoclient.o
	gcc -g cs392_echoclient.o -o cs392_echoclient

cs392_log.o: cs392_log.c cs392_log.h
	gcc -g -c cs392_log.c -o cs392_log.o

cs392_echoclient.o: cs392_echoclient.c
	gcc -g -c cs392_echoclient.c -o cs392_echoclient.o

cs392_echoserver.o: cs392_echoserver.c
	gcc -g -c cs392_echoserver.c -o cs392_echoserver.o



clean:
	rm *.o cs392_echoserver cs392_echoclient