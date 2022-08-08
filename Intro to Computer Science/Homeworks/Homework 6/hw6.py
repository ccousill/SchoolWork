'''
Created on 10/15/18
ccousill
@author:Christopher Cousillas
Pledge: I pledge my honor that I have abided by the Stevens Honor System

CS115 - Hw 6
'''
# Number of bits for data in the run-length encoding format.
# The assignment refers to this as k.
COMPRESSED_BLOCK_SIZE = 5

# Number of bits for data in the original format.
MAX_RUN_LENGTH = 2 ** COMPRESSED_BLOCK_SIZE - 1

# Do not change the variables above.
# Write your functions here. You may use those variables in your code.
def numToBinary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if n==0:
        return ""
    return numToBinary(n//2)+str(n%2)

def binaryToNum(s):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if s=="":
        return 0
    return binaryToNum(s[:-1])*2+int(s[-1])

def numToBinaryPadded(n):
    """pads numToBinary with COMPRESSED_BLOCK_SIZE (5) 0's"""
    s=numToBinary(n)
    return '0'*(COMPRESSED_BLOCK_SIZE-len(s))+s
    
def prefixLen(s):
    """returns length of digits"""
    if len(s)==1: 
        return 1
    if s[1]==s[0]:
        return 1+prefixLen(s[1:])
    return 1
    
def compress(s):
    """takes a binary string S of length 64 as input and
returns another binary string as output"""
    def compresshelp(s,b):
        if s=='':
            return ''
        if s[0] !=chr(b + ord('0')):
            return numToBinaryPadded(0)+compresshelp(s,1-b)
        prefix_len=min(prefixLen(s),MAX_RUN_LENGTH)
        return numToBinaryPadded(prefix_len)+compresshelp(s[prefix_len:],1-b)
    return compresshelp(s,0)

def uncompress(s):
    """returns s back from compression"""
    def uncompressHelp(s,b):
        
        if s=='':
            return ''
        n=binaryToNum(s[:COMPRESSED_BLOCK_SIZE])
        return chr(b+ord('0'))*n+uncompressHelp(s[COMPRESSED_BLOCK_SIZE:],1-b)
    return uncompressHelp(s, 0)

def compression(s):
    """ return the ratio of the compressed size to the original size for
image s"""
    return len(compress(s))/len(s)

print(compression("00011000"+"00111100"*3 + "01111110"+"11111111"+"00111100"+"00100100"))
"""prints the compression of penguin in a ratio of 1.484375"""

print(compression("0"*8 + "01100110"*2 + "0"*8 + "00001000" + "01000010" + "01111110" + "0"*8))
"""prints the compression of smile in a ratio of 1.328125"""

print(compression("1"*9 + "0"*7 + "10000000"*2 + "1"*7 + "0" + "00000001"*2 + "1"*7 + "0"))
"""prints the compression of five in a ratio of 1.015625"""


"""This algorithm that professor Lai proposes cannot exist because the compression
will never be shorter the original input value"""
print(compress("001"))

    