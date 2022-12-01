function estructuraTabla() {
    return `<table id="tabla" class="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
            </table>`;
}

function formularioAgregarContacto() {
    return `<h3 class="mb-5">Agregar Contacto</h3>
            <div id="formulario">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floating-nombre" name="nombre" required>
                    <label for="floating-nombre">Nombre del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floating-telefono" name="telefono" required>
                    <label for="floating-telefono">Telefono del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floating-correo" name="correo" required>
                    <label for="floating-correo">Correo del contacto</label>
                </div>
                <button type="button" id="enviar" class="btn btn-success">Agregar</button>
            </div>`;
}

function formularioEditarContacto(id, nombre, telefono, correo) {
    return `<h3 class="mb-5">Editar Contacto</h3>
            <div id="formulario">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floating-nombre" name="nombre" value="${nombre}" required>
                    <label for="floating-nombre">Nombre del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floating-telefono" name="telefono" value="${telefono}" required>
                    <label for="floating-telefono">Telefono del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floating-correo" name="correo" value="${correo}" required>
                    <label for="floating-correo">Correo del contacto</label>
                </div>
                <input type="hidden" name="id" value="${id}">
                <div class="d-flex justify-content-evenly my-3">
                    <button type="button" id="cancelar" class="btn btn-danger">Cancelar</button>
                    <button type="button" id="enviar" class="btn btn-success">Editar</button>
                </div>
            </div>`;
}

function getContactos() {
    const URL = 'http://localhost/api/contacts/';
    const API = new XMLHttpRequest();
    API.open('GET', URL, true);
    API.send();
    API.onreadystatechange = function() {
        if( this.status == 202 && this.readyState == 4 ) {
            let contactos = JSON.parse(
                this.responseText
            );
            document.querySelector('#estructuraTabla').innerHTML = estructuraTabla();
            // Agregar contactos a la tabla
            let cuerpoTabla = document.querySelector('#cuerpoTabla');
            cuerpoTabla.innerHTML = '';
            if (contactos.data.contacts === null) {
                $(document).ready( function () {
                    $('#tabla').DataTable();
                } );
                return;
            }
            // Ciclo para crear el HTML
            contactos.data.contacts.forEach(element => {
                cuerpoTabla.innerHTML += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.phone}</td>
                    <td>${element.email}</td>
                    <td>
                        <div class="d-flex justify-content-evenly">
                            <button type="button" id="btnEdit${element.id}" class="btn btn-info">
                                <i class="fa fa-pencil" aria-hidden="true"> Editar</i>
                            </button>
                            <button type="button" id="btnDelete${element.id}" class="btn btn-danger">
                                <i class="fa fa-trash" aria-hidden="true"> Eliminar</i>
                            </button>
                        </div>
                    </td>
                </tr>
                `;
            });
            // Ciclo para agregar la interacción de los botones
            contactos.data.contacts.forEach(element => {
                // Botón editar
                document.querySelector(`#btnEdit${element.id}`).addEventListener('click', function() {
                    let vistaFormulario = document.querySelector("#vistaFormulario");
                    // Mostrar formulario de editar
                    vistaFormulario.innerHTML = formularioEditarContacto(element.id, element.name, element.phone, element.email);
                    // Interaccion del formulario de editar
                    vistaFormulario.querySelector("#cancelar").addEventListener('click', function() {
                        // Cambiar formulario a agregar
                        vistaFormularioAgregarContacto();
                    });
                    vistaFormulario.querySelector("#enviar").addEventListener('click', function() {
                        let inputId       = document.getElementsByName("id")[0].value;
                        let inputNombre   = document.getElementsByName("nombre")[0].value;
                        let inputTelefono = document.getElementsByName("telefono")[0].value;
                        let inputCorreo   = document.getElementsByName("correo")[0].value;
                        // Enviar información
                        updateContacto(parseInt(inputId), inputNombre, inputTelefono, inputCorreo);
                    });
                });
                // Botón eliminar
                document.querySelector(`#btnDelete${element.id}`).addEventListener('click', function() {
                    deleteContacto(element.id);
                });
            });
            // DataTables
            $(document).ready( function () {
                $('#tabla').DataTable();
            } );
        }
    }
}

function createContacto(nombre, telefono, correo) {
    const URL = 'http://localhost/api/contacts/';
    const API = new XMLHttpRequest();
    API.open('POST', URL, true);
    API.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    API.send(
        JSON.stringify({
            "name": nombre,
            "phone": telefono,
            "email": correo,
        })
    );
    API.onreadystatechange = function() {
        if( this.status == 201 && this.readyState == 4 ) {
            // Recarga la tabla
            getContactos();
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        } else if( this.status == 500 && this.readyState == 4 ) {
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        }
    }
}

function updateContacto(id, nombre, telefono, correo) {
    const URL = `http://localhost/api/contacts/`;
    const API = new XMLHttpRequest();
    API.open('PUT', URL, true);
    API.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    API.send(
        JSON.stringify({
            "id": id,
            "name": nombre,
            "phone": telefono,
            "email": correo,
        })
    );
    API.onreadystatechange = function() {
        if( this.status == 200 && this.readyState == 4 ) {
            // Recarga la tabla
            getContactos();
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        } else if( this.status == 500 && this.readyState == 4 ) {
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        }
    }
}

function deleteContacto(id) {
    const URL = `http://localhost/api/contacts/${id}`;
    const API = new XMLHttpRequest();
    API.open('DELETE', URL, true);
    API.send();
    API.onreadystatechange = function() {
        if( this.status == 200 && this.readyState == 4 ) {
            // Recarga la tabla
            getContactos();
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        } else if( this.status == 500 && this.readyState == 4 ) {
            alert(
                JSON.parse(
                    this.responseText
                ).message
            );
        }
    }
}

function vistaFormularioAgregarContacto() {
    document.querySelector("#vistaFormulario").innerHTML = formularioAgregarContacto();
    // Agrega interaccion al boton enviar
    document.querySelector('#enviar').addEventListener('click', function(){
        let inputNombre   = document.getElementsByName("nombre")[0].value;
        let inputTelefono = document.getElementsByName("telefono")[0].value;
        let inputCorreo   = document.getElementsByName("correo")[0].value;
        // Enviar información
        createContacto(inputNombre, inputTelefono, inputCorreo);
    });
}

vistaFormularioAgregarContacto();
getContactos();
document.querySelector('#btnActualizar').addEventListener('click', function(){
    getContactos();
});

$(document).ready( function () {
    $('#tabla').DataTable();
} );