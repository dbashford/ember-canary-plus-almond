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
