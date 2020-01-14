<template>
  <div class="love-page">
    <love-header title="输入昵称"></love-header>
    <div class="t-center">
      <div class="flex-row row-center-left border-b nickname-input">
        <span class="user-icon user-nick-icon"></span>
        <input class="span1" v-model="nickName" placeholder="请输入昵称" />
      </div>
      <div
        class="nomal-btn mt-80"
        @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep3',
  components: {
    LoveHeader
  },
  data () {
    return {
      nickName: ''
    }
  },
  methods: {
    nextStep () {
      if (this.nickName === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入昵称！'
        }).show()
        return
      }
      this.$axios.post('/love-around/user/modify', {
        nickName: this.nickName
      })
        .then((res) => {
          this.$router.push({
            name: 'RegisterStep4'
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.nickname-input
  font-size 14px
  padding-top 18px
  padding-bottom 18px
  padding-left 16px
  padding-right 16px
  .span1
    padding-left 18px
.user-nick-icon
  background-image url('../../assets/images/user-nick-icon.png')
.nomal-btn
  margin-top 186px
</style>
