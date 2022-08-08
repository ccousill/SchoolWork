#
# life.py - Game of Life lab
# ccousill
# Name: Christopher Cousillas
# 11/8/18
# Pledge: I pledge my honor that I have abided by the Stevens Honor System
#

import random
import sys

def createOneRow(width):
    """Returns one row of zeros of width "width"...  
You should use this in your
createBoard(width, height) function."""
    row = []
    for col in range(width):
        row += [0]
    return row

def createBoard(width, height):
    """creates and
returns a new 2D list of height rows and 
width columns in which all of the data elements are 0"""
    A = []
    for row in range(height):
        A += [createOneRow(width)] # What do you need to add a whole row here?
    return A

A = createBoard(5, 3)
print(A)

def printBoard( A ):
    """this function prints the 2d list-of-lists
A without spaces (using sys.stdout.write)"""
    for row in A:
        for col in row:
            sys.stdout.write( str(col) )
        sys.stdout.write( '\n' )
  
A = createBoard(5,3)
printBoard(A)

def diagonalize(width,height):
    """ creates an empty board and then modifies it
so that it has a diagonal strip of "on" cells."""
    A = createBoard( width, height )
    for row in range(height):
        for col in range(width):
            if row == col:
                A[row][col] = 1
            else:
                A[row][col] = 0
    return A

A = diagonalize(7,6)
print(A)

def innerCells(w,h):
    """returns a 2d
array of all live cells - with the value of 1
- except for a one-cell-wide border of empty 
cells"""
    ini = []
    for i in range(h):
        if i != 0 and i != h - 1:
            row = []
            for j in range(w):
                if j != 0 and j != w - 1:
                    row.append(1)
                else:
                    row.append(0)
            ini.append(row)
        else:
            ini.append([0] * w)
    return ini

def randomCells(w,h):
    """ returns an array of randomly-assigned 1's
and 0's except that the outer edge of the array is still completely empty"""
    ini = []
    for i in range(h):
        row = []
        for j in range(w):
            if i == 0 or i == h - 1 or j == 0 or j == w - 1:
                row.append(0)
        ini.append(row)
    return ini
 
def copy( A ):
    """copy a list"""
    ini = createBoard(len(A[0]),len(A))
    for row in range(len(A)):
        for col in range(len(A[0])):
            ini[row][col]= A[row][col]
    return ini

oldA = createBoard(2,2) # create a 2x2 empty board
printBoard(oldA) # show it


newA = oldA # create a false ("shallow") copy
printBoard(newA) # show it

oldA[0][0] = 1 # set oldA's upper left corner to 1
printBoard(oldA) # the upper left will be 1


printBoard(newA) # but newA has changed, too!!
 
def innerReverse( A ):
    """ takes an old 2d array (or "generation") and then
creates a new generation of the same shape and size"""
    ini = []
    for x in A:
        row = []
        for y in x:
            if x == 0 or x == len(A) - 1 or y == 0 or y == len(A[x]) - 1:
                row.append(0)
                continue
            row.append(1 if y == 0 else 0)
        ini.append(row)
    return ini

    A = [[0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0], 
        [0,0,0,0,0]]
    
printBoard(A)

def next_life_generation(A):
    """makes a copy of A and then advances
    one generation of Conway's game of life
    within the inner cells of that copy. the
    outer edge always stays 0
    """
    ret = []
    i = j = 0
    for i in range(len(A)):
        row = []
        for j in range(len(A[i])):
            sum = 0
            if i == 0 or i == len(A) - 1 or j == 0 or j == len(A[i]) - 1:
                row.append(0 * j)
                continue
            for x in range(i - 1, i + 2):
                for  y in range(j - 1, j + 2):
                    sum += A[x][y]
            if A[i][j] == 1:
                row.append(1 if sum - A[i][j] == 3 or sum - A[i][j] == 2 else 0)
            else:
                row.append(1 if sum - A[i][j] == 3 else 0)
        ret.append(row)
    return ret

A = [ [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0]]
printBoard(A)
print("\n")
A2 = next_life_generation(A)
printBoard(A2)



