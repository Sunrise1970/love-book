<template>
  <div class="love-page">
    <love-header
      title="张三"
      leftText="取消"
      rightText="发布"
      :rightTextActive="rightTextAcitve"
      :needBackHandler="true"
      @toNextPage="toNextPage"
      @toBackPage="toBackPage"></love-header>
    <textarea
      class="love-content"
      v-model="loveContent"
      placeholder="发表你的情书吧...（限制140个字）"
    ></textarea>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
import BMap from 'BMap'
export default {
  name: 'publish',
  components: {
    LoveHeader
  },
  data () {
    return {
      loveContent: '',
      longitude: '',
      latitude: '',
      address: '',
      id: ''
    }
  },
  computed: {
    rightTextAcitve () {
      return this.loveContent !== ''
    }
  },
  mounted () {
    this.$axios.get('/love-around/love/query-not-chain').then(resData => {
      console.log('resData', resData)
      this.loveContent = resData.data.loveContent
      this.id = resData.data.id
    })
    var that = this
    var geolocation = new BMap.Geolocation()
    // 浏览器定位
    geolocation.getCurrentPosition(function (r) {
      console.log('r:', r)
      if (r) {
        that.longitude = r.point.lng
        that.latitude = r.point.lat
        that.address = r.address.province + r.address.city + r.address.district + r.address.street
        console.log('that.latitude', that.latitude)
      } else {
        // ip定位
        var myCity = new BMap.LocalCity()
        myCity.get((result) => {
          that.longitude = result.center.lng || ''
          that.latitude = result.center.lat || ''
          that.address = result.name
          console.log('result:', result)
        })
      }
    })
  },
  methods: {
    toBackPage () {
      if (this.loveContent) {
        this.$axios.post('/love-around/love/save', {
          loveContent: this.loveContent,
          longitude: this.longitude,
          latitude: this.latitude,
          address: this.address
        }).then(resData => {
          this.$createToast({
            time: 1500,
            type: 'txt',
            txt: '已保存到草稿箱 ~'
          }).show()
        })
      }
      this.$router.back()
    },
    toNextPage () {
      if (this.loveContent.length > 140) {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '情书内容超过140个字了！'
        }).show()
        return
      }
      this.$axios.post('/love-around/love/save-to-chain', {
        loveContent: this.loveContent,
        longitude: this.longitude,
        latitude: this.latitude,
        address: this.address,
        id: this.id
      }).then(resData => {
        console.log('resData', resData)
        this.$store.dispatch('setHomeReflesh', true)
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '发布情书成功！'
        }).show()
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.love-content
  width 100%
  height 400px
  padding 16px 17px
  font-size 16px
  color rgba(20, 20, 20, 1)
  border none
</style>
