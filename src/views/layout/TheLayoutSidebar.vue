<template>
  <aside class="sidebar" :class="{'sidebar-hide': !collapse}">
<!--    <el-menu :default-active="selectMenu" class="sidebar-menu" :collapse="!openNav"-->
<!--             background-color="#304156" text-color="#DCDFE6" active-text-color="#606266"-->
<!--             :collapse-transition="false" :router="true">-->
<!--      <template v-for="menu in user.accessMenu">-->
<!--        <el-menu-item v-if="!menu.children" :key="menu.name" :index="menu.path">-->
<!--          <i :class="menu.icon" v-if="menu.icon"></i>-->
<!--          <span slot="title">{{ $t(menu.title) }}</span>-->
<!--        </el-menu-item>-->
<!--        <the-submenu :key="menu.name" :subMenu="menu" v-else :i18n="i18n"></the-submenu>-->
<!--      </template>-->
<!--    </el-menu>-->
    <el-menu :default-active="activeMenu"
             unique-opened
             router
             :collapse="!collapse"
             :collapse-transition="false"
             class="sidebar-menu"
             background-color="#304156"
             text-color="#fff"
             active-text-color="#606266">
      <template v-for="(item, index) in menuList">
        <template v-if="item.children && item.children.length">
          <el-submenu v-if="item.children.length > 1" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ $t(item.meta.title) }}</span>
            </template>
            <el-menu-item v-for="(sub, i) in item.children" class="x-back" :key="'sub' + i" :index="sub.path" :route="sub">
              {{ $t(sub.meta.title) }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.children[0].path" :route="item.children[0]" :key="index">
            <i :class="item.children[0].icon"></i>
            <span slot="title">{{ $t(item.children[0].meta.title) }}</span>
          </el-menu-item>
        </template>
        <el-menu-item v-else :index="item.path" :route="item" :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{ $t(item.meta.title) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheLayoutSidebar',
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
  computed: {
    selectMenu () {
      return this.$route.meta.menuPath || this.$route.path
    },
    ...mapState(['user']),
    activeMenu () {
      let path = this.$route.path
      let split = path.split('/')
      return split.pop()
    }
  },
  methods: {
    i18n: function (key) {
      return this.$t(key)
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  float: left;
  width: 240px;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  overflow: auto;

  .sidebar-menu {
    border: none;
    height: 100%;
  }
}

.sidebar-hide {
  width: 65px;
}
.x-back {
  background-color: #1f2d3d !important;
  &:hover {
    background-color: #001528 !important;
  }
}
</style>
