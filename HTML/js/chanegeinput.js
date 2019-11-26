function change(nameinput, data) {
    var input_var = document.getElementById(nameinput);
    console.log(input_var);
    input_var.setAttribute("value", data);
    return input_var;
}