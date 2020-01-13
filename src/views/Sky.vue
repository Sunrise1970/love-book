<template>
  <div class="love-page">
    <love-header title="星空" :needBack="false"></love-header>
    星空
    {{dataList}}
    <tabs></tabs>
  </div>
</template>

<script>
import tabs from '@/components/common/LoveTabs.vue'
import LoveHeader from '@/components/common/LoveHeader.vue'
export default {
  name: 'sky',
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
  mounted () {
    this.initData('init')
  },
  methods: {
    // 初始化数据
    initData (type) {
      this.$axios.post('/love-around/love/query-self', {
        'page': this.page,
        'rows': this.pageSize
      })
        .then(resData => {
          this.dataList = resData.rows
        })
    }
  }
}
</script>
<style lang="stylus" scoped></style>
