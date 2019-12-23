<template>
  <el-dialog
    title="添加业务线"
    :visible.sync="visible"
    width="30%"
    @open="handleOpen">
    <el-form ref="addForm" :model="paramDto" :rules="rules" label-width="100px" style="width: 87%">
      <el-form-item label="中心" prop="depFid">
        <el-select v-model="paramDto.depFid" placeholder="中心名称" class="x-select-width">
          <el-option label="旅居中心" value="8a90a5f3628401ef01628401eff30000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务线名称" prop="businessName">
        <el-input v-model="paramDto.businessName" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="Quartz版本" prop="versionCode">
        <el-input v-model="paramDto.versionCode" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="paramDto.remark" :maxlength="200" show-word-limit
                  :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="validForm">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { save } from '../../../api/business'
export default {
  name: 'addForm',
  props: {
    counter: { type: Number }
  },
  data () {
    return {
      visible: false,
      loading: false,
      paramDto: {
        depFid: '',
        businessName: '',
        versionCode: '',
        remark: ''
      },
      rules: {
        depFid: [{ required: true, message: '不能为空', trigger: 'change' }],
        businessName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        versionCode: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    counter () {
      this.visible = true
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
      save(this.paramDto).then(() => {
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
    handleOpen () {
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields()
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
