/**
 * Leaflet biedt standaard geen ondersteuning voor proj4js, de bibliotheek
 * die nodig is voor het omzetten van het transformeren van coordinaat-
 * systemen.
 *
 * Hiervoor heeft Bart van den Eijnden een stukje integratie geschreven.
 * bron: https://github.com/bartvde/PDOK-Leaflet
 */
//L.CRS.proj4js = (function() {
//    var createProjection = function(code, def, /*L.Transformation*/ transformation) {
//        if (typeof(def) !== 'undefined') {
//            Proj4js.defs[code] = def;
//        }
//        var proj = new Proj4js.Proj(code);
//        return {
//            project: function(latlng) {
//                var point = new L.Point(latlng.lng, latlng.lat);
//                return Proj4js.transform(Proj4js.WGS84, proj, point);
//            },
//            toRD: function(latlng) {
//                return project(latlng);
//            },
//            unproject: function(point, unbounded) {
//                var point2 = Proj4js.transform(proj, Proj4js.WGS84, point.clone());
//                return new L.LatLng(point2.y, point2.x, unbounded);
//            }
//        };
//    };
//    return function(code, def, transformation) {
//        return L.Util.extend({}, L.CRS, {
//            code: code,
//            transformation: transformation ? transformation : new L.Transformation(1, 0, -1, 0),
//            projection: createProjection(code, def)
//        });
//    };
//}());
// maak een array met de resoluties benodigd voor het tileschema:
var brandweer = function() {
    var config = {
// foo: bar
        "src": "js/json/data.js",
        "multipleSelectClone": '',
        "projection": ""
    },
    init = function() {
// RT90 with map's pixel origin at RT90 coordinate (0, 0)
        var rdproj = new L.Proj.CRS('EPSG:28992',
                '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
                '+ellps=bessel +units=m ' +
                '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
                {
                    origin: [-285401, 22598],
                    transformation: new L.Transformation(1, 285401.920, -1, 903401.920)
                }
        );
        rdproj.TMS = new L.Proj.CRS.TMS('EPSG:28992',
                '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
                '+ellps=bessel +units=m ' +
                '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
                [-285401.92, 22598.08, 595401.92, 903401.92],
                {
                    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
                }
        );
        config.projection = rdproj;
        var request = $.ajax({
            url: config.src,
            type: "GET",
            data: {id: 'yay'},
            dataType: "json"
        });
        request.done(function(msg) {
            populate(msg);
        });
        request.fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
        $.getJSON(config.src, function(data) {
            var dat = data;
            return {dat: dat};
        });
        $('body').on('change', '.multiple-select-origin', function() {
            multipleSelects();
        });
    }, render = function(tmpl_name, tmpl_data) {
        if (!render.tmpl_cache) {
            render.tmpl_cache = {};
        }
        if (!render.tmpl_cache[tmpl_name]) {
            var tmpl_dir = 'templates';
            // gerbens eigen regel hierboven...
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
    }, navigate = function() {
        $('button[type=submit]').click(function() {
            var $activeFieldset = $('fieldset.active'),
                    $nextFieldset = $activeFieldset.next('fieldset');
            $activeFieldset.toggleClass('active done').next('fieldset').addClass('active');
            if ($activeFieldset.data('map')) {
                doMaps();
            }
        });
    }, populate = function(msg) {
        var contact = render('contact', {});
        var buildings = render('buildings', {});
        var contactInformation = render('contactInformation', {});
        var contactTemplate = Handlebars.compile(contact);
        var buildingTemplate = Handlebars.compile(buildings);
        var contactInformationTemplate = Handlebars.compile(contactInformation);
        //$('#contact').prepend(contactTemplate(msg));
        $('#buildings').append(buildingTemplate(msg));
        //$('#contactInformation').append(contactInformationTemplate(msg));

        doMaps();
        doInformation();
    }, popTmpl = function(arg, msg) {

        var src = render(arg, {}),
                tmp = Handlebars.compile(arg);
        console.log(msg);
        $('#' + arg).append(tmp(msg));
    }, doInformation = function() {
        $('body').on('click', '.close', function(e) {
            console.log(e.target);
            e.stopPropagation();
            $(e.target).closest('.information').hide(slow);
        });
    }, doMaps = function() {
        console.log('Kaart wordt opgebouwd');
        var crs = new L.Proj.CRS.TMS('EPSG:28992',
                '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
                '+ellps=bessel +units=m ' +
                '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
                [-285401.92, 22598.08, 595401.92, 903401.92],
                {
                    origin: [-285401.92, 22598.08],
                    //transformation: new L.Transformation(1, 285401.920, -1, 903401.920),
                    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
                }
        );
        var mapcenter = [0, 0];
        var map = L.map('map', {
            crs: crs,
            continuousWorld: true,
            worldCopyJump: false,
            zoomControl: true
        });

        new L.TileLayer('http://www.openbasiskaart.nl/mapcache/tms/1.0.0/osm@rd/{z}/{x}/{y}.png', {
            continuousWorld: true,
            maxZoom: 14,
            minZoom: 3,
            tms: true
        }).addTo(map);

        map.setView([51.690599, 5.3064146], 12);

        //console.log(config.projection.project(new L.LatLng(52, 5.3)));
        //console.log(config.projection.unproject(new L.point(149288.443, 411322.116), 0));
        var w = document.body.clientWidth;
        var h = window.innerHeight - 200;
        if (w <= 768) {
// if we are on a small screen, disable zoom...
            map.scrollWheelZoom.disable();
            map.touchZoom.disable();
        }
        coords = [51.690599, 5.3064146];
        var marker = L.marker(coords).addTo(map);
        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();
        showLayer();
//        var coords = [51.690599, 5.3064146];
//        var map = L.map('map').setView(coords, 18);
//        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
//            subDomains = ['1', '2', '3', '4'],
//            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:18});
//
//        map.addLayer(cloudmade);
//
//        var marker = L.marker(coords).addTo(map);
//        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();
//
//        var popup = L.popup();
//
//
//        function onMapClick(e) {
//            showLayer(e);
////            L.marker()
//        }
//
//        map.on('click', onMapClick);

    }, showLayer = function(e) {
        $('.map').each(function() {
            $(this).click(function() {
                var contactInformation = $('#contactInformation');
                $(this).append(contactInformation).show();
            });
        });
    }, multipleSelects = function() {
//console.log('gjoo')
//        console.log('multipleSelects');
//
//        $('.multiple-select').each(function(i){
//            var thiz = $(this),
//                firstSelect = thiz.find('.multiple-select-origin'),
//                secondSelect = thiz.find('.multiple-select-target'),
//                valuesForSecondSelect= [],
//                firstSelectedOption = firstSelect.val(),
//                edited = secondSelect.data('edited');
//
//if(!edited){
//    config.multipleSelectClone = secondSelect.clone().data('edited','true');
//    config.multipleSelectClone.removeClass('multiple-select-target');
//    firstSelect.after(config.multipleSelectClone);
//} else {
//    console.log(' no thank you, no more of this nonsense ');
//
//}
//           //
//            console.log(i);
//
//
//            config.multipleSelectClone.find('optgroup[id='+firstSelectedOption+'] option').each(function(){
//                valuesForSecondSelect.push({"value":this.value,"name":this.innerText});
//            });
//
//
//
//            secondSelect.empty();
//
//            $.each(valuesForSecondSelect, function(index,value) {
//            //    console.log(valuesForSecondSelect.value);
//                console.log('foo');
//                //loop through all values for 2nd box and add them
//                secondSelect.append($("<option></option>")
//                    .attr("value", value.value).text(value.name));
//            });
//
//            secondSelect.data('edited','true');
//
//        });

    }, testing = function() {



    }, getLiveData = function() {
        $("body").on("click", ".f-button-primary", function(e) {
            var f = $('fieldset.active');
            console.log(f);
        });
    };
    return {
        init: init
    };
}();
$(document).ready(function() {
    brandweer.init();
});



