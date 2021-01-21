<template
  ><div :class="['cys-loading-view', plate, { 'is-fixed': fixed }]">
    <div class="load-an-view">
      <div class="load-circle">
        <div class="load-container load-container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="load-container load-container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="load-container load-container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CysLoading",
  componentName: "CysLoading",
  props: {
    plate: {
      type: String,
      defualt: "black"
    },
    fixed: {
      type: Boolean,
      defualt: false
    }
  }
};
</script>
<style lang="stylus" scoped>
.cys-loading-view {
  &.white {
    background: rgba(255, 255, 255, 0.8);
    .load-container1 > div,
    .load-container2 > div,
    .load-container3 > div {
       background-color: #436fed;
    }
  }
  &.is-fixed {
    position: fixed;
  }
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 6px 0 0;
  -webkit-transition: height 1s linear 0s;
  -moz-transition: height 1s linear 0s;
  -o-transition: height 1s linear 0s;
  transition: height 1s linear 0s;
  z-index 1000
}
.load-an-view {
  width: 100%;
  height: auto;
  box-pack: center;
  box-align: center;
  /* Firefox */
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-align: center;
  /* Safari、Opera 以及 Chrome */
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -o-box-pack: center;
  -o-box-align: center;
}
/*type1  缓存追逐球*/
.load-circle {
  min-width: 40px;
  min-height: 40px;
  position: relative;
}
.load-container1 > div,
.load-container2 > div,
.load-container3 > div {
  width: 20%;
  height: 20%;
  background-color: #ffffff;

  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  -moz-animation: bouncedelay 1.2s infinite ease-in-out;
  -o-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
}
.load-circle .load-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.load-container2 {
  -webkit-transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);
  -o-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
.load-container3 {
  -webkit-transform: rotateZ(90deg);
  -moz-transform: rotateZ(90deg);
  -o-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.circle1 {
  top: 0;
  left: 0;
}
.circle2 {
  top: 0;
  right: 0;
}
.circle3 {
  right: 0;
  bottom: 0;
}
.circle4 {
  left: 0;
  bottom: 0;
}

.load-container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  -moz-animation-delay: -1.1s;
  -o-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.load-container3 .circle1 {
  -webkit-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -o-animation-delay: -1s;
  animation-delay: -1s;
}

.load-container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.load-container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  -moz-animation-delay: -0.8s;
  -o-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.load-container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  -moz-animation-delay: -0.7s;
  -o-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.load-container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  -moz-animation-delay: -0.6s;
  -o-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.load-container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  -moz-animation-delay: -0.5s;
  -o-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.load-container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  -moz-animation-delay: -0.4s;
  -o-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.load-container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  -moz-animation-delay: -0.3s;
  -o-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.load-container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  -moz-animation-delay: -0.2s;
  -o-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.load-container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  -moz-animation-delay: -0.1s;
  -o-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -moz-transform: scale(0);
  }
  40% {
    -moz-transform: scale(1);
  }
}
@-o-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -o-transform: scale(0);
  }
  40% {
    -o-transform: scale(1);
  }
}
@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
