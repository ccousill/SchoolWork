'''
Created on 9/26/18
@author:   Christopher Cousillas
Pledge:    I pledge my honor that i have abided by the Stevens Honor System

CS115 - Hw 3
'''
# Be sure to submit hw3.py.  Remove the '_template' from the file name.

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 0
' Implement the function giveChange() here:
' See the PDF in Canvas for more details.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def giveChange(amount,coins):
    """returns the least amount of coins that will make up a certain amount of money given"""
    if amount== 0:
        return [0,[]]
    if coins==[] or amount<0:
        return [float("inf"),[]]
    use_it= giveChange(amount-coins[0],coins)
    footloose_it=1+use_it[0]
    lose_it=giveChange(amount,coins[1:])
    if footloose_it < lose_it[0]:
        return [footloose_it]+ [[coins[0]]+ use_it[1]]
    return lose_it



print(giveChange(67,[10,15,2,1,5]))





# your code goes here

# Here's the list of letter values and a small dictionary to use.
# Leave the following lists in place.
scrabbleScores = \
   [ ['a', 1], ['b', 3], ['c', 3], ['d', 2], ['e', 1], ['f', 4], ['g', 2],
     ['h', 4], ['i', 1], ['j', 8], ['k', 5], ['l', 1], ['m', 3], ['n', 1],
     ['o', 1], ['p', 3], ['q', 10], ['r', 1], ['s', 1], ['t', 1], ['u', 1],
     ['v', 4], ['w', 4], ['x', 8], ['y', 4], ['z', 10] ]

Dictionary = ['a', 'am', 'at', 'apple', 'bat', 'bar', 'babble', 'can', 'foo',
              'spam', 'spammy', 'zzyzva']

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 1
' Implement wordsWithScore() which is specified below.
' Hints: Use map. Feel free to use some of the functions you did for
' homework 2 (Scrabble Scoring). As always, include any helper
' functions in this file, so we can test it.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

def letterScore(letter,scorelist):
    """returns the score of a given letter"""
    if letter == '':
        return 0
    if letter==scorelist[0][0]:
        return scorelist[0][1]
    return letterScore(letter,scorelist[1:])

def wordScore(S,scorelist):
    """returns the score of a given word string"""
    if S == '':
        return 0
    return wordScore(S[1:],scorelist)+ letterScore(S[0],scorelist)

def wordsWithScore(dct, scores):
    '''List of words in dct, with their Scrabble score.

    Assume dct is a list of words and scores is a list of [letter,number]
    pairs. Return the dictionary annotated so each word is paired with its
    value. For example, wordsWithScore(Dictionary, scrabbleScores) should
    return [['a', 1], ['am', 4], ['at', 2] ...etc... ]
    '''
    if dct==[]:
        return []
    return [[dct[0]] +[wordScore(dct[0], scores)]]  + [wordsWithScore(dct[1:], scores)]  # your code goes here

print(wordsWithScore(Dictionary,scrabbleScores))

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 2
' For the sake of an exercise, we will implement a function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def take(n, L):
    '''Returns the list L[0:n].'''
    if n==0:
        return []
    return[L[0]]+take(n-1,L[1:]) # your code goes here

print(take(8,[6,5,4,7,8,5,4,6]))

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 3
' Similar to problem 2, will implement another function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def drop(n, L):
    '''Returns the list L[n:].'''
    if n == 0:
        return L
    return drop(n - 1, L[1:])  # your code goes here

print(drop(5,[6,5,4,7,8,5,4,6]))
