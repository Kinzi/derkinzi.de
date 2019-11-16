---
title: How to setup parse-dashboard alongside parse-server on Digital Ocean
slug: /how-to-run-parse-dashboard-alongside-parse-server-on-digital-ocean
short: A new year and a new startup. In 2017 I have been fully focused on myDash and finally got it to a pretty stable state in Q4. It was an awesome process and I really learned how to deal with APIs in the process.
feature: /2016/05/parse-dashboard-server-2.jpg
date: 18/05/2016
tags:
  - code
  - server
  - parse
---

In this post I'll explain how to set up parse-dashboard along with parse-server on the same [Digital Ocean droplet*](https://m.do.co/c/f5a70d4a6dbb) (or any ubuntu/nginx server really). 
>This guide is heavily based on the awesome tutorial by Digital Ocean on [how to setup and migrate parse-server to them](https://www.digitalocean.com/community/tutorials/how-to-migrate-a-parse-app-to-parse-server-on-ubuntu-14-04). I really recommend reading it before following along with my post. Basically what I do here starts where the tutorial stops.

## Setting up parse-dashboard in 4 steps

### 1. Install parse-dashboard

Obviously the first step is to install parse-dashboard with npm and your sudo user. Just do it globally like so:
`sudo npm install -g parse-dashboard`

### 2. Set up a new index.js with two apps for server and dashboard

For this step switch to the parse user `sudo su parse` and go to the home folder `cd ~`.

In the official [dashboard docs](https://github.com/ParsePlatform/parse-dashboard#running-as-express-middleware) the guys from parse show how to use both the server and the dashboard in one app. With NGINX reverse proxy I found it easier to set up two apps running on different ports in the same `index.js` file.

In the digital ocean tutorial you didn't set up a index.js. So start by going to your home folder `cd ~`and create the file by entering `nano index.js`.
Now based on the official example on github put together the code for your parse-dashboard app like this:

```javascript
var express = require('express');
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [{
      "serverURL": "http://PUBLICDOMAIN/parse",
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
  }],
  "users": [
    {
      "user":"username",
      "pass":"password"
    }
  ],
});

var dashApp = express();

// make the Parse Dashboard available at /dashboard
dashApp.use('/dashboard', dashboard);

var httpServerDash = require('http').createServer(dashApp);
httpServerDash.listen(4040);
```

Make sure you use your real domain as serverURL. Not localhost and not your IP. Also make sure you set a different port for this app. If you stick with default it's 4040. You can find additional config options like adding icons, more apps and user [here](https://github.com/ParsePlatform/parse-dashboard#configuring-basic-authentication).
Now we need to put our parse-server app configuration into the same file. The following code is again based on the parse [documentation on github](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#usage). Here are server and dashboard together:

```javascript
// Packtor Server
var express = require('express');  
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');  
var path = require('path');  

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {  
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

// Set up parse server
var api = new ParseServer({  
  databaseURI: databaseUri || 'mongodb://USER:PASSWORD@DOMAIN:27017/DB_NAME?ssl=true',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'YOUR_KEY',
  masterKey: process.env.MASTER_KEY || 'YOUR_KEY',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'
});

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';  
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {  
  res.status(200).send('Parse Server App');
});

var port = process.env.PORT || 1337;  
var httpServer = require('http').createServer(app);  
httpServer.listen(port, function() {  
    console.log('packtor-server running on port ' + port + '.');
});

// Set up parse dashboard
var dashboard = new ParseDashboard({  
  "apps": [{
      "serverURL": 'https://PUBLIC_DOMAIN/parse', // Not localhost
      "appId": 'YOUR_KEY',
      "masterKey": 'YOUR_KEY',
      "appName": "YourAppName",
      "production": false,
      "iconName": "app-icon.png",
  }],
  "users": [
    {
      "user":"username",
      "pass":"password"
    }
  ],
  "iconsFolder": "icons"
});

var dashApp = express();

// make the Parse Dashboard available at /dashboard
dashApp.use('/dashboard', dashboard);  

// Parse Server plays nicely with the rest of your web routes
dashApp.get('/', function(req, res) {  
  res.status(200).send('Parse Dashboard App');
});

var httpServerDash = require('http').createServer(dashApp);  
httpServerDash.listen(4040, function() {  
    console.log('dashboard-server running on port 4040.');
});
```

That's it. Just copy the above into your index.js, edit your keys and variables and save the file.
>Hint: If you copy from github and don't use LiveQuery make sure you delete it from your code. It will result in poor api performance with the client SDK otherwise.

### 3. Changing pm2 process

In the Digital Ocean Guide the original pm2 config setup look like this:

```json
{
  "apps" : [{
    "name"        : "parse-wrapper",
    "script"      : "/usr/bin/parse-server",  // CHANGE THIS
    "watch"       : true,
    "watch"       : true,
    "merge_logs"  : true,
    "cwd"         : "/home/parse",
    "env": {
      "CLOUD_CODE_MAIN": "/home/parse/cloud/main.js",
      "DATABASE_URI": "mongodb://USER:PASSWORD@SOMAIN:27017/DB-NAME?ssl=true",
      "APPLICATION_ID": "APP_KEY",
      "MASTER_KEY": "MASTER_KEY"
    }
  }]
}
```

When this fires it will start parse server not with a index.js file, but rather directly from the parse-server folder. This is not what we want so do `nano ecosystem.json` and change the 4th line to: `"script" : "/home/parse/index.js"`

Now we are set and can restart pm2. Unfortunately only restarting pm2 doesn't take our updated ecosystems.json for some reason. So we need to delete the process first: 

```bash
pm2 delete all
pm2 start ecosystem.json
```

You can check with `pm2 show 0` if it started up correctly using index.js. Now just save the process: `pm2 save`

### 4. Changing nginx setup

The last step is to add the dashboard route to NGINX. `exit` into your sudo user. Then type `sudo nano /etc/nginx/sites-enabled/default` to get to the config file. Basically just copy the settings from parse-server, change the port to 4040 and paste it below the /parse route:

```nginx
# Pass requests for /dashboard/ to Parse Server instance at localhost:4040
location /dashboard/ {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-NginX-Proxy true;
         proxy_pass http://localhost:4040/dashboard/;
         proxy_ssl_session_reuse off;
         proxy_set_header Host $http_host;
         proxy_redirect off;
}
```

Finally restart nginx: `sudo service nginx restart`

## Done

That's it: your parse-dashboard should be up and running on `https://your.doma.in/dashboard`. Enjoy!
