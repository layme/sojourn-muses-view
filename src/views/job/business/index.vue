<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="paramDto">
        <el-form-item>
          <el-select v-model="paramDto.departmentFid" placeholder="中心名称">
            <el-option label="旅居中心" value="15f4ds46f54ds65f4546fdsafsdfdsf"></el-option>
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
      <div>
        <el-button type="primary" plain @click="addCounter++">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        v-loading="loading"
        style="margin-top: 20px">
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
          width="120"
          fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="openServer(scope.row)"
              type="text"
              size="small">
              查看机器
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
    <add-form :counter="addCounter" @success="search"></add-form>
    <server :param="row" :counter="serverCounter"></server>
  </div>
</template>

<script>
import { listBusiness, del } from '../../../api/business'
import addForm from './addForm'
import server from './server'
export default {
  name: 'business',
  components: { addForm, server },
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
      total: 0,
      addCounter: 0,
      serverCounter: 0,
      row: {}
    }
  },
  methods: {
    search () {
      this.paramDto.page = 1
      this.listBusiness()
    },
    listBusiness () {
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
      this.listBusiness()
    },
    openServer (val) {
      this.serverCounter++
      this.row = val
    },
    deleteRow (val) {
      this.$confirm('确定移除该条业务线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(val).then(() => {
          this.$message.success('移除成功')
          this.search()
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
</style>
