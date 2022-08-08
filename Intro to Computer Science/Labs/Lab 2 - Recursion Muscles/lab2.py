'''
Created on Sep 12, 2018
I pledge my honor that i have abided by the Stevens Honor System.

@author: Christopher Cousillas
'''


def dot(L,K):
    """returns the multiplication of two list posisitons and the sum of all of them"""
    if L ==[]:
        return 0
    if K==[]:
        return 0
    return dot(L[1:],K[1:]) + L[0]*K[0]

print(dot([5,6],[5,3]))


def explode(s):
    """returns a string in the form of a list"""
    if s=='':
        return []
    return   [s[0]]+explode(s[1:])

print(explode("spam"))

def ind(e,L):
    """returns the position value of the number input to a list"""
    if L==[]:
        return 0
    if L=='':
        return 0
    if e==L[0]:
        return 0
    return ind(e,L[1:])+1

print(ind(42,[78,59,42,90]))


def removeAll(e,L):
    """removes the value given from a list"""
    if L==[]:
        return []
    if e==L[0]:
        return removeAll(e,L[1:])
    return [L[0]]+removeAll(e,L[1:])

print(removeAll(65,[54,86,43,87,65,89]))  



def even(X):
    """Tests if a value is even"""
    if not X % 2:
        return True
    return False


def myFilter(e,L):
    """returns the filter of numbers with a given function(even)"""
    if L==[]:
        return []
    if e(L[0])==False:
        return myFilter(e,L[1:])
    return [L[0]] + myFilter(e, L[1:])

print(myFilter(even,[1,2,3,4,5,6]))

def deepReverse(L):
    """returns the complete reverse of a list even with lists within the lists"""
    if L == []:
        return []
    if isinstance(L[0], list):
        return deepReverse(L[1:]) + [deepReverse(L[0])] 
    return deepReverse(L[1:]) + [L[0]]

print(deepReverse([6,7,8,9,[7,7,6,[7,8,3,2],8,9],1]))

    
