'''
Created on Sep 27, 2018
ccousill
@author: Christopher Cousillas
Pledge: I pledge my honor that i have abided by the Stevens Honor System.
'''



def knapsack(capacity,itemList):
    """returns the maximum value of an object knapsack capacity can carry"""
    if itemList == [] or capacity == 0:
        return [0,[]]
    if capacity-itemList[0][0] < 0:
        return knapsack(capacity,itemList[1:])
    use_it=knapsack(capacity-itemList[0][0],itemList[1:])
    lose_it=knapsack(capacity,itemList[1:])
    new_value=use_it[0]+itemList[0][1]
    if new_value > lose_it[0]:
        return [new_value,[itemList[0]]+use_it[1]]
    return lose_it

