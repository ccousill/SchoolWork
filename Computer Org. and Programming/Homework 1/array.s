 /*
  * array.s
  *
  *  Created on: Oct 2, 2019
  *		 Author: Christopher Cousillas
  * Sum of Vectors
  */



.text
.global main
.extern printf

main:
	ldr x1, =array //loads array to register x1
	mov x0, #0     //sets x0=0 (iterator value)
	mov x2,#14     //sets x2=14 (length of array)
	sub x2,x2,#1   //sets x2=13
	add x2,x1,x2,lsl #3  //left shifts by offset of 8

loop:
	ldr x3,[x1],#4 //sets register of arrays of 4 bits to x3
	add x0,x0,x3   // iterator
	cmp x2,x1      // compares values of iterator and length of array (loop)
	bpl loop       //loops if so
	ldr x1, =done  //exits
	str x0, [x1]   //stores register
	mov x3,#1      //sets x3=1
	and x0,x0,x3   //compares x3 and x0
	sub x4,x0,#1   //subtracts from iterator and stores to x4
	cmp x4,#0      //compares x4 and 0
	bpl odd        //stops loop and goes to "odd"
	ldr x0, =evenpr //loads value of the sum of numbers to evenpr
	bl printf		//heads to evenpr and prints the sum is even
	br x30          //ends
	.data

odd:
	ldr x0, =oddpr  //loads value of the sum of numbers to oddpr
	bl printf       //heads to oddpr and prints the sum is odd
	br x30          //ends
oddpr:
	.ascii "The sum is odd.\n\0"   //prints odd
evenpr:
	.ascii "The sum is even.\n\0"  //prints even
array:
	.long 1025, 3, 1234567, 8, 64, 128, 127, 126, 125, 54321, 1, 99, 100, 10435702 //array of 14
	.bss
	.align 4
done:
	.end









//.text
//.global main
//.extern printf
//
//main:
//	.global sum
//
//sum:
//
//
//	mov x0, #0      //sets x1=0 (iterator value)
//	ldr x8, =array  //loads array to register x0
//	mov x7, #14     //sets x2=14 (length of array)
//	sub x7, x7, #1
//	add x7, x0, x7, lsl #3
//
//loop:
//	ldr x1, [x8], #8
//	add x0, x0, x1
//	cmp x7, x8
//	bpl loop
//	ldr x8, =out
//	str x0, [x8]
//	mov x1, #1
//	and x0, x0,x1
//	sub x4, x0, #1
//	cmp x4, #0
//	bpl odd
//	ldr x0, =evenpr
//	bl printf
//	br x30
//    .data
//
//odd:
//	ldr x0, =oddpr
//	bl printf
//	br x30
//oddpr:
//	.ascii "The odd.\n\0"
//evenpr:
//	.ascii "The sum is even.\n\0"
//array:
//     .quad 1025, 3, 1234567, 8, 64, 128, 127, 126, 125, 54321, 1, 99, 100, 10435702
//     .bss
//     .align 4
//
//out:
//	.space 8
//	.end




