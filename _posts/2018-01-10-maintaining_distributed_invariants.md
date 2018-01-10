---
published: true
---
Many systems have, as a more or less central part, the task of upholding some kind of invariant. Examples include

- No payments from an account without money in it
- Don't accept an order unless we either have stock or will have stock within the period we promise to deliver the product in
- Don't let traders expose themselves to too much risk, whatever that means
- Always close a connection (or file or any other closeable resource) after use
- Any sort of access restriction
- Any sort of integrity constraint

So, invariants are everywhere and being able to uphold them is the name of the game. This game becomes significantly harder when we go from one to more physical hosts or from one to more of just about anything of significance. Two databases, two applications on the same database, two  threads, two features mutating the same state...

In other words; the world is filled with invariants that we need to uphold and doing so is very complicated as soon as you go to a distributed setting. For the vast majority of commercial systems a distributed setting is required.

It is thus interesting to see how we choose to maintain these distributed invariants in practice. Most of the time these invariants are upheld by application code. Code that is changed on a fairly consistent basis. Often time the code itself is even distributed into multiple repositories and mingled with business logic or worse. For most language in widespread usage today there is very poor support for encoding such invariants and controlling them as part of compilation (are you sure have closed all the connections that should be closed in your codebase? Can you verify without reading the code?). Hopefully some tests have been written to provide at least some defense. Then again, how many of the above examples can you write a test for in your favourite language? All in all the situation is far from ideal.

It is worth considering what we would like from the invariants. A wish list if you will. Here is a short one off the top of my head.
- Easy to write
	- Short
- Easy to read
	- Close to human language
	- Declarative
- Systemwide!
- Easy to verify

As usual it's hard to point to a silver bullet. I think however it is fair to say that we have some systemic inefficiencies in the industry today. 

Many applications (or suites of applications) use a single database. In such cases maintaining the invariants at the database level and making the application dumb is probably a better solution than the other way around (\*wink\* \*wink\* NoSQL). You could even completely automate the application code (see postgrest and postgraphile). That would certainly satisfy a couple of the criteria above. That might introduce other problems, but that is a different topic for a different day.

Additionally I am floored by the lack of use of property based testing. I understand that most frameworks that support it comes with a lot of baggage in the form of categorical programming lingo that scares the average programmer and project manager. However we are in times of change, we leveled up to distributed systems, maybe that requires leveling up in other areas as well? Personally, I believe property based testing works wonders when trying to maintain invariants because it is possible to code the tests and the data generators in a way such that you describe your intentions in the code (rather than a flurry of comments describing why your tests are sufficient). Additionally, its not only about the code itself, it’s also about the kind of thinking property based tests forces you to do. You start thinking about what invariants you are trying to uphold as you write your applications. You then start writing your applications such that properties (or invariants) are easy to uphold. Oftentime this has the nice side effect of immensely simplifying designs and code in general.

Lastly I think it is time we as an industry start maturing a little. Distributed systems are the norm today. That comes with some tough challenges. So does creating a database with a good query languages. Writing a good query planner is hard, but you only write it once. Maybe it is time to look for the “query planner of maintaining distributed invariants”?
