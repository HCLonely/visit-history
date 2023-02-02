# visit-history

在静态网站上添加浏览记录功能，**浏览记录保存在用户本地**。

## 安装

1. 下载[isit-history.min.js](dist/visit-history.min.js)文件；
2. 在你的网页中插入

    ```html
    <script src="path/to/visit-history.min.js"></script>
    ```

或直接使用CND

```html
<script src="https://cdn.jsdelivr.net/gh/HCLonely/visit-history@1visit-history.min.js"></script>
```

## 使用

### 保存浏览记录

```javascript
const { visitHistory } = require('visit-history');

visitHistory.set({
  data: { }, // [必需]保存的数据
  identifier: () => window.location.pathname, // [可选]网页的位移标识符, 默认为 () => window.location.pathname
  limit: 20 // [可选]最大保存的浏览历史数量，默认为 20
});
```

Example:

```javascript
const { visitHistory } = require('visit-history');

visitHistory.set({
  data: {
    title: document.querySelector('title').innerText.trim(),
    link: window.location.href
  },
  identifier: () => window.location.href,
  limit: 30
});
```

### 读取浏览记录

```javascript
const { visitHistory } = require('visit-history');

visitHistory.get({
  htmlTemplate: '', // [可选]Html模板, 使用'{{key}}'替换data中的变量. 留空则返回保存的data数据, 默认为空
  limit: 10 // [可选]读取的浏览记录数量, 留空则返回所有数据, 默认为空
});
```

Example:

```javascript
const { visitHistory } = require('visit-history');

const history = visitHistory.get({
  htmlTemplate: '<div class="title><a href="{{link}}">{{title}}</a></div>',
  limit: 10
});
document.querySelector('.history').innerHTML = history.join('');
```

## 鸣谢

- [store.js](https://github.com/marcuswestin/store.js)
