---
published: false
---
This blogpost has been written the good old-fashioned way :)

I have created my own flavor of typescript. I call it BlobScript. Its essentially Typescript, but there is two changes. The return value of any function is a completely opaque blob, you can't make changes to the blob. All you can do with it is pass it along or return it. The second change is that any framework made in this language exist in isolation. Once you choose one framework you are unable to use any other framework. Do you think this sounds like a good language? No, right? This sounds pretty awful. Why would you want this?

A key tenant of functional programming is the insistence on returning data. This means that whoever calls a function can manipulate the returned data in whatever way they see fit.

For example

```typescript
type User = {
    name: string,
    age: number
}

function listUsers(): User[] = {
    var users = []
    // Lets pretend we are making a lot of users here
    return users
}

const myUsers = listUsers().map(user => {name: user.name.toUppperCase(), age: user.age})

```

In the above I have a function. It returns users, but I want to make a change to how the users are represented. Making this change is trivial. This is good it allows me to reuse functions that does sort of what I want.

Let see a conceptually similar example.

```typescript
function ListUsers() {
    return <div>
            // Lets pretend we are making a lot of users here
           </div>
}

const myUserName = ListUsers()
```

This is essentially the same code. But there is a difference, the UserName function returns a React Component instead of a data structure so I have no way to make any changes to that component. Clearly its a bad component and it should take some sort of props, but that is really besides the point because the function from the first snippet is equally bad, but I dont have the problem i just modify the output. The reason I have this problem is because React components return expressions, which are essentially opaque and unmodifiable. But this isn't really a React problem almost every single framework that deals with display logic has this problem. This is kind of odd, it is not that difficult to make a data structure that represent possible HTML. If components returned such data structures you would be able to make changes to them without changing the implementation. Furthermore you would probably be able to mix and match between different frameworks. A Vue component inside a React component? Sure, its all HTML anyway!

We are back where we started. Why do you want to use a language that insists on returning opaque and unmodifiable values? It hurts reuse by forcing us to change implementation and blocks us from mixing and matching between frameworks. Yet working in such a language is essentially an unquestioned norm for the vast majority of the working developers.