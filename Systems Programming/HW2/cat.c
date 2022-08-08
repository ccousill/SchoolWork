/* Christopher Cousillas
   CS 392 
   2/28/20
 * I pledge my honor that I have abided by the Stevens Honor System.
*/

#include<stdio.h>
#include<string.h>
#include<stdlib.h>


int cat_command(char * path){
	//initialize variables
    FILE *fp;
	char * ptr;
	int size;


	//opens file to write
    fp = fopen(path, "r+");
    if(fp == NULL){
    	printf("Failed to open file \n");
    	return 0;
    }
    else{
       //dynamically allocates memory to read
       fseek(fp,0,SEEK_END);
       size = ftell(fp);
       rewind(fp);
       ptr = malloc(size);

       //reads contents of file
       fread(ptr,1,size,fp);
  			
  	   //writes contents of memory that was written to standard output
  	   fwrite(ptr,1,size,stdout);

  	   //free up memory and close file
       free(ptr);
       fclose(fp);

       return 0;
    }

}

int main(int argc, char ** argv){
	//checks if there is more than one input argument
	if(argc > 2){
		printf("Cannot have %d arguments \n",argc-1);
		return 0;
	}
	//checks if there is less than one input argument
	else if(argc < 2){
		printf("An argument is needed \n");
		return 0;
	}
	//applies cat to first argument given
	else{
		cat_command(argv[1]);
		return 0;
    }
}
