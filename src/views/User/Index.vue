<template>
  <div class="love-page">
    <div class="user-head">
      我的
      <span
        class="user-setting"
        @click="toSetting"></span>
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
    <div class="user-list">
      <span class="user-desc-icon"></span>
      <cube-scroll
        ref="scroll"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div
          class="flex-row"
          :key="key" v-for="(item, key) in dataList"
          @click="toLetter(item.id)">
          <div class="user-block">
            <span class="user-block-tag ellipse">{{item.blockId}}</span>
            <i></i>
          </div>
          <div class="span1 border-b user-list-item">
            <div class="flex-row row-space-between">
              <span class="user-date">{{item.chainTime}}</span>
              <span class="user-location ">{{item.address}}</span>
            </div>
            <p class="ellipse2">{{item.loveContent}}</p>
          </div>
        </div>
      </cube-scroll>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import tabs from '@/components/common/LoveTabs.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'userIndex',
  components: {
    tabs
  },
  data () {
    return {
      userInfo: {},
      dataList: [],
      page: 1,
      pageSize: 30
    }
  },
  computed: {
    ...mapGetters({}),
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
  mounted () {
    this.$axios.get('/love-around/user/query-self')
      .then((res) => {
        this.userInfo = res.data
      })
    this.initData('init')
  },
  methods: {
    toLetter (userId) {
      this.$router.push({
        name: 'Letter',
        query: {
          userId: userId
        }
      })
    },
    // 设置
    toSetting () {
      this.$router.push({
        name: 'Setting'
      })
    },
    // 初始化数据
    initData (type) {
      this.$axios.post('/love-around/love/query-self', {
        'page': this.page,
        'rows': this.pageSize
      })
        .then(resData => {
          if (type === 'init') {
            this.dataList = resData.rows.map((item) => {
              item.chainTime = dayjs(item.chainTime).format('M-D hh:mm')
              return item
            })
            this.$refs.scroll.scrollTo(0, 0, 0)
          } else if (type === 'loadmore') {
          // 如果有新数据
            if (resData.rows.length > 0) {
              for (const iterator of resData.rows) {
                iterator.chainTime = dayjs(iterator.chainTime).format('M-D hh:mm')
                this.dataList.push(iterator)
              }
            }
            this.$refs.scroll.forceUpdate()
          } else if (type === 'reflesh') {
          // 如果有新数据
            if (resData.rows.length > 0) {
              this.dataList = resData.rows.map((item) => {
                item.chainTime = dayjs(item.chainTime).format('M-D hh:mm')
                return item
              })
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
.user-setting
  position absolute
  right 16px
  top 15px
  display inline-block
  width 18px
  height 18px
  background-image url('../../assets/images/setting-icon.png')
  background-size 100%
  margin-right 6px
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
.user-list
  position: absolute;
  top: 250px;
  bottom: 50px
  width: 100%;
  padding 10px 16px
  background-color rgba(255,255,255, 1)
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  p
    color rgba(20, 20, 20, 1)
    font-size 14px
    padding-top 10px
.user-list-item
  height 100px
  padding-top 15px
  padding-bottom 15px
  p
    color rgba(20, 20, 20, 1)
    font-size 12px
.user-block
  position relative
  width 60px
  i
    position relative
    left 20px
    top -10px
    display inline-block
    width 1px
    height 20px
    background-color rgba(239, 239, 239, 1)
.user-block-tag
  position absolute
  top 40px
  left -20px
  display inline-block
  width 80px
  height 20px
  line-height 20px
  background-color rgba(239, 239, 239, 1)
  border-radius:10px;
  font-size 12px
  color rgba(19, 68, 65, 1)
  padding-left 6px
  padding-right 0px
  transform rotate(90deg)
.user-date
  color rgba(158, 157, 157, 1)
  font-size 14px
.user-location
  color rgba(158, 157, 157, 1)
  font-size 14px
.user-desc-icon
  display inline-block
  width 73px
  height 20px
  background-image url('../../assets/images/user-desc.png')
  background-size 100%
  margin-left 10px
  margin-bottom -5px
</style>
