<template>
    <div>
        <el-table :data="data.content" :highlightCurrentRow="highlightCurrentRow" @selection-change="selectionChange"
            @current-change="handleCurrentChange" v-loading="loading" :elment-loading-text="$t('action.loading')"
            :border="border" :stripe="stripe" :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight"
            :size="size" :align="align" style="width: 100%;">
            <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column>
            <el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop"
                :label="column.label" :width="column.width" :min-width="column.minWidth" :fixed="column.fixed"
                :key="column.prop" :type="column.type" :formatter="column.formatter"
                :sortable="column.sortable == null ? true : column.sortable"></el-table-column>
            <el-table-column :label="$t('action.operation')" width="185" fixed="right" v-if="showOperation"
                header-align="center" align="center">
                <template slot-scope="scope">
                    <kt-button icon="fa fa-edit" :label="$t('action.edit')" :perms="permsEdit" :size="size"
                        @click="handleEdit(scope.$index, scope.row)" />
                    <kt-button icon="fa fa-trash" :label="$t('action.delete')" :perms="permsDelete" :size="size"
                        type="danger" @click="handleDelete(scope.$index, scope.row)" />
                </template>
            </el-table-column>
        </el-table>

        <div class="toolbar" style="padding: 10px 0;">
            <kt-button :label="$t('action.batchDelete')" :perms="permsDelete" :size="size" @click="handleBatchDelete" type="danger" :disabled="selections.value.length == 0" style="float: left;" v-if="showBatchDelete & showOperation"/>
            <el-pagination layout="total, prev, pager, next, jumper" :page-size="pageRequest.value.pageSize" :total="data.total" :current-page="pageRequest.value.pageNum" @current-change="refreshPageRequest" style="float: right;"></el-pagination>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import KtButton from '@/views/Core/KtButton.vue';

const props = defineProps({
    columns: Array,
    data: Object,
    permsEdit: String,
    permsDelete: String,
    size: {
        type: String,
        default: 'mini'
    },
    align: {
        type: String,
        default: 'left'
    },
    maxHeight: {
        type: Number,
        default: 420
    },
    showOperation: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: false
    },
    stripe: {
        type: Boolean,
        default: true
    },
    highlightCurrentRow: {
        type: Boolean,
        default: true
    },
    showOverflowTooltip: {
        type: Boolean,
        default: true
    },
    showBatchDelete: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['findPage', 'selectionChange', 'handleCurrentChange', 'handleEdit', 'handleDelete'])

const pageRequest = ref({
    pageNum: 1,
    pageSize: 10
})
const loading = ref(false)
const selections = ref([])

const findPage = () => {
    loading.value = true
    let callback = res => {
        loading.value = false
    }
    emit('findPage', { pageRequest: pageRequest.value, callback: callback })
}
const selectionChange = (selectionsVal) => {
    selections.value = selectionsVal
    emit('selectionChange', { selectionsVal: selectionsVal })
}
const handleCurrentChange = (val) => {
    emit('handleCurrentChange', { val: val })
}
const refreshPageRequest = pageNum => {
    pageRequest.value.pageNum = pageNum
    findPage()
}
const handleEdit = (index, row) => {
    emit('handleEdit', { index: index, row: row })
}
const handleDelete = (index, row) => {
    deleteRows(row.id)
}
const handleBatchDelete = () => {
    let ids = selections.value.map(item => item.id).toString()
    deleteRows(ids)
}
const deleteRows = ids => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        let params = []
        let idArray = (ids + '').split(',')
        idArray.forEach(id => {
            params.push({ id: id })
        })
        loading.value = true
        const callback = res => {
            if (res.code == 200) {
                ElMessage.success('删除成功')
                findPage()
            } else {
                ElMessage.error(res.msg)
            }
            loading.value = false
        }
        emit('handleDelete', { params: params, callback: callback })
    }).catch(() => {
    })
}

onMounted(() => {
    refreshPageRequest(1)
})
</script>

<style lang="scss" scoped></style>