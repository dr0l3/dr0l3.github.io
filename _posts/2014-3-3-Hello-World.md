---
layout: post
title: Hello World!
published: true
---
Hello world in different languages.

Despite the simplicity of the programs involved you can already see design decisions. Two of the languages require imports. The fact that imports are required in not of interest, but rather what is imported. In both cases monads, which will be the subject of a later post. Requiring printing which is strictly speaking IO to go through monads is what makes these languages pure (as in purely functional). This will also be the subject of a later post. But for now let's just look at silly programs.

### Java

{% highlight java lineos %}
public class HelloWorld {
	public static void main(String[] args){
    	System.out.println("Hello world");
    }
}
{% endhighlight %}

### Scala

{% highlight scala lineos %}
object HelloWorld extends App {
	println("Hello world")
}
{% endhighlight %}

### Haskell

{% highlight haskell lineos %}
module Main where

import Lib

main :: IO ()
main = putStrLn "Hello, World!"
{% endhighlight %}

### Purescript

{% highlight purescript lineos %}
module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

main :: forall e. Eff (console :: CONSOLE | e) Unit
main = do
  log "Hello, World!"
{% endhighlight %}

### Rust

{% highlight rust lineos %}
fn main() {
    println!("Hello World!");
}
{% endhighlight %}
