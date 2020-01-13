<template>
  <div class="love-page">
    <love-header title="输入昵称"></love-header>
    <div class="flex-column h-full center">
      <div class="flex-row border-b nickname-input">
        <span class="icon-tel"></span>
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
        .catch((error) => {
          console.log('error', error)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.nickname-input
  width 260px
  height 40px
  line-height 40px
  font-size 14px
  margin-top 30px
</style>
