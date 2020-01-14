<template>
  <div class="love-page">
    <love-header
      title="修改个人简介"
      rightText="完成"
      @toNextPage="toNextPage"></love-header>
    <div class="flex-row row-center-left nickname-input">
      <span class="user-icon user-person-icon"></span>
      <textarea class="textarea span1" v-model="introduction" placeholder="请输入个人简介" />
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
      introduction: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.introduction = this.userInfo.introduction
  },
  methods: {
    toNextPage () {
      // if (this.introduction === '') {
      //   this.$createToast({
      //     time: 1500,
      //     type: 'txt',
      //     txt: '请输入个人简介！'
      //   }).show()
      //   return
      // }
      this.$axios.post('/love-around/user/modify', {
        introduction: this.introduction
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
