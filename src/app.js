/*function initMap() {
      let map = new google.maps.Map(document.getElementById('content-map'), {
         center: {lat: -34.397, lng: 150.644},
         zoom: 8
       });
}*/
google.maps.event.addDomListener(window, "load", function () {
    //function initMap()
    const ubicacion = new Localizacion(() => {
        const myLatLong = { lat: ubicacion.latitude, lng: ubicacion.longitude }
        //const text = `<h1>Nombre lugar</h1><p>description</p><a href="https://google.com">Pagina web</a>`
        const options = {
            center: myLatLong,
            zoom: 16,
            types: ['restaurant']
        }
        let mapa = new google.maps.Map(document.getElementById('content-map'), options);
        const marcador = new google.maps.Marker({
            position: myLatLong,
            map: mapa,
            //title: 'Hola Aqui me encuentro'
        });
        const windowInformation = new google.maps.InfoWindow({
            //content: text
        });
        marcador.addListener('click', () => {
            windowInformation.open(mapa, marcador);
        })
        const autocomplete = document.getElementById('autocomplete');
       
        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo('bounds', mapa);

        search.addListener('place_changed', function () {
            windowInformation.close();
            marcador.setVisible(false);

            const place = search.getPlace();

            if (!place.geometry.viewport) {
                alert("Error");
                return;
            }
            if (place.geometry.viewport) {
                mapa.fitBounds(place.geometry.viewport);
            } else {
                mapa.setCenter(place.geometry.location);
                mapa.setZoom(18);
                //search();
            }

            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            let address = "";
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || ''),
                ];
            }

            windowInformation.setContent('<div><strong>' + place.name + '</strong></div>' + address);
            windowInformation.open(map, marcador);
        });
    });

})