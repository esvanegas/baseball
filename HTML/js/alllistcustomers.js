function agregarFila() {
    console.log('5555')
    var contendor = $("#tbody").html();
    var nuevaFila = '<tr>';
    nuevaFila = '<td>"el contenido de la celda"</td>';
    nuevaFila += '<td>"el contenido de la celda"</td>';
    nuevaFila += '<td>"el contenido de la celda"</td>';
    nuevaFila += '<td>"el contenido de la celda"</td>';
    nuevaFila += '<td>"el contenido de la celda"</td>';
    nuevaFila = '</tr>';

    ('entro poner el tabla2222');
    $("#tbody").html(contendor + nuevaFila);

}