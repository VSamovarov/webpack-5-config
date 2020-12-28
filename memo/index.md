# Настраиваем окружение

## Webpack

[Настройка webpack-5](https://habr.com/ru/post/524260/)

[npm install webpack webpack-cli --save-dev](https://webpack.js.org/guides/getting-started/)

[плагины webpack](https://webpack.js.org/plugins/)

[Лоадеры](https://webpack.js.org/loaders/)

### Babel

[Babel](https://babeljs.io/setup#installation)
[или](https://webpack.js.org/loaders/babel-loader/)
[browserslist](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration)
https://github.com/browserslist/browserslist

Полифил - https://www.npmjs.com/package/core-js

### Для определения режимов работы вебпака

[cross-env](https://www.npmjs.com/package/cross-env)

### dev-server

https://github.com/webpack/webpack-dev-server
[dev-server](https://webpack.js.org/configuration/dev-server/)

Затык с атозагрузкой? `target:web`

`target: isDev ? "web" : "browserslist",`

### linter-prettier

Главное - .eslintrc и
