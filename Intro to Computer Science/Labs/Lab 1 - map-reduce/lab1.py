'''
Christopher Cousillas

I pledge my honor that I have abided by the Stevens Honor System
'''

from cs115 import map,reduce,range


import math
"""imports math library"""


def mult(n,f):
    """returns n and f multiplied"""
    return n*f 
def add(n,f):
    """returns addition of n and f"""
    return n+f
def inverse(n):
    """returns inverse of n"""
    return 1/n
 
def factorial(n):
    """returns factorial of n"""
    return math.factorial(n) 

def infactorial(n):
    """returns the inverse factorial of n"""
    return inverse(factorial(n))


def e(n):
    """returns the estimated value of e"""
    return reduce(add, map(infactorial, range(1,n+1)))+1

print("estimated e value is",e(100))

def error(n):
    """returns error value of the real value and estimated value of e"""
    return math.e-e(n)

print("error is",error(100))





    
    