<template>
  <footer class="footer">
    ZIROOM | Copyright © 2019-present sojourn developer
  </footer>
</template>

<script>
export default {
  name: 'TheLayoutHeader'
}
</script>

<style scoped>
.footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  width:100%;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  z-index: 10;
}
</style>
