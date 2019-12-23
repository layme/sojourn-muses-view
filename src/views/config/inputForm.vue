<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="30%"
    @closed="handleClosed">
    <el-form ref="inputForm" :model="paramDto" :rules="rules" label-width="80px" style="width: 87%">
      <el-form-item label="类型" prop="type">
        <el-input v-model="paramDto.type" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="CODE" prop="code">
        <el-input v-model="paramDto.code" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="paramDto.name" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="paramDto.value" :maxlength="100" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="notes">
        <el-input type="textarea" v-model="paramDto.notes" :maxlength="200" show-word-limit
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
import { save, update } from '../../api/config'
export default {
  name: 'inputForm',
  props: {
    title: { type: String },
    counter: { type: Number },
    param: { type: Object }
  },
  data () {
    return {
      visible: false,
      loading: false,
      paramDto: {
        type: '',
        code: '',
        name: '',
        value: '',
        notes: ''
      },
      rules: {
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    counter () {
      this.visible = true
    },
    param: {
      handler (val) {
        this.paramDto.type = val.type
        this.paramDto.code = val.code
        this.paramDto.name = val.name
        this.paramDto.value = val.value
        this.paramDto.notes = val.notes
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    validForm () {
      this.$refs.inputForm.validate((valid) => {
        if (valid) {
          this.onSubmit()
        }
      })
    },
    onSubmit () {
      if (Object.keys(this.param).length) {
        this.update()
      } else {
        this.save()
      }
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
    update () {
      this.loading = true
      update(this.paramDto).then(() => {
        this.$message.success('修改成功')
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
      this.$refs.inputForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
