<template>
  <div class="love-page">
    <love-header
      title="修改昵称"
      rightText="完成"
      @toNextPage="toNextPage"></love-header>
    <div class="flex-row row-center-left border-b nickname-input">
      <span class="user-icon"></span>
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
    },
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
  padding-top 19px
  padding-bottom 19px
  padding-left 17px
  width 260px
  font-size 16px
  input
    padding-left 18px
    color rgba(20, 20, 20, 1)
</style>
