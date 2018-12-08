---
published: true
title: Executing multistrategies
---
Many times we find ourselves in a situation where we want to use two different at least somewhat mutually exclusive strategies. For instance I want to live a healthy life and eat right, but i also like to eat food that tastes well. Each strategy in isolation will end in torture: Never eating anything that could be considered unhealthy is very limiting. Likewise never considering the health impact of a meal will likely not end well for you either.

This kind of problem gives rise to a whole family of strategies that involve combining individual strategies. A couple of simple examples could be
- Candy on fridays, and fridays only
- “Free” eating during holidays followed by post holiday dieting
- My personal favourite; i’ll generally eat healthy, but occasionally, when i please, i’ll do something else

On the surface the above strategies are similar, they each attempt to balance healthy eating with living the good life, for lack of a better term.
All multi strategies share the same pitfall. They work when executed as specified, but don't work when friday only turns into friday and saturday, then friday, saturday and thursday etc. In short there needs to be a clear and obvious divide between when one strategy is in effect and when another strategy is in effect. The last of the above ones is especially bad in this regard. This is probably okay if the strategy is only applied to me, at least i think so, but quickly turns bad when applied to a group. The guidelines of which strategy is in effect is simply too fluid and open to interpretation. In effect this means you often don't get the benefit of either strategy (feeling like you are dieting but living unhealthily).
For a multistrategy to be succesful you must have clear guidelines for which strategy is in effect and a clear way to resolve ambiguities. This becomes increasingly clear when moving to a group setting.

In software we also see plenty of multistrategies. Rust have been a particularly good example. 

“Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. ”

Rust gives you plenty of safety guarantees, but allows you to throw them away in clearly marked “unsafe” regions. You don't need to live under the tyranny of the borrow checker if you don't want to or need to, but it is there, as the sane default. This means safety is never in the way of blazingly fast. Also it is always obvious whether we are under the safe strategy or the not-so-safe strategy. Brilliant, simple and very effective multistrategy. It allows proponents of Rust to appeal to a larger audience without selling lies. Everyone who ventures into Rust knows that one of the major selling point is the safety guarantees, but you are allowed to opt out if you are okay with trading safety for fx speed. You, the programmer get to choose.

A considerably less successful application of the multistrategy comes from Scala.
“Scala combines object-oriented and functional programming in one concise, high-level language... ”.

Scala apparently combines object oriented and functional programming, this is objectively wrong. A more correct representation is that scala picks and chooses between object oriented and functional programming where Scala sees fit, not where the you, the developer sees fit. Nothing wrong with that if it was clearly communicated. However it isn’t, furthermore there is never a clear separation between when the object oriented parts end and the functional parts start and vice versa. This often leads proponents of either strategy frustrated. They were sold the promise of being able to choose between two strong alternatives, but are now unable to do so. This lack of clear separation is the source of endless debate and controversy within the language community. In fact i think at this point it is fair to say that Scala succeeds in spite of its policy in this area, not because of it. I don't know what a good strategy looks like, but i am confident good inspiration can be found in Rusts “unsafe” regions.

