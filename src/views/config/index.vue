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
      <el-table
        :data="tableData"
        stripe
        v-loading="loading"
        style="width: 100%">
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
              @click.native.prevent="editRow(scope.$index, tableData)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
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
  </div>
</template>

<script>
import { listSysConfig } from '../../api/config'

export default {
  name: 'config',
  data () {
    return {
      paramDto: {
        type: '',
        code: '',
        page: 1,
        limit: 10
      },
      loading: false,
      tableData: [],
      total: 0
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
    editRow () {
    },
    deleteRow () {
    }
  },
  created () {
    this.search()
  }
}
</script>

<style scoped lang="scss">
</style>
