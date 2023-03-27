---
published: true
---

ChatGPT is undoubtedly a revolutionary piece of technology that will transform the way we interact with computers. 
However, I postulate that the plugins are an even bigger deal.
The difference between pre-and post-ChatGPT will be smaller than the difference between ChatGPT with and without plugins.

Let's examine.
ChatGPT + API means that quite soon we will see ChatGPT in just about everything that interacts with text.
This has large implications for productivity.
But it doesn't fundamentally change anything.
It's mostly a force multiplier, you can do what you did before just faster.

The plugins are different.
Those have the potential to fundamentally change the way applications interact and thus the way we build and distribute software.
Before ChatGPT plugins integration is point-to-point.
Want to integrate one app into another? Write an integration in one of the apps (or both) generally using an API.
After ChatGPT plugins integration is just writing a single ChatGPT plugin.
It's like Linux pipes and database query planners had a lovechild that understands natural language.
Another way of putting it is that software integration is now `O(n)` instead of `O(n)^2`.
This is a BIG FUCKING DEAL!

For the following examples, I would ask to be cut some slack.
We are not there yet.
Speed and cost are not quite solved yet and there ought to be some concerns about piping all of your data through OpenAI.
I am sure most people will be able to come up with more problems.
But let's for a second port ourselves 5-10 years into the future where magically these problems have been dealt with.
What does that look like?

# A couple of motivating examples

In [an earlier post](https://dr0l3.github.io/interoperable-applications/) I tackled integration woes with the example of my hairdresser's appointment booking page.
Essentially I need to log into my hairdresser's site, then open my calendar in another tab, compare the two and select a spot.
This could be improved if my hairdresser integrated with my calendar provider.
Then I could have both in a single view, provided I logged into my calendar provider when on my hairdresser's page.
Just saying that out loud sounds weird.

After ChatGPT plugins the whole thing simplifies into asking ChatGPT to select an available slot that doesn't conflict with anything in my calendar.
Neither my hairdresser nor my calendar provider needs to know anything about the other.
The integration just works.

A similar thing plays out with online grocery shopping.
For this one would need some sort of meal plan.
I need to come up with this by myself (or take the ones provided by my grocery provider or some other third party).
If I do it myself I need to decompose the meal plan into items and then create the shopping list.
If I use athe grocery provider's meal plans the supply is usually rather generic.
I could hope that there is some third party meal planner that has something I like while also integrating with my preferred grocery provider.
That could happen, but unlikely in my experience.
Either way, I need to move my items to the grocery shopping cart and hit deliver.
With ChatGPT I can have a separate meal planning provider and grocery provider that knows nothing about each other, yet they can still work together.
I just ask ChatGPT to get a meal plan from the meal plan provider, make ChatGPT decompose it into items and order it from the grocery provider.
Bonus point for adding a picture of the fridge so it can adjust the order for what I already have.
On top of this, I can do further refinement like asking wolfram-alpha to remove recipes with too high a calorie count or use a separate service to prefer locally sourced products.
All of this again without any of the providers needing to know about each other.
This is magic.

It vastly simplifies the integration effort, both because you can write fewer integrations and probably also smaller ones.
Wolfram-alpha gets a lot of mileage out of just a couple of endpoints.
It also means that apps can be vastly simpler.
Maybe this can be a step towards bringing the Unix philosophy of doing one thing well to the web.
A breath of fresh air compared to the bloated nature of the current web.
Actual web3.0.

As mentioned there are still lots of challenges for this to fully work.
Additionally, not everything can be solved like this.
For example, I don't see how you consume Netflix content without opening the Netflix app.

Today every company needs a full-fledged app with all of the bells and whistles this entails.
Do we need that with ChatGPT plugins? Can you just make an API and let ChatGPT do the rest?
How long this concept can be taken remains to be seen, but I would be wholly surprised if the world doesn't look considerably different in a couple of years.
