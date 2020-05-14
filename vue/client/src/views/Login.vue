<template>
  <div>
    <div class="row mt-5">
      <div class="col-6 border p-4">
        <small class="form-text text-muted">Enter to submit</small>
        <div class="form-group row">
          <label for="username" class="col-sm-2 col-form-label">Username</label>
           <div class="col-sm-10">
            <input type="text" class="form-control" id="username" @keyup.enter="login" v-model="username">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data(){
    return {
      username: ""
    }
  },
  methods: {
    login() {
      localStorage.setItem("isloggedin", this.username)
      this.$store.commit("SET_ISLOGGEDIN", this.username);
      this.$router.push("room");
    }
  }
}
</script>
