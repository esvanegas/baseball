function createhide(namecontent) {
    var content = document.getElementById(namecontent);
    if (content.style.display == 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
        if (content == "register_Payment") {
            $("#tablepayment").remove();
        }
    }
}

function createhide2(namecontent, namecontent1) {
    var content = document.getElementById(namecontent);
    if (content.style.display == 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
    var content1 = document.getElementById(namecontent1);
    content1.style.display = 'none';
}