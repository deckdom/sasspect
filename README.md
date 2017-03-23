# Sasspect
> The simple code-quality insurance for your sass-projects

Sasspect is a small library for Sass and provides functions to check variable types and ensure that you can work with them properly. It prevents execution of un-expected arguments by simply throwing an error to signal you passed invalid ones.

Sample usage:
```scss
@function hello-world($name) {
  // Basic types
  content: "Hello #{$string}!";
}
```

## Installation

### npm
```
npm install sasspect
```

### bower
```
bower install sasspect
```

## LibSass include-path
LibSass allows you to specify the paths to where to search for files if it can't find it directly. Here you can tell it to look for Sasspect in which ever location you have it installed.

Assuming that you have this project installed via npm, this is how the configuration would look like for __node-sass__:

```javascript
{
  includePaths: [
    'node_modules/sasspect'
  ]
}
```