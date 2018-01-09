Kaido.initializeLoginPage = function() {
  $('form#login-form').submit(function(e) {
    e.preventDefault()

    var onRegistrationSuccess = function(data, status, xhr){
      Kaido.setAuthToken(xhr.getResponseHeader('Authorization'));
      $('#section-2').show()
      $('#section-1').hide()
    };

    $.post("https://platform.kaido.hosting/v1/accounts",
      {
        "account": {
          "email": $('#form-email').val(),
          "password": $('#form-password').val(),
          "first_name": $('#form-first-name').val(),
          "last_name": $('#form-last-name').val(),
          "sex": "female"
        }
      },
      onRegistrationSuccess,
      'json'
    );
    return false;
  })
}

