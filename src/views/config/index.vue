<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="paramDto">
        <el-form-item>
          <el-input v-model="paramDto.type" placeholder="类型" :maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="paramDto.code" placeholder="CODE" :maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div>
        <el-button type="primary" plain @click="openAdd">添加</el-button>
        <el-button type="warning" plain :loading="reBuildLoading" @click="reBuild">重建全部系统配置数据</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        v-loading="loading"
        :row-class-name="tableRowClassName"
        style="margin-top: 20px">
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="code"
          label="CODE">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="value"
          label="DB值"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          prop="zkValue"
          label="ZK值"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          prop="notes"
          label="描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="更新时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.updateDate) | dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="openEdit(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
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
      <el-pagination
        class="x-pagination"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="paramDto.page"
        :page-size="paramDto.limit"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
    <input-form :title="title" :counter="counter" :param="row" @success="search"></input-form>
  </div>
</template>

<script>
import { listSysConfig, del, reBuild } from '../../api/config'
import inputForm from './inputForm'
export default {
  name: 'config',
  components: { inputForm },
  data () {
    return {
      paramDto: {
        type: '',
        code: '',
        page: 1,
        limit: 10
      },
      loading: false,
      reBuildLoading: false,
      tableData: [],
      total: 0,
      title: '',
      counter: 0,
      row: {}
    }
  },
  methods: {
    search () {
      this.paramDto.page = 1
      this.listSysConfig()
    },
    listSysConfig () {
      this.loading = true
      listSysConfig(this.paramDto).then(res => {
        this.tableData = res.rows
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange () {
      this.listSysConfig()
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.value !== row.zkValue) {
        return 'warning-row'
      }
      return ''
    },
    openAdd () {
      this.row = {}
      this.title = '添加系统配置'
      this.counter++
    },
    openEdit (row) {
      this.row = row
      this.title = '修改系统配置'
      this.counter++
    },
    deleteRow (val) {
      this.$confirm('确定移除该项配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(val).then(() => {
          this.$message.success('移除成功')
          this.search()
        })
      })
    },
    reBuild () {
      this.$confirm('确定重建全部系统配置数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.reBuildLoading = true
        reBuild().then(() => {
          this.$message.success('重建全部系统配置数据成功')
          this.reBuildLoading = false
        }).catch(() => {
          this.reBuildLoading = false
        })
      })
    }
  },
  created () {
    this.search()
  }
}
</script>

<style scoped lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }
</style>
