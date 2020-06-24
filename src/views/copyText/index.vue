<template>
    <div>
        <el-button @click.native="copyText">文件复制</el-button>
    </div>
</template>

<script>
    import listMixins from '@/mixins/list'
    export default {
        name: "copyText",
        mixins: [listMixins],
        data(){
            return {}
        },
        mounted() {
            console.log('测试复制文本功能')
            this.load()
        },
        methods: {
            load() {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    // 这个已经在mixins中声明了
                    for (let index = 0; index < 14; index++) {
                        this.list.push({
                            loginName: `admin${index}`,
                            userName: `user${index}`,
                            roleName: `role${index}`,
                            createDate: new Date().getTime(),
                            id: index
                        })
                    }

                    console.log(this.list, 'list')
                }, 2000)
            },
            // 一键复制
            async copyText () {
                let {data: copy} = {
                    data: {
                        officeName: '尚景',
                        appointmentTime: '1592963710223',
                        officeAddress: '北京市朝阳区高碑店',
                    }
                }
                let copyTexts = '女士/先生您好' +
                    '；\r\n已经为您预约了' + (copy.officeName || 'xxxx') + '律师事务所的xxx律师' +
                    '；\r\n预约时间：' + new Date(copy.appointmentTime ? copy.appointmentTime : +new Date()).toLocaleString() +
                    '；\r\n地址：' + (copy.officeAddress || 'xxxxxx') +
                    '；\r\n请务必准时赴约哟，如果有其他什么原因不能准时赴约，请务必提前通知我，协调律师。有任何问题都可以随时联系我电话：182*****，微信：同手机号'
                let text = document.getElementById('copy-area')
                if (!text) {
                    text = document.createElement('textarea')
                    text.id = 'copy-area'
                    // text.style.display = 'none'
                    document.body.appendChild(text)
                }
                text.value = copyTexts
                text.select()
                document.execCommand('Copy')
                document.body.removeChild(text);
                this.success(copyTexts)
            },
            // 提示信息
            success (content) {
                this.$notify({
                    title: '信息已复制!',
                    dangerouslyUseHTMLString: true,
                    message: `<div>${content.replace(/\n/g, '<br/>')}</div>`,
                    duration: 2000
                })
            }
        }
    }
</script>

<style scoped>

</style>