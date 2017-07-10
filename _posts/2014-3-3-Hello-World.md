---
layout: post
title: Hello World!
published: true
---
Hello world in different languages.

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
	println("Hello world"
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
{% highlight Purescript lineos %}
module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

main :: forall e. Eff (console :: CONSOLE | e) Unit
main = do
  log "Hello, World!"
{% endhighlight %}

### Rust
{% highlight Purescript lineos %}
fn main() {
    println!("Hello World!");
}
{% endhighlight %}