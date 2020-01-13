<template>
  <div ref="tab" class="flex-row tab-wrap">
    <router-link
      tag="div"
      to="/"
      class="span1"
      active-class="active"
      exact>
      <div
        class="tab-icon tab-icon-home"></div>
      <div class="tab-text">首页</div>
    </router-link>
    <router-link
      tag="div"
      to="Sky"
      class="span1"
      active-class="active">
      <div
        class="tab-icon tab-icon-sky"></div>
      <div class="tab-text">星空</div>
    </router-link>
    <router-link
      tag="div"
      to="publish"
      class="span1"
      active-class="active">
      <div
        class="tab-icon tab-icon-publish"></div>
      <div class="tab-text">发布</div>
    </router-link>
    <router-link
      tag="div"
      to="Letter"
      class="span1"
      active-class="active">
      <div
        class="tab-icon tab-icon-letter"></div>
      <div class="tab-text">私信</div>
    </router-link>
    <router-link
      tag="div"
      to="User"
      class="span1"
      active-class="active">
      <div
        class="tab-icon tab-icon-user"></div>
      <div class="tab-text">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tabs'
}
</script>
<style lang="stylus" scoped>
.tab-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #999999;
  background-color: #ffffff;
  padding-top: 6px;
  padding-bottom: 6px;
  z-index 100
  box-shadow:0px -1px 3px 0px rgba(0, 0, 0, 0.1);
}
.tab-text {
  font-size: 11px;
  line-height 100%
}
.tab-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100% auto;
  background-position: 50% 50%;
}
.active {
  color: rgba(19, 68, 65, 1)
}
.tab-icon-home
  background-image url('../../assets/images/home-icon.png')
.tab-icon-sky
  background-image url('../../assets/images/sky-icon.png')
.tab-icon-publish
  background-image url('../../assets/images/publish-icon.png')
.tab-icon-letter
  background-image url('../../assets/images/letter-icon.png')
.tab-icon-user
  background-image url('../../assets/images/user-icon.png')
.active
  .tab-icon-home
    background-image url('../../assets/images/home-active-icon.png')
  .tab-icon-sky
    background-image url('../../assets/images/sky-active-icon.png')
  .tab-icon-publish
    background-image url('../../assets/images/publish-active-icon.png')
  .tab-icon-letter
    background-image url('../../assets/images/letter-active-icon.png')
  .tab-icon-user
    background-image url('../../assets/images/user-active-icon.png')
</style>
