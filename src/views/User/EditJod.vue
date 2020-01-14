<template>
  <div class="love-page">
    <love-header
      title="修改工作"
      rightText="完成"
      @toNextPage="toNextPage"></love-header>
    <div class="flex-row row-center-left border-b nickname-input">
      <span class="user-icon user-jod-icon"></span>
      <input class="span1" v-model="profession" placeholder="请输入工作" />
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
      profession: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.profession = this.userInfo.profession
  },
  methods: {
    toNextPage () {
      // if (this.profession === '') {
      //   this.$createToast({
      //     time: 1500,
      //     type: 'txt',
      //     txt: '请输入工作！'
      //   }).show()
      //   return
      // }
      this.$axios.post('/love-around/user/modify', {
        profession: this.profession
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
