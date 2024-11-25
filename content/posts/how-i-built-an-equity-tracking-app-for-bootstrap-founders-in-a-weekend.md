---
title: How I Built an Equity Tracking App for Bootstrap Founders in a Weekend
slug: /how-i-built-an-equity-tracking-app-for-bootstrap-founders-in-a-weekend
short: How I Built an Equity Tracking App for Bootstrap Founders in a Weekend
feature: /img/slicefair.png
date: 25/11/2024
tags:
  - code
  - comments
  - startup
  - ai
---

Last weekend, I built another little startup: [Slicefair.co](https://slicefair.co). It’s an equity tracking app for bootstrap founders based on the slicing pie methodology. The idea came about because I’m preparing to bring on a co-founder for my SaaS, *[ContentIn](https://contentin.io)*, and I’ve always hated tracking equity splits with spreadsheets.

While there’s an existing slicing pie app out there, I wasn’t interested in yet another subscription—especially one priced at $20 per person per month. So, leveraging AI and my technical skills, I decided to build my own solution. I figured I could not only solve my own problem but also create something affordable for other bootstrap founders, selling it as a one-time purchase and supporting the indie hacker community.

Here’s the journey of how it all came together, what went wrong, and the lessons I learned along the way.

---

## **The Journey:**

### The Idea and Initial Setup

The idea for *Slicefair.co* wasn’t new. I’d tracked equity splits with spreadsheets before and always found the process cumbersome. When preparing to onboard a co-founder for *ContentIn*, I knew I needed something better. 

The existing slicing pie app felt too expensive, especially for indie founders like me, so I decided to build my own lightweight alternative that could be sold for a one-time fee. I started by defining the app’s requirements using the *Slicing Pie* book as a reference.

I uploaded the book to **NotebookLM**, which helped me create an initial spec. Then, I refined this spec with **Claude** to ensure it was clear and actionable. The plan seemed simple: build the app with **Nuxt.js** for the frontend and a **Node.js backend** for flexibility. But things quickly became more complicated.

---

### Challenges with AI and Iterations

#### Struggles with Bolt and Supabase

Initially, I planned to let **Bolt** handle most of the heavy lifting. I gave it the refined spec, confident it could handle the work autonomously. Instead, I found myself stuck in an endless error loop, debugging the same issues over and over with no progress. 

Hoping the backend setup was the issue, I switched from Node.js to **Supabase**—a platform I’d never used before—but I ran into the same frustrations. I wasted hours trying to debug schema errors and fix AI-generated outputs, only to realize I was making things worse instead of better.

#### Finding the Right Tools: Windsurf and Directus

Frustrated, I decided to pivot to tools I was already comfortable with. I switched to **Directus**, my favorite headless CMS, and hosted it on my own server. To speed up frontend development, I used **Windsurf**, an AI-powered IDE combining the functionality of Cursor and Bolt.

Once I found a **Nuxt Directus** starter project, things started to click. Integrating Directus with Nuxt became straightforward, and I began implementing the app’s features step by step.

---

### Building the App

With the backend in place, I focused on building the frontend and automating workflows. Here’s how it all came together:

1. **Backend with Directus**:
   - Directus allowed me to set up the schema quickly and manage permissions efficiently.
   - I used Directus Flows—its no-code automation builder—to handle backend logic, saving time and avoiding the need for custom extensions. This was my first time using Flows extensively, and while the learning curve was steep, it turned out to be a massive productivity boost.

2. **Frontend with Nuxt and Windsurf**:
   - Using Windsurf, I iteratively built the app’s frontend with Nuxt. While the logic was straightforward, some tasks—like handling permissions and dynamic UI updates—were more tedious than expected.
   - I also integrated a **Tailwind CSS** layout, which made the app visually appealing and consistent.

3. **Landing Page Creation**:
   - For the landing page, I used **Canva AI** to generate a color scheme and layout.
   - **Claude** helped write the copy, which I fine-tuned before coding it with Tailwind and Windsurf.

By Sunday evening, I had a fully functional MVP: a sleek, intuitive app for tracking equity splits based on the slicing pie methodology.

---

## **Future Plans for Slicefair.co**

The app’s single purpose is to make tracking equity splits transparent and easy for bootstrap founders. To complement this, I plan to add a blog that explains the slicing pie methodology and supports founders in understanding the process better.

Based on feedback from early users, I’ll prioritize features from the roadmap, which currently includes:
- **Company Fund Management**: For tracking shared company resources.
- **Compensation Tracking**: To monitor sweat equity contributions.
- **Exit Management**: For handling founder departures.
- **Contribution Review Flow**: A way to approve or reject contributions for added transparency.

---

## **Key Learnings**

1. **Stick With What You Know**:
   - Trying to use unfamiliar tools like Supabase slowed me down significantly. If I’d started with Directus, I could have saved an entire day of work. The lesson? AI doesn’t replace the value of familiarity and expertise.

2. **AI Still Needs Guidance**:
   - While AI is a powerful tool, it’s not the magic “no-code” solution many YouTubers make it out to be. Even with a perfect spec, AI struggled to build a functioning Node.js backend, reinforcing that guidance and iteration are essential.

3. **Break Tasks into Smaller Chunks**:
   - Working in smaller iterations and resetting AI threads for better focus led to much better results. Treat AI like a junior developer—provide clear requirements and guide the process step by step.

4. **Directus Flows Are a Game-Changer**:
   - Learning to use Directus’ no-code tools saved me from writing custom backend logic. Next time, I’ll be even faster now that I understand the platform’s capabilities.

5. **The MVP Mindset**:
   - *Slicefair.co* represents the best MVP I’ve ever built. It balances speed, features, and maintainability perfectly, resulting in a sellable and testable product in just two days.

---

## **Reflections:**

This app is already a significant improvement over tracking equity in spreadsheets. The real-time updates and pie chart visualization make it easy to understand and even motivating—it’s rewarding to see my slice grow as I contribute more to my startup.

Next, I plan to market the app, likely launching it on platforms like AppSumo for lifetime deals to gain initial traction. From there, feedback from early users will shape its future.

Building *Slicefair.co* reaffirmed a few key points: AI is transformative when paired with technical skills, sticking to familiar tools saves time, and learning from each project makes the next one even smoother. With AI and the right stack, I was able to create a product in two days that I’m genuinely proud to share with the indie hacker community.

---

**PSA**: By the way, this article was written with GPT as my co-writer. I dictated the story during a break, and GPT helped me polish and structure it. AI truly makes everything a little faster and more fun.