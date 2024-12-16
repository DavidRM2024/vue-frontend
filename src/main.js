import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar DataTables
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net';

// Importar jQuery
import $ from "jquery";
window.$ = window.jQuery = $;

import Swal from 'sweetalert2';
window.Swal = Swal;

import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
window.axios = axios;


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
