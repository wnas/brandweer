var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.js"
    }, init = function () {

        populate();

      //  testing();
    }, populate = function () {


        var contact = $('#contact-tmpl').html()

        var contactTemplate = Handlebars.compile(contact);

        Handlebars.registerHelper('render_inputs', function() {
            return new Handlebars.SafeString(
                "<label for='contact-"+ this.name +"' class='f-label'>"+this.name+"</label><input class='f-input' id='contact-"+ this.name +"' type='" + this.type + "' value='"+ this.value + "' >"
            );
        });
        $.getJSON('js/json/dummy.js',function(data){
            var res = data.data;
            $('#contact').append(contactTemplate(res));
        });


    }, doMaps = function () {
        $('#kaart').show();

        var coords = [51.690599, 5.3064146];
        var map = L.map('map').setView(coords, 18);
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
            subDomains = ['1', '2', '3', '4'],
            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:18});

        map.addLayer(cloudmade);

        var marker = L.marker(coords).addTo(map);

        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();

    }, testing = function () {

        $('#contact button[type=submit]').click(function () {
            $('fieldset').hide();
            doMaps();

        });
    };

    return {
        init:init
    };
}();

brandweer.init();


