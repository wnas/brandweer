Proj4js.defs['EPSG:28992'] = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
        '+ellps=bessel +units=m ' +
        '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs';
var brandweer = function() {
    "use strict";
    /*jshint devel:true */
    var config = {
        // foo: bar
        "map": null,
        "src": "js/json/data.json",
        "multipleSelectClone": '',
        "headerHeight": $('#header').height(),
        "navHeight": $('#main-nav').height(),
        "questions": [
            "intro",
            "buildings",
            "personalInformation",
            "contactInformation",
            "functions",
            "entrances",
            "sleutelbuis",
            "gasafsluiter",
            "hoofdSchakelaarElektriciteit",
            "hoofdafsluiterwater",
            "gasflessen",
            "drogestijgleiding",
            "rwa",
            "verdiepingen",
            "bvh",
            "people",
            "exercise",
            "final"
        ],
        "markers": {
            "entrances": "Tb1.001",
            "sleutelbuis": "Tb1.003",
            "gasafsluiter": "Tb2.021",
            "hoofdSchakelaarElektriciteit": "Tb2.003",
            "hoofdafsluiterwater": "Tb2.022",
            "gasflessen": "Tw2.001",
            "drogestijgleiding": "Tb1.007",
            "rwa": "Td01"
        },
        "answers": [],
        "active": "active",
        "numberOfQuestions": 16,
        "tmpl_dir": '/templates',
        "mainNavigation": $('.top-navigation'),
        "info": {
            "show": ".revealInformation",
            "hide": ".hideInformation"
        }
    },
    init = function() {

        $.ajax({
            type: 'GET',
            url: config.src,
            data: {name: 'Brandweer'},
            dataType: 'json',
            success: function(data) {
                // draw me a map
                doMaps(data);
                // Do some nice stuff here
                for (var i in config.questions) {
                    // create the various templates
                    popTmpl(config.questions[i], data);
                    if (i > 0 && i <= config.numberOfQuestions) {
                        // create the top navigation links
                        renderNavigationItem(config.questions[i], i);
                    }


                }
                console.log(config.questions[0]);
                // activate($('#'+config.questions[0]+' fieldset'));


            },
            error: function(xhr, type) {
                console.log('oops.');
            }
        });

        // set up the navigation.
        doNavigation();
        toggleInfo();

        $('fieldset').each(function() {
            $(this).prepend('<button class="hideFieldset"><span>Verberg</apan></button>');

        });
        $('body').on('click', '.hideFieldset', function() {
            $(this).parent().toggleClass('hideMe');
        });


    },
    toggleInfo = function() {
        $('body').on('click', config.info.show, function() {
            $(this).closest('fieldset').toggleClass('info');
        });
        $('body').on('click', config.info.hide, function() {
            $(this).closest('fieldset').toggleClass('info');
        });
    },
    render = function(tmpl_name, tmpl_data) {

        if (!render.tmpl_cache) {
            render.tmpl_cache = {};
        }

        if (!render.tmpl_cache[tmpl_name]) {
            var tmpl_url = config.tmpl_dir + '/' + tmpl_name + '.tmpl';

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

    },
    popTmpl = function(arg, msg) {

        var src = render(arg, {}),
                tmp = Handlebars.compile(src);

        $('#' + arg).append(tmp(msg));

    },
    renderNavigationItem = function(arg, i) {
        config.mainNavigation.append('<li class="top-navigation-item"><a href="#' + arg + '" class="navigate"><abbr title="' + arg + '">' + i + '</abbr></a></li>');
    },
    setMapSize = function() {

        var headerHeight = config.headerHeight,
                map = $('#map, .f-form');

        map.height(window.innerHeight - headerHeight);
        map.css('top', headerHeight);

    },
    activate = function(elem) {
        elem.addClass(config.active);
    },
    deActivate = function(elem) {
        if (!elem) {
            elem = $('fieldset');
        }
        elem.removeClass(config.active);
    },
    setHistory = function(x) {
        history.pushState(null, null, x);
    },
    showHideFieldsets = function(theFieldset) {
        deActivate();
        activate($(theFieldset));
    },
    doNavigation = function() {
        // if we click on a navigation item (event delegation like)
        $('body').on('click', '.navigate', function() {
            // we look what it points to.
            var theFieldset = $(this).attr('href');
            deActivate($('.navigate'));
            activate($(this));
            // and we set our history up to re
            // http://diveintohtml5.info/history.html
            setHistory(theFieldset);
            addData();
        });
        $('#confirm').click(saveAndNext);
        window.addEventListener("popstate", function() {
            var loc = location.hash;
            if (!loc) {
                loc = '#intro';
            }
            showHideFieldsets(loc);
            activate($('.navigate[href="' + loc + '"]'));
        });
    },
    saveAndNext = function(event) {
        console.log('saveAndNext');
        // get the active fieldset
        event.preventDefault();
        var activeFieldset = $('fieldset.active'),
                // and it's id
                activeId = activeFieldset.attr('id');

        if (!activeId) {
            activeId = "buildings";
        }

        // put it into history
        setHistory('#' + activeId);

        // reset the top navigation
        deActivate($('.navigate').removeClass('active'));
        // and activate the currenct one.
        $('.navigate').attr('href', '#' + activeId).addClass('done');

        // hide all fieldsets
        deActivate();
        // and show the current one...
        activate(activeFieldset.next('fieldset').not('.last'));

        // show the data we are about to send...
        addData();
        console.log(config.answers);
        return false;

    },
    addBuilding = function(multipolygon){
        var map = config.map;
        var proj = new Proj4js.Proj("EPSG:28992");
        $.each(multipolygon[0], function(index, gebouw) {
            var result = [];
            for (var i = 0, max = gebouw.length; i < max; i++) {
                var test = {x: gebouw[i][0], y: gebouw[i][1]};
                Proj4js.transform(proj, Proj4js.WGS84, test);
                result.push([test.y, test.x]);
            };
            var polygon = L.polygon(result).addTo(map);  
        });
    },
    doMaps = function(data) {

        var thiz = $('#map'),
                it = data.buildings[0].id,
                coordz = data.buildings[0].geometry.coordinates,
                zoom = data.buildings[0].zoom;

        setMapSize();

        window.onresize = function(event) {
            setMapSize();
        };

        var map = new L.map('map').setView(coordz, 18);
        config.map = map;
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
                subDomains = ['1', '2', '3', '4'],
                cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains: subDomains});


        map.addLayer(cloudmade);
        $.ajax({
            type: 'GET',
            url: 'js/json/bag.json',
            dataType: 'json',
            success: function(data) {
                $.each(data.features, function(index, item) {
                    switch (item.geometry.type) {
                        case "Point":
                            break;
                        case "Polygon":
                            break;
                        case "MultiPolygon":
                            addBuilding(item.geometry.coordinates);
                            break;
                    }
                    if(item.properties.pandgeometrie){
                        switch (item.properties.pandgeometrie.type) {
                            case "Point":
                                break;
                            case "Polygon":
                                break;
                            case "MultiPolygon":
                                addBuilding(item.properties.pandgeometrie.coordinates);
                                break;
                        }
                    }
                });
            }
        });

        map.on('click', function(e) {
            var activeQuestion = $('fieldset.active'),
                    activeId = activeQuestion.attr('id');

            var custom = 'img/nen1414/' + config.markers[activeId] + '.png';

            var nImg = document.createElement('img');

            nImg.onload = function() {

            };
            nImg.onerror = function() {
                // image did not load
                custom = 'img/marker-icon.png';
            };

            nImg.src = custom;
            var RedIcon = L.Icon.Default.extend({
                options: {
                    iconUrl: custom,
                    iconSize: [32, 32]
                }
            });
            var redIcon = new RedIcon();
            //  $('.leaflet-marker-pane').find('img').attr('title',activeId).remove();
            var marker = new L.marker(e.latlng, {draggable: 'true', title: activeId, icon: redIcon});
            console.log(marker);
            map.addLayer(marker);
            addData(e);
        });
        return map;
    },
            addData = function(e) {
        console.log('addData');
        var activeQuestion = $('fieldset.active'),
                activeId = activeQuestion.attr('id');


        var answer = [];


        if (e) {
            var coords = e.latlng;
        } else {
            coords = [];
        }
        switch (activeId) {
            case "buildings":
                console.log('buildings');
            case "entrances":
            case "sleutelbuis":
            case "gasafsluiter":
            case "hoofdSchakelaarElektriciteit":
            case "hoofdafsluiterwater":
            case "drogestijgleiding":
                console.log('only place...');
                answer.coords = coords;
                $('#' + activeId).append('<p class="confirmation">Is dit de correcte plaats voor uw ' + activeId + '? Zo ja, bevestig uw selectie en ga naar de volgende vraag. Zo nee, geef hem dan correct aan.</p>');

                break;
            case "personalInformation":
            case "contactInformation":

                $('#' + activeId + ' .f-input').each(function() {
                    var set = {};
//                        console.log($(this));
                    set.id = $(this).attr('id');
                    set.value = $(this).val();
                    console.log(set.id);
                    answer.push(set);
                });
            case "intro":
                break;
            default:

                console.log('fall to the default');
                break;
        }
        answer.id = activeId;
        config.answers.push(answer);
        $('.confirmation').remove();
        // $('#data').append('<input id="' + activeId + '" value="' + coords + '">')
        console.log(config.answers);
        activeId = '';
    };
    return {
        init: init
    };
}();
Zepto(function($) {
    brandweer.init();
});
