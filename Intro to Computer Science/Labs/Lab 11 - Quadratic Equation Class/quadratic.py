'''
Created on Nov 15, 2018
ccousill
@author: Christopher Cousillas
I pledge my honor that I have abided by the Stevens Honor System
'''

def sR(x):
    return float(x**(1/2))

class QuadraticEquation(object):
    """quadratic equation"""

    def __init__(self, a, b, c):
        """constructor for quadratic equation with a,b, and c"""
        if a == 0:
            raise ValueError("Coefficient 'a' cannot be 0 in a quadratic equation.")
        self.__a = float(a)
        self.__b = float(b)
        self.__c = float(c)
        
    @property
    def a(self):
        return self.__a
    @property
    def b(self):
        return self.__b
    @property
    def c(self):
        return self.__c
        
  
    def discriminant(self):
        """discriminant of quadratic equation"""
        return self.__b ** 2 - 4 * self.__a * self.__c
    
    def root1(self):
        """1st root of the quadratic equation"""
        if self.discriminant() < 0:
            return None
        return ((- self.__b + sR(self.discriminant())) / (2 * self.__a))
    
    def root2(self):
        """2nd root of the quadratic equation"""

        if self.discriminant() < 0:
            return None
        return ((- self.__b - sR(self.discriminant())) / (2 * self.__a))
         
    def aX(self):
        """prints the first term"""
        
        if self.__a == 1.0:
            return 'x^2'
        if self.__a == -1.0:
            return '-x^2'
        return str(self.__a) + 'x^2'
    
    def bX(self):
        """prints the second term"""
        if self.__b < 0:
            if self.__b == -1.0:
                return ' - x'
            return ' - ' + str(abs(self.__b)) + 'x'
        if self.__b == 0:
            return ''
        if self.__b == 1.0:
            return ' + x'
        return ' + ' + str(abs(self.__b)) + 'x'
    
    def cX(self):
        """prints the third term"""
        if self.__c < 0:
            return ' - ' + str(abs(self.__c))
        if self.__c == 0:
            return ''
        return ' + ' + str(abs(self.__c))
    
    def __str__(self):
        """converts the object to string"""
        return self.aX() + self.bX() + self.cX() + ' = 0'
    
    
    
        