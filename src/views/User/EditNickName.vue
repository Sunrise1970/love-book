<template>
  <div class="love-page">
    <love-header
      title="修改昵称"
      rightText="完成"
      @toNextPage="toNextPage"></love-header>
    <div class="flex-row row-center-left border-b nickname-input">
      <span class="user-icon user-nick-icon"></span>
      <input class="span1" v-model="nickName" placeholder="请输入昵称" />
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
      nickName: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.nickName = this.userInfo.nickName
  },
  methods: {
    toNextPage () {
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
          this.$router.back()
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
