<template>
  <div class="love-page">
    <love-header title="选择性别"></love-header>
    <div class="flex-column h-full center">
      <div>
        <div class="flex-row span1 center">
          <div
            class="span1"
            @click="changeValue('1')">
            <span
              class="register-btn"
              :class="[sex === '1' && 'active-btn']">我是男生</span>
          </div>
          <div
            class="span1"
            @click="changeValue('2')">
            <span
              class="register-btn"
              :class="[sex === '2' && 'active-btn']">我是女生</span>
          </div>
        </div>
        <div
          class="nomal-btn mt-80"
          @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'RegisterStep1',
  components: {
    LoveHeader
  },
  data () {
    return {
      sex: ''
    }
  },
  methods: {
    nextStep () {
      if (this.sex === '') {
        this.$createToast({
          time: 1500,
          type: 'txt',
          txt: '请选择性别！'
        }).show()
        return
      }
      this.$axios.post('/love-around/user/modify', {
        userSex: this.sex
      })
        .then((res) => {
          this.$router.push({
            name: 'RegisterStep2'
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    changeValue (sex) {
      this.sex = sex
    }
  }
}
</script>
<style lang="stylus" scoped>
.active-btn
  border 1px solid blue
  color blue
</style>
