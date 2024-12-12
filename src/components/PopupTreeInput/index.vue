<template>
    <div>
        <el-popover trigger="click" :placement="placemnet">
            <el-tree :data="data" :props="props.props" node-key="nodeKey" @current-change="currentChangeHandle" :default-expand-all="defaultExpandAll" :highlight-current="true" :expand-on-click-node="true">
            </el-tree>
            <template #reference>
                <el-input v-model="props.prop" :readonly="true" :placeholder="placeholder" style="cursor:pointer;">
                </el-input>
            </template>
        </el-popover>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    props: {
        type: Object,
        default: {}
    },
    prop: {
        type: String,
        default: ''
    },
    nodeKey: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '点击选择内容'
    },
    placemnet: {
        type: String,
        defualt: 'right-start'
    },
    defaultExpandAll: {
        type: Boolean,
        default: false
    },
    currentChangeHandle: {
        type: Function,
        default: null
    }
})

</script>

<style lang="scss" scoped></style>