function popup_content(hideOrshow) {
    if (hideOrshow == 'hide') document.getElementById('popup_content_wrap').style.display = "none";
    else document.getElementById('popup_content_wrap').removeAttribute('style');
}
window.onload = function() {
    setTimeout(function() {
        popup_content('show');
    }, 100);
}