$(document).ready(function(){
    if(sessionStorage.getItem("mapData") == null){
        jQuery.ajax({ 
            type: 'GET', 
            url: 'https://www.motorien.es/apiDealers.php/', 
            dataType: 'json',
            data : {
                // Critical filter
                website : 'voge',
            }, 
            success: function (data) {
                
                //Saves the JSON on Storage
                var dataContent = JSON.stringify(data)
                sessionStorage.setItem("mapData", dataContent);

            }
        });
    }    
    if(window.location.pathname == '/puntos-de-venta/') {    
        if(sessionStorage.getItem("mapData") == null){
            // Get data from url JSON
            jQuery.ajax({ 
            type: 'GET', 
            url: 'https://www.motorien.es/apiDealers.php/', 
            dataType: 'json',
            data : {
                // Critical filter
                website : 'voge',
            }, 
            success: function (data) {
                
                //Saves the JSON on Storage
                var dataContent = JSON.stringify(data)
                sessionStorage.setItem("mapData", dataContent);
                // Get data from url JSON          
                var retrievedData = JSON.parse(sessionStorage.getItem("mapData"));
                // Sort array by name
                retrievedData.sort(SortByDate);    
                // console.log(retrievedData);             
                // Create dealers list
                createList(retrievedData);
                // Init google map    
                initMap(retrievedData, new google.maps.LatLng(40.4167754, -3.7037901999999576), 6);          
            }
        });
        }
        else if(sessionStorage.getItem("mapData") != null){
            // Get data from url JSON          
            var retrievedData = JSON.parse(sessionStorage.getItem("mapData"));
            // Sort array by name
            retrievedData.sort(SortByDate);    
            // console.log(retrievedData);             
            // Create dealers list
            createList(retrievedData);
            // Init google map    
            initMap(retrievedData, new google.maps.LatLng(40.4167754, -3.7037901999999576), 6);
        }  
    }        
});

function createList(data){
    var listcont = $('.srp-dealerlist');  
    for (var i = 0; i < data.length; i++) {
        listcont.append('<li class="srp-dealeritem" data-title="'+ data[i].title +'" data-item="'+ data[i].id +'"><div><div class="dealerimg"></div><div class="dealerinfo"></div></div></li>');
        var lastli = $('.srp-dealeritem:last-child');
        if(data[i].thumb != "") lastli.find('.dealerimg').append('<figure><img src="'+ data[i].thumb[0] +'"></figure>');
        if(data[i].title != "") lastli.find('.dealerinfo').append('<h3 class="dealername">'+ data[i].title +'</h3>');
        if(data[i].direccion.address != "") lastli.find('.dealerinfo').append('<p class="datainfo address">'+ data[i].direccion.address +'</p>');
        if(data[i].telfijo != "") lastli.find('.dealerinfo').append('<p class="datainfo telf">TF. '+ data[i].telfijo +'</p>');
        if(data[i].telmovil != "") lastli.find('.dealerinfo').append('<p class="datainfo telm">TM. '+ data[i].telmovil +'</p>');
        if(data[i].fax != "") lastli.find('.dealerinfo').append('<p class="datainfo fax">F. '+ data[i].fax +'</p>');
        if(data[i].email != "") lastli.find('.dealerinfo').append('<p class="datainfo email"><a target="_blank" href="mailto:'+ data[i].email +'">'+ data[i].email +'</a></p>');
        if(data[i].website != "") lastli.find('.dealerinfo').append('<p class="datainfo website"><a target="_blank" href="'+ data[i].website.url +'">Ir a la web</a></p>');  
        if(data[i].direccion.lat != "") lastli.find('.dealerinfo').append('<p class="dealerlat" style="display: none;">'+ data[i].direccion.lat +'</p>');  
        if(data[i].direccion.lng != "") lastli.find('.dealerinfo').append('<p class="dealerlng" style="display: none;">'+ data[i].direccion.lng +'</p>');  
    }  
}

function listaCiudades(data){
    var ciudadesval = new Array();
    var ciudadeslab = new Array();
    for (var i = 0; i < data.length; i++) {
        if(data[i].ciudadval != undefined){
            ciudadesval.push(data[i].ciudadval);
            ciudadeslab.push(data[i].ciudadlab);
        }
        
    }
    ciudadesval.sort(function (a, b) {
        return a.localeCompare(b);
    });
    ciudadeslab.sort(function (a, b) {
        return a.localeCompare(b);
    });

    var uniqueVals = [];
    var uniqueLabs = [];
    $.each(ciudadesval, function(i, el){
        if($.inArray(el, uniqueVals) === -1) uniqueVals.push(el);
    });
    $.each(ciudadeslab, function(i, el){
        if($.inArray(el, uniqueLabs) === -1) uniqueLabs.push(el);
    });

    // console.log("compru = " + uniqueLabs);
    // alert(ciudades);
    for (var i = 0; i < uniqueVals.length; i++) {
        $('#busqueda_provincia').append('<option value="'+ uniqueVals[i] +'">'+ uniqueLabs[i] +'</option>');
    }
}

// Static markers array
var markers = [];

function initMap(data, center, zoom){
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: zoom,
        // scrollwheel: false,
        // mapTypeControl: false,
        // scaleControl: false,
        draggable: true,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: 
        [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#e8e8e8"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#dfdcd5"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#dfdcd5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#bad294"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#efebe2"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fbfbfb"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    });

    for (var i = 0; i < data.length; i++) {
        // Creating markers
        createMarkers(data[i], markers);
    }   

    // Creating markers cluster
    //var markerCluster = new MarkerClusterer(map, markers, options);
    
    $( "body" ).on( "click", ".srp-dealeritem", function() {
       clickItem($(this));
       $('.srp-dealeritem').not($(this)).css('background', 'initial');
       $(this).css('background', '#f3f3f3');
    });

    // Filter search name
    $('.srp-dealername').keyup(function(){
        keyUpInput(data, $(this).val(), "title");
        $('input').not($(this)).val('');
        $('select').val('first');
    });

    // Filter search location
    $('.srp-location').keyup(function(){
        keyUpInput(data, $(this).val(), "location");      
        $('input').not($(this)).val('');
        $('select').val('first');  
    });

    $('#busqueda_provincia').change(function(){
        keyUpInput(data, $(this).val(), "ciudad");        
        $('input').val('');        
    });

    listaCiudades(data);
}

function createMarkers(innerdata, markers){
    // Taking coordinates from data array
    var coordinates = {
        lat: parseFloat(innerdata.direccion.lat),
        lng: parseFloat(innerdata.direccion.lng)
    }    
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: innerdata.title,
        icon: '/wp-content/themes/voge/img/marker.png'
    });
    //Create infowindow
    var imagen = innerdata.thumb[0];

    var contentString = '<div class="dealerimg" style="width:35%; display:inline-block;vertical-align:middle">' + '<figure style="position:relative; left:0;"><img src="'+ imagen  +'"></figure>' + '</div>' + 
    '<div class="dealerinfo" style="width:65%; display:inline-block;vertical-align:middle">'+'<h3 class="dealername">'+ innerdata.title +'</h3>'+'<p class="datainfo address">'+ innerdata.direccion.address +'</p>'+
    '<p class="datainfo telf">TF. '+ innerdata.telfijo +'</p>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 340
    });
    // Click markers action
    marker.addListener('click', function() {
        // Critical section
        $('.srp-dealeritem').not($('.srp-dealeritem[data-item="'+ innerdata.id +'"]')).css('background', '#fff');
        $('.srp-dealeritem[data-item="'+ innerdata.id +'"]').css('background', '#f3f3f3');
        $('ul.srp-dealerlist').scrollTop($('.srp-dealeritem[data-item="'+ innerdata.id +'"]').position().top);
        infowindow.open(map,marker);
    });
    markers.push(marker);
}

function deleteMarkers(){
    clearMarkers();
    markers = [];
}

function clearMarkers(){
    setMapOnAll(null);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function SortByName(a, b){
    var aName = a.title.toLowerCase();
    var bName = b.title.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function SortByDate(a, b){
    var aName = a.date;
    var bName = b.date; 
    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
}

function getIncludedItems(data, val, filter){
    var arrayback = [];
    for (var i = 0; i < data.length; i++) {
        if (filter == "title"){
            if(data[i].title.toLowerCase().indexOf(val.toLowerCase()) != -1){
                arrayback.push(data[i]);
            }
        }
        else if (filter == "location"){
            if(data[i].direccion.address != undefined){
                if(data[i].direccion.address.toLowerCase().indexOf(val.toLowerCase()) != -1){
                    arrayback.push(data[i]);
                }
            }
        }      
        else if (filter == "ciudad"){
            if(data[i].ciudadval.toLowerCase().indexOf(val.toLowerCase()) != -1){
                arrayback.push(data[i]);
            }
        }      
    }
    return arrayback;
}

function clickItem(elem){
    var lat = elem.find('.dealerlat').html();
    var lng = elem.find('.dealerlng').html();
    var coord = new google.maps.LatLng(lat, lng);
    map.setCenter(coord);
    map.setZoom(16);
}

function keyUpInput(data, val, filter){      
    // Getting arrays that include input's value
    var newData =  getIncludedItems(data, val, filter);        
    
    // Recreating dealers list 
    $('.srp-dealerlist').html("");
    createList(newData);    
    
    // Recreating filtered markers and reseting cluster
    // markerCluster.removeMarkers(markers);        
    deleteMarkers();
    for (var i = 0; i < newData.length; i++) {
        createMarkers(newData[i], markers);
    }         
    // markerCluster.addMarkers(markers);
}
