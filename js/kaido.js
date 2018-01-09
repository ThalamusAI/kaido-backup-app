window.Kaido = {}

window.Kaido.authToken = null

Kaido.setAuthToken = function(authToken) {
  localStorage.setItem("authToken", authToken);
  Kaido.authToken = authToken;
  Kaido.initializeLoggedInPages()
}

Kaido.initializeLoggedInPages = function() {
  Kaido.initializeInsightsPage();
}

Kaido.initializeLoggedOutPages = function() {
  Kaido.initializeHomePage();
  Kaido.initializeLoginPage();
  Kaido.initializeRegistrationPage();
}

Kaido.showPage = function(page) {
  $('.lo-page').hide();
  $('.lo-page#' + page + "-page").show()
}
Kaido.initialize = function() {
  var lsAuthToken = localStorage.getItem("authToken")
  if(localStorage.getItem("authToken")) {
    Kaido.authToken = lsAuthToken;
    Kaido.showPage('insights')
    Kaido.initializeLoggedInPages()
  }
  else {
    Kaido.showPage('home')
    Kaido.initializeLoggedOutPages()
  }
}

