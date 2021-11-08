/* Funciones Categoria */
function consultarCategorias() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/all",
        type: 'GET',
        datatype: 'json',
        success: function(respuesta) {
            mostrarRespuestaCategoria(respuesta);
            let $select = $("#selectCategory");
            $.each(respuesta, function(id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    });

}

function mostrarRespuestaCategoria(respuesta) {
    let tableCategory = $("#ConsultaCategoria");
    for (i = 0; i < respuesta.length; i++) {
        tableCategory.append("<tr>");
        tableCategory.append("<td>" + respuesta[i].name + "</td>");
        tableCategory.append("<td>" + respuesta[i].description + "</td>");
        tableCategory.append('<td><button onclick="itemEspecifico(' + respuesta[i].id + ')" class="green">Detalles</button></td>');
        tableCategory.append('<td><button onclick="borrarCategoria(' + respuesta[i].id + ')" class="red">Borrar</button></td>');
        tableCategory.append("</tr>");
    }
}

function insertarCategoria() {
    var category = { name: $("#nameCategory").val(), description: $("#categoryDescription").val() }
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(category),
        url: 'http://129.151.119.43:8080/api/Category/save',
        success: function(response) {
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }

    });
}

function itemEspecifico(idElemento) {

    $.ajax({
        dateType: 'json',
        url: 'http://129.151.119.43:8080/api/Category/' + idElemento,
        type: 'GET',
        contentType: "application/JSON",
        success: function(response) {
            /* console.log(response); */

            $("#idCategory").val(response.id);
            $("#nameCategory").val(response.name);
            $("#categoryDescription").val(response.description);

        },
        error: function(xhr, status) {
            console.log(xhr);

        }
    });
}


function actualizarCategorias(idElemento) {

    let myData = {
        id: $("#idCategory").val(),
        name: $("#nameCategory").val(),
        description: $("#categoryDescription").val()
    };
    let dataToSend = JSON.stringify(myData);
    /* console.log(myData); */
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            $("#idCategory").val();
            $("#nameCategory").val("");
            $("#categoryDescription").val("");
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}


function borrarCategoria(idElemento) {
    let dates = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(dates);
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            alert("Se ha Eliminado.")
        }
    });


}




/* Funciones Bicicletas */

//Manejador GET
function mostrarBikes() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Bike/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            console.log(response);
            respuestaBike(response);
        }

    });

}



function respuestaBike(response) {

    let myTable = "<table>"
    myTable += "<tr>";
    myTable += "<td>Nombre</td>";
    myTable += "<td>Modelo</td>";
    myTable += "<td>año</td>";
    myTable += "<td>Descripcion</td>";
    myTable += "<td>Categoria</td>";
    "</tr>";

    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].brand + "</td>";
        myTable += "<td>" + response[i].year + "</td>";
        myTable += "<td>" + response[i].description + "</td>";
        /* myTable += "<td>" + response[i].category.name + "</td>"; */
        myTable += '<td><button class = "botonBike2" onclick="borrar(' + response[i].id + ')">Borrar Bike!</button></td>';
        myTable += '<td><button class = "botonBike2" onclick="cargarDatosBike(' + response[i].id + ')">Editar Bike!</button></td>';
        myTable += '<td><button class = "botonBike2" onclick="actualizar(' + response[i].id + ')">Actualizar Bike!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#boxBike").html(myTable);
}