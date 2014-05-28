//put this variable in a closure with a wrapper "decorator" function

var PRC = 0;
//requires boxRequestLoops.js
function getPlacesFromBounds(bounds) {

    PRC += 1;
    service = new google.maps.places.PlacesService(map);

    var googleBounds = [];
    googleBounds = bounds;
    currentIndex = PRC * 10;
    console.log('currentIndex: ' + currentIndex);


    if (currentIndex > googleBounds.length) {
        //calculate the edge
        var edge = googleBounds.length % 10;
        console.log('edge: ' + edge);
        //loop from current index-10 to edge length
        test = currentIndex - 10 + edge;
        console.log('test: ' + test);
        requestLoop(currentIndex, test, googleBounds);
        PRC = 0;

    } else {
        //loop from current index -10 to current index
        test = currentIndex;
        requestLoop(currentIndex, test, googleBounds);
    }
}


function nearbyCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.

    for (var i = 0; i < results.length; i++) {
        // console.log(results.toJSON());
        //console.log('callback results ' + [i] + results[i]);
        //console.log('about to log results details ' + countOfPlaces);
        console.log('name: ' + results[i].name);
        //console.log('id: ' +results[i].id);
        console.log('types: ' + results[i].types);
        console.log('rating: ' + results[i].rating);
        console.log('vicinity: ' + results[i].vicinity);
        //console.log(results[i].URL);
        //console.log(results[i].website);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            var limit = results.length;
            for (var i = 0; i < limit; i += 1) {
                createMarkerNearby(results[i]);

            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }
    }
    //return placesCount;
}

function radarCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.
    console.log(results[0]);
    for (var i = 0; i < results.length; i++) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            //var limit = 20;
            for (var i = 0; i < results.length; i += 1) {
                createMarkerRadar(results[i]);

            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }

    }
    //return placesCount;
}

function createMarkerRadar(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });
} //createMarker
function createMarkerNearby(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });
} //createMarker
