<template>
    <div>

    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            {
                key: "1",
                avatar: '@/assets/user.png',
                content: '你修改了用户密码',
                sender: '诸葛亮',
                time: '5分钟前'
            },
            {
                key: "2",
                avatar: '@/assets/user.png',
                content: '你修改了用户头像',
                sender: '武则天',
                time: '2小时前'
            },
            {
                key: "3",
                avatar: '@/assets/user.png',
                content: '今日25名新成员加入',
                sender: '王语嫣',
                time: '昨天'
            },
            {
                key: "4",
                avatar: '@/assets/user.png',
                content: '您发表了一篇新随笔',
                sender: '刘备',
                time: '昨天'
            },
            {
                key: "5",
                avatar: '@/assets/user.png',
                content: '您发表了一篇新随笔',
                sender: '上官婉儿',
                time: '前天'
            }]
    }
})

const emit = defineEmits(['click'])

function handleClick() {
    emit('click', {})
}

</script>

<style lang="scss" scoped></style>