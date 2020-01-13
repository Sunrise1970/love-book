<template>
  <div class="love-page">
    <love-header title="个人信息"></love-header>
    <router-link
      tag="div"
      to="EditNickName"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-nick-icon"></span>
      <div class="span1">昵称</div>
      <span class="enter-text ellipse">{{userInfo.nickName}}</span>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Range"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-sign-icon"></span>
      <div class="span1">个性签名</div>
      <span class="enter-text ellipse">{{userInfo.signature}}</span>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-jod-icon"></span>
      <div class="span1">工作</div>
      <span class="enter-text ellipse">{{userInfo.profession}}</span>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-person-icon"></span>
      <div class="span1">个人简介</div>
      <span class="enter-text ellipse">{{userInfo.introduction}}</span>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-sex-icon"></span>
      <div class="span1">性别</div>
      <div class="sex-text">
        <span
          :class="[userInfo.userSex === '1' ? 'setting-man-icon' : 'setting-woman-icon']"></span>
          {{userInfo.userSex === '1' ? '男' : '女'}}
        </div>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-city-icon"></span>
      <div class="span1">城市</div>
      <span class="enter-text ellipse">{{userInfo.hometown}}</span>
      <span class="enter-icon"></span>
    </router-link>
    <router-link
      tag="div"
      to="Introduction"
      class="flex-row row-center-left border-b love-enter"
      active-class="active">
      <span class="user-icon user-birthday-icon"></span>
      <div class="span1">生日</div>
      <span class="enter-text ellipse">{{userInfo.birthday}}</span>
      <span class="enter-icon"></span>
    </router-link>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'setting',
  components: {
    LoveHeader
  },
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.$axios.get('/love-around/user/query-self')
      .then((res) => {
        console.log('res', res)
        this.userInfo = res.data
        this.$store.dispatch('setUserInfo', this.userInfo)
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.user-nick-icon
  background-image url('../../assets/images/user-nick-icon.png')
.user-sign-icon
  background-image url('../../assets/images/user-sign-icon.png')
.user-jod-icon
  background-image url('../../assets/images/user-jod-icon.png')
.user-person-icon
  background-image url('../../assets/images/user-person-icon.png')
.user-sex-icon
  background-image url('../../assets/images/user-sex-icon.png')
.user-city-icon
  background-image url('../../assets/images/user-city-icon.png')
.user-birthday-icon
  background-image url('../../assets/images/user-birthday-icon.png')
.setting-woman-icon
  display inline-block
  width 16px
  height 16px
  margin-right 10px
  background-image url('../../assets/images/setting-woman-icon.png')
  background-size 100%
  vertical-align middle
.setting-man-icon
  display inline-block
  width 16px
  height 16px
  margin-right 10px
  background-image url('../../assets/images/setting-man-icon.png')
  background-size 100%
  vertical-align middle
.sex-text
  display inline-block
  width:  160px
  text-align: right
  font-size: 16px
  color: rgba(20, 20, 20, 1)
</style>
