<template>
  <div class="mt-4">
    <h1>List room</h1>
    <button class="btn btn-sm btn-info mb-3" @click="addRoom">add room</button>
    <small class="form-text text-muted">refresh dulu klow room g keliatan</small>
    <div class="row">
      <div v-for="room in rooms" class="col-3 card m-2">
        <div class="card-body">
          <h5 class="card-title">{{room.name}}</h5>
          <button 
            class="btn btn-primary btn-sm btn-block mt-2"
            @click="joinRoom(room)"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: "Room",
 computed: {
  rooms() {
    return this.$store.state.rooms
  }
 },
 methods: {
  joinRoom(room) {
    console.log(room)
    localStorage.setItem("roomid", room.id)
    localStorage.setItem("roomname", room.name)
    this.$router.push("/chat")
  },
  addRoom() {
      let room = prompt("Please enter name room:", " ");
      if(!!room) {
        this.$store.dispatch("newRoom", room)
      }
    },
    refresh() {
      this.$store.dispatch("refreshRoom")
    }
  },

  mounted() {
    console.log("kepanggil")
    this.$store.dispatch("refreshRoom")
    this.$store.dispatch("listenRoom")
  }
};
</script>
