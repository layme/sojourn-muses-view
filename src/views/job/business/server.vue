<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="40%">
    <div>
      <el-button type="primary" plain @click="addCounter++">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      v-loading="loading"
      style="margin-top: 20px">
      <el-table-column
        prop="serverIp"
        label="服务器IP"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="serverPort"
        label="服务器端口"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="创建时间"
        min-width="140">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime) | dateTimeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="60"
        fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            style="color: #F56C6C"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-server :counter="addCounter" :param="param" @success="search"></add-server>
  </el-dialog>
</template>

<script>
import { listServerInfo, deleteServerInfo } from '../../../api/business'
import addServer from './addServer'
export default {
  name: 'server',
  props: {
    param: { type: Object },
    counter: { type: Number }
  },
  components: { addServer },
  data () {
    return {
      title: '',
      paramDto: {
        businessFid: '',
        departmentFid: '',
        page: 1,
        limit: 10
      },
      visible: false,
      loading: false,
      tableData: [],
      addCounter: 0
    }
  },
  watch: {
    counter () {
      this.visible = true
    },
    param: {
      handler (val) {
        this.title = val.businessName + ' 的服务器'
        this.paramDto.businessFid = val.fid
        this.paramDto.departmentFid = val.depFid
        this.tableData = []
        this.search()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    search () {
      this.paramDto.page = 1
      this.listBusiness()
    },
    listBusiness () {
      this.loading = true
      listServerInfo(this.paramDto).then(res => {
        this.tableData = res
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    deleteRow (val) {
      this.$confirm('确定移除该服务器?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServerInfo(val).then(() => {
          this.$message.success('移除成功')
          this.search()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
