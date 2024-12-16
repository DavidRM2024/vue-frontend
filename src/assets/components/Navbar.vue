<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Gestión de Productos</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <RouterLink to="/register" class="nav-link">Register</RouterLink>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <RouterLink to="/products" class="nav-link">Productos</RouterLink>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    computed: {
      isAuthenticated() {
        return localStorage.getItem("token") !== null;
      },
    },
    methods: {
      logout() {
        axios
          .post("/logout", {}, { headers: this.authHeader() })
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push("/login");
          });
      },
      authHeader() {
        return { Authorization: `Bearer ${localStorage.getItem("token")}` };
      },
    },
  };
  </script>
  