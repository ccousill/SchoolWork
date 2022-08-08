# mandelbrot.py
# Lab 9
# 11/1/18
# I pledge my honor that I have abided by the Stevens Honor System
# ccousill
# Name: Christopher Cousillas

# keep this import line...
from cs5png import PNGImage
from cs5png import *

def mult(c,n):
    """ returns the product of c times n but without
    multiplication"""
    result=0
    for x in range(n):
        result +=c
    return result

def update(c,n):
    """starts a new value, z at zero, and
    then repeatedly updates the value of z using the assignment statement"""
    z=0
    for x in range(n):
        z= z**2 + c
    return z

def inMSet(c,n):
    """takes as input a complex number c and
    an integer n. Your function will return a Boolean: True if the complex number c is in the Mandelbrot set
    and False otherwise"""

    z=0
    for x in range(n):
        z=z**2+c 
        if abs(z) >= 2:
            return False
    return True

c= 3+ 4j
print(abs(c))
print(c**2)

def inMSet2(c,n):
    """starts a new value, z at zero, and
    then repeatedly updates the value of z using the assignment statement"""
    z=0
    for x in range(n):
        z= z**2 + c
    return z

def weWantThisPixel( col, row ):
    """ a function that returns True if we want
    the pixel at col, row and False otherwise"""
    if col%10 == 0  and  row%10 == 0:
        return True
    else:
        return False
    
def test():
    """ a function to demonstrate how
    to create and save a png image
    """
    width = 300
    height = 200
    image = PNGImage(width, height)
    # create a loop in order to draw some pixels
    for col in range(width):
        for row in range(height):
            if weWantThisPixel( col, row ) == True:
                image.plotPoint(col, row)
    # we looped through every image pixel; we now write the file
    image.saveFile()
"""if col % 10 == 0 and row % 10 == 0 was changed to-
   if col % 10 == 0 or row % 10 == 0 it would make the code run differently"""

test()

def scale(pix, pixMax, floatMin, floatMax):
    """ scale takes in
            pix, the CURRENT pixel column (or row)
            pixMax, the total # of pixel columns
            floatMin, the min floating-point value
            floatMax, the max floating-point value
        scale returns the floating-point value that corresponds to pix
    """
    return floatMin + (floatMax - floatMin) / pixMax * pix

print(scale(100, 200, -2.0, 1.0))

print(scale(100, 300, -2.0, 1.0))


def mset(width, height):
    """ creates an image of the Mandelbrot set"""

    image = PNGImage(width, height)
    # create a loop in order to draw some pixels
    for col in range(width):
        for row in range(height):
            x = scale(col, width, -2.0, 1.0)
            y = scale(row, height, -1.0, 1.0)
            c = x + y * 1j
            if inMSet(c, 25) == True:
                image.plotPoint(col, row)
    # we looped through every image pixel; we now write the file
    image.saveFile()
    
mset(300,200)


