<template>
    <div class="van-cell" :class="required ? 'van-cell--required' : ''">
        <div @click="show" class="con-div">
            <div class="label">\{{label}}</div>
            <div style="width: 100%;display: flex; flex-direction: column; align-items: flex-start">
                <div class="text" :class="error ? 'error' : text ? '' : 'placeholder'">
                    \{{ text ? text : placeholder }}
                    <div
                        style="display: inline-flex; vertical-align: middle">

                    </div>
                </div>
                <!-- 自定义错误显示 -->
                <div
                    v-if="$attrs['error-message']"
                    v-text="$attrs['error-message']"
                    class="van-field__error-message"
                />
                <van-icon name="arrow" class="arrow"/>
            </div>
        </div>
        <van-action-sheet
            v-model="isShowPicker"
            safe-area-inset-bottom
            :actions="options"
            cancel-text="取消"
            @select="onSelect">
        </van-action-sheet>
    </div>
</template>

<script>
    export default {
        name: 'VantSelect',
        // inheritAttrs: false, // https://cn.vuejs.org/v2/api/#inheritAttrs
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: [Number, String],
                default: undefined // 值不能是 null，DatePicker会报错
            },
            // 包含name和value字段的对象数组
            options: {
                type: Array,
                default: function () {
                    return [];
                },
                validator: function (val) {
                    let valid = true;
                    for (let i = 0; i < val.length; i++) {
                        if (!val[i].hasOwnProperty('name') || !val[i].hasOwnProperty('value')) {
                            console.error('[Vue warn]: Invalid prop: custom validator check failed for prop "options". Item in "options" should contain name and value field.');
                            break;
                        }
                    }
                    return valid;
                }
            },
            // Cell 显示的文字
            label: {
                type: String,
                default: null
            },
            // 必填的星号
            required: {
                type: Boolean,
                default: false
            },
            error: {
                type: Boolean,
                default: false
            },
            // 只读状态
            readonly: {
                type: Boolean,
                default: false
            },
            // 占位提示文字
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 展示的格式化
            format: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                selectedItem: null,
                isShowPicker: false
            }
        },
        computed: {
            // 展示的格式化，时间提交的值是Date类型数据
            formatValue() {
                try {
                    return this.options.filter(d => d.value == this.value)[0].name;
                } catch (e) {
                    return '';
                }
            },
            text() {
                return this.value ? this.formatValue : "";
            }
        },
        methods: {
            onSelect(val) {
                this.$emit('change', val.value);
                this.cancel();
            },
            show() {
                if (!this.readonly) {
                    this.isShowPicker = true
                }
            },
            // 隐藏弹框
            cancel() {
                this.isShowPicker = false
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .con-div
        display: flex;
        justify-content: space-between;
        width 100%
    .error
        color #f44
    .text
        font-size 15px
        color #5A5A5A
    .placeholder
        color #ACB3BF
    .label
        height: 50px;
        line-height: 50px;
        min-width 75px
        font-size 15px
        color #272727
    .arrow
        position absolute
        right 15px
        top 17px
        font-size 18px
    >>>.van-cell__value
        color #5A5A5A
        font-size .14rem
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height .21rem
    .van-cell {
        height: 50px !important;
        line-height: 50px !important;
        width: auto !important;
        margin-left: 15px !important;
        padding: 0 15px 0 0 !important;
    }
</style>
