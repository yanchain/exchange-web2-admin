<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="roleList">
      <el-table-column label="序号" prop="roleId" align="center"/>
      <el-table-column label="发布时间" prop="roleName" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="数据类型" prop="roleKey" align="center" :show-overflow-tooltip="true" />
      <el-table-column label="数据内容" prop="roleSort" align="center">
         <template slot-scope="scope">
            <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
          >详细</el-button>
        </template>
      </el-table-column>
        <el-table-column label="销量" prop="roleKey" align="center" :show-overflow-tooltip="true" />
      <el-table-column label="标记" prop="roleSort" align="center"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 详情 -->
    <el-dialog title="数据详情" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布时间：">{{ form.title }}</el-form-item>
            <el-form-item
              label="所在位置："
            >{{ form.operName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布者：">{{ form.operUrl }}</el-form-item>
            <el-form-item label="标记：">{{ form.requestMethod }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据类型：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据内容：">{{ form.operParam }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="域名："></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解析时间：">{{}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="解析记录："></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所在位置：">{{ form.jsonResult }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRole } from "@/api/system/role";

export default {
  name: "shareDetail",
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
       // 是否显示弹出层
      open: false,
      // 角色表格数据
      roleList: [],
      orderData:[
        {
          order:'1232456325',
          time:'',
          type:'域名解析',
          name:'asd',
          user:'sdasd',
          dataTime:'2020-2020',
          price:12012
        }
      ],
      // 弹出层标题
      title: "",
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
      },
      // 表单参数
      form: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.roleList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 详情 */
    handleView(row){
      this.open = true;
      this.form = row;
    }
  }
};
</script>