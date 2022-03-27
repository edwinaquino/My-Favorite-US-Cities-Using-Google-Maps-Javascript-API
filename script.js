let sites = [
    {
        city: 'San Francisco',
        state: "CA",
        lat: 37.77509347293365,
        lng: -122.44349524277138
    },
    {
        city: 'Los Angeles',
        state: "CA",
        lat: 25.813738405027095,
        lng: -80.17540284942343
    },
    {
        city: 'Dallas',
        state: "TX",
        lat: 32.812936593741064,
        lng: -96.85617299855772
    },
    {
        city: 'New York',
        state: "NY",
        lat: 40.712763675701666,
        lng: -74.02228835070488
    },
    {
        city: 'San Antonio',
        state: "TX",
        lat: 29.449832772150486,
        lng: -98.49919050927134
    },
    {
        city: 'Chicago',
        state: "Il",
        lat: 41.98642554644886,
        lng: -87.65718794561108
    }
];
// SETTINGS:
/* https://developers.google.com/maps/documentation/javascript/maptypes */
const mapOptions_mapTypeIds = ['roadmap'];
const mapOptions_mapZoom = 4.4; /*1-20 is available - 20=street level */
//const mapOptions_mapCenterCoords = { lat: 39.535681, lng: -96.965892 };
const mapOptions_mapCenterCoords = { lat: 39.535681, lng: -96.965892 };
// initMap() is called from the google api url in the script source
// Its important to have this function created before calling the API 
function initMap() {
    let marker, markerOpions, infowindow;
    const mapOptions = {
        center: mapOptions_mapCenterCoords,
        zoom: mapOptions_mapZoom,
        mapTypeControlOptions: {
            mapTypeIds: mapOptions_mapTypeIds
        }
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    for (const [i, site] of sites.entries()) {
        let markerTitle = `${site.city}, ${site.state}`;
        infowindow = new google.maps.InfoWindow();
        markerOpions = {
            // REQUIRED: location of marker 
            position: new google.maps.LatLng(site.lat, site.lng),
            // use our "map" object from above or use  marker.setMap(map);
            //map: map
            icon: `markers/marker-state.png`,
            title: markerTitle,
            optimized: false, /* set to false to be accessible with click events */
            animation: google.maps.Animation.DROP, /*DROP or BOUONCE |  marker when loaded*/
            map: map
        }
        marker = new google.maps.Marker(markerOpions);
        google.maps.event.addListener(marker, 'click', (
            (marker, i) => () => {
                infowindow.setContent(markerTitle);
                infowindow.open(map, marker)
            }
        )(marker, i));
    }
}
