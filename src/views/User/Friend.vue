<template>
  <div class="love-page">
    <div class="user-head">
      <span
        class="back-w-icon"
        @click="onBack"></span>
    </div>
    <div class="user-bg">
      <span
        class="user-img"
        :class="[userInfo.picName]"
      ></span>
      <p class="user-nick ellipse">{{userInfo.nickName}}</p>
      <p class="user-desc ellipse2">{{userInfo.introduction}}</p>
      <span class="user-id">ID: {{userInfo.userId}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.$axios.get('/love-around/user/friend-info', {
      params: {
        userId: this.$route.query.userId
      }
    })
      .then((res) => {
        this.userInfo = res.data
      })
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-head
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 100;
  font-size: 16px;
  color rgba(255, 255, 255, 1)
  text-align center
.user-bg
  position: absolute;
  top: 0;
  width: 100%;
  height 260px
  padding-top 60px
  background-color rgba(19, 68, 65, 1)
  background-image url('../../assets/images/user-bg.png')
  background-size 100%
  text-align center
  p
    margin-left auto
    margin-right auto
    width 300px
.user-img
  display inline-block
  width 60px
  height 60px
  background-color #ddd
  border-radius 50%
  background-size 100%
.user-nick
  color rgba(255, 255, 255, 1)
  font-size 16px
  margin-top 10px
.user-desc
  color rgba(121, 183, 144, 1)
  font-size 14px
  margin-top 13px
.user-id
  display inline-block
  color rgba(255, 255, 255, 1)
  font-size 14px
  margin-top 10px
  padding-left 10px
  padding-right 10px
  background-color rgba(59, 118, 112, 1)
  border-radius:9px;
.back-w-icon
  position absolute
  left 16px
  top 15px
  display inline-block
  width 24px
  height 24px
  background-image url('../../assets/images/back-w-icon.png')
  background-size 100%
  margin-right 6px
</style>
