KOAN freak
============

Database agnostic KOAN Stack, which is a boilerplate providing a nice starting point for JavaScript web development of single page application with [Koa](http://koajs.com/), [AngularJS](https://angularjs.org/) and Node.js.

## Summary of the tech stack

 * [KOA](http://koajs.com/) - Expressive middleware for node.js using generators
 * [AngularJS](https://angularjs.org/) - JavaScript MVW framework
 * [Webpack](http://webpack.github.io/) - module bundler
 * [Jade](http://jade-lang.com/) - template engine
 * [ui-router](/angular-ui/ui-router) - The de-facto solution to flexible routing with nested views in AngularJS
 * [Bootstrap](http://getbootstrap.com/) - mobile first front-end framework
 * [CoffeeScript](http://coffeescript.org/) - a little language that compiles into JavaScript

## Getting started

```
npm install
bower install
```

### Compile client app

```
bin/watch
```

### Run server

```
bin/koa
```

and access to [http://localhost:3000/](http://localhost:3000/)

### Config

The config file is at `config/app.js`.

