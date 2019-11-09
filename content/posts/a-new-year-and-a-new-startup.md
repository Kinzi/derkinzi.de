---
title: A new year and a new startup
slug: /a-new-year-and-a-new-startup
short: A new year and a new startup. In 2017 I have been fully focused on myDash and finally got it to a pretty stable state in Q4. It was an awesome process and I really learned how to deal with APIs in the process.
feature: /images/2018/01/share-keylogs-1.jpg
date: 19/01/2018
tags:
  - code
  - comments
  - startup
---

A new year and a new startup. In 2017 I have been fully focused on myDash and finally got it to a pretty stable state in Q4. It was an awesome process and I really learned how to deal with APIs in the process.

And while there is still a lot  I plan on doing with myDash a new idea arose in December which I [launched on betalist today](https://betalist.com/startups/keylogs): Keylogs - Better Search Console Insights

## A loss in traffic - or how I came up with the idea to build Keylogs

Well since building a SEO tool is not a new idea at all it was more a need that arose rather than a strike of enlightenment. In Q3 the traffic for my blog [packliste-reise.de](https://www.packliste-reise.de) started to recede slowly. At first I thought that it is only due to seasonal change because summer was over, then I thought it was the fall of a particular keyword (which was not a money keyword) that accounted for it, but as the weeks passed it got clearer and clearer that there was more to it.

So I did a very thorough analysis of my site with the help of the Google Search Console, Google Analytics and a lot of Spreadsheets. Eventually I found out that it was actually a very subtle change that triggered the quite noticeable loss in traffic: basically the rank for most of my important keywords did drop - but only slightly. Yet having an average position of 2.x or 3.x obviously makes a huge difference in traffic as about 80% of search traffic comes from the top 3 google results with place 1 obviously getting the lion's share.

In the process of making this deep analysis of my site I learned a few things:

### Google Search Console has awesome data

First of all I noticed again what a rich source of insights the Google Search Console can be for SEO work. Not only is it (I think) the only source for click-through-rates of search results, but it simply has all the search data that's relevant for your site for free: all the keywords and all the pages in the index. If you dig long and deep enough and combine this with Google analytics and maybe the Keyword Planner you can find out pretty much everything you'd want to know about your site and keyword performance right at the heart of Google.

![Google Search Console Dashboard](/images/2018/01/Bildschirmfoto-2018-01-19-um-17.58.08.png)

### Google Search Console is very hard to use

While the GSC has all this awesome data it is quite tedious to work with it and you will most likely not be able to find any good insights if you do not export it into your own spreadsheet and combine it with other layers of data. 
So, while technically you can find out a whole lot, with the data being completely bare it just takes a few unnecessary loops to do so.

![Analysis in a Spreadsheet](/images/2018/01/Bildschirmfoto-2018-01-19-um-18.00.28.png)

### It's annoying to connect Google Search Console and Google Analytics data and I still hate spreadsheets

I'm not talking about integrating GSC with Analytics here. I'm talking about exporting data from both and match them in a spreadsheet. This is probably partly because I hate spreadsheets and I'm not very good with them but also because Analytics and GSC seem to be two different worlds and they export different styles of data which you have to redefine and reorder to make them match. I think I actually failed at this an ended up with some half-connected half manual copy and paste strategy for my analysis.

### 90 days is not enough

While diving deep into my data I eventually realized the reason for the traffic loss but could not determine when it actually started. This was because it must have started sometime in the summer and GSC did not have anymore data for this time frame since it only keeps data for 90 days - and I never exported a backup of the GSC data!  

### I need to prevent something like this in the future

While it was really good to do this manual analysis it became more and more clear that I should start with something I hadn't done before: watch my rankings closely and individually in order to be able to identify and react to changes faster in the future. Basically I needed and early warning system.

## Why a new tool? 

There are many, many SEO Tools out there - why would I want to code my own solution? Well there are a few reasons for me: 

### Pricing

While there really a lot of SEO Tools out there, there is one thing they all (or at least the good ones) have in common: they are pretty expensive. And if you are not a full-time SEO, Enterprise or Agency it's hard to justify those prices. I'm not saying that they are not worth it and I can see why they are as expensive as they are, I'm just saying that for me, while I enjoyed using those tools in the free trial or in their free version, they where still too expensive for my needs and reasoning.

### Full of features but often cluttered and overwhelming

SEO is a really complex field and while it's not rocket science it still needs a lot of data reading and right interpretation if you want to gain the right insights from it.
A lot of SEO tools want to deliver it all and fire huge amounts of information at you and again: while this is great for professionals it can be overwhelming for part-time SEOs or simply bloggers who would like to keep track of their search performance.

### SEO is often either keyword or on page focused

Quite often SEO tools are either Keyword or on page focused. This makes sense if you consider the history of ranking factors shifting from being entirely keyword and backlink focused to the more holistic, user and content centric state we are in today. While keyword tracking is still relevant with the GSC you can also easily analyze a pages performance which can be way more helpful to get insights about on page and content optimization. Especially if you combine this with user behavior data from Google Analytics.

### A need to track changes

This was very important for me: I wanted a simple way to keep track of changes I made to a particular page so I could see it's effects on the ranking on a single glance. 

![Track Ranking changes with Keylogs](/images/2018/01/Bildschirmfoto-2018-01-18-um-13.01.11.png)

### Personal reasons

Actually I had the idea of building some sort of Rank Tracker with the GSC API since it initially launched. But apparently it took desperate times to shape the idea a little further and finally follow through with it.
Also, being a passionate maker of things what I most enjoy is the process of building something new and I had this huge itch to start with something again from the ground up. I really grew to like node.js and got pretty good with it due to the development of [myDash](https://mydash.io) but I wanted to try something new in the frontend since Angular 1.x becomes pretty old, after quickly checking out the most recent version of Angular (which ever number they have at the moment) I decided to hate what they did to it and switched to vue.js which felt a lot more familiar to Angular 1 than it's iteration. I have not looked back.

## First draft and beta launch

To be honest in the beginning I only wanted to build a small tool for myself but I quickly realized that by building what I wanted, with very little extra work I could turn this into a pretty good web app eventually into a SaaS business if it turns out to be useful for others as well. 

![Keylogs PageXplorer Table](/images/2018/01/Bildschirmfoto-2018-01-15-um-13.03.41.png)

I must have learned quite a bit in the last months as I was able to hack together a first functioning version of what I wanted in about two weeks.  I opened it some friends to get a first feedback and since their feedback was rather positive I decided to work on it for two more weeks, adding a few more features and debugging it before launching the [public beta on betalist](https://betalist.com/startups/keylogs).

![Keyword detail view](/images/2018/01/Bildschirmfoto-2018-01-19-um-18.05.06.png)

