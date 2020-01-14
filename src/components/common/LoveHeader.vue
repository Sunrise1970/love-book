<template>
  <div class="flex-row center header">
    <div
      v-if="needBack && !leftText"
      class="iconfont back-icon-wrap"
      @click="onBack">
      <span class="back-icon"></span>
    </div>
    <div
      v-if="leftText"
      class="back-text"
      @click="onBack">{{leftText}}</div>
    <div class="header-title ellipse span1">{{title}}</div>
    <div
      v-if="needBack"
      :class="['header-btn', 'right-btn', 'center']">
      <span v-if="needShare" class="iconfont detail-icon" @click="toShare">&#xe6f3;</span>
      <span :class="['nextText', rightTextActive && 'nextTextActive']" @click="onNext">{{rightText}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    'needShare': {
      type: Boolean,
      default: false
    },
    'title': {
      type: String,
      default: ''
    },
    'leftText': {
      type: String,
      default: ''
    },
    'rightText': {
      type: String,
      default: ''
    },
    'needBack': {
      type: Boolean,
      default: true
    },
    'needBackHandler': {
      type: Boolean,
      default: false
    },
    'rightTextActive': {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    onBack () {
      if (!this.needBackHandler) {
        this.$router.back()
      } else {
        this.$emit('toBackPage')
      }
    },
    // 分享
    toShare () {
      this.$emit('toShare')
    },
    onNext () {
      this.$emit('toNextPage')
    }
  }
}
</script>
<style lang="stylus" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 100;
  background-color: rgba(247, 247, 247, 1)
}
.back-icon-wrap {
  width: 75px;
  height: 49px;
  font-size: 18px;
  line-height: 49px;
  text-align: left;
  padding-left: 15px
}
.back-icon {
  display inline-block
  width 8px
  height 14px
  background-image url('../../assets/images/back-icon.png')
  background-size 100%
}
.header-title {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: rgba(20, 20, 20, 1);
}
.right-btn {
  width: 75px
}
.nomal-next {
  font-size: 12px;
  padding-right: 10px;
  color: #cccccc;
}
.nextText {
  font-size: 16px;
  color: rgba(19, 68, 65, .5)
}
.nextTextActive {
  color: rgba(19, 68, 65, 1)
}
.detail-icon {
  width: 30px;
  height: 49px;
  line-height: 49px;
  color: #157EFB;
  text-align: center;
  font-size: 12px;
}
.detail-icon:active {
  background-color: #cccccc;
}
.back-text {
  width: 75px;
  padding-left: 15px;
  font-size: 16px;
  color: rgba(20, 20, 20, 1);
}
</style>
