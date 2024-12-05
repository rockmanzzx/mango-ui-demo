<template>
    <div>

    </div>
</template>

<script setup>

import { ElMessageBox, ElMessage } from 'element-plus';
import KtButton from '@/views/Core/KtButton';

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