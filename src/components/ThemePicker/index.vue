<template>
    <el-color-picker class="theme-picker" popper-class="theme-picker-dropdown" v-model="theme" :size="size">

    </el-color-picker>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { version } from 'element-plus/package.json'
import { ElMessage } from 'element-plus';

const ORIGINAL_THEME = '#409EFF'

const props = defineProps({
    default: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: 'small'
    }
})

const emit = defineEmits(['onThemeChange'])

const chalk = ref('')
const theme = ref(ORIGINAL_THEME)
const showSuccess = ref(true)

onMounted(() => {
    if (props.default != null) {
        theme.value = props.default
        emit('onThemeChange', theme.value)
        showSuccess.value = false
    }
})

watch(theme, (val, oldVal) => {
    if (typeof val !== 'string') return;

    // 替换 CSS 样式，修改主题色
    const themeCluster = getThemeCluster(val.replace('#', ''));
    const originalCluster = getThemeCluster(oldVal.replace('#', ''));

    const getHandler = (variable, id) => {
        return () => {
            const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''));
            const newStyle = updateStyle(chalk.value, originalCluster, themeCluster);

            let styleTag = document.getElementById(id);
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.setAttribute('id', id);
                document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
        };
    };

    const chalkHandler = getHandler('chalk', 'chalk-style');
    if (!chalk.value) {
        const url = `https://unpkg.com/element-plus@latest/lib/theme-chalk/index.css`;
        getCSSString(url, chalkHandler, 'chalk');
    } else {
        chalkHandler();
    }

    const styles = [...document.querySelectorAll('style')]
        .filter(style => {
            const text = style.innerText;
            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
        });

    styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== 'string') return;
        style.innerText = updateStyle(innerText, originalCluster, themeCluster);
    });

    // 响应外部操作
    emit('onThemeChange', val);
    if (showSuccess.value) {
        ElMessage({
            type: 'success',
            message: '换肤成功'
        });
    } else {
        showSuccess.value = true;
    }
})

// functions
const updateStyle = (style, oldCluster, newCluster) => {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
}

const getCSSString = (url, callback, variable) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            chalk.value = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            callback();
        }
    }
    xhr.open('GET', url)
    xhr.send()
}

const getThemeCluster = (theme) => {
    const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
            return [red, green, blue].join(',');
        } else {
            red += Math.round(tint * (255 - red));
            green += Math.round(tint * (255 - green));
            blue += Math.round(tint * (255 - blue));

            red = red.toString(16).padStart(2, '0');
            green = green.toString(16).padStart(2, '0');
            blue = blue.toString(16).padStart(2, '0');

            return `#${red}${green}${blue}`;
        }
    };

    const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16).padStart(2, '0');
        green = green.toString(16).padStart(2, '0');
        blue = blue.toString(16).padStart(2, '0');

        return `#${red}${green}${blue}`;
    };

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
}


</script>

<style lang="scss" scoped>
.theme-picker .el-color-picker__trigger {
    vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
}
</style>