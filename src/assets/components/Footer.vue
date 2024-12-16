<template>
    <div class="app-container">
      <main>
        </main>
  
      <footer class="bg-dark text-white text-center py-3 fixed-bottom">
        <div class="container">
          <p class="mb-0">
            © 2024 Gestión de Productos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  </template>
  
  <style scoped>

    html {
    overflow: hidden;
  }

  .app-container {
    min-height: 100vh; /* Asegurar que el contenedor principal ocupe al menos la altura de la viewport */
    display: flex;
    flex-direction: column;
  }
  
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  </style>