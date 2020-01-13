<template>
  <div class="love-page">
    <love-header title="设置范围"></love-header>
    <div class="love-range">
      <div>选择性别</div>
      <div class="flex-row center">
        <div
          :class="currentSex === '1' && 'active'"
          @click="toChangeSex('1')">
          <div class="sex-radio center">
            <span class="sex-man-icon"></span>
          </div>
          <div class="sex-text">男</div>
        </div>
        <div
          :class="currentSex === '2' && 'active'"
          @click="toChangeSex('2')">
          <div class="sex-radio center">
            <span class="sex-woman-icon"></span>
          </div>
          <div class="sex-text">女</div>
        </div>
      </div>
      <div class="rang-top">搜索年龄</div>
      <a-slider :min="18" :max="50" v-model="ageArr" range :marks="marks" />
      <div class="rang-top">搜索范围(km)</div>
      <a-slider v-model="distance" :marks="marks2" />
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'range',
  components: {
    LoveHeader
  },
  data () {
    return {
      ageArr: [18, 30],
      distance: 0,
      currentSex: '1',
      marks: {
        18: '18',
        50: {
          label: <strong>50</strong>
        }
      },
      marks2: {
        0: '0',
        100: {
          label: <strong>100km+</strong>
        }
      }
    }
  },
  methods: {
    toChangeSex (sex) {
      this.currentSex = sex
    },
    onChange () {
      console.log('value', this.value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.love-range
  padding 30px 60px
  text-align center
  font-size 16px
  color rgba(20, 20, 20, 1)
.sex-radio
  width:66px;
  height:66px;
  background-color:rgba(229,229,229,1);
  border-radius:50%;
  margin-top 25px
  margin-left 25px
  margin-right 25px
  margin-bottom 7px
.sex-man-icon
  display inline-block
  width 28px
  height 28px
  background-image url('../../assets/images/setting-man-icon.png')
  background-size 100%
  vertical-align middle
.sex-woman-icon
  display inline-block
  width 28px
  height 28px
  background-image url('../../assets/images/setting-woman-icon.png')
  background-size 100%
  vertical-align middle
.sex-text
  font-size 16px
  color rgba(158, 157, 157, 1)
.active
  .sex-radio
    border 2px solid rgba(19, 68, 65, 1)
  .sex-text
    color rgba(19, 68, 65, 1)
.rang-top
  margin-top 55px
</style>
<style>
.ant-slider-rail{
  height: 14px;
  /* border-radius: 8px */
}
.ant-slider {
  height: 14px;
}
.ant-slider-track {
  height: 14px;
  background-color: rgba(19, 68, 65, 1);
  border-radius: 8px
}
.ant-slider-handle.ant-tooltip-open{
  border-color: rgba(19, 68, 65, 1)
}
.ant-slider-handle {
  border: solid 1px rgba(19, 68, 65, .7);
}
.ant-slider-step {
  height: 14px;
}
.ant-slider-dot {
  /* display: none; */
  top: 0;
  border: none;
  width: 14px;
  height: 14px;
  background-color: #f5f5f5
}
.ant-slider-handle {
  width: 24px;
  height: 24px;
}
.ant-slider-mark {
  top: 26px
}
.ant-slider-dot-active {
  display: none
}
</style>
