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

The idea here is that functions act as something that can turn the variables into something useful and put them in the return value. 

You can view functions as a country that has borders. Everything that comes in or out of the country needs to go through customs. This is a simple contract, that when honored comes with a rich set of mathematical properties and guarantees. These guarantees can be leveraged by language designers that can write compilers that enforce the rules so that programmers can dont have to test the code for these properties manually. The code, with respect to these properties, is correct by construction.

Many of the recent advances made in functional programming is about moving information into the type system so that the compiler can verify that the code makes sense.

Requiring all input and output to go through variables and return values is a faily simple contract. So you would think that upholding it would be common practice. Most languages however choose to allow you to break this contract, either by using context from outside the function or by exporting something from the function that is not visible in the return value.

The people who chose the contract breaking design thinks they have good reasons for doing so. The people who disagree also thinks they have good reasons for disagreeing. This kind of debate can get a little fanatical and religious so we are not gonna engage in that. Rather we are gonna stick to the facts. Different kinds of functions yeilds different behaviors and guarantees about said behaviors. Whichever set of behaviors and guarantees you prefer is entirely up to you. In the interest of full disclosure I will confess I reside in the second group, most of the time. People belonging to the first group will say this is evident in my writing :)

### Pure functions

This function abides by the contract that everything that can vary inside the function comes in through the variables and every effect of the program is visible in the return value. One very important feature of such a function is that when called with the same input the function will yield the same output, every time. This is simply a consequence of being pure. If you take two identical inputs and put them into the same function, where everything that can vary is the same, you get the same output. If the inputs were different then... the inputs were different. If anything inside the functions varies given the same input the functions is not pure. All of this means a couple of things:
- The function can be run in isolation, it doesn't require any context aside from variables
- You can test the function in isolation
This might seem like negligbe benefits, but as programs grow large it becomes increasingly time consuming to find and recreate the exact conditions present at the time a function was called. If the code is sufficiently badly written it might even be impossible. As such figuring out why code fails (or succeeds) takes longer and leads to slower debugging and development.

### Closures and other functions with implicit context
- Functions now depend on their context, cant run without
- Functions require the same context to produce the same result
- Functions now needs to be tested in a production equivalent environment

### Functions with side-effects
- Functions now excibit behavior that is not visible from its types
- Need to read the entire function (and all of its non-pure sub calls) to completely understand what a function does, even for a single input

### Conclusions
- Pure functions have nice benefits that non-pure functions dont have
- You can completely understand a pure function's behavior for a specific input just by executing with the function with said input
- You can tell alot about a pure function just by looking at its type
- Everything that can be done by non-pure functions can be done by pure functions (+ language runtime)
- Pure functions are easier to test
