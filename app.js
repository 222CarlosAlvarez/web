// CONFIGURACIÓN: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = 'https://bkzvyoqdvxahwuakptwf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrenZ5b3FkdnhhaHd1YWtwdHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjQxODIsImV4cCI6MjA5MjcwMDE4Mn0.Oi9EE0O0M4s0qorRI1UFJfGYsPOYWz19txMNgze75r8';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. Función para obtener y mostrar tareas (READ)
async function obtenerTareas() {
    const { data, error } = await supabase
        .from('tareas')
        .select('*');

    if (error) {
        console.error('Error al obtener datos:', error);
    } else {
        const lista = document.getElementById('listaTareas');
        lista.innerHTML = ''; // Limpiar lista
        data.forEach(tarea => {
            const li = document.createElement('li');
            li.textContent = tarea.nombre;
            lista.appendChild(li);
        });
    }
}

// 2. Función para insertar una nueva tarea (CREATE)
async function agregarTarea() {
    const input = document.getElementById('taskInput');
    const nombreTarea = input.value;

    if (!nombreTarea) return;

    const { error } = await supabase
        .from('tareas')
        .insert([{ nombre: nombreTarea }]);

    if (error) {
        alert('Error al insertar');
    } else {
        input.value = ''; // Limpiar input
        obtenerTareas();  // Refrescar lista
    }
}

// Cargar tareas al iniciar la página
obtenerTareas();