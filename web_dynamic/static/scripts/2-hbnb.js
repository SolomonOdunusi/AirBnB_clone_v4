$(() => {
  const amenityDict = {};

  $('input[type=checkbox]').click(() => {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
});
$.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
  if (textStatus === 'success') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});
