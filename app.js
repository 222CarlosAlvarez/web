// Cambiamos el nombre a miConexion para evitar choques
const URL_PROYECTO = 'https://bkzvyoqdvxahwuakptwf.supabase.co/rest/v1/';
const KEY_ANONIMA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrenZ5b3FkdnhhaHd1YWtwdHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjQxODIsImV4cCI6MjA5MjcwMDE4Mn0.Oi9EE0O0M4s0qorRI1UFJfGYsPOYWz19txMNgze75r8';

const miConexion = supabase.createClient(URL_PROYECTO, KEY_ANONIMA);

async function obtenerTareas() {
    const { data, error } = await miConexion
        .from('tareas')
        .select('*');

    if (error) {
        console.error('Error:', error.message);
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

async function agregarTarea() {
    const input = document.getElementById('taskInput');
    const { error } = await miConexion
        .from('tareas')
        .insert([{ nombre: input.value }]);

    if (error) {
        alert('Error al guardar');
    } else {
        input.value = ''; 
        obtenerTareas();
    }
}

obtenerTareas();