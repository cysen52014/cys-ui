<template>
  <div id="app">
    <div class="main-header">
      <div class="main-header-logo">
        <img src="../static/logo.png"
          alt="logo">
      </div>
      <div class="main-header-title">CYS-UI</div>
      <ul class="main-header-nav">
        <li class="active">组件</li>
      </ul>
    </div>
    <div class="main-body">
      <div class="main-body-left">
        <ul>
          <li>
            <router-link to="/changeLog">更新日志</router-link>
          </li>
          <li>
            <router-link to="/quickStart">快速上手</router-link>
          </li>
          <li class="main-body-link-group">
            <a>组件</a>
            <ul>
              <li v-for="route in components"
                :key="route.name">
                <router-link :to="componentLink(route)">{{route.title}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="main-body-right">
        <router-view class="markdown"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import routeMap from './router/router.conf.js'
export default {
  name: "App",
  data() {
    return { components: routeMap.components }
  },
  methods: {
    componentLink(route) {
      return `/components/${route.path}`
    }
  }
};
</script>

<style lang="stylus">
@import 'highlight.js/styles/color-brewer.css';
@import '../static/fonts/cysicon.css';

body {
  margin: 0;
  padding: 0;
  font-family: Microsoft YaHei !important;

  .router-link-active {
    color: #41a259 !important;
    background-color: #eeffde !important;
    border-right: 3px solid #41a259 !important;
  }

  #app {
    overflow: hidden;
    padding: 0;
    width: 100%;

    .main-header {
      transition: all 0.3s;
      box-shadow: 0 2px 8px #f0f1f2;
      position: relative;
      z-index: 10;
      height: 65px;
      color: #444444;

      .main-header-logo {
        height: 100%;
        float: left;
        margin-left: 40px;
        position: absolute;

        img {
          height: 30px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .main-header-title {
        height: 65px;
        line-height: 65px;
        font-size: 25px;
        display: inline-block;
        padding-left: 75px;
        font-weight: bold;
      }

      .main-header-nav {
        margin: 0;
        padding: 0;
        float: right;
        height: 100%;
        background: transparent;
        margin-right: 160px;

        li {
          list-style: none;
          color: #314659;
          height: 100%;
          line-height: 65px;
          box-sizing: border-box;
          min-width: 72px;
          border-top: 2px solid transparent;
          text-align: center;
          cursor: pointer;
          font-size: 15px;
          float: left;
          border-bottom: 3px solid #ffffff;
          transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

          &.active {
            color: #41a259;
            border-bottom: 3px solid #41a259;
          }
        }
      }
    }

    .main-body {
      position: relative;
      padding: 40px 0 0;
      margin-left: 0;
      margin-right: 0;
      height: auto;
      zoom: 1;
      display: block;
      box-sizing: border-box;

      .main-body-left {
        float: left;
        flex: 0 0 auto;

        ul {
          width: 250px;
          margin: 0;
          padding: 0;

          li {
            margin: 0;
            list-style: none;
            padding: 0;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;

            a {
              font-size: 16px;
              color: #333;
              line-height: 40px;
              height: 40px;
              margin: 0;
              padding: 4px 25px;
              text-decoration: none;
              display: block;
              position: relative;
              transition: 0.15s ease-out;
              font-weight: 700;
              border-right: 1px solid #e8e8e8;

              &:hover {
                color: #41a259;
              }
            }

            &.main-body-link-group {
              height: auto;

              a {
                &:hover {
                  color: #333;
                  cursor: default;
                }
              }

              ul {
                a {
                  display: block;
                  height: 40px;
                  color: #444;
                  line-height: 40px;
                  font-size: 14px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-weight: 400;

                  &:hover {
                    color: #41a259;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }

      .main-body-right {
        padding: 0 84px 140px 64px;
        min-height: 600px;
        overflow: hidden;

        a {
          color: #41a259;
          text-decoration: none;
        }
      }
    }
  }
}

.markdown {
  h1 {
    color: #0d1a26;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 8px;
    font-size: 30px;
    line-height: 38px;
  }

  h2, h3, h4, h5, h6 {
    font-family: Lato;
    margin: 1.6em 0 0.6em;
    font-weight: 500;
    clear: both;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 14px;
  }

  h6 {
    font-size: 12px;
  }

  p, pre {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  ul > li > p, ol > li > p {
    margin: 0.2em 0;
  }

  ul {
    padding: 0;
    margin: 0;

    & > li {
      list-style-type: circle;
      margin-left: 20px;
      padding-left: 4px;
      padding-top: 15px;
    }
  }

  ol {
    & > li {
      list-style-type: decimal;
      margin-left: 20px;
      padding-left: 4px;
      padding-top: 15px;
    }
  }

  & > table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #ebedf0;
    width: 100%;
    margin: 8px 0 16px;

    th, td {
      color: #314659;
      border: 1px solid #ebedf0;
      text-align: left;
      padding: 10px 15px;
    }

    th {
      white-space: nowrap;
      color: #5c6b77;
      font-weight: 500;
      background: rgba(0, 0, 0, 0.02);
    }
  }

  strong, b {
    font-weight: 500;
  }

  .cys-markdown-permalink {
    opacity: 0;
  }

  h1:hover .cys-markdown-permalink, h2:hover .cys-markdown-permalink, h3:hover .cys-markdown-permalink, h4:hover .cys-markdown-permalink, h5:hover .cys-markdown-permalink, h6:hover .cys-markdown-permalink {
    opacity: 1;
    display: inline-block;
  }

  > br, p > br {
    clear: both;
  }

  blockquote {
    font-size: 90%;
    color: #0d1a26;
    border-left: 4px solid #ebedf0;
    padding-left: 0.8em;
    margin: 1em 0;

    p {
      margin: 0;
    }
  }

  hr {
    height: 1px;
    border: 0;
    background: #ebedf0;
    clear: both;
  }

  code {
    font-family: Microsoft YaHei;
    margin: 0 1px;
    background: #f2f4f5;
    padding: 0.2em 0.5em;
    border-radius: 3px;
    font-size: 0.9em;
    border: 1px solid #eee;
  }
}
</style>

