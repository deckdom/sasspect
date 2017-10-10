# Sasspect
> The simple sass/scss type-guard library

Sasspect is a small library for sass/scss for type-guarding. With proper type-guarding it allows your code to be more robust.

## Usage
```scss
@function hello-world($name) {
  // Basic types
  $name: expect-string($name);
  content: "Hello #{$string}!";
}

@function calculation($first, $second) {
  $first: expect-number($first); // Expects any number (with/without unit)
  $second: expect-unit($second); // Expect a number with a unit (no restrictions)
  @return $first * $second;
}
```

For a full documentation on all function and on how to use them, check out the [Wiki]()

## Installation

You can install sasspect via packagemanagers or by cloning/downloading the `sasspect.scss`-File. After that you just have it into your project and use it.
**Be SURE** that you import sasspect before you try to use any functions!

### npm
```
npm install sasspect
```

### bower
```
bower install sasspect
```

### Git
```
git clone git@github.com:entailment/sasspect.git
```

## LibSass include-path
LibSass allows you to specify the paths to where to search for files if it can't find it directly. Here you can tell it to look for Sasspect in which ever location you have it installed. For more information, check the [node-sass documentation about it](https://github.com/sass/node-sass#includepaths)

Assuming that you have this project installed via npm, this is how the configuration would look like for __node-sass__:

```scss
// Node-Sass configuration
{
  includePaths: [
    'node_modules/sasspect'
  ]
}

// Your sass/scss file
@import 'sasspect';
```