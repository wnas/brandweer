var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.js"


    }, init = function () {
        var contact;
        var test = {
            src : config.src,
            part : 'contact'
        }
      //  getData(test);
        populate();

      //  testing();
    }, getData = function (test) {
        console.log(test);
        $.getJSON(test.src,function(data){
            console.log(data);
        })
    }, populate = function () {
        console.log('populate');
        var tar = config.src;
        console.log(tar);
        $.getJSON(tar,function(data){
            console.log(data);
        })
        $.getJSON(tar, function (data) {
            console.log('getjson')
            var contact = data.contact.firstname.value;
            console.log(contact);
            for (key in contact) {
                if (typeof contact[key] === "object") {
                    var address = contact[key];
                    for (i in address) {
                        $('#'+i).val(address[i]);
                    }
                } else {
                    $('#'+key).val(contact[key]);
                }
            }
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


