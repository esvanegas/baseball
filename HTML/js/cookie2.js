
    function createCookie(cookie1,correo){
        var date = new Date();
        var daysToExpire = 5;
        date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
        var email = $('#username');
        document.cookie = cookie1 + "=" + email + "; expires=" + date.toGMTString();
    }
    function accessCookie(cookie1){
        var name = cookie1 + "=";
        var allCookieArray = document.cookie.split(';');
        for(var i=0; i<allCookieArray.length; i++){
            var temp = allCookieArray[i].trim();
            if (temp.indexOf(name)==0){
                return temp.substring(name.length,temp.length);
            }
        }
       return "";
    }
    function checkCookie(){
        var data = accessCookie("cookie1");
        if (data!=""){
            return data; 
        }else{
            return null;
        }
    }

