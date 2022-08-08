'''
Created on Sep 20, 2018

@author: Christopher Cousillas

I pledge my honor that I have abided by the Stevens Honor System
'''
def change(amount,coins):
    """returns the least amount of coins that will make up a certain amount of money given"""
    if amount== 0:
        return 0
    if coins==[] or amount<0:
        return float("inf")
    use_it= 1+change(amount-coins[0],coins)
    lose_it=change(amount,coins[1:])
    return min(use_it,lose_it)
    
    
print(change(30,[3,10,20]))