<template>
  <div class="app-container">
    <div class="search-block">
      <div class="search-header">
        <div><i class="el-icon-search"></i> 条件查询 <el-tooltip
          class="item"
          effect="dark"
          content="其中关键字可根据可根据医生ID、医生姓名、医生手机号、医院名称、科室、职称、地区模糊搜索"
          placement="top-start"
        >
          <i class="el-icon-question"></i>
        </el-tooltip></div>
        <div><el-button type="primary" @click="handleQuery">查询结果</el-button></div>
      </div>
      <div class="inp-block">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键字">
            <el-input
              clearable
              v-model.trim="formInline.searchText"
              placeholder="请输入关键字"
              @keyup.native.enter='handleQuery'
            ></el-input>
          </el-form-item>
          <el-form-item label="医生状态">
            <el-select clearable v-model="formInline.authStatus" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btn-block">
      <el-button type="warning">批量导出</el-button>
      <el-button type="primary">全部导出</el-button>
    </div>
    <div class="table-block">
      <el-table
        :data="list"
        border
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%"
        key="'doctorList'"
        v-loading.body="listLoading"
        element-loading-text="Loading"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="55"
          fixed>
        </el-table-column>
        <el-table-column
          prop="doctorName"
          label="医生姓名"
          width="120"
          fixed>
        </el-table-column>
        <el-table-column
          prop="doctorId"
          label="医生ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="doctorPhone"
          label="医生手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="医生性别"
          width="80">
          <template slot-scope="scope">
            <p>{{scope.row.sex === '1' ? '男' : '女'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="hospital"
          label="医院名称"
          :show-overflow-tooltip="true"
          width="180">
        </el-table-column>
        <el-table-column
          prop="backGroundInfo"
          label="背景介绍"
          width="180"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="clinicReferral"
          label="擅长及诊所介绍"
          :show-overflow-tooltip="true"
          width="180">
        </el-table-column>
        <el-table-column
          prop="resultsInfo"
          label="成果介绍"
          :show-overflow-tooltip="true"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          width="100"
          label="科室"
        >
        </el-table-column>
        <el-table-column
          width="260"
          label="行政职称/科研教学职称/临床职称"
        >
          <template slot-scope="scope">
            <p>
              {{scope.row.officePost || '无'}}/
              {{scope.row.postTeach || '无'}}/
              {{scope.row.postClinic || '无'}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="省份/城市"
        >
          <template slot-scope="scope">
            <p>
              {{scope.row.regionName || '-'}}/
              {{scope.row.cityName || '-'}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="140">
          <template slot-scope="scope">
            <p>{{scope.row.createTime ? $util.formatTime(Number(scope.row.createTime)) : ''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="140">
          <template slot-scope="scope">
            <p>{{scope.row.updateTime ? $util.formatTime(Number(scope.row.updateTime)) : ''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="authStatusName"
          label="医生状态"
          width="90"
          fixed="right"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="formInline.currentPage"
        :page-size="formInline.pageSize"
        :page-sizes="[10, 50, 100, 500]"
        layout="total, prev, pager, next, sizes"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: [],
      multipleSelection: [],
      stateOptions: [],
      listLoading: true,
      total: 0,
      formInline: {
        searchText: '', // 关键词
        authStatus: '', // 医生状态, 1-未认证, 2-待审核, 3-审核通过, 4-审核不通过
        pageSize: 10,
        pageNo: 1 // 当前页
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  mounted() {
    this.fetchData()
    this.getOptions('DOCTOR_AUTH_STATUS', 'stateOptions')
  },
  methods: {
    handleQuery() { // 条件查询从第一页开始
      this.formInline.pageNo = 1
      this.fetchData()
    },
    getOptions(code, key) {
      this.$util.getOptions({ code }).then((value) => {
        this[key] = value
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.formInline).then(response => {
        this.list = response.list
        console.log(this.list)
        this.listLoading = false
        this.formInline.pageSize = response.pageInfo.pageSize
        this.total = response.pageInfo.totalRecord
        this.formInline.pageNo = response.pageInfo.pageNum
      })
    },
    handleSizeChange(val) {
      this.formInline.pageNo = 1
      this.formInline.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
  .table-block{
    width: 100%;
    height: auto;
  }
</style>
