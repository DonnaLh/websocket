<template>
    <div>
        <button @click="sendMessage">发送消息</button>
    </div>
</template>

<script>
    export default {
        name: "socketIo",
        mounted() {
            // this.sockets.listener.subscribe("relogin", (data)=>{
            //     console.log(data)
            // })
        },
        //todo sockets不起作用，暂时不知道原因
        sockets: {
            connect: function () {
                console.log(123)
                console.log('socket connected')
            },
            relogin(data){
                console.log(123, data)
            }
        },
        methods: {
            sendMessage(){
                //发送信息给服务端
                // console.log("发送消息")
                this.$socket.emit('login',{
                    username: 'username',
                    password: 'password'
                });
            }
        }
    }
</script>

<style scoped>

</style>