<template>
  <el-dialog
    title="添加服务器"
    :visible.sync="visible"
    width="30%"
    append-to-body
    @closed="handleClosed">
    <el-form ref="addForm" :model="paramDto" :rules="rules" label-width="100px" style="width: 87%">
      <el-form-item label="服务器IP" prop="serverIp">
        <el-input v-model="paramDto.serverIp" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务器端口" prop="serverPort">
        <el-input v-model="paramDto.serverPort" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="paramDto.userName" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="paramDto.userPassword" :maxlength="100" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="validForm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { saveServerInfo } from '../../../api/business'
export default {
  name: 'addServer',
  props: {
    counter: { type: Number },
    param: { type: Object }
  },
  data () {
    return {
      visible: false,
      loading: false,
      paramDto: {
        departmentFid: '',
        businessFid: '',
        serverIp: '',
        serverPort: '',
        userName: '',
        userPassword: ''
      },
      rules: {
        serverIp: [{ required: true, message: '不能为空', trigger: 'blur' }],
        serverPort: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    counter () {
      this.visible = true
    },
    param: {
      handler (val) {
        this.paramDto.businessFid = val.fid
        this.paramDto.departmentFid = val.depFid
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    validForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save () {
      this.loading = true
      saveServerInfo(this.paramDto).then(() => {
        this.$message.success('保存成功')
        this.visible = false
        this.loading = false
        this.callback()
      }).catch(() => {
        this.loading = false
      })
    },
    callback () {
      this.$emit('success')
    },
    handleClosed () {
      this.$refs.addForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
