#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <string.h>

#ifdef SORT_H
#define SORT_H


int sort(char * input,char * output);
int comparator(const void *x, const void *y);


#endif