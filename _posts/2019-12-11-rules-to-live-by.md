---
published: true
---
I am not a fan of rules. Mostly because they tend to invite blind obedience and “I was just following the rules”. Guidelines on the other hand are wonderful. I do my best to limit the amount of actual rules in my life and constantly re-asses whether the rules I live by still apply.

This blogpost is about those few rules that I have kept around and still value.

The most important rule is actually three rules. The rules are definitely not mine (http://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).

1. Make it work
2. Make it right
3. Make it fast


The impressiveness of the amount of time these rules has saved me is only rivaled by the stupidity of the amount of time I have wasted not following them. The actual practice of following the rules is pretty simple. During the first pass of a task the job is solely to make it work. This means lots of hard coded values, unimplemented functions and general hackery. The two goals during this part is to make the simplest case work and to add todos anytime a shortcut was taken. The second pass is all about removing said todos, considering architectural simplifications and handling edge cases. The last phase is all about benchmarking and optimizations.

These rules work really well for me because they force me to do one thing at a time. I don’t get sidetracked with simplifying some code when I am trying to figure out how things work. Nor do I fall into the trap of premature optimization. Additionally these rules keep me happy. Hacking on things is fun. Making code really pretty is fun. Making code run really fast is also fun, but trying to do all of them at the same time can feel like torture. Giving yourself permission to focus on the problem at hand can be very liberating.

The second rule follows the theme of avoiding self sabotage. The rule states

"Don't abstract until you have 3 examples"

Oftentimes you find yourself seeing some pattern of duplication that looks like it can be “simplified”. This is followed by trying to abstract this duplication. Excessively doing this tends to lead to overly complex code. Delaying the abstraction until you have three examples curbs the worst of this form of self sabotage. It tends to lead to better abstractions as well. Sometimes the duplication was more accidental than anything else. Many of these cases become very clear when the third example rolls around.
