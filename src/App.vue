<script setup>
import { RouterView } from "vue-router";
import Navbar from "./assets/components/Navbar.vue";
import Footer from "./assets/components/Footer.vue";
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>


<style scope>
    html {
    overflow: hidden;
  }
</style>