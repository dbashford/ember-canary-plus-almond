exports.config = {
  "modules": [
    "copy",
    "server",
    "jshint",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "less",
    "web-package",
    "handlebars-on-window"
  ],
  "require":{
    "optimize": {
      "overrides": {
        "optimize": "none"
      }
    }
  }
}