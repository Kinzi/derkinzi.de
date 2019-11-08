---
title: Set up automatic backups for parse-server on digital ocean
slug: /set-up-automatic-backups-for-parse-server-on-digital-ocean
short: A new year and a new startup. In 2017 I have been fully focused on myDash and finally got it to a pretty stable state in Q4. It was an awesome process and I really learned how to deal with APIs in the process.
feature: https://c1.staticflickr.com/5/4065/4473026883_a6ebb799d8_o.png
date: 25/05/2016
tags:
  - code
  - server
  - parse
---

If you run packtor-server on a [digital ocean droplet*](https://m.do.co/c/f5a70d4a6dbb), chances are you followed the instructions from [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-migrate-a-parse-app-to-parse-server-on-ubuntu-14-04) setting everything up. This post is an addition and explains how to set up automatic backups for your MongoDB based on the users and server setups created when following the tutorial.

> If you also want to run parse-dashboard on your server, you might want to take a look at [this post](https://derkinzi.de/how-to-run-parse-dashboard-alongside-parse-server-on-digital-ocean/)

## Setting up the backups

### Make a folder for our backups

The easiest way to backup your MongoDB is using the `mongodump` command. But first let's make a folder for the backups in `/var/backups/`. For example like this:

```bash
mkdir /var/backups/mongobackups/
```

### Try backups manually first

Now we can try to backup our database manually. To get access to our database we can simply use the same user we used for transferring the data to our server. When you followed the above tutorial, this user is most likely calles `parse`. So our command will look like this:

```bash
sudo mongodump --port 27017 --ssl --db DATABASENAME --username USERNAME --password 'PASSWORD' --out /var/backups/mongobackups/myBackup
```

Try running it. If it was successful, you will get something like this:

```bash
2016-05-25T18:11:36.694+0200	writing DATABASE._User to /var/backups/mongobackups/myBackup/DATABASE/_User.bson
2016-05-25T18:11:36.696+0200	writing DATABASE._User metadata to /var/backups/mongobackups/myBackup/DATABASE/_User.metadata.json
2016-05-25T18:11:36.697+0200	done dumping DATABASE._User (20 documents)
```

You can also check the folder to see if the backup is there as expected `cd /var/backups/mongobackups/myBackup/`.

If everything looks good you can try restoring the backup (Maybe you shouldn't with a live app though). If you feel save restoring your backup try:

```bash
sudo mongorestore --port 27017 --ssl --db DATABASE --username USERNAME --password 'PASSWORD' --drop /var/backups/mongobackups/myBackup/DATABASENAME
```

When successful you will see something like this:

```bash
2016-05-25T18:17:46.382+0200	finished restoring DATABASE._User (0 documents)
2016-05-25T18:17:46.383+0200	done
```

Sweet! Now that we know everything works as it should, let's automate the process with a cronjob.

### Automate backups with a cronjob

Basically we could just put the above command in a cronjob and fire it every day - but wouldn't it be nice to have the backup in a folder with the date it was created? Yeah, right. So let's tweak the above command a little bit by adding `date +"\%m-\%d-\%y"`:

```bash
sudo mongodump --port 27017 --ssl --db DATABASENAME --username USERNAME --password 'PASSWORD' --out /var/backups/mongobackups/`date +"%m-%d-%y"`
```

Try it out. If this command works for you it's time to set up our cronjob. Enter crontab by typing `sudo crontab -e`. Then add the following line:

```bash
5 3 * * * /usr/bin/mongodump --port 27017 --ssl --db DATABASE --username USERNAME --password 'PASSWORD' --out /var/backups/mongobackups/`/bin/date +"\%m-\%d-\%y"`
```

This job will run the task everyday at 3:05 am. Notice a few changes to the original command: 

1. We have added absolut paths for every command. This makes sure the root crontab will find everything (you can find the paths by typing `which mongodump` for example)
2. We escaped the `%` symbol by adding a `\` before it. Otherwise the cronjob will run into an error.

### Keep backups for 7 days

Most likely you don't want to keep every single backup you'll ever make. A good rule of thumb is to keep backups of the last 7 days. (This will also make sure, the MongoDB backups will be backed up by the standard digital ocean server backup should you use it.)

We can achieve that by adding a cronjob that simply deletes backups that are older then seven days right before we create a new one. So simply add a new cronjob right before the above in `sudo crontab -e`:

```bash
3 3 * * * find /var/backups/mongobackups/ -mtime +7 -exec rm -rf {} \;
```

This cronjob will run 2 minutes before a new backup is created and delete backups older than 7 days in `/var/backups/mongobackups/`.

## Done & further ideas

That's it! We have now successfully set up automatic backups for our MongoDB for the last seven days.

If you want you can keep more or less backups. Also you could additionally keep monthly backups for the last 3 month or so. In this case I would make a new folder for them, add another (monthly) cronjob for backing up the database into it and alter the job for deleting old ones to `+30`.

Also a nice idea would be to push the latest backup to dropbox or some other cloud space. But I'll save that for a future post...

<p style="font-size:10px;">Image by <a href="https://www.flickr.com/photos/smemon/" rel="_nofollow">Sean MacEntee</a> on Flickr</p>
