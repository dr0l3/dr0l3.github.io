---
published: false
---

In [a previous blogpost](https://dr0l3.github.io/scaling-software-team-productivity/) we tackled the problem of scaling the execution part of making software.

For this post we will tackle the problem of scaling the decision making part.

In a nutshell decision making is simply about making sure that all the right information is available and is considered when a decision needs to be made.
This is pretty easy to do when you are a small company.
Take everyone and put them into a conference room, tell them the problem and ask them to make a decision.
The ability to repeatadly put everyone into a conference room and have that be a productive use of time is a bit of a superpower.

A less cheeky way to put it is that the following is usually true

- Everyone knows everyone
- Everyone knows what everyone is working on
- Everyone knows what everyone else has been working on in the past
- Common problems are trivial to spot
- Having all relevant knowledge in the room is trivial to achieve

This supercharges decision making.
You will be able to make good decisions, quickly and with great consistency. 

Unfortunately you can't put 50 people into a conference room and expect it to be productive.

It is also no longer possible for everyone to know everyone.
This means that person A might have a problem that person B knows how to solve, but the two of them might not know each other.
Or person A might not know that person B could help.
These sort of "invisible walls" are unavoiable and sometimes carry significant cost.

At a company I was employed at we had built a handful of internal libraries and patterns to use in different situations.
The use of these sped up development significantly.
It also sped up design because we could decompose problems into primitives we fully understood and knew we had.
As we scaled we found out that new engineers didn't know about these and were reinventing the wheel.

For example understanding Kafka's sharding model, ordering guarantees and how to establish exactly once delivery can be non-trivial if you are not familiar with the domain (or at least it was before ChatGPT).
One team I worked with had a problem where they needed to react to certain events in a system.
We had these events in Kafka, but the team was a little hessitant to use these and instead wanted to periodically poll the database, a more familiar solution.
I had significant experience and could easily see how this would be a scaling challenge if certain enterprise customers got their hand on the product.
The team immediately agreed once the scaling was brought up and concerns of exactly-once were addressed.
These sort of "tiny in the moment, but huge down the line"-corrections come for free in startup land, but are so valuable in enterprise land that there is a giant industry around them (consulting).

# Effectively making decisions at scale

When there are too many people in the conference room, you have a couple of options.
- Tell some of the people to leave (centralize decision making)
- Split the people into smaller groups and ask them to make the decision themselves (decentralize decision making)
- Some combination of the above

Centralized decision making tends to favor consistency over speed.
At a very deep level you are choosing the amount of heterogeneity you are willing to tolerate.
For some things having a consistent experience is super important.
For example Apple seems to value consistent UX.
Anecdotally, my dad agrees and swear by Apple products because of this consistency.
I also wouldn't want to be on-call for a product that has micro services and no stardardized monitoring.

At other times trying to force heterogeniety is more trouble than it is worth.
For example you could force everyone in the company to use the same programming language.
However your frontend engineers, your devops engineers and your machine learning engineers might have very different opinions on what the best programming language is.

From a mental model perspective its possible to view centralized decision making as a cost that has to be recouped later.
If it is not possible to point to the place where the cost is recouped, then maybe the decision making should be decentralized.

No company will ever be fully decentralized or fully centralized.
The task is to decide which decisions are made centrally and which are not.

# Productively splitting up groups of people

As the company grows you will have to split up into groups.
How exactly this is done can have a significant impact on the productivity of the company.

A poor split will waste time by creating communication overhead.
It will also increase the likelihood of not having the right people in the room when decisions are made. A good split on the other hand will allow teams to make decisions quickly with minimal cost to decision quality.

Organizational structure and architecture go hand in hand.
The two will eventually want to converge on the same structure, so it is important to think about both at the same time.

Ideally you want to split the domain up into problems that can live in isolation - to as large an extent as possible.
For lots of things this is simply not possible.
For example the concept of a user tends to be shared across many different parts of most systems.
Other parts will have a dependency on the concept of a user.
How costly these dependencies are will largely depend on how stable the concept is and how well versioning is handled in the company.

Essentially your entire company will form a graph of dependencies.
If too high a cost is flowing into a team, then the team can end up under too much load slowing all the other teams down.
If too high cost is flow out of a team this leaves them vulnurable to being blocked by other teams.
Optimizing for reducing the max cost flowing into and out of a single team is the objective.

Establishing good policies for versioning early on will pay off in the long run.
It allows teams to work independently and avoid synchronization overhead.
Many of the essential questions boil down to knowing how to handle breaking changes.
There are essentially two ways to place responsibility for breaking changes.
Either with the consumer or the producer.
I don't think it matters which one you choose as long as the choice is backed up by organizational tools and processes.
For example if the producer is responsible for breaking changes then they must be able to know who their consumers are.
It is common to choose a paradigm where the consumer is responsible for breaking changes.
This is how it works with API's "in the real world".

# Getting outside information

When people are split into groups this can have the effect of reinforcing whatever biases the groups already have.
This is sometimes good, sometimes not so much :)
I have seen this feedback loop go completely off the rails where a team repeatedly made the same mistake of choosing overly complex solutions.
Essentially they were trying to please too many people at once and ended up with complex problems.
This slowed them down and increased the pressure on them to deliver on commitments.
The response was to attempt to solve several problems at once again increasing complexity which just made everything worse.
Everyone was worse off as a consequence.

One way to deal with this is to invite outsiders to meetings for the purpose of sanity checking decisions.
This allows teams to get another perspective on the problem and can be very helpful for spotting deeply dysfunctional patterns.
It also spreads knowledge and allows people to learn from each other.
I don't think the exact policy for who to invite and when matters near as much as how meetings are conducted when you "have visitors".
Amazons famous 6 pagers is one example of how this can work.

A mistake I repeatedly see people make in these sort of "can you give me feedback on this"-meetings is to skirt over the high level view and go straight to details.
Another mistake is to just invite people without any context (or too little context) and then expect them to make brilliant suggestions on the spot.

You essentially want to do the opposite.
Give participants pre reading material and a clear agenda.
Make sure to communicate that you expect them to read the material and ask questions.
Furthermore spend most of the time on the high level view and only go into details once all the high level parts are covered and well understood.
Favour graphical representations over text whenever possible.