---
title: "WordPress hosting test: super fast on raidboxes.eu"
slug: /super-fast-wordpress-hosting-germany
short: How I drastically improved my site speed by switching from a vserver to WordPress optimized hosting on raidboxes.eu
feature: /images/2016/09/raidboxes-speed.jpg
date: 09/12/2016
tags:
  - code
  - wordpress
  - hosting
---

## How I drastically improved my site speed by switching to raidboxes.eu

I used to have a decent hoster with a decent cloud hosting plan. It's actually a nice and fast setup. However my main WordPress installation was annoyingly slow. Being tired of trying different plugins and server configurations I decided to give [raidboxes.eu](https://raidboxes.de?aid=3045) a shot.

> [raidboxes.eu](https://raidboxes.de?aid=3045) is a german company that specializes in WordPress hosting much like [WP Engine](http://www.shareasale.com/r.cfm?b=394686&u=1366161&m=41388&urllink=&afftrack=) in the UK. Big difference: they have their servers in Germany which is good of course if you have a german audience. 😊 

*In this article:* Find out why I transferred, how it changed my site's performance, how you can easily transfer too and what additional things you could do to further speed up your webpage once you are on a Raidbox.

## Why I wanted to switch in the first place

This is the [pingdom](https://tools.pingdom.com/)(great tool) result from my site on the old server:

![old site speed](/images/2016/09/Bildschirmfoto-2016-09-10-um-16-46-35.png)

The performance grade is actually quite nice and - OK - the testing server is in Sweden and it's actually not that bad when browsing the site from Germany. However, the site loads slow as *#%&. As you can see here, this was mainly due to time to first byte and response time only starting after like 1000ms - i.e. server issues:

![old site speed](/images/2016/09/hosting_timefirstbyte.jpg)

I tried pretty much everything: several caching plugins (like W3 or wp-super-cache), and front end optimization. All this helped but somehow over the month my server response time got slower and slower. Google page speed sometimes tracked a **server response time of more than 2 seconds**. It was an outrage! 😖

As I wrote above I got super tired of trying to optimize my server and caching setup (I'm not a backend geek) so I started looking around for other options. The first thing I found was [WP Engine](http://www.shareasale.com/r.cfm?b=394686&u=1366161&m=41388&urllink=&afftrack=) - but alas, they don't have servers in Germany. So I was quite happy as I discovered [raidboxes.eu](https://raidboxes.de?aid=3045)* a little later and decided to give it a shot.

Long story short, here are the results after transferring my site to RAIDBOXES. Even though performance grade and size are a little worse, the speed is simply breathtaking:

![new site speed](/images/2016/09/Bildschirmfoto-2016-09-10-um-16-46-05.png)

## How it's working

RAIDBOXES works a little bit like [DigitalOcean](https://m.do.co/c/f5a70d4a6dbb)* in the dashboard: With one simple click you can setup a new virtual server, or BOX as they call it, running a fresh installation of the latest WordPress in seconds. You can then immediately start individualizing or importing your existing blog just like you are used too. For single sites it comes in 3 packages for [9€/15€/30€ per hosted site](https://raidboxes.eu/pricing/?aid=3045). Depending on your needs it's really good value when you consider what you get. Also: it's free for 14 days so why not [give it a shot](https://raidboxes.de?aid=3045) just to see the result for your site?

The difference to traditional hosting is, that you are a little more restricted. You don't have root access to the server and you cannot alter your `wp-config.php`(blog name and wp-debug can be set via the dashboard). You only get an sftp access to your WordPress folder and access to your db via a browser client. It's no phpmyadmin but you can still run sql tasks, edit your db and import/export your tables.

This might be a disadvantage if you have a super individual WordPress setup, but I'd guess about 95% of WordPress users will have all the access they actually need. The good point is that all the optimization you would normally do accessing those other files or the server are actually unnecessary using RAIDBOXES. Yes, it's that good.

## How it's better

Just for pure joy, here are a few more stats. I think they'll speak for themselves. Here's a little before and after:
Apdex (explanation [here](https://en.wikipedia.org/wiki/Apdex)):

![after switching hoster](/images/2016/09/Bildschirmfoto-2016-09-11-um-10-26-30.png)

Response time:

![after switching hoster2](/images/2016/09/Bildschirmfoto-2016-09-11-um-10-26-40.png)

And the breakdown of the raidbox hosting in detail:

![after switching hoster3](/images/2016/09/Bildschirmfoto-2016-09-11-um-10-26-05.png)

*If you wonder where I get those beautiful graphs from. It's my uptime monitor [Apex Ping](https://apex.sh/ping/).*

Super fast innit? And it get's even better because transferring your site actually works "by itself".

## How to transfer your existing site to Raidboxes

Basically you have two options: use the free transfer service or do it manually yourself. I've tried both. And while the transfer service is working really good, doing it manually has some advantages too.

### Transfer Service

RAIDBOXES offers a [free transfer service](https://raidboxes.eu/free-wordpress-migration/?aid=3045)*. You just have to give them an admin login and an ftp login to your server. They will then copy the contents of your `/wp-content` folder and set up a new BOX with a fresh WordPress installation and all your existing blog posts, plugins, themes ect.

I started the service late Friday night and the whole thing was done by Saturday afternoon. I believe it will be even faster during workdays.
After transfer I had to deactivate a few now unnecessary plugins (like wp-super-cache, limit-login-attempts,...), but basically my whole site was up and running. So easy, what a joy!

### Transferring site manually

Since I was impatient I also started to migrate the site myself on Saturday morning. I started a new box with a fresh WordPress installation, imported my db into the existing tables of the Raidboxes installation (to keep the altered prefix) and finally copied over my themes, images and plugins via sftp. 

Again I had a beautifully working and blazing fast copy of my site up and running - however, by the time I was done uploading 1,3 GB of data the transfer service was finished as well. 

### Using the service vs. doing it manually

While the transfer service is super convenient and worked reliably for me I chose to use my manually transferred BOX for production in the end.  

Here is why:

* I checked each plugin if I still needed it
* I cleaned up my whole db and dropped redundant tables of plugins I don't use anymore
* I only copied the files I really need for my site. It's amazing how much crap you gather in a wp installation over the years. :)

## Additional optimization

### Minify your css and js files

Although RAIDBOXES' caching works really really well and fast you can still optimize your site a little more with minifying your js and css files into a single file. This reduces the amount of http requests needed to render your site and thus makes it even faster. I use the plugin [Better WordPress Minify](https://de.wordpress.org/plugins/bwp-minify/) for this. It needs a little setting up and depending on your theme and plugins you might have to manually define where and when your scripts and css get loaded. Just play around with the settings and debug with your browser's console. It's a little work but totally worth it once it's all running smooth. ;)

### Load javascript asynchronous

Still not fast enough? If you have lot's of javascript on your site you can try [Async JavaScript](https://de.wordpress.org/plugins/async-javascript/). This plugin let's you easily load all or certain js-files asynchronous or even deferred. Again you might need to play around with it a bit. Especially if you also use the minify plugin. But again: it's worth a shot to further speed up your site.

### Enabling SSL

Actually rather slowing down your site, but good for SEO nonetheless and also another great feature of RAIDBOXES: enable a  [free Let's Encrypt SSL certificate](https://raidboxes.eu/letsencrypt-free-ssl-certificates/?aid=3045) with just a single click in the backend. Works like a charme and is absolutely recommended since it's now an official google ranking factor.

## TL;DR

Switching to specialized WordPress hosting paid of big time for me (and my users, and google). My site is about 10x faster, I need less plugins and maintenance time dropped drastically. Not so much because of the auto-updates (I'm not on the "[Fully Managed Plan](https://raidboxes.de/tarife/?aid=3045)*") but because everything is more stable, secure and faster.

I chose [raidboxes.eu](https://raidboxes.de?aid=3045)* mainly because the servers are in Germany which makes sense since my target audience is also german. For international/english sites a comparable service is offered by [WP Engine](http://www.shareasale.com/r.cfm?b=394686&u=1366161&m=41388&urllink=&afftrack=) with servers in the States, London and Japan.

I'd recommend RAIDBOXES to everybody who wants super fast WordPress hosting with servers in Germany but without any server hassle. Your can try it for free for 14 days and with the free transfer service checking it out is really easy. For me switching back wasn't an option.
