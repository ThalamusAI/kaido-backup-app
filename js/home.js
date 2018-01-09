Kaido.initializeHomePage = function() {
  $('#home-page .login-button').click(function(e) {
    Kaido.showPage('login')
  });

  $('#home-page .register-button').click(function(e) {
    Kaido.showPage('registration')
  });
}
