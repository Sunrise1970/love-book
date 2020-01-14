<template>
    <div class="love-page">
      <love-header></love-header>
      <div class="login-wrap t-center">
        <img class="love-logo" src="../../assets/images/love-logo.png" />
        <p class="love-desc">在情书，遇到对的</p>
        <div class="flex-row row-center-left border-b login-input">
          <span class="tel-icon"></span>
          <input class="span1" v-model="mobile" placeholder="输入11位手机号码" />
        </div>
        <div class="flex-row row-center-left border-b login-input">
          <span class="code-icon"></span>
          <input class="span1" v-model="code" placeholder="短信验证码" />
          <love-timer
            :mobile="mobile"
            @resentMsg="sentMobileMsg"></love-timer>
        </div>
        <div
          class="nomal-btn mt-60"
          :class="{
            'nomal-empty-btn': btnEmpty
          }"
          @click="nextStep">一键登录/注册</div>
      </div>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
import { validateTel } from '@/utils/validator'
import LoveHeader from '@/components/common/LoveHeader.vue'
import LoveTimer from '@/components/common/LoveTimer.vue'
export default {
  components: {
    LoveHeader,
    LoveTimer
  },
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  computed: {
    btnEmpty () {
      return !this.mobile && !this.code
    }
  },
  methods: {
    // 发送短信
    sentMobileMsg () {
      if (this.mobile === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入11位手机号码！'
        }).show()
        return
      }
      if (validateTel(this.mobile)) {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入正确的手机号码！'
        }).show()
        return
      }
      this.isLimit = false
      this.$axios.get('/love-around/operation/sendMsg', {
        params: {
          mobile: this.mobile
        }
      })
    },
    onBack () {
      this.$router.back()
    },
    // 短信登录注册
    nextStep () {
      if (this.mobile === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入11位手机号码！'
        }).show()
        return
      }
      if (validateTel(this.mobile)) {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入正确的手机号码！'
        }).show()
        return
      }
      if (this.code === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请输入验证码！'
        }).show()
        return
      }
      this.$axios.post('/love-around/user/login', {
        userMobile: this.mobile || '188141171225',
        verifyCode: this.code || '123456'
      })
        .then((res) => {
          this.$axios.defaults.headers.token = res.data.token
          Cookie.set('token', res.data.token)
          // 老用户1，新用户2，测试环境先用1
          if (res.data.isNew === '1') {
            this.$router.push({
              name: 'RegisterStep1',
              query: {
                mobile: this.mobile
              }
            })
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-wrap
  padding-left 30px
  padding-right 30px
.login-input
  font-size 14px
  margin-top 40px
  padding-bottom 11px
.love-logo
  margin-top 50px
  width 66px
  height 66px
.love-desc
  color rgba(20, 20, 20, 1)
  font-size 16px
  padding-top 30px
  padding-bottom 20px
  letter-spacing 8px
.tel-icon
  display inline-block
  width 18px
  height 21px
  background-image url('../../assets/images/login-uid-icon.png')
  background-size 100%
  margin-right 13px
.code-icon
  display inline-block
  width 18px
  height 21px
  background-image url('../../assets/images/login-code-icon.png')
  background-size 100%
  margin-right 13px
</style>
