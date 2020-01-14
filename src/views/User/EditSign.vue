<template>
  <div class="love-page">
    <love-header
      title="修改个性签名"
      rightText="完成"
      @toNextPage="toNextPage"></love-header>
    <div class="flex-row row-center-left nickname-input">
      <span class="user-icon user-sign-icon"></span>
      <textarea class="textarea span1" v-model="signature" placeholder="请输入个性签名" />
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RegisterStep3',
  components: {
    LoveHeader
  },
  data () {
    return {
      signature: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.signature = this.userInfo.signature
  },
  methods: {
    toNextPage () {
      // if (this.signature === '') {
      //   this.$createToast({
      //     time: 1500,
      //     type: 'txt',
      //     txt: '请输入个性签名！'
      //   }).show()
      //   return
      // }
      this.$axios.post('/love-around/user/modify', {
        signature: this.signature
      })
        .then((res) => {
          this.$router.back()
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
