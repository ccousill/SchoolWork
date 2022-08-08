/* Christopher Cousillas
   CS 392 
   2/28/20
   I pledge my honor that I have abided by the Stevens Honor System.
*/

#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <string.h>
#include "sort.h"


//modified comparator for quicksort function
int comparator(const void *x, const void *y)  
{ 
    int l = *((int*) x); 
    int r = *((int*) y);  
    if (l==r)
    	return 0;
    else if (l<r)
    	return -1;
    else
    	return 1;
} 


int sort(char * input,char * output){
	//initialize variables 
    FILE *fp;  //File to read from
    FILE *fd;  //File to write to
	char * ptr;
	int size;


	//opens file to read
    fp = fopen(input, "r");
    if(fp == NULL){
        printf("Failed to open file \n");
    	return 0;
    }
    else{
        //dynamically allocates memory from the text file to be read
        fseek(fp,0,SEEK_END);
        size = ftell(fp);
        rewind(fp);
        ptr = malloc(sizeof(int)*size);
        int c[size];
        int i = 0;

       //This reads the strings on the text file, converts them to ints and puts them into an array
       while(fgets(ptr,size,fp)!=NULL){
       		c[i] = atoi(ptr);
       		i++;
       }
       //array is then sorted quickly
       qsort(c,i,sizeof(int),comparator);
       //closes read text
       fclose(fp);


       //opens file to be written to
       fd = fopen(output,"w");
	   if(fd == NULL){
	    	printf("Failed to open file \n");
	    	return 0;
	   }

	   else{

	   	   //this converts the list of ints that was created to strings to be written to the text document
	      
	       for(int j = 0; j < i;j++){
	       	  snprintf(ptr, size , "%d\n", c[j]);
	       	  fputs(ptr,fd);
	       }
       
        	//closes output file and frees the allocated memory
	        fclose(fd);
	        free(ptr);
	    	return 0;
	    	

	    }

    } 


}


int main(int argc, char ** argv){
	//checks if there are more than 2 arguments given
	if(argc > 3){
		printf("Cannot have %d arguments \n",argc-1);
		return 0;
	}
	//checks if there are less than 2 arguments given
	else if(argc < 3){
		printf("An argument is needed \n");
		return 0;
	}
	else{
	
		sort(argv[1],argv[2]);
   		return 0;
    }

}