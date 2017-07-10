---
layout: post
title: Hello World!
published: true
---
As is customary we will start out with hello world. The aim of this blog is to present material that I consider interesting. Hopefully someone out there finds its either educational or entertaining. If not at least I had fun creating it :)

Despite the simplicity of the programs listed below you can already see design decisions. Two of the languages require imports. Required imports is not _that_ interesting, but the imports themselves are the interesting parts. In both cases we import monads, which will be the subject of a later post. Requiring printing which is strictly speaking IO to go through monads is what makes these languages pure (as in purely functional). This will also be the subject of a later post. But for now let's just look at silly programs.

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
