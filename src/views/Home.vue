<template>
  <div class="love-page pb-50">
    <love-header title="首页" :needBack="false"></love-header>
    <div
      v-show="showSearchWrap"
      class="love-searach">
      <input
        ref="inputs"
        v-show="showSearch"
        type="text"
        class="love-searach-input"
        v-model="keyWord"
        placeholder="搜索"
        @input="onInput"
        @blur="onBlur">
      <div
        v-show="!showSearch"
        class="love-searach-wrap center"
        @click="toShowSearch">
        <span class="search-icon"></span>
        {{keyWord || '搜索'}}
      </div>
    </div>
    <div
      class="love-list"
      :class="[!showSearchWrap && 'love-search-hide']">
      <cube-scroll
        ref="scroll"
        :options="options"
        :scrollEvents="['scroll']"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        @scroll="onScrollEnd">
        <div
          :key="key" v-for="(item, key) in dataList">
          <div class="home-item border-b">
            <div class="flex-row">
              <div
                :class="['home-img', item.picName]"
                @click="toUserInfo(item.userId)"></div>
              <div class="span1">
                <div class="flex-row row-space-between">
                  <span class="home-title"
                  @click="toUserInfo(item.userId)">{{item.nickName}}</span>
                  <span class="message-icon" @click="toChart(item.userId, item.nickName)"></span>
                </div>
                <div class="flex-row row-center-left home-desc">
                  <span class="location-icon"></span>
                  <span>{{item.distance}}KM</span>
                  <span class="ml-20">ID: {{item.blockId}}</span>
                </div>
              </div>
            </div>
            <p class="home-info">{{item.loveContent}}</p>
          </div>
          <!-- 用户头像{{item.picName}}<br />
          用户id{{item.userId}}--{{key}}<br />
          昵称{{item.nickName}}<br />
          距离{{item.distance}}<br />
          区块id{{item.blockId}}<br />
          内容{{item.loveContent}}<br /> -->
        </div>
        <div class="no-data" v-show="!loading && dataList.length === 0">暂无相关数据 ～</div>
      </cube-scroll>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import tabs from '@/components/common/LoveTabs.vue'
import LoveHeader from '@/components/common/LoveHeader.vue'
import { mapGetters } from 'vuex'
import BMap from 'BMap'
export default {
  name: 'home',
  components: {
    LoveHeader,
    tabs
  },
  data () {
    return {
      dataList: [],
      keyWord: '',
      page: 1,
      pageSize: 30,
      longitude: '',
      latitude: '',
      showSearch: false,
      showSearchWrap: true,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      refleshHome: 'refleshHome'
    }),
    options () {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: false
      }
    },
    pullDownRefreshObj () {
      return {
        threshold: 60,
        txt: '刷新成功！'
      }
    },
    pullUpLoadObj () {
      return {
        threshold: 60,
        txt: {
          more: '加载中...',
          noMore: '没有更多数据啦 ~'
        }
      }
    }
  },
  activated () {
    // 加判断
    this.refleshHome && this.initData('init')
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('setHomeReflesh', false)
    next()
  },
  mounted () {
    var that = this
    var geolocation = new BMap.Geolocation()
    // 浏览器定位
    geolocation.getCurrentPosition(function (r) {
      if (r) {
        that.longitude = r.point.lng
        that.latitude = r.point.lat
        that.initData('init')
      } else {
        // ip定位
        var myCity = new BMap.LocalCity()
        myCity.get((result) => {
          that.longitude = result.center.lng || ''
          that.latitude = result.center.lat || ''
          that.initData('init')
        })
      }
    })
    this.initData('init')
  },
  methods: {
    toChart (userId, nickName) {
      this.$router.push({
        name: 'Chart',
        query: {
          userId: userId,
          nickName: nickName
        }
      })
    },
    onInput () {
      this.page = 1
      this.initData('reflesh')
    },
    onScrollEnd (val) {
      if (val.y < 0) {
        this.showSearchWrap = false
      } else {
        this.showSearchWrap = true
      }
    },
    onBlur () {
      this.showSearch = false
    },
    toShowSearch () {
      this.showSearch = true
      this.$nextTick(() => {
        this.$refs.inputs.focus()
      })
    },
    toUserInfo (userId) {
      this.$router.push({
        name: 'Friend',
        query: {
          userId: userId
        }
      })
    },
    // 初始化数据
    initData (type) {
      this.loading = true
      this.$axios.post('/love-around/love/query-nearby', {
        'page': this.page,
        'rows': this.pageSize,
        'limit': 30,
        'longitude': this.longitude,
        'latitude': this.latitude,
        'nickName': this.keyWord,
        'sex': '', // 待处理
        'distance': '' // 待处理
      })
        .then(resData => {
          this.loading = false
          if (type === 'init') {
            this.dataList = resData.rows
            this.$refs.scroll.scrollTo(0, 0, 0)
          } else if (type === 'loadmore') {
          // 如果有新数据
            if (resData.rows.length > 0) {
              for (const iterator of resData.rows) {
                this.dataList.push(iterator)
              }
            }
            this.$refs.scroll.forceUpdate()
          } else if (type === 'reflesh') {
          // 如果有新数据
            if (resData.rows.length > 0) {
              this.dataList = resData.rows
              // 如果没有新数据
            } else {
              this.dataList = []
            }
            this.$refs.scroll.forceUpdate()
            this.$nextTick(() => {
              this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 0)
            })
          }
        }).catch(() => {
          if (type === 'reflesh') {
            this.dataList = []
          }
          this.$refs.scroll && this.$refs.scroll.forceUpdate()
        })
    },
    // 刷新页面
    onPullingDown () {
      this.page = 1
      this.initData('reflesh')
    },
    // 加载下一页
    onPullingUp () {
      this.page++
      this.initData('loadmore')
    }
  }
}
</script>
<style lang="stylus" scoped>
.love-list
  position: absolute;
  top: 106px;
  left: 0;
  right: 0;
  bottom: 50px;
  transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
  overflow-y: hidden
.love-searach
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height 56px
  background-color #fff
.love-searach-input
  margin-top 10px
  margin-left 16px
  width 343px
  height 36px
  line-height 36px
  background-color rgba(247, 247, 247, 1)
  border-radius:4px;
  padding-left 15px
.love-searach-wrap
  position absolute
  top 10px
  left 16px
  width 343px
  height 36px
  line-height 36px
  background-color rgba(247, 247, 247, 1)
  border-radius:4px;
  padding-left 15px
  color rgba(158, 157, 157, 1)
.love-search-hide
  top 50px
.home-item
  text-align left
  margin-left 16px
  margin-right 16px
  padding-top 21px
  padding-bottom 16px
.home-img
  display inline-block
  width:44px;
  height:44px;
  margin-right 12px
  background:rgba(229,229,229,1);
  border-radius:50%;
.home-title
  color rgba(20, 20, 20, 1)
  font-size 16px
.home-desc
  margin-top 5px
  vertical-align middle
  span
    color rgba(158, 157, 157, 1)
    font-size 13px
.home-info
  margin-top 10px
  color rgba(20, 20, 20, 1)
  font-size 13px
.search-icon
  display inline-block
  width 15px
  height 16px
  background-image url('../assets/images/search-icon.png')
  background-size 100%
  margin-right 6px
.location-icon
  display inline-block
  width 11px
  height 13px
  background-image url('../assets/images/location-icon.png')
  background-size 100%
  margin-right 6px
.message-icon
  display inline-block
  width 18px
  height 16px
  background-image url('../assets/images/list-letter-icon.png')
  background-size 100%
  margin-right 6px
</style>
