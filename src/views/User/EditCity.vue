<template>
  <div class="love-page">
    <love-header
      title="修改城市"
      rightText="完成"
      @toNextPage="nextStep"
    ></love-header>
    <div class="t-center">
      <div
        class="flex-row row-center-left border-b love-enter"
        @click="showMutiPicker">
        <span class="user-icon user-city-icon"></span>
        <div
          class="span1"
          :class="{
            'enter-place': !city
          }"
        >{{city || '请选择'}}</div>
        <span class="enter-icon"></span>
      </div>
      <div
        class="nomal-btn"
        @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
import { provinceList, cityList } from '@/assets/data/area'
import { mapGetters } from 'vuex'
const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
})
export default {
  name: 'RegisterStep2',
  components: {
    LoveHeader
  },
  data () {
    return {
      city: '',
      datePicker: '',
      currentIndex: [0, 0]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.city = this.userInfo.hometown
    // 获取当前城市对应的城市index和省份index
    let procieceIndex = 0
    let cityIndex = 0
    for (const iterator of addressData) {
      for (const iterator2 of iterator.children) {
        if (iterator2.text === this.city) {
          this.currentIndex = [procieceIndex, cityIndex]
        }
        cityIndex++
      }
      procieceIndex++
    }
    this.addressPicker = this.$createCascadePicker({
      title: '修改城市',
      data: addressData,
      selectedIndex: this.currentIndex,
      onSelect: this.selectHandle
    })
  },
  methods: {
    nextStep () {
      this.$axios.post('/love-around/user/modify', {
        hometown: this.city
      })
        .then((res) => {
          this.$router.back()
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    showMutiPicker () {
      this.addressPicker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.city = selectedText[1]
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-city-icon
  background-image url('../../assets/images/user-city-icon.png')
.nomal-btn
  margin-top 186px
</style>
