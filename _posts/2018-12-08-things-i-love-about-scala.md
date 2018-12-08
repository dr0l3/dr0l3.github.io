---
published: false
---
For some reason the Scala language attracts a fair amount of criticism and controversy from within. Yes the language has its flaws, like any other language. Scala does however have a lot of very nice features. This blogpost is a homeage to some of those features and the people who implemented them.

## Practical day to day stuff

### String interpolation

One of the hardest things to get right consistently is error messages.
One of the reasons for that is that many languages does not support proper string interpolation.
As a result people write terrible error messages because writing good ones take way too long time and is way too difficult.
In scala writing great error messages is easy.
```scala
scala> val one = 1
one: Int = 1

scala> val two = 2
two: Int = 2

scala> s"$one + $two = ${one + two}"
res0: String = 1 + 2 = 3
```

### Pattern matching

It is hard to give pattern matching justice with the amount of space available in a blogpost.

Pattern matching quickly seeps into your code everywhere once you get used to it.

```scala
scala> val candidate1 = "lsakjdlakjd?"
candidate1: String = lsakjdlakjd?

scala> candidate1 match {
     |     case withQuestionmark if withQuestionmark.contains("?") => "has a question mark"
     |     case _ => "does not have a questionmark"
     | }
res1: String = has a question mark
```

But it really shines in combination with sealed traits and case classes.
It is just such an elegant way to solve a wide variety of problems.
The below is a ridiculous piece of code, but it would look considerably more ridiculous without pattern matching.
Also, it is just beautiful.

```scala
scala> case class Address(street: String, number: Int)
defined class Address

scala> sealed trait User
defined trait User

scala> case class Ordinary(name: String, passportName: String) extends User
defined class Ordinary

scala> case class Extraordinary(title: String, passportNames: List[String]) extends User
defined class Extraordinary

scala> case class Dog(ageInDogYears: Int, veterinaryAddress: Address) extends User
defined class Dog

scala> def getIdentificationClue(user: User): String = user match {
     |     case Ordinary(name, passportname) => s"Ordinary user with name $name can be identified using $passportname"
     |     case Extraordinary(title, passportNames) => s"Extraordinary user can found yelled by either of these names ${passportNames.mkString("[", ",", "]")}"
     |     case Dog(ageInDogYears, veterinaryAddress) => s"Dogs can be found by waving bones in the air. Once done can be turned into the nearest veterenarian at ${veterinaryAddress.street} ${veterinaryAddress.number}"
     | }
getIdentificationClue: (user: User)String

scala> getIdentificationClue(Ordinary("Rune", "Rune Pedersen"))
res2: String = Ordinary user with name Rune can be identified using Rune Pedersen

scala> getIdentificationClue(Extraordinary("The boss", List("Dr. X", "Mr. X")))
res3: String = Extraordinary user can found yelled by either of these names [Dr. X,Mr. X]

scala> getIdentificationClue(Dog(21, Address("Champs elysee", 2)))
res4: String = Dogs can be found by waving bones in the air. Once done can be turned into the nearest veterenarian at Champs elysee 2
```

### The standard collections library

Scala's standard collections gets a lot of flack for its shortcomings.
I tend to agree with a lot of the criticism, but what usually gets lost is how good the standard library actually is.
In my opinion Scala's standard collections is to Google Guava, what Google Guava is to the Java standard collections.

What makes the standard collections so great?
Proper implementations of the below methods
- map
- flatmap
- folds
- groupBy (group elements of a collection by some property)
- partition (split the elements of a collection using a predicate)
- zip (combine the contents of one collection with the contents of another)

As well as the ability to convert to and from more or less any collection without looking at documentation or doing google searches.

### Elegant and simple handling of tuples

Scala has great support for tuples.
They are easy to make
```scala
scala> val id = "some strange number"
id: String = some strange number

scala> val value = 3.14
value: Double = 3.14

scala> id -> value
res5: (String, Double) = (some strange number,3.14)
```
They are easy to deconstruct again
```scala
scala> val pair = id -> value
pair: (String, Double) = (some strange number,3.14)

scala> val (idAgain, valueAgain) = pair
idAgain: String = some strange number
valueAgain: Double = 3.14

scala> id == idAgain
res6: Boolean = true

scala> value == valueAgain
res7: Boolean = true
```

It might seem like a small thing.
But there is more to it than meets the eye.
In Java creating tuples is a mess and working with tuples in general is painful.
I tend to either create random classes to contain values that are much easier represented as tuples (or triplets etc.) or write the code in a way that does not need tuples even if they are the natural choice.

The end result is worse code.
Creating random classes to contain values hinder readability.
A function returning an "ObjectNaming" does not give you any information. 
It could literally be anything in the world.
A function returning a pair of (Integer, String) is much better.
At least you know the type of the information involved.
I am not saying you should stop wrapping values in classes.
Clearly there are lots of places where it makes sense.
I am saying you should stop wrapping values in classes when it doesn't make sense.

All of the above things are just small niceties showcased by simple examples.
It might seem banale, but that is because the examples are banale.
In a large and reallife codebase these small changes make a huge difference.
The examples are generally smaller, but they is also much cleaner and closer to how you think.
Reading the code isn't as painful as reading code in other languages become.
