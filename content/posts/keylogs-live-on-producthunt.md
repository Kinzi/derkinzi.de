---
title: "My second launch this year: Keylogs is LIVE on Product Hunt today!"
slug: /keylogs-live-on-producthunt
short: I'm very exited to launch Keylogs on Product Hunt today. It's my second launch this year and here's a little background about my process making it.
date: 12/02/2018
feature: /images/2018/02/blog-header.jpg
tags:
  - code
  - comments
  - startup
---

I'm very exited to [launch Keylogs on Product Hunt](https://www.producthunt.com/posts/keylogs) today. It's my second launch this year already! 🚀

The first one was a tiny side project called [#birthhits](https://www.birthhits.com) and inspired by a [tweet from Ryan Hoover](https://twitter.com/rrhoover/status/951840832742502400)). It really feels good to be in a productive mode and keep shipping. This mindset is greatly inspired by the awesome people of [wip.chat](https://wip.chat). Here is a little more background about Keylogs and my process building it.

<img src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=ab1c12d2225366c6be0a4d55038b13e3" alt="Why I build Keylogs" class="crop-post-image">

> Photo by [Austin Chan](https://unsplash.com/@austinchan?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Why did I build Keylogs and where did the idea come from?

### The background story

SEO tools are anything but a new idea, however I wanted to build something with the Google Search Analytics API ever since it's launch back in 2015. Back then I only thought about building a simple keyword rank tracker because all existing solutions where way to expensive for my newly started blog. However I never got to it, my blog was growing steadily and I kind of forgot about serious rank tracking. Of course I was checking my rankings, but more by occasionally googling keywords in a private window then by actually tracking them. This of course turned out to be a mistake.

Last year my blog's revenue started to decline for the first time since I started it. At first I didn't notice as the drop started in my blog's high season which meant revenue was still growing but the growth rate was lower and I failed to read this sign properly. It only became obvious to me a few months later when visitors and revenue was undeniably lower than in previous years. Finally I started digging for reasons. At first glance I couldn't really see what's going on as all important rankings looked good and seemed to be in the top 5 or top 3 on Google.

So I dug deeper by trying to figure out when the traffic started to drop in Google Analytics. I exported data from GA and tried to match it with Search Console data. Once again I realized how much I dispise spreadsheets. It might just be because I suck at it but it's actually a very strong adversity I have here (one that already made me build [myDash](https://mydash.io) a year ago). I just feel like spreadsheets suck every inch of creativity out of my brain leaving nothing but a void of emptiness.

### The conclusion

I eventually found the reasons for the reduced traffic and more importantly I learned a few things about the Google Search Console and myself that resulted in starting to code Keylogs:

1. Though shall track thy rankings!
2. I despise spreadsheets (yes, I said that before)
3. Google Search Console has awesome data for free
4. Google Search Console's UX and request limitations make the data practically unusable
5. The Google Search Console is full of insights but they are very hard to gain
6. Combining Googles Search Console Data with other sources like Analytics and Keyword Volume is a PITA
7. 90 days of data is not enough
8. I still don't like spending 50-100 $ for tracking a few hundred keywords
9. I was kind of itchy to start something new

You can find a little more on this [here](https://derkinzi.de/a-new-year-and-a-new-startup/).

<img src="https://images.unsplash.com/photo-1490274480207-c9140355abba?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjExNzczfQ&amp;s=c643140e05a0defcd7cb5da696e84344" alt="The journey" class="crop-post-image">

> Photo by [Nadine Shaabana](https://unsplash.com/@nadineshaabana) / [Unsplash](https://unsplash.com/)

## The Journey

### From the first line of code to Product Hunt
At first I actually only wanted to make a small tool for myself so I started coding on Keylogs mid December and had a first working version up and running in only a couple of days. I started working with it on various websites and quickly found that besides tracking rankings I can gain a lot of insights from the data now that it is finally easily filter- and sortable. I asked a few friends to try it, they liked it as well and soon started to give me feedback and feature requests.

I implemented most of them and eventually launched on betalist mid January to get a broader beta tester group. Which was a very good idea for debugging and sharpening the edges of the product. I also implemented two more big features: average monthly search volume data and weekly/monthly report emails. With this I felt like the product had reached it's v1.0 state and so it was high time for Product Hunt!

### The new Google Search Console beta

While I was developing Keylogs, Google started to roll out the beta of the new Search Console to its users. What first seemed like a big thread to Keylogs turned out to be rather an advantage. First and foremost because Google will also bring the extended data set to the API [any day now](https://www.youtube.com/watch?v=JLCwGo43fAY&feature=youtu.be&t=23m42s). While this reduces the value of building a data backlog, it also means that Keylogs will be able to use the full dataset and more data means better insights. Awesome!

Also while the UX of the new GSC is way better than that of the old one, it's still hard to really work with the data. Also I believe that Google as the data provider, will always keep the data neutral. Meaning they will not mark performance or irregularities to facilitate interpretation. While this makes absolute sense for Google, I believe Keylog's relevance in this will only increase with the full data set.

<img src="https://images.unsplash.com/photo-1501686637-b7aa9c48a882?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=b1b5e28fc90476da6868f86fd05bcab8" alt="The learnings" class="crop-post-image">

> Photo by [Ryan Fields](https://unsplash.com/@rfieldss?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## What I've learned making Keylogs

### Making 👨🏻‍💻

With Keylogs I really wanted to launch as soon as possible while still having a real working App to show and not just an email sign up form. Background here is that I did not want to waste time on a product nobody wants. I think with two months between the first line of code and the launch of a fully functional v1 today I have achieved that goal. Once I actually decided to make this app public I did set myself a limit of 4 weeks. It took me two weeks more in the end.

Also for the first time I clearly wrote down the features I wanted in the MVP. This really helped during the process. I'm always getting a lot of ideas while coding, some small, some big, and if I don't take care I'll keep adding features and postponing the launch constantly. Having a written down feature list I could come back to, really helped keeping my focus here. I still included some minor extras and tweaks but everything that would have taken more than a few hours to implement is now on my "new features" list.

### Coding 📄

Keylogs is the first project I am building with vue.js and I must say I really enjoyed the process. Coming from Angular it took a few days to get a grip but now I'm really feeling productive with it. I'd say I'm coding on a similar level to Angular already. Nodejs still is the server framework of my choice and I truly love it more and more. With ES6 and async/await the sporadic async nightmare is also becoming easier to tackle. For Keylogs I'm also using mongodb and mongoose for the first time in a bigger scale. I will see how that turns out in the future. So far the experience is rather similar to using mysql with Sequelize.

<img src="https://images.unsplash.com/photo-1465788786008-f75a725b34e9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&s=b6f6a274a8c960a3b09e6795a6259a84" alt="The launch" class="crop-post-image">

> Photo by [SpaceX](https://unsplash.com/@spacex?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## The Launch 🚀

This time I really prepared for the Product Hunt launch by drafting Emails, Tweets, this article, preparing images and texts for PH and other platforms beforehand. A no brainer really, but I never did that before. :) [This article](https://blog.producthunt.com/how-to-launch-on-product-hunt-7c1843e06399) really helped a lot in the process (thanks PH 🙌) and also the straight forward advice from the awesome people on [wip.chat](https://wip.chat). So I kind of feel prepared for today, yet there is still a lot that could go wrong or flop. I'll update here during the day...

### Launch ticker:

**9:05am** So I followed best practice and launched Keylogs just after midnight San Francisco time

**9:10am** Already lots of products (and nice ones) on board. This Google Glass thing will definitely draw a lot of attention today. We’ll see how it goes…

**9:30am** Posted launch on facebook and twitter. Deployed website with welcome note for Hunters

**10:00am** Sent email to my beta users. First upvotes and comments are coming in — yet ranking looks still pretty bleak close to the bottom of the newest section

**10:30am** I don’t understand the algorithm as there are products with a lot less upvotes and comments way higher on the board. Keylogs doesn’t seem to move at all even though it gets more upvotes…

**11:30am** Keylogs still hasn’t moved an inch but upvotes are coming in a little faster now. Apparently a product has to be “approved” to move to the trending section. This would explain why a lot of products with less upvotes/comments are there.

**11:25am** Yeah! 🎉 Finally Keylogs made it to the trending section. 25 upvotes and counting

**12:10pm** Keylogs is doing alright in the trending section I believe. It’s #10 and America is not awake yet…

**12:35pm** Posted a few comments in SEO relevant groups on facebook presenting Keylogs, mentioning it’s launch and asking for professional feedback

**12:35pm** So it’s 3.5h since the hunt begain and Keylogs is #10 with 33 upvotes

**13:38pm** Dropped one place to #11 with 37 upvotes. So far 20 new signups today from 146 unique users. CR of ~14% is pretty good I guess , more users would be awesome though. :) America will start to wake up now. Let’s see.

**14:00pm** 41 upvotes on PH now. I posted a link to Keylogs Hacker News about an hour ago and it’s already down in nirvana :)

**15:00pm** First paying client 🎉. (Thanks, Flavio) Besides that holding on to #11 with 52 upvotes

**16:00pm** Keylogs is back on #10 with 59 upvotes. So far also 50 new sign ups from 280 uniques users. CR ~18%

**17:00pm** Keylogs dropped to #14 with 63 upvotes. Somehow a new product which launched 5 days ago shot into the top 10 of the trending board a few minutes ago… very weird as it’s not promoted

**18:00pm** Unfortunately Keylogs keeps dropping and is now on #15 with 66 upvotes. It feels like the rate of upvotes slowed down a bit. Was expecting the opposite with USA awake now… 61 new user and 355 unique visitors

**19:00pm** Slowly crawling back up. Now #13 with 77 upvotes. Seems like a steady 10 upvotes / hour. Maybe my hope for top 10 is not over yet :)

**21:00pm** Keylogs is up now for 12h and currently #14 with 88 upvotes. I think I might crack the 100 today but will not make it into the top 10 after all. 80 sign ups now and 443 unique visitors

**24:00pm** Time to sleep — pace is slowing down anyway :) #16 now with 92 upvotes

Next day:

**09:00am** The hunt is over and Keylogs made #18 with about 110 upvotes. So far 125 users have signed up and one subscribed. I’ll dig through the data and post a more thorough update later today…
