<template>
  <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
            <el-input placeholder="请输入缓存的key" v-model="key" :maxlength="30" clearable
                      @keyup.enter.native="getRedis">
            </el-input>
        </el-col>
        <el-col :span="8">
              <el-button type="primary" icon="el-icon-search" :disabled="!key" @click="getRedis">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="margin-top: 28px">缓存内容</div>
            <el-input
              type="textarea"
              readonly
              style="margin-top: 5px"
              :autosize="{ minRows: 10 }"
              v-model="result"
            ></el-input>
        </el-col>
        <el-col :span="12">
            <el-button type="warning" icon="el-icon-delete" v-show="result" @click="delRedis" style="margin-top: 55px">删除缓存</el-button>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
import { getRedis, delRedis } from '../../api/cache'

export default {
  name: 'cache',
  data () {
    return {
      key: '',
      result: '',
      loading: false
    }
  },
  methods: {
    getRedis () {
      this.result = ''
      this.loading = true
      getRedis(this.key).then(res => {
        this.result = res
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    delRedis () {
      this.loading = true
      delRedis(this.key).then(() => {
        this.$message.success('删除成功')
        this.result = ''
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
