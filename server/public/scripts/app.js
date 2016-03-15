$(document).ready(function() {
  $('form').on('submit', handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  var formArray = $('form').serializeArray();

  var formData = {}
  $.each(formArray, function(index, element){
    formData[element.name] = element.value;
  });

  console.log("formData:", formData);
  sendDataToServer(formData);
}

function sendDataToServer(personData) {
  $.ajax({
    type: 'POST',
    url: '/people',
    data: personData,
    success: handleServerResponse
  });
}

function handleServerResponse(response) {
  console.log('Server says: ', response);
}
