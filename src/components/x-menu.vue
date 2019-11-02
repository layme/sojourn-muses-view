<template>
  <el-menu style="height: 240px"
    :default-active="activeMenu"
    unique-opened
    router
    :collapse="collapse"
    background-color="#304156"
    text-color="#fff">
    <template v-for="(item, index) in menuList">
      <template v-if="item.children && item.children.length">
        <el-submenu v-if="item.children.length > 1" :index="item.path" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="(sub, i) in item.children" class="x-back" :key="'sub' + i" :index="sub.path" :route="sub">
            {{ sub.meta.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.children[0].path" :route="item.children[0]" :key="index">
          <i :class="item.children[0].icon"></i>
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </template>
      <el-menu-item v-else :index="item.path" :route="item" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'x-menu',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    activeMenu () {
      let path = this.$route.path
      let split = path.split('/')
      return split.pop()
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .x-back {
    background-color: #1f2d3d !important;
    &:hover {
      background-color: #001528 !important;
    }
  }

  .el-menu {
    border-right: 0 !important;
  }
</style>
