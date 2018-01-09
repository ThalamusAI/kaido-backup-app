Kaido.initializeRegistrationPage = function() {
  $('form#registration-form').submit(function(e) {
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

  var showUnits = function() {
    $.ajax({
      type:"GET",
      url:"https://platform.kaido.hosting/v1/account/company/units",
      dataType: "json",
      headers:{ 'Authorization':Kaido.authToken },
      success: function(data) {
        var optionsAsString = "";
        for(var i = 0; i < data.length; i++) {
          optionsAsString += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
        }
        $('#form-unit').append( optionsAsString );
        $('#section-3').show()
        $('#section-2').hide()
      }
    })
  }

  $('form#company-lookup-form').submit(function(e) {
    e.preventDefault()

    var onCompanyLookupSuccess = function(data, status, xhr){
      $.ajax({
        type:"POST",
        url:"https://platform.kaido.hosting/v1/account/company_membership",
        dataType: "json",
        data: {"company_code": $('#form-company-code').val()},
        headers:{ 'Authorization':Kaido.authToken },
        success: showUnits
      });

      $('.company-name').html(data.name);
    }

    $.ajax({
      type:"GET",
      url:"https://platform.kaido.hosting/v1/companies/from_code",
      dataType: "json",
      data: {"code": $('#form-company-code').val()},
      headers:{ 'Authorization':Kaido.authToken },
      success: onCompanyLookupSuccess
    })
    return false;
  })

  $('form#unit-form').submit(function(e) {
    e.preventDefault()

    onUnitUpdateSucess = function() {
      $('#section-4').show()
      $('#section-3').hide()
    }

    $.ajax({
      type:"POST",
      url:"https://platform.kaido.hosting/v1/account/unit_membership",
      dataType: "json",
      data: {"unit_id": $('#form-unit').val()},
      headers:{ 'Authorization':Kaido.authToken },
      success: onUnitUpdateSucess
    });
  })

}
