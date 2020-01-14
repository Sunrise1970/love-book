<template>
  <div class="love-page">
    <love-header title="选择头像"></love-header>
    <div class="flex-column h-full t-center center">
      <div class="w-full" v-show="!loading">
        <div class="flex-row span1 row-b row-space-between t-center head-wrap">
          <div
            @click="changeValue('1')">
            <span
              class="head-img"
              :class="[
                userHead === '1' && 'active-btn',
                suerSexType === 'man' ? 'man1' : 'woman1'
              ]"></span>
          </div>
          <div
            @click="changeValue('2')">
            <span
              class="head-img"
              :class="[
                userHead === '2' && 'active-btn',
                suerSexType === 'man' ? 'man2' : 'woman2'
              ]"></span>
          </div>
          <div
            @click="changeValue('3')">
            <span
              class="head-img"
              :class="[
                userHead === '3' && 'active-btn',
                suerSexType === 'man' ? 'man3' : 'woman3'
              ]"></span>
          </div>
        </div>
        <div
          class="nomal-btn mt-80"
          :class="[!userHead && 'nomal-empty-btn']"
          @click="nextStep">进入首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep4',
  components: {
    LoveHeader
  },
  data () {
    return {
      userHead: '',
      suerSexType: '',
      loading: true
    }
  },
  mounted () {
    this.$axios.get('/love-around/user/query-self')
      .then((res) => {
        console.log('res', res)
        if (res.data.userSex === '1') {
          this.suerSexType = 'man'
        } else {
          this.suerSexType = 'woman'
        }
        this.loading = false
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  methods: {
    nextStep () {
      if (this.userHead === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请选择头像！'
        }).show()
        return
      }
      this.$axios.post('/love-around/user/modify', {
        picName: this.suerSexType + this.userHead
      })
        .then((res) => {
          this.$router.push({
            name: 'Home'
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    changeValue (userHead) {
      this.userHead = userHead
    }
  }
}
</script>
<style lang="stylus" scoped>
.head-img
  display inline-block
  width 86px
  height 86px
  border-radius 50%
  background-size 100%
.active-btn
  border 2px solid rgba(19, 68, 65, 1)
.head-wrap
  padding-left 25px
  padding-right 25px
</style>
