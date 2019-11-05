<template>
  <el-card>
    <el-form ref="paramForm" label-position="top" label-width="80px" :model="paramDto" v-loading="loading">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="key" :rules="[{ required: true, message: '请输入缓存的key', trigger: 'blur' }]">
            <el-input placeholder="请输入缓存的key" v-model="paramDto.key" :maxlength="30" clearable
                      @keyup.enter.native="validForm">
              <el-button slot="append" icon="el-icon-search" @click="validForm"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="缓存内容">
            <el-input
              type="textarea"
              readonly
              style="margin-top: 5px"
              :autosize="{ minRows: 10 }"
              v-model="paramDto.result"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { getRedis } from '../../api/cache'

export default {
  name: 'cache',
  data () {
    return {
      paramDto: {
        key: '',
        result: ''
      },
      loading: false
    }
  },
  methods: {
    validForm () {
      this.paramDto.result = ''
      this.$refs['paramForm'].validate((valid) => {
        if (valid) {
          this.getRedis()
        } else {
          return false
        }
      })
    },
    getRedis () {
      this.loading = true
      getRedis(this.paramDto.key).then(res => {
        this.paramDto.result = res
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
