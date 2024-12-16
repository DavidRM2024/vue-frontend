<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3>Iniciar Sesión</h3>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Email"
        />
        <input
          v-model="password"
          type="password"
          class="form-control mt-2"
          placeholder="Contraseña"
        />
        <button class="btn btn-primary mt-3" @click="login">Iniciar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    login() {
      axios
        .post("/login", { email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          this.$router.push("/products");
        })
        .catch(() => Swal.fire("Error", "Credenciales incorrectas", "error"));
    },
  },
};
</script>


<style scope>
    html {
    overflow: hidden;
  }
</style>