---
published: true
---
This blogpost is an attempt to distil some of the lessons I have learned over the last couple of years.
Mostly from going from 0.5M ARR to 15M ARR over the course of 4-5 years (5 to 70 developers).
Some of those years were exciting and some of them not so much :)
Hopefully I can save others a bit of time and pain by sharing some of the lessons I have learned.

In terms of the numbers and facts the journey was something like this

**Revenue growth:** 0.5M -> 2M -> 8M -> 13M -> 15M or something along those lines

**Size of team when I joined:** 5 (2 frontenders, 2 backenders, 1 devops)

**Frontend tech:** SPA using React, Javascript

**Backend tech:** Microservices using Scala, DynamoDB, AWS, Thrift (Finagle), Kubernetes, Redis, infrastructure manually provisioned (don't do this), Twilio for telephony and MailChimp for email

**Size of the team when I left:** ~70 (~3:5:1 frontend:backend:devops)

**Frontend tech:** SPA using React, typescript

**Backend tech:** Scala, DynamoDB, AWS, Thrift (Finagle), Kubernetes, Redis, Pulumi for infrastructure, Twilio for telephony and SES for email, Kafka for event queue, Postgres

The product itself was a SaaS product used for customer service.
It bundles communcation from email, telephony, chat etc into a single interface.
Customers can use the interface to write logic for how things are routed and who should handle different requests.
The main selling points was the very integrated nature of the different channels (everything in one application) and that conversations where "pushed" to CS-reps using notifications rather than "pulled" (like in a normal email client where there is inbox to pull from).
Lots of extra detail under the hood, and more was added as time went by but this is the gist of it.

I have listed the tech and product here for context.
How a company is run day to day can change a lot based on for example the distribution model.
If you run all the software yourself then pushing updates is trivial because you are in control.
If on the other hand customers run software themselves and they control the updates then you have to be more careful about updates, because there might not be a rollback button.
Also you are likely to be required to support a greater breadth of versions.
Likewise some companies have higher bars to pass in terms of compliance and security.
If your company is different the lessons here may or may not apply.

Writing this as a series of war stories might leak more detail than preferred by some people and I don't want that.
Instead we will try to derive the problems from first principles with the occational sprinkled anecdote.
From the anecdotes one might get the impression that the places I worked at were a bit of a mess.
It's important to understand that several of the problems referenced started out as complete non-problems, but only became problems as we scaled.
Many things are inherently easier at small scale and exponential scaling is not intuitive so it can sometimes be challenging to predict what is coming your way before its too late.
If you are interested in more details on the anecdotes then beer is your friend :)

The from first princeples apprach makes the post quite a lot longer, but also gives insights into some of the fundamental forces that control scaling journeys.

# TLDR

The TLDR is that many problems can be identified and solved by looking at how time is spent.
As a company scales more and more things will demand more and more time.
Everything from more meetings to slower compile times will eat into the time available to do work.
The key to success it to be able to identify the important value adding tasks that are essential and then optimize them heavily.
For most software companies this would be

1) Writing code

2) Building code

3) Testing code

4) Deploying code

5) Operating code in production

Another key lesson is that the effects of scaling do not hit uniformly.
Your high performers will take the brunt of the questions and problems.
This is because the very same attributes that make them high performers also make them the best qualified to answer questions (high context and experience).
Onboarding too many people too quickly can easily burn out your high performers and lead to high churn.

Furthermore it is important to understand that exponential scaling is not intuitive.
Things that seem manageable can bubble up to become major problems very quickly.
Oftentimes the severity of problems is evaluated based on how severe they have been in the past.
But in exponential scaling such evaluations stop being accurate.
Understanding what will be important in the future allows you to build the right building blocks in advance.
Sometimes this is vastly superior to retrofitting solutions, sometimes it is not.

Lastly it is important to understand that scaling is not a one time event.
What works great at 5 people might be terrible at 50 people.
What works great at 50 people might be terrible at 500 people.

What is generally needed is a transformation from a focus on individuals to a focus on teams and processes.
By doing this transtion at a pace that is neither too fast (adding too much process too quickly) nor too slow (too heavy a focus on individuals) it is possible to save a lot of pain and suffering.
This translates to a happier and more productive workforce.

# Scaling software companies

Scaling is often thrown around a little bit loosely.
"We need to scale the company".
In my experience this vaguesness tends to cause confusion.
Some people immediately jump on some sort of "performance train" and try to optimize the software even if that isn't what is needed.
Others see completely different problems.
I was once part of a team named "scalability",
There were about as many opinions of what we should do as there were people who knew about the team.

Normally three fundamental types of scaling is needed:

1. Adding more customers
2. Adding bigger customers
3. Adding more developers/employees

Each of these types pose very different challenges and the solutions that are needed can also be very different.
It's very common for these types of scaling to happen at the same time and both 1 and 2 tend to invite the same managerial solution: Hire more people!.
This does to some degree make 3 the quintessential scaling problem.

There are two aspects to software (or most activities in general)
- Decisionmaking (deciding what to do)
- Execution/mechanics (doing what we decided)

In software decision making is by far the most important to get right.
It does however have an element of luck to it.
Whether a given decision turns out to be succesful often depends on how the future pans out or other information that is not present at the time of making the decision.
What will always work is to execute fast and see if it works.
Luckily execution is almost entirely skillbased it is simply optimizing how fast we do what we set out to do.
Or it is optimizing how fast we get feedback on our decisions.

We will focus on the software mechanics of adding additional developers in this post. Informally speaking the goal will be squeezing out as much code as possible from our developers while adding more of them and keeping them happy :)

If you can add people fast without hurting productivity then 1 and 2 will fix themselves, in theory (kinda :)).
However as we will see hiring and onboarding large amounts of people is not trivial and you might want to be strategic about it.
Reactively and naively adding people is not always a good idea, even if it seems like an obvious next step.
And to understand why this is we need to understand time - in detail.

# Time and developer productivity

There are two key facts to understand about time in terms of scaling software companies.
1. Time becomes more valuable the less of it you have (corollary: each wasted second costs more than the previous one).
2. Developer productivity is highly reliant on long stretches of uninterrupted time.

The first fact is pretty obvious when you think about it.
Removing 5 minutes from a pool of 8 hours is not a big deal (`~1%`).
Removing 5 minutes from a pool of 1 hour is a much bigger deal (`~8%`).
An important sidenode is that in terms of waste all time is equal.
It doesn't matter if time is wasted waiting for slow compilation or waiting for the restroom to become available.
Wasted time is wasted time and it all adds up.

The second fact is also fairly well known, but often overlooked.
Software engineering is a high context discipline.
There is ramp up time in order to get into flow.
How much depends on the indivual and the task, a good rule of thumb is 30 minutes.
In reality there isn't a magic breakpoint at 30 minutes after which you suddenly produce 100%.
Some things can be done before 30 minutes and some things require even more than 30 minutes. 
I am sure a rather elaborate formula for ramp up time could be derived, but a crude 30 minutes cutoff is enough to understand the basic mechanisms.
The point is that interruptions can be very costly.
You are essentially taking 30 minutes plus the duration of the interruption away from the developer.

A normal day will be 8 hours with a lunch break in there somewhere.
This gives us 7 hours of productive time, this is our baseline.
After this is where companies can either help or hurt themselves.
For example, standups are common and sometimes scheduled in the middle of the day.
Another common ritual is a weekly grooming session as well as a weekly planning session.
Sometimes a weekly demo is also scheduled.
On top of this we might need a weekly engineering meeting.
And a biweekly 1:1 with the manager.
Not to mention the monthly all-hands.
Assuming 4 weeks in a month we started with `7 * 5 = 35 hours of productive time per week` or `35 * 4 = 140 hours per month`.

Then we took away
- 15 minutes daily for standup              ~ 6 hours per month + 12 hours lost on rampup time
- 1 hour per week for grooming              ~ 4 hours per month + 2 hours lost on rampup time
- 1 hour per week for planning              ~ 4 hours per month + 2 hours lost on rampup time
- ½ hour per week for demo                  ~ 2 hours per month + 1 hour lost on rampup time
- 1 hour per week for engineering meeting   ~ 4 hours per month + 2 hours lost on rampup time
- ½ hour biweekly for 1:1                   ~ 1 hours per month + 1 hour lost on rampup time
- 1 hour per month for all-hands            ~ 1 hours per month + ½ hour lost on rampup time

We just lost `4 + 4 + 2 + 4 + 1 + 1 + 6 = 22 hours` spent in meetings and `2 + 2 + 1 + 2 + 1 + ½ + 12 = 20½ hours` lost on rampup time.
This means we are down to `140 - 22 - 20½ = 98.5 hours of productive time per month`.
We cut off a good 25% of our baseline.
Additionally around half of the time we lose we lose due to rampup time.
This can be mitigated significantly by scheduling meetings at the right time.
Meeting scheduled at the beginning or the end of the day removes the lost rampup time.
Additionally clustering meetings together can also help.
Another thing to consider is whether you really need the standup to be a meeting.
Can it be replaced by a scheduled slack message?

Being smart about scheduling meetings can help a lot.
As already mentioned each second wasted is worse than the previous one, so by spending as little as possible on things that are difficult to change we get a bigger buffer to absorb the "other" interruptions, the effects of scaling.

These other interruptions could be
- Questions
- Other meetings and coordination
- Production incidents
- Slow deployments/builds/tests
- Code reviews

The kicker with these additional interruptions is that they are usually driven by factors that will increase as you scale.
E.g. more code leads to slower builds/tests.
More people leads to more questions and code reviews.
These factors can completely overwhelm a company if left unchecked, but they can also be mitigated (unlike the bi-weekly 1:1 which is invariant to both scale and mitigation efforts). 
If these other factors cost you 2 hours daily it matters a lot whether you had 7 hours or 5 hours of productive time when you started.

As an example, one place where I worked I went from 10 to 80 monthly code reviews in less than 6 months as a consequence of adding more developers.
I also managed to clock in 117 slack notifications in a single day.
I did not get a lot of work done that day.

In conclusion: Wasted time becomes more and more costly the more you have of it. It is worse for developers because they thrive on long stretches of uninterrupted time. Some interruptions are invariant to scale and mitigation efforts others are not.

Before we move to strategies for mitigating these problems we need to zoom out and understand how time and productivity works at an organizational level.

# Time and organizational productivity

The key fact to understand about time and productivity at an organizational level is that producivity is usually not uniformly distributed.
You will likely have a few high performers that are significantly more productive than more average employees.
This is usually a function of having been around for a longer time and thus knowing the system better, but obviously skill also plays a part.
This means that not all time is created equal.
Some peoples time are more valuable than others.
These effects are usually more pronounced in smaller companies.
Say you have a company of 10 engineers.
3 of these people are founding engineers, with the remaining 7 added over time.
It would not be surprising if the 3 founding engineers were some very large percentage of the total output, sometimes significantly over 50%. As an example, at 50% contribution from 3 high performers with a total of 10 engineers, a high performer contributes 16%, other engineers 7%.

Now lets add a new engineer.
In theory this should increase the total output by 10%.
We had `98.5 * 10 = 985 hours per month`.
Now we have `98.5 * 11 = 1083.5 hours per month`.
However the new engineer is not familiar with the system and produces at a rate that is 50% of one of the founding engineers (as per the example above).
Additionally the new engineer requires a fairly big time investment in terms of onboarding.
The new engineer needs to ask 2 questions daily each taking around 15 minutes to respond to.
We gained 98.5 hours, but we lost `2 * (( 15 + 30 ) / 60) * 20 = 30 hours` of question answering time.
The new engineer also needs 2 code reviews per week each taking around 30 minutes.
This comes out to `2 * ((30 + 30) / 60) * 8 = 16 hours` of code review time.

These 46 hours could in principle be taken from any of the existing engineers, but in reality these tend to hit those who have stayed around for while, which incidentally is also your high performers.
This is because the very same thing that makes them high performers also makes them the best qualified to answer questions and do code reviews.
This means that it takes around two new engineers to completely tap the time budget of an existing engineer.
Adding those two engineers are essentially a wash.
Obviously this is a temporary situation, the new engineers should run out of questions to ask eventually and they should also become more productive.
However if you are doing a bad job of mitigating the effects of scaling your existing engineers will have less then 98 hours and will be hit harder by adding new engineers.
The questions might also persist for longer thus reducing your ability to scale.

This section was quite theoretical and has some relatively arbitrary assumptions e.g. 15 minutes to answer a question. Maybe 15 minutes is excessive at 10 engineers, but the time it takes to answer a question tends to scale with the size of the company. "Why are we doing deployments this way?" is simple to answer if your deployments are simple, but convoluted to answer if your deployments are convoluted. Even if the assumptions aren't true for your company now, they might become in the future. Exponential scaling is not intuitive!

In conclusion: Interruptions related to onboarding engineers tend to hit your high performers the hardest. This means that adding new engineers can easily be a net negative addition in the short term and sometimes even the long term. Your ability to scale is highly dependent on your ability to mitigate the effects of scaling.

# The effects of scaling and time

So far we have dealt with time seen from the perspective of engineers and groups of engineers.
We are now going to take a look at what scaling (or just passing time) does to a company regardless if how you handle the scaling.

Essentially the below is a list of causes and effects.
Its not exhaustive.
The point is to show how many ways it is possible to lose time.
I believe that the breadth of this list is one of the main reasons why scaling is so hard.
People look at any one particular problem and declares it minor.
And they are right there are no big problems, just a large list of small problems that all eat from the same pool of time and each second lost is worse than the previous one.
A 5 minute interruption is no big deal, except it ruined the only good block of time you had that week and now you got no work done.
Failing to manage the time waste means the full effects of scaling are eventually felt.
Sometimes the effects combine exponentially and when the they are finally felt it can be very difficult to recover.
The proverbial boiling frog.

The items on the list can combine together to create e.g. large amounts of bugs, very slow pipelines or a lot of questions.

- More people -> more meetings (and more coordination in general)
- More people -> more code
- More code -> more bugs
- More people -> more pull requests -> more code reviews
- More people -> more deployments
- More deployments -> More production incidents
- More code -> More code churn -> more context loss
- More context loss -> more bugs
- More code -> higher code complexity
- Higher code complexity -> more bugs
- Higher code complexity -> longer ramp up time
- More code -> higher compile times
- More code -> more tests -> longer pipelines
- More code -> more tech debt
- Time pases -> people leave
- People leave -> context loss
- More people -> smaller PR's -> more PR reviews
- More code -> More maintenance work (version bumps, security fixes, etc.)
- Time pases -> More maintenance work (version bumps, security fixes, etc.)


Another thing to internalize is how code knowledge changes over time.
When you start a project you have zero code and zero context.
You then add a couple of people and they start producing work.
This creates code and context (why is the code this way?).
At this point you have perfect knowledge.
All code is written by someone still with the project who can hopefully explain why it is the way it is.
When someone leaves you lose some of this knowledge, hopefully someone else also has the knowledge, but in reality you will always lose something.
When you add new people you can only add people with zero knowledge and zero context.
This means the average knowledge is going down.
If left alone this generally leads to more mistakes and less output.
Another thing that often happens when you add people is that they start to change the code.
This essentially moves knowledge from the original author to the new author.
This transfer can be good (it spreads knowledge), but can also be harmful if organizations are reliant on people with perfect knowledge.
For example if the company has poor operational maturity and is reliant on single person heroics to fix production issues then removing knowledge from these heroes can be problematic.

The end result of all of this is that you start with perfect knowledge centralized in a few people and you end with very imperfect knowledge spread out over more people.

In conclusion:
There are many ways to lose time. Many of the ways you lose time is in some way related to the amount of developers you have. If you are onboarding developers quickly the amount of lost time can scale out of control if you are not actively managing it.

Additionally knowledge of the code will spread over time.
This process is natural and to some degree neccesary, but can be either accelerated or decelerateed by the way you handle scaling.
Spreading knowledge too fast tends to result in product quality going down and velocity loss.
Spreading knowledge too slow overwhelms your high performers and causes employee churn, which also lowers product quality and velocity.

A balance must be strikken and being conscious of this can greatly help smoothe out the scaling journey.

# Mitigating the effects of scaling

Now for the money part. The solutions.

- More people -> more meetings (and more coordination in general)
    -  Architecture and organizational structure
- More people -> code
	- Write me if you find a good solution :)
- More code -> more bugs
    - Testing  
- More people -> more pull requests -> more code reviews
    - Reduce the need for code reviews (testing, automatic code formatting and linting, etc.)
- More people -> more deployments
    - Automate the shit out of deployments
- More deployments -> More production incidents
    - Testing, monitoring
- More code -> More code churn -> more context loss
	- Write me if you find a good solution :)
- More context loss -> more bugs
    - Testing
- More code -> higher code complexity
    - Debugging tools, tracing
- Higher code complexity -> more bugs
    - Testing
- Higher code complexity -> longer ramp up time
    - Fast Dev environments
- More code -> higher compile times
    - Centralized build system
- More code -> more tests -> longer pipelines
    - Parallelize tests
- More code -> more tech debt
    - Standards and processes
- Time pases -> people leave
	- Write me if you find a good solution :)
- People leave -> context loss
	- Documentation
- More people -> smaller PR's -> more PR reviews
	- Remove jobs that are done by PR reviews
- More code -> More maintenance work (version bumps, security fixes, etc.)
    - Automate teh shit out of maintenance

## Simplicity

Perhaps the most important piece of advice I can give is to focus on simplicity, in everything.
Simple things are easy to debug, extend and maintain.
Simple things are easy to onboard into and understand.
Simple things keep people happy.
It shouldn't just be the code that is simple, processes should be simple a well.
If your deployment process is a 12 step plan then that increases the likelihood of mistakes.
If it is just two steps (show change then approve change) then the likelihood of mistakes goes down.

Ideally it should be a goal that new engineers deploy to production on their first day.
Obviously a day1 production deployment provides very little business value, but its a canary in the coal mine.
If it is not possible then your processes are too complex.
Simplify them.
Another example is version bumping.
Theoretically this should be as simple as updating the number, run the tests and deploy if the tests pass.
If it is really that simple it can be completely automated.
If this is not the case then simplify the process.
This might involve significant investments in things like developer environments and testing.

## Developer environments

Lets elaborate a bit on the above.
Make sure to invest in testing and developer environments.
New developers has zero knowledge and zero context when they start.
Broadly speaking they have two options
- Read/run the code/documentation and try to understand it
- Ask a colleague

If you have great developer environments and lots of testing it is quite possible that option 1 can be productive. However if your code is complex, has lots of tech debt or is in some other way filled with unpleasant surprises then option 1 can become significantly worse than option 2. I have personally seen developers waste weeks on a single task because they did not know how to do it and did not have anyone to ask. If this is your status quo then either the new developers will quit or they will carpet bomb the existing developers with questions, causing the existing developers to quit :)

## Testing

The situation repeats itself when the code is to be deployed.
If you have a good test suite that you trust then deploying has potential to become a simple task.
If on the other hand tribal knowledge is required to know whether something is safe to put in production then new developers are once again in a situation where they can either ask or do something that is unpleasant.
Breaking production is not fun.
I witnessed first hand how almost a entire company got scared to deploy because several deployments had gone wrong.
Deployment fear was actively talked about and several people quit.
This is in addition to time lost doing production firefighting and investigations.
Additionally a policy of requiring specific engineers to review code was added.
This had the, by now, familar effect of flooring those engineers productivity.
Since these people were the high performers this meant a significant net loss to productivity.

A good thing to aim for here is to have a test suite that is so good that if it passes you are okay with deploying in a completely automated way.
Feature flags, blue/green deployments and similar can help make this more palatable if you are behind.

## Architecture and organizational structure

Architecture and organizational structure was listed as a solution to more meetings and coordination.
The rationale for this is that there are two reasons why one would need to coordinate something between teams

1. Team A produces something that Team B needs
2. Team A and Team B share some resource or logic is dependent on two services being in sync

Its completely normal and expected to have teams depend on each other.
However the problem usually comes if one team is a dependency for too many other teams.
This can cause them to be overwhelmed with feature requests and bug reports.
This slows the other teams down.

It is less common to have shared resources between teams.
However a quite common pattern is to grow teams and then split them when they become too big.
This can sometimes create shared resources or logic that is dependent on two services being in sync.

Architecture and organizational structure are intimately linked. So its difficult to not talk about one without also talking about the other.
Ideally the architecture allows for splitting the code into chunks that have as few dependencies between the chunks as possible.
The dependencies that do exist should ideally be stable and well defined.
If this can be achieved then it will be relatively easy to divide the developers into teams and have them work productively.

If on the other hand you are drowning in coordination meetings then take a look at your architecture.
Draw out the dependencies between the different parts of the system.
Annotate those dependencies with how stable they are.
If this doesn't produce something that can be easily clustered then you might need to rethink your architecture.

Be deliberate when evolving the organizational structure and make sure that the resulting architecture does not turn into a mess.
Blindly adding people and splitting teams can cause significant overhead and coordination need. As should be familiar by now this wastes time and every second is precious.
More people does not neccesarily mean more productivity unless your architechture and organizational structure is ready.

## Automating the highway

We have already covered testing and development environments, but automation needs can sometimes extend further than this.
Any task that has to be done repeatedly should be a candidate for automation.

For example at one point we had an email implementation that left alot to be desired.
It did not support a lot of features and the ones that were supported were quite buggy.
A part of the problem was that reproducing the bugs was difficult.
A first step in remediating this issue was to save the emails in raw format when they came in.
This allowed us to reproduce the bugs, but it was still a long, tedious and difficult process that required a bit of tribal knowledge.
People generally did not want to take on email bugs and if they did we wouldn't see them for a while.
You would need to go into the database and usually do some manual work to find the right data.
Then find the email in s3 and download it.
This sounds simple on paper, but the implementation did a great job of making it difficult.
Instead I created a script that would download the mails and move them into a folder so that creating a test case out of the email was rather simple.
This significantly sped up the process of fixing email bugs.
This allowed me personally to fix so many in such a short time that I was able to come up with a plan for how to fix the email implementation for good.
Had I not automated the test cases I would likely have grown tired of fixing email bugs and we would still have a bad email implementation draining productivity.

The point I am trying to make is that no task is too small to automate.
If the task takes up a lot of time then automate it.

Another benefit of automation is that if done properly it can be used to effectively evolve standards.
If some task is left manual and you want to make changes to how its done you can update the documentation and hope that people will follow it.
However some people might forget or not know about the change.
If the standard is automated then you can just update the code and move on.

Building this automation is often something of an afterthought.
Maybe the company has 20% time or something along those lines, but usually the time to automate is not prioritized.
As is evident I think this is a mistake.
An easy fix to the problem is to just hire people whose sole job it is to automate repetitive tasks or have an "automation" duty similar to how on-call is shared.
Exactly how much time should be delegated to automation will always differ as a function of scale.
A rule of thumb is that at least the 10th hire should be automation. 
After that every 5-7 hires should be automation.

## Standards and processes

Standards and processes are listed as solutions for tech debt.
This is maybe a bit of a misnomer.
If standards and processes could conclusively solve tech debt then we would not have tech debt :)

If you are employed at a startup then some amount of tech debt is to be expected.
When you don't have paying customers will be on getting paying customers and figuring out what they like.
Cleaning up failed experiments and impedance mismatch between implementation and design might not be first priority.
Unless someone went back and fixed it all then there will be tech debt.
That being said heavily accumulating tech debt is ofcourse a problem.

Accumulating tech debt is really an organizational problem.
The organization is unable to convince itself that dealing with tech debt is a productive use of time and the standards and processes are mostly a way of surfacing that.
The organization is moving at an unsustainable pace and needs to slow down.
If you can agree on standards like what it means to be production ready then by enforcing these standards with processes you can limit tech debt.
It doesn't just have to be production readiness, but any standard that you can agree on.
Obviously if you can automate the enforcing of the standard then that is great win.
Automatic code formatting and linting are great examples of this.

I have heard examples of companies who have very elaborate processes for dealing with tech debt.
Generally in startups you want to limit processes to a minimum so use these wisely.

## Documentation

Documentation is a double edged sword.
Documentation takes time to write, unless at least as much time is saved by reading it then creating the documentation is a net loss.
It is much better to have small amounts of impactful and always up to date documentation than large amounts of documentation whose value is questionable.

Developers especially tend to be fond of putting documentation in documents that they then put in Git.
I think this is a mistake.
Any documentation should be put into a system where you can rate the content, assign an owner and easily provide feedback without altering the document itself (comments are not feedback).
It should then be possible to see what documentation is helpful and which is just noise.
This allows for much more efficient maintenance of documentation.

I have been through several iterations of people declaring some documentation system too messy to be useful followed by recreating a new mess just like it in another system. This wastes enourmous amounts of time.

## Other

The remaining points are not as important as the ones above, but they are still worth mentioning.
Tracing is a great tool for debugging, performance analysis and can help keep architechture diagrams up to date.
It does however, for now at least, come with a rather high cost and somewhat difficult implementation requirement.
If you have a monolith then you probably don't need tracing.

Parallelizing tests and centralized compilation can also be very low hanging fruit if long pipelines are a problem.
Some companies have taken to the cloud even for developer machines.
This certainly can be beneficial if keeping development environments up to date is difficult or your compilation process can benefit from a bigger CPU.

Finally code reviews can be a great tool that can solve a lot of problems like
- Enforcing a consistent code style
- Catch bugs
- Catch architectural problems
- Spread knowledge
- etc.

The problem is that when you put too much weight on code reviews then they can become a bottleneck.
There will either be many suggestions for changes or the code review wont do its job.
Therefore I would suggest trying to limit the scope of what code reviews are supposed to accomplish to a minimum.
There is almost nothing that can be done with code reviews that can't be without code reviews.
Some of the alternatives can be automated.
Use those.
