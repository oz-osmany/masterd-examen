var m;
        var mostrar_direcciones; 
        var servicios_rutas = new google.maps.DirectionsService(); 
        function cargarmapa() {
            mostrar_direcciones = new google.maps.DirectionsRenderer();   
            var punto = new google.maps.LatLng(
                41.129220338983,
                -3.23365432098762
            );
            
            //creación del punto de coordenadas
            var opciones = {
                zoom: 6,
                center: punto,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            //creación de las opciones del mapa
            m = new google.maps.Map(document.getElementById("mapa"), opciones);
            //creación del mapa

            mostrar_direcciones.setMap(mapa);     
            mostrar_direcciones.setPanel(document.getElementById("ruta")); 

        
        }
            // Calcular Rutas
           function calcularRuta() {     
            var partida = document.getElementById("partida").value;     
            var destino = document.getElementById("destino").value;     
            var opciones = { 
                origin:partida,  
                destination:destino, 
                travelMode: google.maps.DirectionsTravelMode.DRIVING 
                //indicamos en este caso que hacemos el viaje en coche/moto     
            };     
            servicios_rutas.route(opciones, function(response, status) { 
                if (status == google.maps.DirectionsStatus.OK) { 
                    mostrar_direcciones.setDirections(response); }     
                }); 
        } 

        function geo() {
            var geocoder = new google.maps.Geocoder();
            var direccion = $("#direccion").val();
            geocoder.geocode({'address': direccion}, function(results, status) {
                if (status === 'OK') {
                    m.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                    map: m,
                    position: results[0].geometry.location});
                } else {
                    alert('No se ha encontrado esa localizacion : ' + status);
                }
            });
        }