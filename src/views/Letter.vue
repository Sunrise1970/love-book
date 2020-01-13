<template>
  <div class="love-page pb-50">
    <love-header title="私信" :needBack="false"></love-header>
    <div class="letter-list">
      <cube-scroll
        ref="scroll"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div
          :key="key" v-for="(item, key) in dataList"
          @click="toLetter(item.userId)">
          <div class="letter-item">
            <div class="flex-row">
              <div class="letter-img"></div>
              <div class="span1 border-b">
                <div class="flex-row row-space-between">
                  <span class="letter-title ellipse">{{item.nickName}}{{item.nickName}}{{item.nickName}}{{item.nickName}}{{item.nickName}}</span>
                  <span class="letter-date">20:23</span>
                </div>
                <p class="letter-info ellipse2">{{item.loveContent}}</p>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import tabs from '@/components/common/LoveTabs.vue'
import LoveHeader from '@/components/common/LoveHeader.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Letter',
  components: {
    LoveHeader,
    tabs
  },
  data () {
    return {
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
  activated () {},
  mounted () {
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
.letter-list
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
  overflow-y: hidden
.letter-item
  text-align left
  margin-left 16px
  margin-right 16px
  padding-top 21px
.letter-img
  display inline-block
  width:44px;
  height:44px;
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
</style>
