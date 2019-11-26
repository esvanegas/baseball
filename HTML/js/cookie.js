var myCookies = {};

function saveCookies() {
    myCookies["_username"] = document.getElementById("username").value;
    //Start Reuseable Section
    document.cookie = "";
    var expiresAttrib = new Date(Date.now() + 60 * 1000).toString();
    var cookieString = "";
    for (var key in myCookies) {
        cookieString = key + "=" + myCookies[key] + ";" + expiresAttrib + ";";
        document.cookie = cookieString;
    }
    //End Reuseable Section
    document.getElementById("out").innerHTML = document.cookie;
}

function getCookies(name) {
    //Start Reuseable Section
    myCookies = {};
    var kv = document.cookie.split(";");
    for (var id in kv) {
        var cookie = kv[id].split("=");
        myCookies[cookie[0].trim()] = cookie[1];
    }
    return myCookies[name];
}