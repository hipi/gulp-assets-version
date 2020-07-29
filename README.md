## gulp-assets-version

a plugin for gulp.js to replace file's name by adding content hash

## Installation

```bash
npm install gulp-assets-version
```

## Usage

```js
var gulp = require('gulp')
var assetv = require('gulp-assets-version')

gulp.task('gav', function () {
  gulp.src('./test/test.html').pipe(assetv()).pipe(gulp.dest('./'))
})
```

## Options

### preStr: version connect char

Type: `String` default: "v"

### version: hash version string

Type: `String` default: random

## Example

```js
var gulp = require('gulp')
var gav = require('gulp-assets-version')

gulp.task('html', function () {
  return gulp
    .src(['src/*.html'])
    .pipe(gav({ preStr: 'h' }))
    .pipe(gulp.dest('dist'))
})
```

### before: test.html

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="./styles/test.css" type="text/css" />
  </head>
  <body>
    <div>
      <img src="./images/test.png" />
    </div>
    <script src="./scripts/test.js" type="text/javascript"></script>
  </body>
</html>
```

### after: test.html

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="./styles/test?h=0ede2cf.css" type="text/css" />
  </head>
  <body>
    <div>
      <img src="./images/test?h=25cf2b4.png" />
    </div>
    <script src="./scripts/test?h=8ced4e6.js" type="text/javascript"></script>
  </body>
</html>
```
