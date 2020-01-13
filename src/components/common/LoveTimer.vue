<template>
  <span :class="['code-text', color]" @click="reSent">{{codeText}}</span>
</template>
<script>
import { validateTel } from '@/utils/validator'
export default {
  props: {
    'voiceTextShow': {
      type: Boolean,
      default: false
    },
    'mobile': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      time: 0,
      st: '',
      color: 're-sent',
      codeType: 'text',
      codeText: '发送验证码',
      voiceNum: 0,
      textNum: 1
    }
  },
  created () {
    // this.startTimer()
  },
  methods: {
    startTimer () {
      clearInterval(this.st)
      this.st = setInterval(() => {
        if (this.time > 1) {
          this.time--
          this.codeText = '重新发送(' + this.time + 's)'
        } else {
          this.color = 're-sent'
          this.time = 0
          // 语音验证码
          // if (this.textNum >= 2) {
          //   this.codeType = 'voice'
          // }
          // 人工服务
          if (this.textNum >= 3) {
            this.codeType = 'service'
          }
          // if (this.codeType === 'voice') {
          //   this.voiceNum++
          //   this.codeText = '发送语音验证码'
          // } else
          if (this.codeType === 'service') {
            this.codeText = '联系客服'
          } else {
            this.codeText = '发送验证码'
            this.textNum++
          }
          clearInterval(this.st)
          console.log('this.textNum', this.textNum)
          console.log('this.codeType', this.codeType)
        }
      }, 1000)
    },
    reSent () {
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
      // 短信失效后才开始重新发从短信
      if (this.time === 0) {
        this.color = 'code-gray'
        this.time = 60
        // // 发送语音短信
        // if (this.codeType === 'voice') {
        //   this.$emit('voiceTextShow', true)
        //   this.$emit('resentMsg', 'voice')
        //   this.startTimer()
        // // 显示联系客服
        // } else
        if (this.codeType === 'service') {
          this.$emit('serviceDialogShow', true)
          this.time = 0
          this.color = 're-sent'
        // 发送手机短信
        } else {
          this.$emit('resentMsg')
          this.startTimer()
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .code-text {
    font-size 14px
    color rgba(53, 133, 255, 1)
    cursor pointer
  }
  .code-gray {
    color: #c3c3c3;
  }
  .re-sent {
    color rgba(53, 133, 255, 1)
  }
</style>
