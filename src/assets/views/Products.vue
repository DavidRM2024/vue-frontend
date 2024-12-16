<script setup>
import { ref, onMounted, nextTick } from "vue";
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net";

// Estados reactivos
const products = ref([]);
const categories = ref([]);
const providers = ref([]);
const isEditing = ref(false);
const editedProductId = ref(null);
const isLoading = ref(true);
let dataTable = null;

// Estado del formulario
const productForm = ref({
  nombre: "",
  precio: "",
  stock: "",
  categoria_id: "",
  proveedor_id: "",
});

// Función para obtener el token del localStorage
const authHeader = () => {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
};

// Función para inicializar o reconstruir DataTable
const reloadDataTable = () => {
  nextTick(() => {
    if (dataTable) dataTable.destroy();
    dataTable = $("#productsTable").DataTable();
    isLoading.value = false;
  });
};

// Función para obtener productos
const fetchProducts = () => {
  isLoading.value = true;
  axios
    .get("/productos", { headers: authHeader() })
    .then((response) => {
      if (response.data.success) {
        products.value = response.data.data;
        reloadDataTable();
      }
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
      isLoading.value = false;
    });
};

// Función para obtener categorías
const fetchCategories = () => {
  axios
    .get("/categorias", { headers: authHeader() })
    .then((response) => {
      categories.value = response.data.data;
    })
    .catch((error) => console.error("Error al obtener categorías:", error));
};

// Función para obtener proveedores
const fetchProviders = () => {
  axios
    .get("/proveedores", { headers: authHeader() })
    .then((response) => {
      providers.value = response.data.data;
    })
    .catch((error) => console.error("Error al obtener proveedores:", error));
};

// Función para limpiar el formulario
const resetForm = () => {
  productForm.value = {
    nombre: "",
    precio: "",
    stock: "",
    categoria_id: "",
    proveedor_id: "",
  };
  isEditing.value = false;
  editedProductId.value = null;
};

// Función para agregar o editar un producto
const saveProduct = () => {
  const headers = { headers: authHeader() };

  if (isEditing.value) {
    axios
      .put(`/productos/${editedProductId.value}`, productForm.value, headers)
      .then(() => {
        Swal.fire("Éxito", "Producto actualizado correctamente", "success");
        resetForm();
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error al actualizar producto:", error);
        Swal.fire("Error", "No se pudo actualizar el producto", "error");
      });
  } else {
    axios
      .post("/productos", productForm.value, headers)
      .then(() => {
        Swal.fire("Éxito", "Producto agregado correctamente", "success");
        resetForm();
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
        Swal.fire("Error", "No se pudo agregar el producto", "error");
      });
  }
};

// Cargar un producto para editar
const loadProductForEdit = (product) => {
  productForm.value = { ...product };
  isEditing.value = true;
  editedProductId.value = product.id;
};

// Función para eliminar un producto
const deleteProduct = (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`/productos/${id}`, { headers: authHeader() })
        .then(() => {
          Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
          fetchProducts();
        })
        .catch((error) => {
          console.error("Error al eliminar producto:", error);
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        });
    }
  });
};

// Cargar datos iniciales
onMounted(() => {
  fetchProducts();
  fetchCategories();
  fetchProviders();
});
</script>


<template>
    <div class="container mt-4">
      <h1>Gestión de Productos</h1>
  
      <!-- Formulario para agregar/editar producto -->
      <div class="mb-4">
        <h5>{{ isEditing ? "Editar Producto" : "Agregar Producto" }}</h5>
        <input v-model="productForm.nombre" placeholder="Nombre" class="form-control" />
        <input v-model="productForm.precio" placeholder="Precio" class="form-control mt-2" />
        <input v-model="productForm.stock" placeholder="Stock" class="form-control mt-2" />
        
        <select v-model="productForm.categoria_id" class="form-control mt-2">
          <option disabled value="">Seleccione una categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.nombre }}
          </option>
        </select>
        
        <select v-model="productForm.proveedor_id" class="form-control mt-2">
          <option disabled value="">Seleccione un proveedor</option>
          <option v-for="provider in providers" :key="provider.id" :value="provider.id">
            {{ provider.nombre }}
          </option>
        </select>
  
        <button class="btn btn-success mt-2" @click="saveProduct">
          {{ isEditing ? "Actualizar" : "Agregar" }}
        </button>
        <button v-if="isEditing" class="btn btn-secondary mt-2 ms-2" @click="resetForm">
          Cancelar
        </button>
      </div>
  
      <!-- Tabla con productos -->
      <div v-if="isLoading" class="text-center">
        <p>Cargando...</p>
      </div>
  
      <table id="productsTable" class="display text-center" v-show="!isLoading">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.nombre }}</td>
            <td>{{ product.precio }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ categories.find(c => c.id === product.categoria_id)?.nombre || 'N/A' }}</td>
            <td>{{ providers.find(p => p.id === product.proveedor_id)?.nombre || 'N/A' }}</td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="loadProductForEdit(product)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

<style scoped>
    html {
    overflow: hidden;
  }
table {
  margin-top: 20px;
}

table th, table td {
  text-align: center;
  vertical-align: middle;
}
</style>

