function status_change(namecheck) {
    console.log("entro");
    var checkbox = document.getElementById(namecheck);
    if (checkbox.checked) {
        alert("El entrenador a sido seleccionado");
        return 0;
    }
}

function status_change1(namecheck, data) {
    console.log("entro");
    var checkbox = document.getElementById(namecheck);
    if (checkbox.checked) {
        alert("El entrenador a sido seleccionado");
        return data;
    }
}