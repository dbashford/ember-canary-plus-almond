ember-canary-plus-almond
================

This project illustrates how the `1.7` canary build of ember doesn't seem to be bundling with almond.  

See [a fix](https://github.com/dbashford/ember-canary-plus-almond#the-fix) below.

If you are a [Mimosa](www.mimosa.io) user, I created an [adhoc-module](https://github.com/dbashford/mimosa-adhoc-module) that solves the problem.  You can [find the source here](https://gist.github.com/dbashford/66f1ca3734280b72f182).

## To get started with this..

* `npm install -g mimosa`
* `git clone https://github.com/dbashford/ember-canary-plus-almond`
* `cd ember-canary-plus-almond`

## Unbundled Works

* `mimosa watch -s` (short for `--server`)
* Launch http://localhost:3000

All this does is `console.log` the Ember object from insde the `app.js` file.

## Bundled with 1.6 beta works

* Go into `main.js` and uncomment the line containing `ember.beta` and comment the line containing `ember.canary`.
* `mimosa build -op` (short for `--optimize --package`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

This mimosa command runs the r.js optimizer and bundles the small app with almond. This successfully logs the Ember object.

## Bundled with 1.7 canary does not work

* Go into `main.js` and comment the line containing `ember.beta` and uncomment the line containing `ember.canary`.
* `mimosa build -op` (short for `--optimize --package`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

When loading in the browser you get `Uncaught Error: app missing ember` from almond.

# The fix

One of many changes between `1.6` and `1.7` was the inclusion of `define('ember', ...)` and a `requireModule("ember")` in the code.  This causes issues.  I haven't figured out exactly why, but I'd guess that because ember `define`s itself, my own definition of ember gets lost.  Two definitions for the same module is likely the source of my trouble badness.

I suspect ember doing a `define("ember", ...)` may not work for most folks, but my lack of understanding of what ember is doing and why may mean I'm not tracking something important.  This is the canary build, so hopefully this gets ironed out before it hits beta.

You can see the [change I made to effect a fix](https://github.com/dbashford/ember-canary-plus-almond/commit/c0a494d5f4bb17d155bf64ff8305b844f3c7aa3a#diff-d3e32a8bff1fe1e269b30fc403dfeafeL41139) right here.  If you `git checkout fix-it` you'll get a version of the app that works fine bundled with almond.

Changes to the ember source:

* Change `define('ember', ...)` to `define('ember-int', ...)`
* Change `requireModule("ember")` to `requireModule("ember-int")`
