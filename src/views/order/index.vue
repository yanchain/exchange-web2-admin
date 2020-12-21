<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
      <el-form-item label="发布者名称" prop="dataProvider">
        <el-input
          v-model="queryParams.dataProvider"
          placeholder="请输入发布者名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用者名称" prop="dataConsumer">
        <el-input
          v-model="queryParams.dataConsumer"
          placeholder="请输入使用者名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单创建时间">
        <el-date-picker
          @change="handleTim"
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="roleList" >
      <el-table-column label="序号" prop="roleId"/>
      <el-table-column label="订单编号" prop="orderNo" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据类型" prop="category" :show-overflow-tooltip="true"/>
      <el-table-column label="发布者" prop="dataProvider"/>
      <el-table-column label="使用者" prop="dataConsumer"/>
      <el-table-column label="数据共享日期">
          <template slot-scope="scope">
          <span>{{ simpleTime(scope.row.shareBeginDate) }}-{{simpleTime(scope.row.shareEndDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据价格" prop="interal"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/orders/order-detail/' + scope.row.id" class="link-type">
            <span>查看</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNo"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { orderAdminApi } from "@/api/order";
export default {
  name: "order",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        dataProvider: undefined,
        dataConsumer: undefined,
        beginDate:undefined,
        endDate:undefined
      },
      // 表单参数
      form: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    simpleTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      return Y + M + D;
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      orderAdminApi(this.queryParams,this.queryParams.pageNo).then(
        response => {
          this.roleList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryParams.beginDate = undefined
      this.queryParams.endDate = undefined
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleTim(){
      if(this.dateRange){
        this.queryParams.beginDate = this.dateRange[0]
        this.queryParams.endDate = this.dateRange[1]
      }else{
        this.queryParams.beginDate = undefined
        this.queryParams.endDate = undefined
      }
    }
  }
};
</script>