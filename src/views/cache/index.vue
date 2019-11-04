<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="key" class="input-with-select" @keyup.enter="getRedis">
          <el-button slot="append" icon="el-icon-search" @click="getRedis"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="8">
        <el-input
          type="textarea"
          :rows="5"
          v-model="result"
        ></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRedis } from '../../api/cache'
export default {
  name: 'cache',
  data () {
    return {
      key: '',
      result: ''
    }
  },
  methods: {
    getRedis () {
      getRedis(this.key).then(res => {
        this.result = res
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
