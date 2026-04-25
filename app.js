// CONFIGURACIÓN: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = 'https://bkzvyoqdvxahwuakptwf.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrenZ5b3FkdnhhaHd1YWtwdHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjQxODIsImV4cCI6MjA5MjcwMDE4Mn0.Oi9EE0O0M4s0qorRI1UFJfGYsPOYWz19txMNgze75r8';

// Usamos 'supabase.createClient' pero lo guardamos en 'db'
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Ahora, en todas tus funciones, cambia 'supabase' por 'db'
async function obtenerTareas() {
    const { data, error } = await db // <--- antes decía supabase
        .from('tareas')
        .select('*');
    // ... resto del código igual
}

async function agregarTarea() {
    const input = document.getElementById('taskInput');
    const nombreTarea = input.value;

    const { error } = await db // <--- antes decía supabase
        .from('tareas')
        .insert([{ nombre: nombreTarea }]);
    // ... resto del código igual
}

// Cargar tareas al iniciar la página
obtenerTareas();