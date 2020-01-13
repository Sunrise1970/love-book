<template>
  <div class="love-page">
    <love-header title="设置"></love-header>
    <router-link
      tag="div"
      to="UserInfo"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-info-icon"></span>
      <div class="span1">个人信息</div>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Range"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-location-icon"></span>
      <div class="span1">设置搜索附近情书条件</div>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-intro-icon"></span>
      <div class="span1">简介</div>
      <span class="enter-icon"></span>
    </router-link>
    <div
      class="exist-btn"
      @click="toExist">退出登陆</div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'setting',
  components: {
    LoveHeader
  },
  methods: {
    // 设置
    toExist () {
      this.$axios.get('/love-around/user/loginout')
        .then((res) => {
          this.$createToast({
            time: 1500,
            type: 'txt',
            txt: '退出成功！'
          }).show()
          Cookie.remove('token')
          setTimeout(() => {
            this.$router.replace({
              name: 'Login'
            })
          }, 1200)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.love-setting
  background-color red
.exist-btn
  position fixed
  bottom 30px
  left 50%
  width:150px;
  height:36px;
  line-height 36px
  text-align center
  font-size 16px
  color rgba(230, 64, 60, 1)
  transform translateX(-50%)
  border:1px solid rgba(230,64,60,1);
  border-radius:18px;
.user-info-icon
  background-image url('../../assets/images/user-info-icon.png')
.user-location-icon
  background-image url('../../assets/images/user-location-icon.png')
.user-intro-icon
  background-image url('../../assets/images/user-intro-icon.png')
</style>
