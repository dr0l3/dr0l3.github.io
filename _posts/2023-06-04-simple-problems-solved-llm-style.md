---
published: true
---

LLMs are truly impressive.

They make lots of rather stupid mistakes, but on the whole, they manage to complete a lot of tasks.
Many of those stupid mistakes are quite understandable once you see the problem from the LLM's point of view.

Let's take two examples that most humans with reasonable math and codings skills would consider easy
- Multiplication of two numbers
- Coding up fizzbuzz


Most humans with basic math skills will have no problem multiplying two numbers.
The numbers can be arbitrarily large.
Pretty much all humans will use the same algorithm.

```
1. multiply the two rightmost digits
2. output the rightmost digit and remember the carry. 

Move to the next digits and rinse repeat.
```

The savvy reader will already have noticed the cheat: Move to the two rightmost digits.

LLMs don't get to start at the back. They have to output the tokens left-to-right. 
And they don't get to write the carries down on a piece of scratch pad paper.
This changes the problem, it goes from trivial to significantly more difficult.
Most people will be able to manage for small numbers, but it can get tricky with long numbers if there are lots of carries involved.

Try it yourself; see if you can multiply two random 10-digit numbers forward and backward.

There is no good reason for our number notation being the most significant digit first, it's just a quirk of human history.

The other example is Fizzbuzz.
Again most people with coding skills have no problem completing the assignment.

The assignment for the LLMs is different.
Like with multiplication, the LLM needs to output tokens left-to-right and there are no take-backsies.
Furthermore, it has no syntax highlight or autocomplete and it doesn't get to sanity check its work by compiling until it's completely done.
They are given an extra devilish variant of the whiteboard interview.
You can simulate how hard this is by doing the exercise yourself.
Open up Notepad and disable the backspace and arrow keys on your keyboard (or just don't use them).
Then see if you can write out a working solution.
Most people will be able to accomplish this task, but anything significantly more complex is monstrously difficult.
Try something "simple" like tic-tac-toe.
If you sit down ahead of time and make a battle plan then tic-tac-toe might also be doable, but again LLMs don't get to do that.
They have to start outputting the second the assignment has been entered.

You can change this by giving the LLM some slack by instructing it to "think step by step".
This essentially allows the model a bit of paper to write a scratchpad solution before completing the actual task.
This technique is so essential that not doing it is considered a red flag in whiteboard interviews unless you can complete the assignment with ease.
When you think of the problem from the LLM's perspective the fact that "let's think step by step" works is obvious.
But it took significant time before anyone discovered it.

It has also been discovered that LLMs can sometimes output things it knows are wrong.
When asked if the above was correct the LLM will reply with "no".
As humans, we find such behavior odd because that isn't how humans behave.

If you see the problem from the LLM's perspective the behavior is quite logical: It was given a difficult task, it failed and it was able to spot that.
Give yourself a coding task and complete it LLM-style, then read it afterward.

Next time you are less than impressed by the output of an LLM try solving the problem from the LLM's perspective. 
Sometimes this gives significant insight into ways you can reformulate the problem, like reversing the order of digits.
