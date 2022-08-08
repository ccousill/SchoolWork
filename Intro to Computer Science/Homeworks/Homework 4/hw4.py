'''
Created on Oct 2, 2018
ccousill
@author: Christopher Cousillas
I pledge my honor that I have abided by the Stevens Honor System
'''
def pascal_helper(n):
    if n==[]:
        return []
    if len(n)==1:
        return [1]
    return [n[0]+n[1]]+pascal_helper(n[1:])

def pascal_row(n):
    """Outputs a list of elements found in a certain row of Pascal’s Triangle."""
    if n==0:
        return [1]
    return [1]+pascal_helper(pascal_row(n-1))

print(pascal_row(5))
print(pascal_row(7))

def pascal_triangle(n):
    """ takes as input a single integer n and returns a 
list of lists containing the values of the all the rows up to and including row n"""
    if n==0:
        return [[1]]
    return pascal_triangle(n-1)+[pascal_row(n)]

print(pascal_triangle(7))