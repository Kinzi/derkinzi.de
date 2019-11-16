---
title: About myDash - What’s the stack and why did I choose it?
slug: /about-mydash-whats-the-stack-and-why-did-i-choose-it
short: Learn about my framework choices for my startup myDash for frontend, backend, database and server and why I took them. 
feature: /2017/10/mydash-frameworks.png
date: 16/10/2017
tags:
  - code
  - startup
---

As a solopreneur with a marketing background and coder rather by accident most of my stack and framework decisions are made by two main factors:

- whatever works
- what I already know or what is easiest to learn / feels most intuitive

This also applied for my framework decisions for [myDash - the all-in-one affiliate dashboard](https://mydash.io).

## Frontend

Before starting to code myDash frontend development was the field I was most experienced in. I already worked with Angular 1 and Ionic for [Packtor - The Packing List creator](https://packtor.com) for example. So it was a pretty easy choice to just start with angular 1 again.

I did consider switching to Angular 2 (or 4?!?) but there where so many changes (the least being the use of typescript) that it felt like a whole new framework rather then merely a development. So I scratched it for the sake of ease and development speed. Furthermore I use bower, grunt and sass in the development process. 

In the last month I kept looking into and worked with [vue.js](https://vuejs.org/) as an alternative to Angular 1 rather than Angular 2. It feels closer to what I’m used to and I want to try it in my next project. The much hyped React on the other hand is no option for me since it has a very steep learning curve ~~, is owned by Facebook~~ and I don’t like the resulting markup one bit. 🤢

## Backend

As mentioned before I was not really experienced in backend development prior to myDash and I was a bit scarred of it at first. Since I don’t like nor really understand php but do like and understand javascript, Nodejs was the obvious choice. I am really happy with this decision. 

I did work with Nodejs before but not on the scale I do now with myDash. I got a grip of it pretty fast and now I’m not at all scarred of backend development and API connections anymore - in fact they are fun and I spend days between my console and my code editor with out ever looking at the browser. 👨🏻‍💻

## Database

I chose MySQL for myDash which is probably unexpected considering that MongoDB usually goes with Nodejs and Angular. So why did I choose MySQL? Mainly because of the graphic interface of phpMyAdmin which I knew and liked and because Sequelize makes working with Nodejs and SQL databases quite easy.

## Server

Like most of my other projects myDash is hosted on [DigitalOcean](https://m.do.co/c/f5a70d4a6dbb). I already set up a few servers there before and really dig their how-to’s. Other cloud server providers like AWS or Google scare me with their backend and pricing structure which I just don’t understand. I do backup the digital ocean server to an AWS bucket though.
