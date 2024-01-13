$(() => {
    const amenityDict = {};

    // Function to create an article tag representing a Place
    function createArticle(place) {
        return `
            <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="user">
                    <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                </div>
                <div class="description">${place.description}</div>
            </article>
        `;
    }

    // Checkbox click event handling for amenities
    $('input[type=checkbox]').click(() => {
        if ($(this).is(':checked')) {
            amenityDict[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenityDict[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenityDict).join(', '));
    });

    // Check API status and update DIV#api_status class
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    // Send a POST request to get places data
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({}),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Loop through the result and create article tags for each place
            data.forEach((place) => {
                // Remove the Owner tag from the place description
                delete place.owner_id;

                // Create and append the place element to the section.places
                const placeElement = createArticle(place);
                $('section.places').append(placeElement);
            });
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});
