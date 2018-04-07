---
published: true
title: Maintaing distibuted invariants!
---

The ground pillar of functional programming is the insistence on pure functions. That is, functions that has no effect outside of producing the result. Obviously the system will at some point need to execute its effects in the real world. This is handled by restricting the application code to producing datastructures that describe the computation. The actual effectful part is then delegated to a monad. It seems to be universally accepted that pure functions are a good ideal strive for. Where the confusion usually starts is then how to deal with systems that are inherently effectful (they make use of side-effects).

Effectful systems are prime candidates for the use of property based testing. This involved generating random data, calling the functions with this random data and then verifying that the end result has a certain property. The below example is simple string specification taken from the scalacheck frontpage.

object StringSpecification extends Properties(&quot;String&quot;) {

  property(&quot;startsWith&quot;) = forAll { (a: String, b: String) =&gt;
    (a+b).startsWith(a)
  }

  property(&quot;concatenate&quot;) = forAll { (a: String, b: String) =&gt;
    (a+b).length &gt; a.length &amp;&amp; (a+b).length &gt; b.length
  }

  property(&quot;substring&quot;) = forAll { (a: String, b: String, c: String) =&gt;
    (a+b+c).substring(a.length, a.length+b.length) == b
  }

}
Alright, that seems to work well for string. But how about my very large and complex system? What kind of properties should I seek to verify using this wonderful machinery?

- Obvious implementation
- Operations that reverse each other
- Witness operations

### Obvious implementation
For some systems it might be possible to create a very simple and obviously correct implementation. Asserting that the obviously correct system produces the same output as the proper implementation is that an obvious property to test for. This might not always be a feasible strategy.

### Operations that reverse each other
This is a fairly simple concept. If some API have an add and delete operation those should probably be able to reverse each other. Adding and deleting the same entity should yield the original state. Deleting and the adding should also yield the same state, possibly with the exception that the new entity is given a new ID.

Many update operations also have the ability to undo itself. This is also a good property to test for. Again, this might not be possible for all systems to implement this kind of property test. This yields my favourite strategy: Witness operations.

### Witness operations
All impure functions should have pure counterparts that witness the effects. Deleting can be witnessed by getting before and after deleting. Furthermore it must be the case that all pure functions that does not witness the effects of an impure function can be run before and after and expect to return the exact same result! If you are willing to implement the neccesary witness operations then this can always be done as an effective testing strategy.

The running example i will use is a simple User Repository module, with the usual CRUD operations.

case class User(uuid: UUID, name: String, age:Int)

trait UserRepo {
  def insert(name: String, age:Int): Option[User]
  def get(id: UUID): Option[User]
  def update(user: User): Option[User]
  def delete(user: User): Option[User]
}

This is a trivial example, but illustrates the points nicely. Despite how simple these operations are it is still possible to fail to insert a user yet return a succesfull insert. it is also possible to insert the user using the wrong values. Such "trivial" mistakes are much more likely to happen as the systems become more complex. Looking at this interface there are a couple of tools from our toolbox above that could be useful here. Insert and delete should probably reverse each other. It also seems like updating a user and then updating the user again with the old input should return the original user.

Get is the only pure method in the UserRepo module. It is also a witness to any of the other operations. If i try to get a user that does not exists, then insert the user and try to get it again i expect the first get to "fail" and the second to succeed. The reverse should be true for delete.

Scala is a wonderful language for implementing these kinds of testing strategies. The below is an example of the above mentioned testing strategies in use:

```scala
import java.util.UUID

import org.scalacheck.Prop.forAll
import org.scalacheck.ScalacheckShapeless._
import org.scalacheck._

class SanityCheck extends Properties("sanity") {
  implicit val uuidArb = Arbitrary[UUID](Gen.uuid)
  implicit val ageArb = Arbitrary[Int](Gen.posNum[Int].map(_ % 50))
  implicit val nameArb = Arbitrary[String](Gen.alphaStr.suchThat(_.length > 2).map(_.takeRight(10)))
  implicitly[Arbitrary[User]]

  property("Add witnessed by get") = {
    forAll { user: User  =>
      val repo = new SimpleRepo()

      val before = repo.get(user.id)
      val inserted = repo.add(user.name, user.age)
      val after  = inserted.flatMap(user => repo.get(user.id))

      before.isEmpty && after.isDefined
    }
  }

  property("Update witnessed by get") = {
    forAll {(user : User, insert: Boolean) =>
      val repo = new SimpleRepo()
      val inserted = if(insert) repo.add(user.name, user.age) else None

      val before = inserted.flatMap(user => repo.get(user.id))
      val updated = inserted.flatMap(user => repo.update(user.copy(age = user.age + 1)))
      val after = inserted.flatMap(user => repo.get(user.id))

      insert == (before != after) &&
      updated == after
    }
  }

  property("Delete witnessed by get") = {
    forAll { (name: String, age: Int, insert: Boolean) =>
      val repo = new SimpleRepo()
      val inserted: Option[User] = if(insert) repo.add(name, age) else None

      val before = inserted.flatMap(user => repo.get(user.id))
      val deleted = inserted.flatMap(repo.delete)
      val after = inserted.flatMap(user => repo.get(user.id))

      before == inserted &&
      after.isEmpty &&
      deleted.isEmpty == before.isEmpty
    }
  }

  property("Delete and add reverse") = {
    forAll { (name: String, age: Int) =>
      val repo = new SimpleRepo()
      val inserted = repo.add(name, age)

      val before = inserted.flatMap(user => repo.get(user.id))
      val deleted = inserted.flatMap(repo.delete)
      val between = inserted.flatMap(user => repo.get(user.id))
      val insertedSecond = repo.add(name, age)
      val after = insertedSecond.flatMap(user => repo.get(user.id))

      before == inserted &&
        between.isEmpty &&
        after == insertedSecond &&
        deleted.isEmpty == before.isEmpty
    }
  }

  property("Update reverses itself") = {
    forAll {(user : User, insert: Boolean) =>
      val repo = new SimpleRepo()
      val inserted = if(insert) repo.add(user.name, user.age) else None

      val before = inserted.flatMap(user => repo.get(user.id))
      val updated = inserted.flatMap(user => repo.update(user.copy(age = user.age + 1)))
      val after = inserted.flatMap(user => repo.get(user.id))
      val updated2 = after.flatMap(user => repo.update(user.copy(age = user.age - 1)))
      val after2 = inserted.flatMap(user => repo.get(user.id))

      insert == (before != after) &&
        updated == after &&
        after2 == before &&
      updated2 == after2
    }
  }
}
```

The code above will run a total of 500 testcases with all sort of random values. For this kind of simple api with simple data that might not be that big of a win. But when the api has many methods with lots of parameters and complicated intertwining logic then this kind of sweeping sanity is a big win. The code is not that much longer than a normal test. Depending on the exact testcase you might run into issues where the testcase and the implementation is out of sync for some reason, the tests still pass but the implementation is not correct.
