function login() {
    $.ajax
    ({
        type: "POST",
        url: '/api-token-auth/',
        dataType: 'json',
        async: true,
        data: "username="+$('#username').val()+"&password="+$('#password').val(),
        success: function (data) {
          alert('Login success.');
          if(window.sessionStorage) { 
                   sessionStorage.setItem("pyxspace_token", data.token);

                   //js.cookie.js
                   // Cookies.set('pyxspace_token', data.token, { expires : 10 });

                   //jquery.cookie.js
                   $.cookie('pyxspace_token', data.token, { expires: 7, path: '/' , domain: '', secure: true });
                   window.location.replace("/profile");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Login failed!');
      }
    })
}

function logout() {
    $.cookie('pyxspace_token', null);
}

function loadProfile(handleData) {
    //1. js.cookie.js
    //var token = Cookies.get('pyxspace_token');
    //2. sessionStorage
    //var token = sessionStorage.getItem('pyxspace_token')
   
    //jquery.cookie.js
    var token = $.cookie('pyxspace_token');
   
    if(!token){
      window.location.replace("login/");
    }
   
    $.ajax({
      url:"/me/",
      // headers: { 'Authorization': 'jwt ' + sessionStorage.getItem('pyxspace_token') },
      headers: { 'Authorization': "jwt " + token },
      success:function(data) {
        $("#username").text(data.username);
        $("#first_name").text(data.first_name);
        $("#last_name").text(data.last_name);
        $("#email").text(data.email);
        $("#last_login").text(data.last_login);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //$( "#username" ).text('Failed');
        // window.location.replace("login/");
      }
    });
   }