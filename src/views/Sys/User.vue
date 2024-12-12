<template>
    <div class="page-container">

        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名" />
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary"
                        @click="findPage(null)"></kt-button>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary"
                        @click="handleAdd"></kt-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="toolbarl" style="float:right;padding-top:10px;padding-right:15px;">
            <el-form :inline="true" :size="size">
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="刷新" placement="top">
                            <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="列显示" placement="top">
                            <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
                        </el-tooltip>
                        <el-tooltip content="导出" placement="top">
                            <el-button icon="fa fa-file-excel-o"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </el-form-item>
            </el-form>
            <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
                @handleFilterColumns="handleFilterColumns"></table-column-filter-dialog>
        </div>

        <kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete" :data="pageResult" :columns="filterColumns"
            @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
        </kt-table>

        <el-dialog :title="operation ? '新增' : '编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
                label-position="right">
                <el-form-item label="ID" prop="id" v-if="false">
                    <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="dataForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机构" prop="deptName">
                    <popup-tree-input :data="deptData" :props="deptTreeProps" :prop="dataForm.deptName"
                        :nodeKey="'' + dataForm.deptId" :currentChangeHandle="deptTreeCurrentChangeHandle">
                    </popup-tree-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="dataForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="userRoles" v-if="!operation">
                    <el-select v-model="dataForm.userRoles" multiple placeholder="请选择" style="width: 100%;">
                        <el-option v-for="item in roles" :key="item.id" :label="item.remark" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
                <el-button :size="size" type="primary" @click.native="submitForm"
                    :loading="editLoading">{{ $t('action.submit') }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script setup>

import PopupTreeInput from '@/components/PopupTreeInput/index.vue'
import KtTable from '@/views/Core/KtTable.vue'
import KtButton from '@/views/Core/KtButton.vue'
import TableColumnFilterDialog from '@/views/Core/TableColumnFilterDialog.vue'
import { format } from '@/utils/datetime'
import { ref, getCurrentInstance, onMounted } from 'vue'

const proxy = getCurrentInstance()

const size = ref('small')
const filters = ref({
    name: '',
})
const columns = ref([])
const filterColumns = ref([])
const pageRequest = ref({
    page: 1,
    pageSize: 10,
})
const pageResult = ref({})
const operation = ref(false)
const dialogVisible = ref(false)
const editLoading = ref(false)
const dataFormRules = ref({
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
})
const dataForm = ref({
    id: 0,
    name: '',
    password: '123456',
    deptId: 1,
    deptName: '',
    email: 'test@qq.com',
    mobile: '13889700023',
    status: 1,
    userRoles: []
})
const deptData = ref([])
const deptTreeProps = ref({
    label: 'name',
    children: 'children',
})
const roles = ref([])

const findPage = data => {
    if (data !== null) {
        pageRequest.value = data.pageRequest
    }
    pageRequest.value.columnsFilters = {
        name: {
            name: 'name',
            value: filters.value.name,
        }
    }
    proxy.$api.user.findPage(pageRequest).then(res => {
        pageResult.value = res.data
        findUserRoles()
        if (data && data.callback) {
            data.callback()
        }
    }).catch(err => {
        proxy.$message.error(err.message)
    })
}
const findUserRoles = () => {
    proxy.$api.role.findAll().then(res => {
        roles.value = res.data
    }).catch(err => {
        proxy.$message.error(err.message)
    })
}
const handleDelete = data => {
    proxy.$api.user.batchDelete(data.params).then(res => {
        proxy.$message.success('删除成功')
        if (data && data.callback) {
            data.callback()
        }
    }).catch(err => {
        proxy.$message.error(err.message)
    })
}
const handleAdd = () => {
    dialogVisible.value = true
    operation.value = true
    dataForm.value = {
        id: 0,
        name: '',
        password: '',
        deptId: 1,
        deptName: '',
        email: 'test@qq.com',
        mobile: '13889700023',
        status: 1,
        userRoles: []
    }
}
const handleEdit = params => {
    dialogVisible.value = true
    operation.value = false
    dataForm.value = Object.assign({}, param.data)
    let userRoles = []
    for (let i = 0, len = params.row.userRoles.length; i < len; i++) {
        userRoles.push(params.row.userRoles[i].roleId)
    }
    dataForm.value.userRoles = userRoles
}
const submitForm = () => {
    proxy.$refs.dataForm.validate(valid => {
        if (valid) {
            proxy.$confirm('确定要提交吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                editLoading.value = true
                let params = Object.assign({}, dataForm.value)
                let userRoles = []
                for (let i = 0, len = params.userRoles.length; i < len; i++) {
                    userRoles.push({
                        userId: params.id,
                        roleId: params.userRoles[i],
                    })
                }
                params.userRoles = userRoles

                proxy.$api.user.save(params).then(res => {
                    if (res.code === 200) {
                        proxy.$message.success('保存成功')
                        dialogVisible.value = false
                        proxy.$refs.dataForm.resetFields()
                        findPage()
                    } else {
                        proxy.$message.error(res.message)
                    }
                    findPage(null)
                }).catch(err => {
                    proxy.$message.error(err.message)
                })
            })
        }
    })
}
const findDeptTree = () => {
    proxy.$api.dept.findDeptTree().then(res => {
        deptData.value = res.data
    }).catch(err => {
        proxy.$message.error(err.message)
    })
}
const deptTreeCurrentChangeHandle = (data, node) => {
    dataForm.value.deptId = data.id
    dataForm.value.deptName = data.name
}
const dateFormat = (row, column, cellValue, index) => {
    return format(row[column.property])
}
const displayFilterColumnsDialog = () => {
    proxy.$refs.tableColumnFilterDialog.setDialogVisible(true)
}
const handleFilterColumns = data => {
    filterColumns.value = data.filterColumns
    proxy.$refs.tableColumnFilterDialog.setDialogVisible(false)
}
const initColumns = () => {
    columns.value = [
        { prop: "id", label: "ID", minWidth: 50 },
        { prop: "name", label: "用户名", minWidth: 120 },
        { prop: "deptName", label: "机构", minWidth: 120 },
        { prop: "roleNames", label: "角色", minWidth: 100 },
        { prop: "email", label: "邮箱", minWidth: 120 },
        { prop: "mobile", label: "手机", minWidth: 100 },
        { prop: "status", label: "状态", minWidth: 70 },
    ]
}

onMounted(() => {
    findDeptTree()
    initColumns()
})
</script>

<style lang="scss" scoped></style>