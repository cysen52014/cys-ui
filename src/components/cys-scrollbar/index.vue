<template>
  <div
    class="cys-scroll-box"
    :style="{ maxHeight: getHeight, width: getWidth + 'px' }"
    ref="scrollBox"
  >
    <div class="cys-scroll-content" ref="scrollMc">
      <slot></slot>
    </div>
    <div
      ref="barWrap"
      :class="barRadius ? 'cys-scroll-bar-wrap radius' : 'cys-scroll-bar-wrap'"
      :style="{ width: barWidth + 'px', background: bcolor }"
    >
      <div
        ref="bar"
        class="cys-scroll-bar"
        :style="{ height: barHeight + 'px', background: fcolor }"
      ></div>
    </div>
  </div>
</template>
<script>
import Drag from "../../utils/drap";
export default {
  name: "CysScrollbar",
  componentName: "CysScrollbar",
  props: {
    uni: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    bar: {
      ratio: {
        type: Number,
        default: 0
      },
      radius: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 5
      },
      fcolor: "rgba(0,0,0,0.6)",
      bcolor: "rgba(0,0,0)"
    }
  },
  computed: {
    getHeight() {
      const height = this.height || 580;
      return String(height).match(/\%/gi) ? height + "%" : height + "px";
    },
    getWidth() {
      const width = this.width || "auto";
      return width;
    },
    barWidth() {
      if (this.bar && this.bar.width) {
        return parseInt(this.bar.width);
      } else {
        return 5;
      }
    },
    barRadius() {
      if (this.bar && this.bar.radius) {
        return this.bar.radius;
      } else {
        return true;
      }
    },
    fcolor() {
      if (this.bar && this.bar.fcolor) {
        return this.bar.fcolor;
      } else {
        return "rgba(0,0,0,0.9)";
      }
    },
    bcolor() {
      if (this.bar && this.bar.bcolor) {
        return this.bar.bcolor;
      } else {
        return "rgba(0,0,0,0.6)";
      }
    }
  },
  data() {
    return {
      box: null,
      boxWidth: 0,
      boxHeight: 0,
      showBar: true,
      boxScrollHeight: 0,
      boxClientHeight: 0,
      boxScrollWidth: 0,
      boxClientWidth: 0,
      barHeight: 0,
      ms: 0.4, // 移动时间
      speed: 0, // 移动单位大小
      size: 0 // 移动距离大小
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.box = this.$refs["scrollBox"];
      this.mvDiv = this.$refs["scrollMc"];
      this.barWrap = this.$refs["barWrap"];
      this.barDiv = this.$refs["bar"];
      this.docScrollControl = this.controlDocumentHandleScroll();
      this.bgo();
      this.bindDrag();
      this.bindDomEvents();
      // this.hasContentChange();
    },
    hasContentChange() {
      // 选择需要观察变动的节点
      const targetNode = this.mvDiv;

      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true };

      // 当观察到变动时执行的回调函数
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver((mutationsList, observer) => {
        // 之后，可停止观察
        setTimeout(() => {
          this.bgo();
          observer.disconnect();
        }, 60);
      });

      // 以上述配置开始观察目标节点
      observer.observe(targetNode, config);

     
    },
    reset() {
      this.barWrapHeight = this.barWrap.clientHeight || 0;
      this.boxScrollHeight = this.mvDiv.scrollHeight;
      this.boxClientHeight = this.box.clientHeight;
      this.barHeight = Math.ceil(
        this.boxClientHeight * ((this.bar && this.bar.ratio) || 0.382)
      );
      this.size = 0;
      const color =
        this.bar && this.bar.fcolor
          ? "background:" + this.bar.fcolor
          : "background:rgba(0,0,0,0.9)";
      this.barDiv &&
        (this.barDiv.style.cssText =
          color +
          ";height: " +
          this.barHeight +
          "px;transition:transform " +
          0 +
          "s;transform: translate3d(0," +
          0 +
          "px,0);-webkit-transition:-webkit-transform " +
          0 +
          "s;-webkit-transform:translate3d(0," +
          0 +
          "px,0);");
      this.mvDiv &&
        (this.mvDiv.style.cssText =
          "transition:transform " +
          0 +
          "s;transform: translate3d(0," +
          0 +
          "px,0);-webkit-transition:-webkit-transform " +
          0 +
          "s;-webkit-transform:translate3d(0," +
          0 +
          "px,0);");
    },
    bgo() {
      this.barWrapHeight = this.barWrap.clientHeight || 0;
      this.boxScrollHeight = this.mvDiv.scrollHeight;
      this.boxClientHeight = this.box.clientHeight;
      this.barHeight = Math.ceil(
        this.boxClientHeight * ((this.bar && this.bar.ratio) || 0.382)
      );
      const m1 = this.barWrapHeight - this.barHeight;
      const m2 = this.boxScrollHeight - this.boxClientHeight;
      if (m2 / m1 > 15) {
        this.speed = this.boxClientHeight / (m2 / m1) / 2;
      } else {
        this.speed = 20;
      }
      this.isBarVisible();
    },
    bindDrag() {
      this.drag = null;
      this.drag = new Drag().initialize(this.barDiv, {
        direction: "vertical",
        stageH: this.boxClientHeight,
        transform: true,
        end: result => {
          this.size = result.size || 0;
          this.move();
        }
      });
    },
    isBarVisible() {
      // console.log(this.boxScrollHeight, this.boxClientHeight)
      if (this.boxScrollHeight <= this.boxClientHeight) {
        this.reset();
        this.barWrap.style.display = "none";
        return;
      } else {
        this.barWrap.style.display = "block";
      }
    },
    bindDomEvents() {
      this.docScrollControl.enableScroll();
      this.box.addEventListener(
        "mouseenter",
        () => {
          this.docScrollControl.disableScroll();
        },
        {
          passive: false
        }
      );

      this.box.addEventListener(
        "mouseleave",
        () => {
          this.docScrollControl.enableScroll();
        },
        {
          passive: false
        }
      );

      window.addEventListener(
        "hashchange",
        () => {
          this.docScrollControl.enableScroll();
        },
        false
      );

      window.addEventListener(
        "popstate",
        () => {
          this.docScrollControl.enableScroll();
        },
        false
      );
      this.onmousewheel();
    },
    controlDocumentHandleScroll() {
      // 阻止document滚动事件
      var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      }

      function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
      }
      let isDisabled;
      function disableScroll() {
        if (window.addEventListener)
          // older FF
          window.addEventListener("DOMMouseScroll", preventDefault, {
            passive: false
          });

        document.addEventListener("mousewheel", preventDefault, {
          passive: false
        });

        window.addEventListener("mousewheel", preventDefault, {
          passive: false
        });

        document.addEventListener(
          "keydown",
          preventDefaultForScrollKeys,
          false
        );

        document.addEventListener("touchmove", preventDefault, {
          passive: false
        });

        isDisabled = true;
      }

      function enableScroll() {
        if (!isDisabled) return;
        if (window.removeEventListener)
          window.removeEventListener("DOMMouseScroll", preventDefault, {
            passive: false
          });

        document.removeEventListener("mousewheel", preventDefault, {
          passive: false
        });
        window.removeEventListener("mousewheel", preventDefault, {
          passive: false
        });

        document.removeEventListener(
          "keydown",
          preventDefaultForScrollKeys,
          false
        );

        document.removeEventListener("touchmove", preventDefault, {
          passive: false
        });

        isDisabled = false;
      }
      return {
        disableScroll: disableScroll,
        enableScroll: enableScroll
      };
    },
    onmousewheel() {
      // 滚轮事件绑定
      this.box.addEventListener(
        "mousewheel",
        e => {
          //    e.wheelDelta < 0 //(-120)  向下
          //    e.wheelDelta > 0 //(120)  向上
          this.scrollRoll(e);
        },
        {
          passive: false
        }
      );

      //兼容  Firefox
      this.box.addEventListener(
        "DOMMouseScroll",
        e => {
          // e.detail > 0  //(3)  滑轮向下滚动
          // e.detail < 0  //(-3)  滑轮向上滚动
          this.scrollRoll(e);
        },
        {
          passive: false
        }
      );
    },
    scrollRoll(e) {
      // 滚方向处理
      const ev = e || window.event;
      if (ev.detail > 0) {
        this.down();
      } else if (ev.detail < 0) {
        this.up();
      }

      if (ev.wheelDelta > 0) {
        this.up();
      } else if (ev.wheelDelta < 0) {
        this.down();
      }
    },
    down() {
      this.size += this.speed;
      this.move();
    },
    up() {
      this.size -= this.speed;
      this.move();
    },
    move() {
      this.barWrapHeight = this.barWrap.clientHeight || 0;
      this.boxScrollHeight = this.mvDiv.scrollHeight;
      this.boxClientHeight = this.box.clientHeight;
      this.barHeight = Math.ceil(
        this.boxClientHeight * ((this.bar && this.bar.ratio) || 0.382)
      );

      const m1 = this.barWrapHeight - this.barHeight;
      const m2 = this.boxScrollHeight - this.boxClientHeight;
      this.pt = m2 / m1;

      if (m2 / m1 > 15) {
        this.speed = this.boxClientHeight / (m2 / m1) / 2;
      } else {
        this.speed = 20;
      }

      if (this.size > m1) {
        this.size = m1;
      } else if (this.size < 0) {
        this.size = 0;
      }

      const color =
        this.bar && this.bar.fcolor
          ? "background:" + this.bar.fcolor
          : "background:rgba(0,0,0,0.9)";

      const bSize = this.size * this.pt;

      this.barDiv.style.cssText =
        color +
        ";height: " +
        this.barHeight +
        "px;transition:transform " +
        this.ms +
        "s;transform: translate3d(0," +
        this.size +
        "px,0);-webkit-transition:-webkit-transform " +
        this.ms +
        "s;-webkit-transform:translate3d(0," +
        this.size +
        "px,0);";
      this.mvDiv.style.cssText =
        "transition:transform " +
        this.ms +
        "s;transform: translate3d(0," +
        -bSize +
        "px,0);-webkit-transition:-webkit-transform " +
        this.ms +
        "s;-webkit-transform:translate3d(0," +
        -bSize +
        "px,0);";
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../styles/variable';
.cys-scroll-box {
  position relative
  overflow hidden
  .cys-scroll-content {
    padding 15px
    line-height 24px
  }
}
.cys-scroll-bar-wrap {
  position absolute
  right 0
  top 0
  width $--cys-scroll-bar-width
  height 100%
  &.radius {
    border-radius 5px
    .cys-scroll-bar {
        border-radius 5px
    }
  }
  overflow hidden
  background $--cys-scroll-bar-wrap-background
  .cys-scroll-bar {
      background $--cys-scroll-bar-background
  }
}
</style>
