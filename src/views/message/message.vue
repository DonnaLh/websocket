<template>
    <div class="message-wrapper">
<!--        通信列表-->
        <div class="user-list">
            <div class="login-user">
                <span>当前用户：{{myname.username}}</span>
            </div>
            <div class="list-item">
                <div class="user-item" v-for="(user, index) in userlist" :key="index">
                    <img  :src="getImage(user.img)">
                    {{user.username}}
                </div>
            </div>
        </div>
<!--        对话框-->
        <div class="user-info">
            <div class="textwrapper">
                <div v-for="(item, index) in msgList" :key="index" ref="msgWrap">
                    <div v-if="item.type === 'join'" class="system-msg">{{item.username+item.time}}加入了群聊</div>
                    <div v-if="item.type === 'leave'" class="system-msg">{{item.username+item.time}}离开了群聊</div>
                    <div v-if="item.type === 'msg'">
                        <div class="my-msg" v-if="myname.username === item.username">
                            <span v-if="item.msgType === 'text'" class="msg-text">{{item.msg}}</span>
                            <img v-else :src="item.msg">
                            <img class="avator" :src="getImage(item.img)"/>
                        </div>
                        <div class="other-msg" v-else>
                            <img class="avator"  :src="getImage(item.img)"/>
                            <span class="msg-text" v-if="item.msgType === 'text'">{{item.msg}}</span>
                            <img v-else :src="item.msg">
                        </div>
                    </div>
                </div>
            </div>
            <div class="send-wrapper">
                <div class="send-util">
                    <label for="uploadFile" class="file-label">
                        <input
                                ref="file"
                                type="file"
                                @change="uploadFile"
                                id="uploadFile"
                                accept="image/*"
                                class="upload-file"/>
                    </label>
                </div>
                <input v-model="info" @keyup.enter="sendMsg" class="input-msg" />

<!--                <img :src="imgUrl"/>-->
                <el-button class="send-btn" @click.native="sendMsg">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "message",
        data(){
            return {
                info: '',
                imgUrl: ''
            }
        },
        sockets: {
            userList(){
                console.log(123)
            },
            connection() {
                console.log("建立连接 ");
            },
        },
        computed: {
            ...mapGetters(['msgList', 'myname', 'userlist'])
        },
        watch: {
            msgList: {
                handler(newVal){
                    if(this.$refs.msgWrap){
                        const len = this.$refs.msgWrap.length - 1
                        if(newVal[len].type === 'msg'){
                            let oParents = this.$refs.msgWrap[len]
                            console.log(oParents, 123)
                        } else {
                            this.$refs.msgWrap[len].scrollIntoView(false)
                        }


                    }
                },
                deep: true
            }
        },
        mounted() {

            this.sockets.listener.subscribe("userList", (data)=>{
                this.$store.commit('USER_LIST', data)
            })

            this.sockets.listener.subscribe("msg", (data)=>{
                let arr = this.msgList
                arr.push(data)
                this.$store.commit('MSG_LIST', arr)
            })

        },
        //
        methods: {
            sendMsg(){
                this.$socket.emit('msg',{
                    msg: this.info
                });
                this.info = ''
            },
            uploadFile(){
                const files = this.$refs.file.files;
                const file = files[0]
                // 读取文件
                if(file){
                    const fr = new FileReader()
                    fr.readAsDataURL(file)
                    fr.onload = ()=>{
                        this.$socket.emit("file", {
                            url: fr.result
                        })
                    }
                }

            },
            getImage(img){
                return require(`../../assets/imgs/${img}.png`)
            }
        }
    }
</script>

<style lang="scss">
    .textwrapper{
        &::-webkit-scrollbar {
            width: 4px;
            height: 8px;
            background-color: #323232;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: #353a50;
        }

        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            -webkit-box-shadow: inset 0 0 6px rgba(18, 31, 63, 1);
            background-color: #323232;
        }
    }
</style>
<style scoped lang="scss">
    .message-wrapper{
        width: 60%;
        min-width: 600px;
        display: flex;
        height: 500px;
        margin: 100px auto;
        border: 1px solid #cccccc;

        .user-list{
            width: 30%;
            border-right:1px solid #cccccc;
            text-align: left;
            .login-user{
                border-bottom: 1px solid #cccccc;
                padding: 10px;
            }
            .list-item{
                padding-left: 10px;
                box-sizing: border-box;
                .user-item{
                    margin: 8px 0;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
            }
        }
        .user-info{
            width: 70%;
            .textwrapper{
                width: 100%;
                height: 400px;
                border: 1px solid #cccccc;
                box-sizing: border-box;
                overflow-y: auto;
                font-size: 14px;
                .system-msg{
                    font-size: 13px;
                    color: #cccfcc;
                    margin: 8px;
                }
                .my-msg{
                    text-align: right;
                    .msg-text{
                        background: greenyellow;
                    }
                }
                .other-msg{
                    text-align: left;
                    .msg-text{
                        background: #ffffff;
                        border: 1px solid #ccc;
                    }
                }
                .msg-text{
                    display: inline-block;
                    max-width: 60%;
                    white-space:normal;
                    padding: 4px 10px;
                    border-radius: 4px;
                }
                img{
                    height: 40px;
                    vertical-align: middle;
                }
                .avator{
                    width: 40px;
                    border-radius: 50%;
                    margin: 8px;
                }
            }
            .input-msg{
                width: 100%;
                height: 60px;
                border: none;
                box-sizing: border-box;
                outline: none;
            }
            .send-wrapper{
                width: 100%;
                /*display: flex;*/
                position: relative;
                height: 100px;
                .send-util{
                    position: relative;
                    width: 100%;
                    height: 30px;
                    text-align: left;
                    .file-label{
                        width: 60px;
                        height: 30px;
                        border-radius: 10px;
                        border: 1px solid #ccc;
                    }
                }
                .upload-file{
                    opacity: 0;
                    width: 60px;
                    height: 30px;
                    margin-left: 10px;
                }
                .send-btn{
                    position: absolute;
                    right: 6px;
                    bottom: 6px;
                }
            }
        }
    }
</style>