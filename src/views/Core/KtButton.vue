<template>
    <el-buttton :size="size" :type="type" :loading="loading" :disabled="!hasPerms(perms)" :icon="icon" @click="handleClick">
        {{ label }}
    </el-buttton>
</template>

<script setup>
import { hasPermisson } from '@/permission';

const emit = defineEmits(['click'])

const props = defineProps({
    label: {
        type: String,
        default: 'Button'
    },
    icon: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'mini'
    },
    type: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    perms: {
        type: String,
        default: null
    }
})

const handleClick = () => {
    emit('click')
}

const hasPerms = (perms) => {
    return hasPermisson(perms) && !props.disabled
}

</script>

<style lang="scss" scoped>

</style>