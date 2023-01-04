---
published: false
---
This post has been generated from notes using ChatGPT. See the outline at the bottom

Note taking can be a daunting task, especially when you have a lot of notes to go through and are trying to find a specific one. This was the case for me when I started using Dendron, a note-taking tool that stores all of its notes as markdown files in a directory. While Dendron has a lot of great features, I found myself struggling with the lack of a fuzzy search function.

As someone who works in web technology, I tried a variety of different solutions to this problem. I looked into loading my Dendron notes into Elastic Search, other text search databases, and even tried devising some regex to do fuzzy searches. None of these solutions worked particularly well, and I was starting to feel like I was out of options.

Then, I turned to the command line and experimented with using fzf for searching through my Dendron notes. It turned out to be a game-changer. By using the following command, I was able to set up a fuzzy search that also provided a nice preview of my notes:

```rg -v '(\-\-)|(^\s*$)' --line-number /home/rdp/dendron/dendron-dixa | fzf --ansi --delimiter : --`review 'batcat --color=always {1} --highlight-line {2}' --preview-window 'up,60%,border-bottom,+{2}+3/3,~3'```

Not only did this solution work well, it also had a number of other benefits. It used zero resources when inactive, required no incremental work or upkeep, and was blazingly fast. Plus, it was easily hackable and worked just as well in other directories, making it a portable solution.

Reflecting on this experience, I realized that I had managed to combine three different command line applications (rg, fzf, and batcat) to create a solution that did exactly what I wanted. This was possible because the command line is designed with interoperability in mind. The pipe operator makes it easy to share data between different applications, and command line apps are highly composable.

Contrast this with the web, where things are much more difficult. Browsers are not designed with interoperability in mind, which means that it is not easy for different web applications to share data with each other. Even if you have two web apps open in different tabs, there is no easy way for them to communicate with each other. This is why many web apps rely on APIs to integrate with each other, but these can be heavy-weight solutions that require a lot of resources and can be overkill for simple use cases.

But what if all web apps worked like command line apps, where they could easily share data with each other by dumping it into a shared database? This would make integration much easier and more efficient. For example, if my Google Calendar and my hair stylist's appointment scheduling system both dumped their data into a shared sqlite database, it would be easy for the two apps to communicate with each other.

In short, the command line's interoperability and composability make it much easier to create custom solutions that work exactly the way you want them to. While the web has made great strides in recent years, it still has a long way to go in terms of making it easy for different applications to work together seamlessly.

```
Original outline:
- I use Dendron for note taking
    - Dendrons essentially just a directory of markdown files
- For the longest time I was struggling with the lack of (fuzzy) search
- Working in web technololgy i have tried different things
    - Load in to Elastic Search
    - Load it into other random text search databases
    - Devise some regex that could fuzzy search
    - it turned out to be truly difficult

- I then turned to the commandline and tried to make fzf work

- It worked
    - ```rg -v '(\-\-)|(^\s*$)' --line-number /home/rdp/dendron/dendron-dixa | fzf --ansi --delimiter : --preview 'batcat --color=always {1} --highlight-line {2}' --preview-window 'up,60%,border-bottom,+{2}+3/3,~3'```
    - Supports fuzzy search for all my notes and displays a nice preview
    -  Uses 0 resources when inactive
    - 0 upkeep or incremental work
    - Blazingly fast!
    - Works in other directories as well (portable)
    - hackable with tiny effort

- Reflecting on this
    - I managed to take 3 different applications that each didn't really do what i wanted and made them work together to do exactly what i wanted
        - rg
        - fzf
        - batcat
    - Why was this possible?
        - The commandline is built with interoperability in mind
        - The pipe operator makes it trivial to share data between applications
        - Commandline apps are highly composable
    - Could i do the same thing on the web?
        - No, browsers are not made with interoperability in mind
        - If i open my google calendar in one tab and my hair dressers appointment scheduling system in another tab there is no way for these two applications to share data between themselves
            - My hair dressers appointment scheduling system could do an integration, but it would take ages (via some API)
        - Web apps are not really composable at all
        - API's are heavy weight solutions
            - requires auth, highly available compute, security and god knows what else
            - For simple usecases this it massively overkill
    - What if all webapps did this
        - Dumped the data into a sqlite database (for a calendar this could be the next 2 weeks worth of appointments)
        - Other webapps could freely access the data in said sqlite database (it is the same process running on the same machine)
        - My hair dressers appointment scheduling system could then easily integrate with google calendar.

```