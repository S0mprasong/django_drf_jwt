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

        //sessionStorage
        //sessionStorage.setItem("pyxspace_token", data.token);

        //js.cookie.js
        // Cookies.set('pyxspace_token', data.token, { expires : 10 });

        //jquery.cookie.js
        //$.session.set('pyxspace_token_session', data.token);
        $.cookie('pyxspace_token', data.token, { path: '/' , domain: '', secure: false });
        window.location.replace("/profile");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('Login failed!');
    }
  })
}

function logout() {
  $.removeCookie('pyxspace_token', { path: '/' });
 //$.session.clear();
}

function loadProfile(handleData) {
  var token;
  
  //1. js.cookie.js
  //var token = Cookies.get('pyxspace_token');

  //2. sessionStorage
  //var token = sessionStorage.getItem('pyxspace_token')
 
  //3. jquery.cookie.js
  token = $.cookie('pyxspace_token');

  //4. session jQuery
  //token = $.session.get('pyxspace_token_session')

  if(token==null){
    window.location.replace("/login");
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