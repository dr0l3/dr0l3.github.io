---
published: true
title: Why do we need that?!? in language design
---
Every single company in the world has a 10x programmer, probably many - that they are not paying a single cent. The FLOSS library developers whose libraries the company depend upon. These people are the heart and soul of the software revolution. 
Given that these people add a massive amount of value - for free - it would seem prudent to invest a little bit in this highly valuable free resource. Make it as efficient as possible. Let’s park that thought for a little bit.

In programming you often run into obscure and highly abstract features (an example would be higher kinded types) that are requested by “academic theory nutcases”. Due to the abstract nature of the features coming up with a simple use case is hard. It can thus be tempting to drop support for the feature. It doesn’t seem to be useful for everyday programming after all.

What needs to be considered however is that the long term viability of a language is directly correlated with the quality of the libraries available to that language. If the language does not support features that are needed to create quality libraries then the language will suffer in the long term.

It is for example hard to generate random collections with test data for arbitrary collections and types without higher kinded types. Of course one can do it with lots of duplication by writing an implementation for each collection. This is however both error prone, tedious and boring, so unlikely to be done unless paid for explicitly. The irony is that most languages does not support higher kinded types because it’s “not useful for everyday programming and thus not worth the effort” despite the feature of automatic testdata being highly practical and useful for everyday programming.

The point is; if the “academic theory geeks” also happen to be authors of very useful libraries then listening to them can be a very good idea, even if you don't understand why.
