'''
Created on 9/19/18
@author:   Christopher Cousillas and Serik czarnecki
Pledge:    I pledge my honor that I have abided by the Stevens Honor System

CS115 - hw 2
'''
import sys
from cs115 import map, reduce, filter

# Be sure to submit hw2.py.  Remove the '_template' from the file name.

# Allows up to 10000 recursive calls.
# The maximum permitted limit varies from system to system.
sys.setrecursionlimit(10000)

# Leave the following lists in place.
scrabbleScores = \
   [ ['a', 1], ['b', 3], ['c', 3], ['d', 2], ['e', 1], ['f', 4], ['g', 2],
     ['h', 4], ['i', 1], ['j', 8], ['k', 5], ['l', 1], ['m', 3], ['n', 1],
     ['o', 1], ['p', 3], ['q', 10], ['r', 1], ['s', 1], ['t', 1], ['u', 1],
     ['v', 4], ['w', 4], ['x', 8], ['y', 4], ['z', 10] ]

Dictionary = ['a', 'am', 'at', 'apple', 'bat', 'bar', 'babble', 'can', 'foo',
              'spam', 'spammy', 'zzyzva']

# Implement your functions here.

def letterScore(letter,scorelist):
    """returns the score of a given letter"""
    if letter == '':
        return 0
    if letter==scorelist[0][0]:
        return scorelist[0][1]
    return letterScore(letter,scorelist[1:])

print(letterScore('l',scrabbleScores))

letterScore("c",scrabbleScores)

def wordScore(S,scorelist):
    """returns the score of a given word string"""
    if S == '':
        return 0
    return wordScore(S[1:],scorelist)+ letterScore(S[0],scorelist)

def ind(e,L):
    """returns the position value of the number input to a list"""
    if L==[]:
        return 0
    if L=='':
        return 0
    if e==L[0]:
        return 0
    return ind(e,L[1:])+1


def length(lst):
    """Return the length of the list."""
    if lst == []:
        return 0
    return length(lst[1:]) + 1

def testWord(word,Rack):
    """Determines if a word equals another word with true or false"""
    if word == '':
        return True
    if ind(word[0], Rack) == length(Rack):
        return False
    return testWord(word[1:],Rack[0:ind(word[0],Rack)] +Rack[ind(word[0], Rack)+1:])



def scoreList(Rack):
    """returns the score of the individual letters in a word"""
    filterWord= filter(lambda word: testWord(word,Rack), Dictionary)
    return map(lambda word: [word]+ [wordScore(word,scrabbleScores)], filterWord)

def bestWord(Rack):
    """returns the longest string word"""
    sl= scoreList(Rack)
    if sl == []:
        return ['']+[0]
    def testWord(sl, maximum):
        if sl== []:
            return maximum
        if maximum[1]>sl[0][1]:
            return testWord(sl[1:],maximum)
        return testWord(sl[1:],sl[0])
    return testWord(sl,sl[0])
            
       









