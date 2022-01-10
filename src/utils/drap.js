"use strict";
class Drag {
  target = null;
  x = 0;
  y = 0;
  l = 0;
  t = 0;
  tw = 0;
  th = 0;
  cw = 0;
  ch = 0;
  isDown = false;
  initialize(el, opts) {
    this.target = el;
    this.stageW = opts.stageW || 0;
    this.stageH = opts.stageH || 0;
    this.targetW = opts.targetW || this.target.clientWidth;
    this.targetH = opts.targetH || this.target.clientHeight;
    this.transform = opts.transform || false;
    this.direction = opts.direction || "vertical";
    this.end = opts.end || new Function();
    this.addEvents();
  }
  addEvents() {
    var eventName = this.mouseEvents();
    this.target["on" + eventName["start"]] = evt => {
      this.dragStart(evt);
    };
  }
  dragStart(evt) {
    var e = evt || event;
    e.cancelBubble = true;
    e.preventDefault();
    this.x = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    this.y = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;

    //获取左部和顶部的偏移量
    let st = this.target.getAttribute("style");
    if (st.match(/translate3d/gi)) {
      const a = st.match(/\d{1,}px\,\s\d{1,}px(?=((\,\s\d{1,}px\))))/ig)[0].split(",");
      this.l = parseInt(a[0]);
      this.t = parseInt(a[1]);
    } else {
      this.l = this.target.offsetLeft * 1;
      this.t = this.target.offsetTop * 1;
    }


    //开关打开
    this.isDown = true;
    //设置样式

    var eventName = this.mouseEvents();
    
    document["on" + eventName["move"]] = evt => {
      this.dragMove(evt);
    };
    document["on" + eventName["end"]] = evt => {
      this.dragEnd(evt);
    };
  }
  dragMove(evt) {
    if (this.isDown == false) {
      return;
    }
    //获取x和y
    var e = evt || event;

    var nx = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    var ny = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
    //计算移动后的左偏移量和顶部的偏移量
    if (this.transform) {
      this.nl = nx - (this.x - this.l);
      this.nt = ny - (this.y - this.t);

      if (this.nl >= this.stageW - this.target.clientWidth) {
        this.nl = this.stageW - this.target.clientWidth;
      }

      if (this.nl <= 0) {
        this.nl = 0;
      }

      if (this.nt >= this.target.parentNode.clientHeight - this.target.clientHeight) {
        this.nt = this.target.parentNode.clientHeight - this.target.clientHeight;
      }

      if (this.nt <= 0) {
        this.nt = 0;
      }

      let st = this.target.getAttribute("style");
      if (st.match(/translate3d\(0px\, (\d){1,}px\, 0px\)/gi)) {
        // st = st.replace(
        //   /translate3d\(0px\, (\d){1,}px\, 0px\)/gi,
        //   "translate3d(0px, " + this.nt + "px, 0px)"
        // );
      } else if (st.match(/translate3d\((\d){1,}px\, 0px\, 0px\)/gi)) {
        st = st.replace(
          /translate3d\((\d){1,}px\, 0px\, 0px\)/gi,
          "translate3d(" + this.nl + "px, 0px, 0px)"
        );
      } else {
        if (this.direction === "horizontal") {
          st += "transform: translate3d(" + this.nl + "px, 0px, 0px)";
        }
        if (this.direction === "vertical") {
          st += "transform: translate3d(0px, " + this.nt + "px, 0px)";
        }
      }
      this.target.style.cssText = st;
    } else {
      this.nl = nx - (this.x - this.l);
      this.nt = ny - (this.y - this.t);
      if (this.nl >= this.stageW - this.target.clientWidth) {
        this.nl = this.stageW - this.target.clientWidth;
      }

      if (this.nl <= 0) {
        this.nl = 0;
      }

      if (this.nt >= this.stageH - this.target.clientHeight) {
        this.nt = this.stageH - this.target.clientHeight;
      }

      if (this.nt <= 0) {
        this.nt = 0;
      }

      if (this.direction === "horizontal") {
        this.target.style.left = this.nl + "px";
      }

      if (this.direction === "vertical") {
        this.target.style.top = this.nt + "px";
      }
    }
    this.end({
      size: this.direction === "vertical" ? this.nt : this.nl
    });
  }
  dragEnd(evt) {
    var eventName = this.mouseEvents();
    this.isDown = false;
    document["on" + eventName["move"]] = null;
    document["on" + eventName["end"]] = null;
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
}

export default Drag;
