'''
Created on Oct 31, 2018
ccousill
I pledge my honor that I have abided by the Stevens Honor System.
@author: Christopher Cousillas
'''
def numToBinary(n):
    '''Returns binary as a representation of a string n, when n=0 an empty string
    returns'''
    if n==0:
        return ""
    return numToBinary(int(n/2))+str(n%2)

def numToBaseB(N, B):
    """converts decimal N to base B"""
    if N == 0:
        return "0"
    def numToBase_helper(N,B):
        if N == 0:
            return ''
        return numToBase_helper((N // B), B) + str(N % B)
    return numToBase_helper(N,B)

def baseBToNum(S, B):
    """converts from base B to decimal S and return"""
    if S == "":
        return 0
    return baseBToNum(S[:-1], B) * B + int(S[-1])

def padding(s):
    """Will return a binary number that is the correct bit length"""
    if len(s) >= 8:
        return s
    else:
        return padding('0'+s)

def add(S,T):
    """converts S and T to decimal then adds them together"""
    sumOfBase=baseBToNum(S, 2) + baseBToNum(T, 2)
    return numToBaseB(sumOfBase, 2)

def binaryToNum(s):
    '''Returns the integer with binary of s, empty string is 0'''
    if s=="":
        return 0
    return binaryToNum(s[:-1])*2+int(s[-1])

def reverseBit(S): 
    """returns a reverse of bits given """
    if S == '':
        return ''
    if S[0] == '0':
        return '1' + reverseBit(S[1:])
    else:
        return '0' + reverseBit(S[1:])
    
def TcToNum(bit):
    """ takes as input a string of 8 bits representing an integer
    in two's-complement, and returns the corresponding integer."""
    if bit[0] == '1':
        return -1 * binaryToNum(reverseBit(add(bit, '11111111'))[1:])
    else:
        return binaryToNum(bit)
    
def NumToTc(N):
    """ takes as input an integer N, and returns a string
    representing the two's-complement representation of that integer."""
    if N < 0 and N > -128:
        return add(reverseBit(padding(numToBinary(N * -1))), '1')
    elif N > 127 or N <-128:
        return 'Error'
    else:
        return padding(numToBinary(N))
    
print(TcToNum("10110111"))
print(NumToTc(-129))
print(NumToTc(128))   
print(NumToTc(127))    
print(NumToTc(1))

