<template>
  <el-breadcrumb separator="/">
<!--    <el-breadcrumb-item :to="{ path: '/' }">大盘</el-breadcrumb-item>-->
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="'bread' + index">{{ $t(item) }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'x-bread',
  computed: {
    breadList () {
      let list = []
      console.log('=> ', this.$route.matched)
      this.$route.matched.forEach(item => {
        list.push(item.title)
      })
      return list
    }
  },
  data () {
    return {
    }
  }
}
</script>
