---
published: false
---
---
layout: post
title: Different types of functions
---

In this post we will go over different kinds of functions and the behavior each of these have. The functions involved will be embarrasingly simple. 

Functions in most languages involve the two concepts:
- Variable(s), used as input to the function
- A return value, used as output of the function

The idea here is that functions act as something that can turn the variables into something useful and put them in the return value. You can view functions as a box that has a country that has borders. Everything that comes in or out of the country needs to go through customs. This is a simple contract, that when honored comes with a rich set of mathematical properties and guarantees. These guarantees can be leveraged by language designers that can write compilers that enforce the rules so that programmers can dont have to test the code for these properties manually. The code, with respect to these properties, is correct by construction.

This contract is faily simple. So you would think that upholding it would be common practice. Most languages however choose to allow you to break this contract, either by using context from outside the function or by exporting something from the function that is not visible in the return value.

The people who chose the contract breaking design thinks they have good reasons for doing so. The people who disagree also thinks they have good reasons for disagreeing. This kind of debate can get a little fanatical and religious so we are not gonna engage in that. Rather we are gonna stick to the facts. Different kinds of functions yeilds different behaviors and guarantees about said behaviors. Whichever set of behaviors and guarantees you prefer is entirely up to you. In the interest of full disclosure I will say that I reside in the second group, most of the time. People belonging to the first group will say this is evident in my writing :)

### Pure functions

This function abides by the contract that everything that can vary inside the function comes in through the variables and every effect of the program is visible in the return value. One very important feature of such a function is that when called with the same input the function will yield the same output, every time. This means a couple of things
- The function can be run in isolation
- You can test the function in isolation

### Closures and other functions with implicit context

### Functions with side-effects

BATMAN!
