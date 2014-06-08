ember-sad-almond
================

This project illustrates how the current canary build of ember doesn't seem to be bundling with almond.  This app literally does nothing other than `console.log` Ember if it is successfully imported.

## To get started with this..

* `npm install -g mimosa`
* `git clone https://github.com/dbashford/ember-sad-almond`
* `cd ember-sad-almond`

## Unbundled Works

* `mimosa watch -s` (short for `--server`)
* Launch http://localhost:3000

All this does is `console.log` the Ember object from insde the `app.js` file.

## Bundled with 1.6 beta works

* Go into `main.js` and uncomment the line containing `ember.beta` and comment the line containing `ember.canary`.
* `mimosa build -op` (short for `--optimize --server`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

This mimosa command runs the r.js optimizer and bundles the small app with almond. This successfully logs the Ember object.

## Bundled with 1.7 canary does not work

* Go into `main.js` and comment the line containing `ember.beta` and uncomment the line containing `ember.canary`.
* `mimosa build -op` (short for `--optimize --server`)
* `cd dist`
* `node app.js`
* Launch http://localhost:3000

When loading in the browser you get `Uncaught Error: app missing ember` from almond.

# The fix

One of many changes between `1.6` and `1.7` was the inclusion of a `define('ember', ...)` and a `requireModule("ember")`.  This causes issues.  I haven't drilled down to exactly why, but I have to guess that because ember `define`s itself, my own definition of ember gets lost.  Two definitions for the same module is probable badness.

I suspect ember doing a `define("ember", ...)` may not work for most folks, but my lack of understanding of what ember is doing and why may mean I'm not tracking something important.

You can see the [change I made to effect a fix](https://github.com/dbashford/ember-sad-almond/commit/c0a494d5f4bb17d155bf64ff8305b844f3c7aa3a#diff-d3e32a8bff1fe1e269b30fc403dfeafeL41139) right here.  If you `git checkout fix-it` you'll get a version of the app that works fine bundled with almond.

Changes to the ember source:

* Change `define('ember', ...)` to `define('ember-int', ...)`
* Change `requireModule("ember")` to `requireModule("ember-int")`