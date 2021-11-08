/* Categoria */
function getCategorias() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            responseCategoria(respuesta);
        }
    });

}

function responseCategoria(respuesta) {
    let tableCategory = $("#ConsultaCategoria");
    let tableHead = $("#thead");
    tableHead += "<td>Categoria</td>";
    tableHead += "<td>Descripción</td>";
    for (i = 0; i < respuesta.length; i++) {
        tableCategory += "<tr>";
        tableCategory += "<td>" + respuesta[i].name + "</td>";
        tableCategory += "<td>" + respuesta[i].description + "</td>";
        tableCategory += "<td> <button onclick=' actualizarInformacionCategorias(" + respuesta[i].id + ")'  class='green' > Editar </button>";
        tableCategory += "<td> <button onclick='borrarCategoria(" + respuesta[i].id + ")' class='red'> Borrar </button>";
        tableCategory += "</tr>";
    }
    $("#ConsultaCategoria").html(tableCategory);
    $("#thead").html(tableHead);
}


function saveCategoria() {
    if ($("#nameCategory").val().length == 0 || $("#categoryDescription").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let itemsCategory = {
            name = $("#nameCategory").val(),
            description = $("#categoryDescription").val()
        };
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(itemsCategory),

            url: "http://129.151.119.43:8080/api/Category/save",

            success: function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });

    }
}