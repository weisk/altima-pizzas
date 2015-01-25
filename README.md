Altima Webdev test
==================

Altima Pizzas App

See a live demo on [http://altima.syngular.es](http://altima.syngular.es)

### Implementation details

1. **Project scaffolding & build system**

    Yeoman used to create folder structure:

    - **app/**
        All the application code lies here.

    - **bower_components**
        Application libraries get installed here

    - **node_modules**
        Developer libraries get installed here

    Once the folder structure is set, Gulp is used as a task runner to build
    the application. The file gulpfile.js describes the building process:

    - Start a connect local server to serve the application.
    - Wire & Join all dependencies and application code into the folder **build/**
    - Watch for changes in the code, re-build everytime it detects a change

2. **Application framework**

    The application is inside the **app/** folder. I used
    Angular.js to build the application, with Coffeescript code, Jade as an
    HTML templating engine and LESS as a css preprocessor. Material design as a grid-css
    framework.

    File distribution:

    - **app.coffee**:
        The root of the angular application. Defines the application, the
        dependencies and the routes.

    - **index.jade**:
        The main HTML file.

    - **index.less**:
        The main CSS file

    - **common/**
        Common elements of the application: services, directives ...

    - **modules/**
        Routes && views of the application. 


### Missing things

- Code comments
- Unit tests
- Functional tests

### Development
* [Node.js] - Manage dev dependencies
* [Yeoman] - Kickstart/scaffold webapp
* [Bower] - Manage dependencies
* [Gulp] - Task runner - compile, build, wire, minify, preview

### Technology

* [AngularJS] - to separate responsibilities in a MVC fashion
* [Coffeescript] - better javascript code
* [jQuery] - toolset
* [Lodash] - functional toolset
* [Material-design] - Google material design implementation for Angular.JS

### Installation

Dev dependencies defined in `package.json`, build dependencies defined in `bower.json`.

Therefore, `npm` and `bower` are needed to setup the dev environment.

```sh
$ node install
$ bower install
```

### Usage

```sh
$ gulp
```

Navigate to http://localhost:8000 et voilà!


