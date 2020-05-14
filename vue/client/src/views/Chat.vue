<template>
  <div class="mt-5 row">
    <div class="col-6 card">
    <div class="card-body">
      <router-link  to="/room"><<|| back to room</router-link>
      <h1 class="card-title">Chat || {{roomName}}</h1>
       <input 
        type="text" 
        class="form-control" 
        placeholder="input message"
        v-model="message"
        @keyup.enter="newChat"
      >
       <small class="form-text text-muted ml-1">Enter to submit message</small>
      <hr>
      <ul>
        <li v-for="(chat, i) in chats" :key="i">{{ chat.message }} by: <b>{{ chat.by }}</b> </li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Chat",
    data() {
      return {
        message: ""
      }
    },
    computed: {
      chats() {
        return this.$store.state.chats
      },
      roomName() {
        return localStorage.roomname
      }
    },
    methods :{
      newChat() {
        console.log("masuk sini")
        this.$store.dispatch("newChat", this.message)
        this.message = ""
      }
    },
    mounted() {
      this.$store.dispatch("joinRoom")
      this.$store.dispatch("listenChat")
    }
  };
</script>