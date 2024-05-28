const datos = []

async function recuperarDatos () {
    return datos
}

async function guardar (dato) {
    datos.push(dato)
    return dato
}

export {
    recuperarDatos,
    guardar
}