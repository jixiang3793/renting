<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新建</a-button>
      <a-button @click="pause()">暂停</a-button>
      <a-button @click="resume()">启动</a-button>
      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :pagination="false"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('users.disable')">
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('users.delete')">
              <a @click="del(record.id)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <a-modal
      title="新增作业"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form">

        <!-- columns -->
        <template v-for="item in columns">
          <a-form-item
            :required="!!item.required"
            :key="item.dataIndex"
            v-if="item.controlType === 'text'"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="item.title"
            hasFeedback
          >
            <a-input
              v-decorator="[item.dataIndex,{rules: [{ required: !!item.required, message: `请输入${item.title}` }]}]"
              :placeholder="item.title"
              :id="item.dataIndex" />
          </a-form-item>
          <a-form-item
            :required="!!item.required"
            :key="item.dataIndex"
            v-if="item.controlType === 'number'"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="item.title"
            hasFeedback
          >
            <a-input-number
              v-decorator="[item.dataIndex,{rules: [{ required: !!item.required, message: `请输入${item.title}` }]}]"
              :placeholder="item.title"
              :id="item.dataIndex" />
          </a-form-item>
          <a-form-item
            :required="!!item.required"
            :key="item.dataIndex"
            v-if="item.controlType === 'select'"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="item.title"
            hasFeedback
          >
          <a-select :placeholder="item.title" v-decorator="[item.dataIndex, {rules: [{ required: !!item.required, message: `请选择${item.title}`}]} ]">
            <a-select-option v-for="opt in item.options" :value="opt.value" :key="opt.value">{{opt.label}}</a-select-option>
          </a-select>
          </a-form-item>
          <a-form-item
            :required="!!item.required"
            :key="item.dataIndex"
            v-if="item.controlType === 'cascader'"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            :label="item.title"
            hasFeedback
          >
          <a-cascader :options="item.options" :placeholder="item.title" v-decorator="[item.dataIndex, {rules: [{ required: !!item.required, message: `请选择${item.title}`}]} ]" />
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import apiSpiderJob from '@/api/spider-job'
import areas from '@/assets/area.json'

export default {
  name: 'SpidersJobList',
  components: {
    STable
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      visible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头 地区或地铁线，url，间隔时间，截止时间、数据类型
      columns: [
        {
          title: '作业名',
          dataIndex: 'name',
          controlType: 'text',
          required: true
        },
        {
          title: 'URL',
          dataIndex: 'url',
          controlType: 'text',
          required: true
        },
        {
          title: '区域',
          dataIndex: 'area',
          controlType: 'cascader',
          options: areas
        },
        // https://blog.csdn.net/qq_38652871/article/details/106360255
        {
          title: '交通路线',
          dataIndex: 'traffic',
          controlType: 'cascader',
          options: [
        {
          value: 'gongjiao',
          label: '公交线路',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'subway',
          label: '地铁',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
        },
        {
          title: '数据类型',
          dataIndex: 'data_type',
          controlType: 'select',
          options: [{
            label: '租房',
            value: 'renting'
          }, {
            label: '二手房',
            value: 'secondhandhouse'
          }, {
            label: '工作',
            value: 'job'
          }],
          required: true
        },
        {
          title: '间隔时间',
          dataIndex: 'every',
          controlType: 'number',
          required: true
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return apiSpiderJob.list(Object.assign(parameter, this.queryParam))
          .then(res => {
            res.result.data.forEach(it => {
              if (typeof it.traffic === 'string') {
                it.traffic = JSON.parse(it.traffic)
              }
              if (typeof it.area === 'string') {
                it.area = JSON.parse(it.area)
              }
            })
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    // getRoleList({ t: new Date() })
  },
  methods: {
    onChange () {},
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },

    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.area) {
            values.area = JSON.stringify(values.area)
          }
          if (values.traffic) {
            values.traffic = JSON.stringify(values.traffic)
          }
          apiSpiderJob.save(values).then(() => {
            this.visible = false
            this.$refs.table.refresh()
          })
        }
      })
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    pause () {
      apiSpiderJob.pause().then()
    },
    resume () {
      apiSpiderJob.resume().then()
    },
    del (id) {
      apiSpiderJob.delete(id).then(() => {
        this.$refs.table.refresh()
      })
    }
  }
}
</script>
