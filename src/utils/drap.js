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
    this.l = this.target.offsetLeft * 1;
    this.t = this.target.offsetTop * 1;
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
    this.nl = nx - (this.x - this.l);
    this.nt = ny - (this.y - this.t);

    if (this.nl >= this.stageW - this.targetW) {
      this.nl = this.stageW - this.targetW;
    }

    if (this.nl <= 0) {
      this.nl = 0;
    }

    if (this.nt >= this.stageH - this.targetH) {
      this.nt = this.stageH - this.targetH;
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

    this.end({
      size: this.direction === "vertical" ? this.nt : this.nl
    });
  }
  dragEnd() {
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
