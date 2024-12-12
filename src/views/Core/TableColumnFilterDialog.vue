<template>
    <el-dialog title="表格显示列" width="40%" v-model="dialogVisible" :close-on-click-modal="false">
        <el-table :data="columns" height="330px" tooltip-effect="dark" header-align="center" align="left" :size="size"
            style="width: 100%;" @selection-change="selectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="属性">
                <template #default="{ row }">{{ row.prop }}</template>
            </el-table-column>
            <el-table-column label="列名">
                <template #default="{ row }">
                    <el-input :size="size" v-model="row.label"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="最小宽度">
                <template #default="{ row }">
                    <el-input :size="size" v-model="row.minWidth"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button :size="size" @click="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
                <el-button :size="size" type="primary" @click="handleFilterColumns">{{ $t('action.confirm')
                    }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>

const props = defineProps({
    columns: {
        type: Array,
        default: []
    },
    size: {
        type: String,
        default: 'mini'
    }
})

const emits = defineEmits(['handleFilterColumns'])

const selections = ref([])
const dialogVisible = ref(false)

const selectionChange = (selectionsVal) => {
    selections.value = selectionsVal
}
const setDialogVisible = visible => {
    dialogVisible.value = visible
}
const handleFilterColumns = () => {
    let filterColumns = []
    for (let i = 0; i < props.columns.length; i++) {
        let column = props.columns.value[i]
        if (hasColumn(column)) {
            filterColumns.push(column)
        }
    }
    emits('handleFilterColumns', {
        filterColumns: JSON.parse(JSON.stringify(filterColumns))
    })
}
const hasColumn = column => {
    for (let i = 0; i < selections.value.length; i++) {
        let col = selections.value[i]
        if (column.prop == col.prop) {
            return true
        }
    }
    return false
}

</script>

<style lang="scss" scoped></style>