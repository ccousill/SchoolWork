/* Christopher Cousillas
   CS 392 
   2/4/20
   I pledge my honor that I have abided by the Stevens Honor System.
*/

#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <string.h>
#include "cs392_printf.h"

int cs392_printf(const char * format, ...){

	va_list args;
	va_start(args, format);
	 
	//iterative over “format” and find specifiers
	while (*format != '\0') {

		// get the first argument with va_arg
		// the following is an example of handling integer format “%d”
		if(*format == '%'){
			format ++;
			if(*format == 0){
				break;
			}
					
			else if(*format == 'd'){
				int arg_int = va_arg(args, int); 
				char buffer[20];
				sprintf(buffer,"%d", arg_int);
				fputs(buffer, stdout);

				// this helps you get the argument corresponding to “%d”
			}

			else if(*format == 's'){
				// you check for other formats
				//char arg_string = va_arg(args, char *);
				char* arg_string = va_arg(args, char *);
				fputs(arg_string,stdout);
			}

			else if(*format == 'c'){
				//char arg_char = va_arg(args, char);
				int arg_char = va_arg(args, int);
				putchar(arg_char);

			}

	    }

	    else{
	    	putchar(*format);
	    }

	++format;

	}

  	va_end(args);
}


int main(){

	return 0;
}