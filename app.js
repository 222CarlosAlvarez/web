// 1. Usamos un nombre diferente para que no choque con la librería
const URL_PROYECTO = 'https://bkzvyoqdvxahwuakptwf.supabase.co/rest/v1/';
const KEY_ANONIMA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrenZ5b3FkdnhhaHd1YWtwdHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjQxODIsImV4cCI6MjA5MjcwMDE4Mn0.Oi9EE0O0M4s0qorRI1UFJfGYsPOYWz19txMNgze75r8';

const supabaseClient = supabase.createClient(URL_PROYECTO, KEY_ANONIMA);

// 2. Función para obtener tareas
async function obtenerTareas() {
    const { data, error } = await supabaseClient
        .from('tareas')
        .select('*');

    if (error) {
        console.error('Error al leer:', error.message);
    } else {
        const lista = document.getElementById('listaTareas');
        lista.innerHTML = ''; 
        data.forEach(tarea => {
            const li = document.createElement('li');
            li.textContent = tarea.nombre;
            lista.appendChild(li);
        });
    }
}

// 3. Función para agregar tareas
async function agregarTarea() {
    const input = document.getElementById('taskInput');
    const nombreTarea = input.value;

    if (!nombreTarea) return;

    const { error } = await supabaseClient
        .from('tareas')
        .insert([{ nombre: nombreTarea }]);

    if (error) {
        console.error('Error al insertar:', error.message);
        alert('Hubo un error al guardar');
    } else {
        input.value = ''; 
        obtenerTareas(); // Recargar la lista
    }
}

// Ejecutar al cargar la página
obtenerTareas();