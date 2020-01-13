<template>
  <div class="love-page">
    <love-header title="选择生日"></love-header>
    <div class="flex-column h-full center">
      <span
        class="register-btn"
        @click="changeValue">{{birthday}}</span>
      <div
        class="nomal-btn mt-80"
        @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep2',
  components: {
    LoveHeader
  },
  data () {
    return {
      birthday: dayjs(new Date(1990, 0, 1)).format('YYYY-M-D'),
      datePicker: ''
    }
  },
  methods: {
    nextStep () {
      this.$axios.post('/love-around/user/modify', {
        birthday: this.birthday
      })
        .then((res) => {
          this.$router.push({
            name: 'RegisterStep3'
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    changeValue () {
      // 创建和改变日期
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选址日期',
          min: new Date(1950, 1, 1),
          max: new Date(),
          value: new Date(this.birthday),
          onSelect: (date, selectedVal, selectedText) => {
            this.birthday = selectedText.join('-')
          }
        })
      }
      this.datePicker.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
