<template>
  <div class="love-page">
    <love-header title="选择生日"></love-header>
    <div class="t-center">
      <div
        class="flex-row row-center-left border-b love-enter"
        @click="changeValue">
        <span class="user-icon user-birthday-icon"></span>
        <div
          class="span1"
          :class="{
            'enter-place': !birthday
          }"
        >{{birthday || '请选择'}}</div>
        <span class="enter-icon"></span>
      </div>
      <div
        class="nomal-btn"
        @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep2',
  components: {
    LoveHeader
  },
  data () {
    return {
      birthday: '',
      // birthday: dayjs(new Date(1990, 0, 1)).format('YYYY-M-D'),
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
    },
    changeValue () {
      // 创建和改变日期
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择生日',
          min: new Date(1950, 0, 1),
          max: new Date(),
          value: new Date(1990, 0, 1),
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
.user-birthday-icon
  background-image url('../../assets/images/user-birthday-icon.png')
.nomal-btn
  margin-top 186px
</style>
