"use strict";
import Drag from "./drap";
class Scroll {
  constructor(opts) {
    this.oParent = opts.wrapper;
    this.oBody = this.oParent.querySelector(".cys-table-tbody");
    this.tableWrapper = this.oParent.querySelector(".cys-table-wrapper");
    this.wrapper = this.oParent.querySelector(".cys-table-body-wrapper");
    this.wrapperHeight = parseInt(opts.height) || "auto";
    this.wrapperMinWidth = parseInt(opts.minWidth) || 1300;
    this.barBoxHeight = this.wrapperHeight;
    this.barBoxWidth =
      (this.oParent.clientWidth < this.wrapperMinWidth
        ? this.oParent.clientWidth
        : this.wrapperMinWidth) || 0;
    this.tableWrapperSrollWidth = this.tableWrapper.scrollWidth;
    this.wrapper.style.height = this.barBoxHeight + "px";

    this.speed = 10;
    this.getDirection();
    this.bindEvents();
    this.setBarViseble();
    this.docScrollControl = this.controlDocumentHandleScroll();
  }
  windRisize() {
    this.oParentClientWidth = this.tableWrapper.clientWidth;
    if (this.oParentClientWidth < this.wrapperMinWidth) {
      this.barHWrap.style.display = "block";
      if (!this.oParent.className.match(/scroll/gi)) {
        this.oParent.className += " scroll";
      }
    } else {
      this.barHWrap.style.display = "none";
      if (this.oParent.className.match(/scroll/gi)) {
        this.oParent.className = this.oParent.className.replace(
          /\sscroll/gi,
          ""
        );
      }
    }
    this.barHW = Math.floor(this.oParentClientWidth / 5);
    this.hbar.style.width = this.barHW + "px";
    new Drag().initialize(this.hbar, {
      direction: "horizontal",
      stageW: this.oParentClientWidth,
      targetW: this.barHW,
      end: result => {
        this.HScroll(result.size);
      }
    });
  }
  getDirection() {
    if (this.wrapperHeight > 0 && this.wrapperHeight !== "auto") {
      this.direction = "vertical";
      this.createVBar();
    }

    this.createHBar();
  }
  setBarViseble() {
    this.wrapperScrollHeight = this.wrapper.scrollHeight;
    this.oParentClientWidth = this.oParent.clientWidth;
    if (this.wrapperScrollHeight <= this.wrapperHeight) {
      this.barVWrap.style.display = "none";
    }
    if (this.oParentClientWidth < this.wrapperMinWidth) {
      this.barHWrap.style.display = "block";
      if (!this.oParent.className.match(/scroll/gi)) {
        this.oParent.className += " scroll";
      }
    } else {
      if (this.oParent.className.match(/scroll/gi)) {
        this.oParent.className = this.oParent.className.replace(
          /\sscroll/gi,
          ""
        );
      }
    }
  }
  createVBar() {
    this.barVWrap = document.createElement("div");
    this.barVWrap.className = "cys-table-bar-box";
    this.barVH = Math.floor(this.barBoxHeight / 5);

    this.vbar = document.createElement("div");
    this.vbar.className = "cys-table-bar-box-drop";
    this.vbar.style.height = this.barVH + "px";
    this.barVWrap.style.height = this.barBoxHeight + "px";
    this.barVWrap.appendChild(this.vbar);
    this.oParent.appendChild(this.barVWrap);

    new Drag().initialize(this.vbar, {
      direction: "vertical",
      stageH: this.barBoxHeight,
      targetH: this.barVH,
      end: result => {
        this.VScroll(result.size);
      }
    });
  }
  createHBar() {
    this.barHWrap = document.createElement("div");
    this.barHWrap.className = "cys-table-bar-box hzt";
    this.barHW = Math.floor(this.barBoxWidth / 5);

    this.hbar = document.createElement("div");
    this.hbar.className = "cys-table-bar-box-drop";
    this.hbar.style.width = this.barHW + "px";
    this.barHWrap.appendChild(this.hbar);
    this.oParent.appendChild(this.barHWrap);

    new Drag().initialize(this.hbar, {
      direction: "horizontal",
      stageW: this.barBoxWidth,
      targetW: this.barHW,
      end: result => {
        this.HScroll(result.size);
      }
    });
  }
  bindEvents() {
    const eventName = this.mouseEvents();

    this.oParent.addEventListener(
      "mouseenter",
      () => {
        this.speed = Math.floor(this.barBoxHeight / 10);
        this.docScrollControl.disableScroll();
      },
      {
        passive: false
      }
    );

    this.oParent.addEventListener(
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

    // this.oParent.onselectstart = function(evt) {
    //   return false;
    // };

    this.oParent["on" + eventName["start"]] = evt => {
      this.dragStart(evt);
      // return false;
    };
    if (this.direction === "vertical") {
      this.onmousewheel();
    }
  }
  mouseEvents() {
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      //移动端
      return {
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
      };
    } else {
      return {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
      };
    }
  }
  dragStart(evt) {
    var e = evt || event;
    e.cancelBubble = true;
    this.x = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    this.y = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;

    //开关打开
    this.isDown = true;
    //设置样式
    var eventName = this.mouseEvents();
    this.oParent.addEventListener(
      eventName["move"],
      evt => {
        this.dragMove(evt);
      },
      {
        passive: false
      }
    );
    document["on" + eventName["move"]] = evt => {
      this.dragMove(evt);
    };
    document["on" + eventName["end"]] = evt => {
      this.docScrollControl.enableScroll();
      this.dragEnd(evt);
    };
  }
  dragMove(evt) {
    // if (this.isDown == false) {
    //   return;
    // }
    //获取x和y
    var e = evt || event;

    this.nx = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    this.ny = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
    //计算移动后的左偏移量和顶部的偏移量
  }
  dragEnd() {
    var eventName = this.mouseEvents();
    this.isDown = false;
    const ft = this.ny - this.y;
    const fx = this.nx - this.x;

    if (!this.vbar) return;

    let top = 0;
    let left = 0;

    if (Math.abs(fx) > Math.abs(ft)) {
      if (Math.abs(this.nx - this.x) < 6) {
        return;
      }
      this.speed = Math.floor(this.barBoxWidth / 7);
      if (fx > 0) {
        left = parseInt(this.hbar.style.left || 0) - this.speed;
        if (left <= 0) {
          left = 0;
        }

        this.hbar.style.left = left + "px";
        this.HScroll(left);
      }
      if (fx < 0) {
        left = parseInt(this.hbar.style.left || 0) + this.speed;
        if (left >= this.barBoxWidth - this.barHW) {
          left = this.barBoxWidth - this.barHW;
        }
        this.hbar.style.left = left + "px";
        this.HScroll(left);
      }
    } else if (Math.abs(fx) < Math.abs(ft)) {
      if (Math.abs(this.ny - this.y) < 6) {
        return;
      }
      this.speed = Math.floor(this.barBoxHeight / 7);
      if (ft < 0) {
        top = parseInt(this.vbar.style.top || 0) + this.speed;
        if (top >= this.barBoxHeight - this.barVH) {
          top = this.barBoxHeight - this.barVH;
        }
        this.vbar.style.top = top + "px";
        this.VScroll(top);
      }

      if (ft > 0) {
        top = parseInt(this.vbar.style.top || 0) - this.speed;
        if (top <= 0) {
          top = 0;
        }
        this.vbar.style.top = top + "px";
        this.VScroll(top);
      }
    }

    document["on" + eventName["move"]] = null;
    document["on" + eventName["end"]] = null;
  }
  controlDocumentHandleScroll() {
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
    var isDisabled;
    function disableScroll() {
      if (window.addEventListener)
        // older FF
        window.addEventListener("DOMMouseScroll", preventDefault, {
          passive: false
        });

      document.addEventListener("mousewheel", preventDefault, {
        passive: false
      });

      window.addEventListener("mousewheel", preventDefault, { passive: false });

      document.addEventListener("keydown", preventDefaultForScrollKeys, false);

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
  }
  onmousewheel() {
    //绑定事件(做兼容处理)

    this.oParent.addEventListener(
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
    this.oParent.addEventListener(
      "DOMMouseScroll",
      function(e) {
        // e.detail > 0  //(3)  滑轮向下滚动
        // e.detail < 0  //(-3)  滑轮向上滚动
        self.scrollRoll(e);
      },
      {
        passive: false
      }
    );
  }
  scrollRoll(e) {
    e = e || window.event;
    if (e.detail > 0) {
      this.down();
    } else if (e.detail < 0) {
      this.up();
    }

    if (e.wheelDelta > 0) {
      this.up();
    } else if (e.wheelDelta < 0) {
      this.down();
    }
  }
  //向下滚动
  down() {
    let top = parseInt(this.vbar.style.top || 0);
    top = top + this.speed;
    if (top >= this.barBoxHeight - this.barVH) {
      top = this.barBoxHeight - this.barVH;
    }

    this.vbar.style.top = top + "px";
    const y =
      (top / (this.barBoxHeight - this.barVH)) *
      (this.wrapperScrollHeight - this.wrapperHeight);
    this.wrapper.style.cssText =
      "transform: translate3d(0, " +
      -y +
      "px, 0); height: " +
      this.wrapperHeight +
      "px";
  }
  //向上滚动
  up() {
    let top = parseInt(this.vbar.style.top || 0);
    top = top - this.speed;
    if (top <= 0) {
      this.vbar.style.top = 0 + "px";
      this.wrapper.style.cssText =
        "transform: translate3d(0, 0, 0); height: " + this.wrapperHeight + "px";
    } else {
      this.vbar.style.top = top + "px";
      const y =
        (top / (this.barBoxHeight - this.barVH)) *
        (this.wrapperScrollHeight - this.wrapperHeight);
      this.wrapper.style.cssText =
        "transform: translate3d(0, " +
        -y +
        "px, 0); height: " +
        this.wrapperHeight +
        "px";
    }
  }
  //纵向移动
  VScroll(top) {
    const y =
      (top / (this.barBoxHeight - this.barVH)) *
      (this.wrapperScrollHeight - this.wrapperHeight);
    this.wrapper.style.cssText =
      "transform: translate3d(0, " +
      -y +
      "px, 0); height: " +
      this.wrapperHeight +
      "px";
  }
  //左右移动
  HScroll(top) {
    this.tableWrapper.scrollLeft =
      (top / (this.barBoxWidth - this.barHW)) *
      (this.tableWrapperSrollWidth - this.barBoxWidth);
  }
}

export default Scroll;
