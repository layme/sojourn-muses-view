<template>
  <div>
    <el-card>
      <el-form :model="paramDto" label-width="100px">
        <el-row :gutter="20">
          <el-col span="8">
            <el-form-item label="中心名称">
              <el-select v-model="paramDto.serverInfoFid" placeholder="请选择中心名称" class="x-select-width">
                <el-option label="旅居中心" value="15f4ds46f54ds65f4546fdsafsdfdsf"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="业务线名称">
              <el-select v-model="paramDto.businessFid" placeholder="请选择业务线名称" class="x-select-width">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="机器IP">
              <el-select v-model="paramDto.ipAddress" placeholder="请选择机器IP" class="x-select-width">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col span="8">
            <el-form-item label="触发器组名">
              <el-input v-model="paramDto.triggerGroupRe"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="触发器名称">
              <el-input v-model="paramDto.triggerNameRe"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <div>
        <el-button type="primary" plain @click="search">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        style="margin-top: 20px"
        stripe>
        <el-table-column
          prop="serverIp"
          label="机器IP"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="serverPort"
          label="机器端口"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="triggerGroup"
          label="触发器组"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="triggerName"
          label="触发器名"
          show-overflow-tooltip
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="group"
          label="任务组"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="任务名"
          show-overflow-tooltip
          min-width="120">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="small" v-if="'NORMAL' === scope.row.state">{{ scope.row.state }}</el-tag>
            <el-tag type="warning" size="small" v-if="'PAUSE' === scope.row.state">{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="60">
          <template slot-scope="scope">
            {{ scope.row.jobType | nullFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="启动时间"
          min-width="145">
          <template slot-scope="scope">
            {{ scope.row.startTime | dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="前一次执行时间"
          min-width="145">
          <template slot-scope="scope">
            {{ scope.row.preFireTime | dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="下一次执行时间"
          min-width="145">
          <template slot-scope="scope">
            {{ scope.row.nextFireTime | dateTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          width="130"
          fixed="right">
          <template slot-scope="scope">
            <el-dropdown split-button size="small" @click="runNow">
              运行一次
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
                <el-dropdown-item v-if="'PAUSE' === scope.row.state" icon="el-icon-video-play">启用</el-dropdown-item>
                <el-dropdown-item v-if="'NORMAL' === scope.row.state" icon="el-icon-video-pause">暂停</el-dropdown-item>
                <el-dropdown-item divided icon="el-icon-delete" style="color: #F56C6C;">移除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import { listTrigger } from '../../../api/trigger'

export default {
  name: 'trigger',
  data () {
    return {
      paramDto: {
        serverInfoFid: '15f4ds46f54ds65f4546fdsafsdfdsf',
        businessFid: '0a37f6a2-423a-484f-9f80-5d600624aa41',
        ipAddress: '',
        triggerGroupRe: '',
        triggerNameRe: '',
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
      this.listTrigger()
    },
    listTrigger () {
      this.loading = true
      listTrigger(this.paramDto).then(res => {
        this.tableData = res.rows
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange () {
      this.listTrigger()
    },
    runNow () {
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
