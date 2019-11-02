<template>
  <el-header class="header">
    <router-link to="/index">
      <div class="logo" :class="{'logo-hide': !openNav}">
<!--        <img src="../../assets/logo.png" class="image"/>-->
        <i class="el-icon-alarm-clock" style="font-size: 30px; color: #ffffff;"></i>
        <span class="text">缪斯管控</span>
      </div>
    </router-link>
    <div class="content">
      <i class="el-icon-s-fold toggle" @click="navOpenToggle" :title="$t('header.toggleNavHide')" v-show="openNav"></i>
      <i class="el-icon-s-unfold toggle" @click="navOpenToggle" :title="$t('header.toggleNavShow')"
         v-show="!openNav"></i>
      <x-bread></x-bread>
    </div>
    <div class="right max-right">
      <div class="right-item">
        <el-dropdown trigger="click" @command="changeLanguage" @visible-change="handleVisibleChange" id="langDropDown">
          <p class="user-info">
            {{ $t('header.languageSelect') }}
            <i class="el-icon-arrow-down el-icon--right drop-icon" id="langDropIcon"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
              {{$t('header.langZh')}}
            </el-dropdown-item>
            <el-dropdown-item command="en" :disabled="this.lang==='en'">
              {{$t('header.langEn')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right-item">
        <el-dropdown trigger="click">
          <p class="user-info">
            {{ user.name }}<i class="el-icon-s-custom" style="margin-left: 10px"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">
              {{$t('header.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="right min-right">
      <el-dropdown trigger="click" :hide-on-click="false">
        <p class="user-info">
          <i class="el-icon-s-custom"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            {{ user.name }}
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-dropdown trigger="click" @command="changeLanguage" placement="left">
              <p class="user-info">
                {{ $t('header.languageSelect') }}
                <i class="el-icon-arrow-down el-icon--right drop-icon"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
                  {{$t('header.langZh')}}
                </el-dropdown-item>
                <el-dropdown-item command="en" :disabled="this.lang==='en'">
                  {{$t('header.langEn')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            {{$t('header.logout')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapState } from 'vuex'
import xBread from '../../components/x-bread'

export default {
  name: 'TheLayoutHeader',
  props: ['openNav'],
  components: {
    xBread
  },
  data () {
    const lang = localStorage.getItem('user-language') || 'zh-cn'
    return {
      lang: lang
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    navOpenToggle () {
      this.$emit('toggle-open')
    },
    logout () {
      // do something
      this.$router.push('/login')
    },
    changeLanguage (language) {
      localStorage.setItem('user-language', language)
      this.$i18n.locale = language
      this.lang = language
    },
    handleVisibleChange (val) {
      let langDropIcon = document.getElementById('langDropIcon')
      if (val) {
        langDropIcon.style.transform = 'rotate(0deg)'
      } else {
        langDropIcon.style.transform = 'rotate(-180deg)'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  color: #ffffff;
  line-height: 60px;
  user-select: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  border-bottom: 1px solid rgba(0, 0, 0, .12);
  div {
    display: inline-block;
  }

  .logo {
    width: 240px;
    border-right: 1px solid #C0C4CC;
    margin-left: -20px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    background-color: #0E2134;

    .image {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    .text {
      color: #ffffff;
      margin-left: 10px;
    }
  }

  .logo-hide {
    width: 65px;

    .text {
      display: none;
    }
  }

  .content {
    padding: 0 20px;

    .toggle {
      font-size: 22px;
      cursor: pointer;
      color: #0E2134;
    }
  }

  .right {
    float: right;

    .right-item {
      display: inline-block;
      padding: 0 10px;
      min-width: 60px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;

      .drop-icon {
        transition: transform 0.2s;
      }
    }

    /*.right-item:hover {*/
    /*  background-color: rgba(255, 255, 255, 0.3);*/
    /*}*/

    .user-info {
      /*color: #ffffff;*/
    }
  }

  .min-right {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    .logo {
      border: none;
      display: contents;

      .text {
        display: inline-block !important;
      }
    }

    .content {
      float: left;
      margin-left: -20px;
    }
  }

  .max-right {
    display: none !important;
  }

  .min-right {
    display: inline-block !important;
  }
}
</style>
