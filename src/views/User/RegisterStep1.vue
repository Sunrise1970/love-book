<template>
  <div class="love-page t-center">
    <love-header title="选择性别"></love-header>
    <div class="flex-column h-full center">
      <div class="flex-row center">
        <div
          :class="currentSex === '1' && 'active'"
          @click="toChangeSex('1')">
          <div class="sex-radio center">
            <span class="sex-man-icon"></span>
          </div>
          <div class="sex-text">我是男生</div>
        </div>
        <div
          :class="currentSex === '2' && 'active'"
          @click="toChangeSex('2')">
          <div class="sex-radio center">
            <span class="sex-woman-icon"></span>
          </div>
          <div class="sex-text">我是女生</div>
        </div>
      </div>
      <div
        class="nomal-btn mt-80 mb-50"
        :class="{
          'nomal-empty-btn': !currentSex
        }"
        @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep1',
  components: {
    LoveHeader
  },
  data () {
    return {
      currentSex: ''
    }
  },
  methods: {
    nextStep () {
      if (this.currentSex === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请选择性别！'
        }).show()
        return
      }
      this.$axios.post('/love-around/user/modify', {
        userSex: this.currentSex
      })
        .then((res) => {
          this.$router.push({
            name: 'RegisterStep2'
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    toChangeSex (sex) {
      this.currentSex = sex
    }
  }
}
</script>
<style lang="stylus" scoped>
.sex-radio
  width:66px;
  height:66px;
  background-color:rgba(229,229,229,1);
  border-radius:50%;
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
</style>
