var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.js"
    }, init = function () {

        populate();

      //  testing();
doMaps();
    }, render = function(tmpl_name, tmpl_data){

        if ( !render.tmpl_cache ) {
            render.tmpl_cache = {};
        }

        if ( ! render.tmpl_cache[tmpl_name] ) {
            var tmpl_dir = '/templates';
            var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

            var tmpl_string;
            $.ajax({
                url: tmpl_url,
                method: 'GET',
                async: false,
                success: function(data) {
                    tmpl_string = data;
                }
            });

            render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
        }

        return render.tmpl_cache[tmpl_name](tmpl_data);

    }, populate = function () {

        var contact = render('contact', {});
        var buildings = render('buildings',{});


        var contactTemplate = Handlebars.compile(contact);
        var buildingTemplate = Handlebars.compile(buildings);


        $.getJSON('js/json/dummy.js',function(data){
            var res = data.data;
            console.log(res);
            $('#contact').prepend(contactTemplate(data.data));
            $('#buildings').append(buildingTemplate(res))
        });


    }, doMaps = function () {
       // $('#kaart').show();

        var coords = [51.690599, 5.3064146];
        var map = L.map('map').setView(coords, 18);
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
            subDomains = ['1', '2', '3', '4'],
            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:18});

        map.addLayer(cloudmade);

        var marker = L.marker(coords).addTo(map);

        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

    }, testing = function () {


        $('button[type=submit]').click(function () {
            $('fieldset').hide();
            var $nextFieldset = $(this).closest('fieldset').next(),
                $kaart = $('kaart');
            $nextFieldset.show();

                doMaps();

        });
    };

    return {
        init:init
    };
}();

brandweer.init();


