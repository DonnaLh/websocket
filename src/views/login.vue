<template>
    <div class="login">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item prop="name" label="用户名">
                <el-input @keyup.enter="onSubmit" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "login",
        data(){
            return {
                form: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                    ]
                }

            }
        },
        computed: {
            ...mapGetters(['userlist', 'msgList'])
        },
        methods: {
            onSubmit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$socket.emit('login',{
                            username: this.form.name
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.sockets.listener.subscribe("updateMsgList", (data)=>{
                this.$store.commit('MSG_LIST', [...this.msgList, data])
            })
            this.sockets.listener.subscribe("loginSucess", ()=>{
                this.$router.push('/message')
            })
            this.sockets.listener.subscribe("loginError", ()=>{
                console.log('登录失败')
            })
            this.sockets.listener.subscribe("userList", (data)=>{
                this.$store.commit('USER_LIST', data)
            })
            this.sockets.listener.subscribe("sendUserName", (data)=>{
                this.$store.commit('MY_NAME', {
                    username: data.username,
                    img: data.img
                })
            })
        }
    }
</script>

<style scoped lang="scss">
    .login{
        width: 400px;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 200px auto;
    }
</style>