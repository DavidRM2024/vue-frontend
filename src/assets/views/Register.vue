<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3>Registrar Usuario</h3>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Nombre"
        />
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
        <button class="btn btn-primary mt-3" @click="registrar">
          Registarse
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { name: "", email: "", password: "" };
  },
  methods: {
    registrar() {
      axios
        .post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push("/login");
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
