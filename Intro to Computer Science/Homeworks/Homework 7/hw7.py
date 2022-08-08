'''
Created on Oct 24, 2018
ccousill
Christopher Cousillas
I pledge my honor that I have abided by the Stevens Honor System
@author: Stevens User
'''


# Each row has (x,y,carry-in) : (sum,carry-out)
FullAdder = { 
('0','0','0') : ('0','0'),
('0','0','1') : ('1','0'),
('0','1','0') : ('1','0'),
('0','1','1') : ('0','1'),
('1','0','0') : ('1','0'),
('1','0','1') : ('0','1'),
('1','1','0') : ('0','1'),
('1','1','1') : ('1','1') }


def numToBaseB(N, B):
    """converts decimal N to base B"""
    if N == 0:
        return "0"
    def numToBase_helper(N,B):
        if N == 0:
            return ''
        return numToBase_helper((N // B), B) + str(N % B)
    return numToBase_helper(N,B)
        

print(numToBaseB(4,2))
print(numToBaseB(4, 3))

def baseBToNum(S, B):
    """converts from base B to decimal S and return"""
    if S == "":
        return 0
    return baseBToNum(S[:-1], B) * B + int(S[-1])

print(baseBToNum("11", 2))
print(baseBToNum("", 10))

def baseToBase(B1, B2, SinB1):
    """returns a string representing B1 as the same number in B2"""
    return numToBaseB(baseBToNum(SinB1, B1), B2)

print(baseToBase(2, 10, "11"))


def add(S,T):
    """converts S and T to decimal then adds them together"""
    sumOfBase=baseBToNum(S, 2) + baseBToNum(T, 2)
    return numToBaseB(sumOfBase, 2)

def addB(S, T):
    """add two binary- S and T and return"""
    ch = len(S) - len(T)
    if ch < 0:
        S = "0" * ch+S
    if ch > 0:
        T = "0" * ch+T
    def addBHelper(C, S, T):
        """helper function to addB"""
        if S == "":
            return "" if C == "0" else "1"
        return addBHelper(FullAdder[(C, S[-1], T[-1])][1], S[:-1], T[:-1]) + FullAdder[(C, S[-1], T[-1])][0]
    return addBHelper("0", S, T)

print(addB("11", "1"))
print(addB("011", "100"))

