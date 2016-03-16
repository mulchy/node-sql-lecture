$(document).ready(function() {
  $('form').on('submit', handleSubmit);
  getAllPeople();
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
  getAllPeople();
}

function getAllPeople() {
  $.ajax({
    type: 'GET',
    url: '/people',
    success: updateSelect
  })
}

function updateSelect(serverResponse) {
  console.log(serverResponse);
  $('select').empty();
  serverResponse.forEach(function(person){
    $('select').append('<option>' + person.name + '</option>');
  });
}
