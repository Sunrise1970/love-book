<template>
  <div class="love-page pb-50">
    <love-header :title="title"></love-header>
    <div class="chart-list">
      <cube-scroll
        ref="scroll"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div
          :key="key" v-for="(item, key) in dataList"
          @click="toLetter(item.userId)">
          <div class="letter-item-left">
            <div class="flex-row">
              <div class="letter-img"></div>
              <div class="chart-content-left">由各种物质组成的物质组物质组成的物质组成的成的由各种物质组成的物质组物质组成的物质组成的成的</div>
            </div>
          </div>
          <div class="letter-item-right">
            <div class="flex-row row-right-top">
              <div class="chart-content-right">由各种物质组成的物质组物质组成的物质组成的成的由各种物质组成的物质组物质组成的物质组成的成的</div>
              <div class="letter-img"></div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import LoveHeader from '@/components/common/LoveHeader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Letter',
  components: {
    LoveHeader
  },
  data () {
    return {
      dataList: [1],
      page: 1,
      pageSize: 30,
      title: ''
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
  activated () {},
  mounted () {
    this.title = this.$route.query.nickName
    // this.initData('init')
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
    // 初始化数据
    initData (type) {
      this.$axios.post('/love-around/love/query-self', {
        'page': this.page,
        'rows': this.pageSize
      })
        .then(resData => {
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
.chart-list
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
  overflow-y: hidden
.letter-item-left,.letter-item-right
  padding-top 24px
  padding-left 16px
  padding-right 16px
.letter-img
  display inline-block
  width:44px;
  height:44px;
  margin-left 12px
  margin-right 12px
  background:rgba(229,229,229,1);
  border-radius:50%;
.letter-info
  margin-top 10px
  margin-bottom 16px
  color rgba(158, 157, 157, 1)
  font-size 13px
.letter-date
  color rgba(158, 157, 157, 1)
  font-size 12px
.letter-title
  display inline-block
  width 200px
  color rgba(20, 20, 20, 1)
  font-size 16px
.chart-content-left
  position relative
  max-width 250px
  padding 11px
  border 1px solid rgba(229, 229, 229, 1)
  border-radius:4px;
  color rgba(20, 20, 20, 1)
  font-size 14px
  line-height 160%
  &:before
    position absolute
    top 14px
    left -6px
    content ''
    width: 10px;
    height: 10px;
    border-left 1px solid rgba(229, 229, 229, 1)
    border-top 1px solid rgba(229, 229, 229, 1)
    transform rotate(-45deg)
    background-color #ffffff
.chart-content-right
  max-width 250px
  padding 11px
  border-radius:4px;
  font-size 14px
  line-height 160%
  position relative
  background-color rgba(121, 183, 144, 1)
  color rgba(255, 255, 255, 1)
  font-size 14px
  line-height 160%
  &:before
    position absolute
    top 14px
    right -8px
    content ''
    width:0;
    height:0;
    border-width: 8px 0 8px 8px;
    border-style:solid;
    border-color:transparent transparent transparent rgba(121, 183, 144, 1);
</style>
