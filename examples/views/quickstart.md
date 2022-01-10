### 完整引入

在 main.js 中写入以下内容：

```javascript

    import Vue from 'vue';
    import CysUi from 'cys-ui';
    import App from './App.vue';
    import "cys-ui/static/css/cysui.css";
    import "cys-ui/static/fonts/cysicon.css";

    CysUi.install(Vue);

    new Vue({
    el: '#app',
    render: h => h(App)
    });

```