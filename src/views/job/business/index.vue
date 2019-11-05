<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="paramDto">
        <el-form-item>
          <el-select v-model="paramDto.departmentFid" placeholder="中心名称">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="paramDto.businessName" placeholder="业务线名称"></el-input>
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
          prop="depName"
          label="中心名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="businessName"
          label="业务线名称">
        </el-table-column>
        <el-table-column
          prop="versionCode"
          label="版本号"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="empCode"
          label="最近更新人"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.createTime) | dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.updateTime) | dateTimeFilter }}
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
import { listBusiness } from '../../../api/business'

export default {
  name: 'business',
  data () {
    return {
      paramDto: {
        departmentFid: '',
        businessName: '',
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
      listBusiness(this.paramDto).then(res => {
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
