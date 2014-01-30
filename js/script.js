// main js

Proj4js.defs['EPSG:28992'] = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
    '+ellps=bessel +units=m ' +
    '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs';
var brandweer = function () {


    "use strict";
    /*jshint devel:true */
    var config = {
            // foo: bar
            "map":null,
            "src":"js/json/data.json",
            "multipleSelectClone":'',
            "headerHeight":$('#header').height(),
            "navHeight":$('#main-nav').height(),
            "questions":[
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
                "bhv",
                "people",
                "exercise",
                "final"
            ],
            "markers":{
                "entrances":"Tb1.001",
                "sleutelbuis":"Tb1.003",
                "gasafsluiter":"Tb2.021",
                "hoofdSchakelaarElektriciteit":"Tb2.003",
                "hoofdafsluiterwater":"Tb2.022",
                "gasflessen":"Tw2.001",
                "drogestijgleiding":"Tb1.007",
                "rwa":"Tb2.005"
            },
            "answers":[],
            "css":{
                "active":"active",
                "map":{
                    "activeStyle":{
                        weight:2,
                        color:'#ff0000',
                        dashArray:'',
                        fillOpacity:0.1
                    },
                    "highLightedStyle":{
                        weight:5,
                        color:'#0dff22',
                        dashArray:'',
                        fillOpacity:0.7
                    },
                    "selectedStyle":{
                        // style away.
                        weight:3,
                        color:'#ffffff',
                        dashArray:'',
                        fillOpacity:0.6
                    }
                }

            },
            "numberOfQuestions":16,
            "tmpl_dir":'/templates',
            "mainNavigation":$('.top-navigation'),
            "info":{
                "show":".revealInformation",
                "hide":".hideInformation"
            }
        },
        init = function () {
            // maximize the map container and some more...
            setMapSize();
            // get us some data
            $.ajax({
                type:'GET',
                url:config.src,
                data:{name:'Brandweer'},
                dataType:'json',
                success:function (data) {
                    // if we have data
                    // draw me a map
                    doMaps(data);

                    // iterate over the questions
                    for (var i in config.questions) {
                        // create the various templates
                        popTmpl(config.questions[i], data);
                        if (i > 0 && i <= config.numberOfQuestions) {
                            // create the top navigation links
                            renderNavigationItem(config.questions[i], i);
                        }


                    }
                    buildContactOption(data);

                    // activate($('#'+config.questions[0]+' fieldset'));


                },
                error:function (xhr, type) {
                    console.log('oops.');
                }
            });

            // set up the navigation.
            doNavigation();
            toggleInfo();

            $('fieldset').each(function () {
                $(this).prepend('<button class="hideFieldset"><span>Verberg</apan></button><button class="contact"><span>Contact</span></button>');

            });
            $('body').on('click', '.hideFieldset', function () {
                $(this).parent().toggleClass('hideMe');
            });

            //buildContactOption();


        },
    // show or hide stuff. booring
        toggleInfo = function () {
            $('body').on('click', config.info.show, function () {
                $(this).closest('fieldset').toggleClass('info');
            });
            $('body').on('click', config.info.hide, function () {
                $(this).closest('fieldset').toggleClass('info');
            });
        },
        render = function (tmpl_name, tmpl_data) {
            // if we don't have a cache
            if (!render.tmpl_cache) {
                // create it as an object.
                render.tmpl_cache = {};
            }

            // if it doesn't have a certain element
            if (!render.tmpl_cache[tmpl_name]) {
                // where do we get it from, the template that is
                var tmpl_url = config.tmpl_dir + '/' + tmpl_name + '.tmpl';

                // set up a var for the data
                var tmpl_string;
                $.ajax({
                    url:tmpl_url,
                    method:'GET',
                    async:false,
                    success:function (data) {
                        // and fill it with the data we get.
                        tmpl_string = data;
                    }
                });

                // create the cache var.
                render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
            }

            // and give it back
            return render.tmpl_cache[tmpl_name](tmpl_data);

        },
        popTmpl = function (arg, msg) {

            var src = render(arg, {}),
                tmp = Handlebars.compile(src);

            $('#' + arg).append(tmp(msg));

        },
        renderNavigationItem = function (arg, i) {
            config.mainNavigation.append('<li class="top-navigation-item"><a href="#' + arg + '" class="navigate"><abbr title="' + arg + '">' + i + '</abbr></a></li>');

        },
    // helpers shizzle
        setMapSize = function () {

            var headerHeight = config.headerHeight,
                map = $('#map, #mask, #contact');

            map.height(window.innerHeight - headerHeight);
            map.css('top', headerHeight);

        },
        activate = function (elem) {
            elem.addClass(config.css.active);
        },
        deActivate = function (elem) {
            if (!elem) {
                elem = $('fieldset');
            }
            elem.removeClass(config.css.active);
        },

    // history
        getHistory = function(){
            // if we have history support
            if (window.history && window.history.pushState) {
                // listen to the popstate event.
                window.addEventListener("popstate", function () {
                    // get the correct question
                    var loc = location.hash;
                    // if there is none
                    if (!loc) {
                        // set the first one
                        loc = '#intro';
                    }
                    // show the correct question
                    showHideFieldsets(loc);
                });
            }
        },
        setHistory = function (x) {
            // if we have history suppport
            if (window.history && window.history.pushState) {
                // update the history
                history.pushState(null, null, x);
            }

        },

        contactInformation = function(){
            // remove the empty fields div which get built
            // @todo @wilfred make sure only the needed elements get build.
            $('.fields').empty().remove();
            $('body').on('click','#addContact',function(e){
                e.preventDefault();
                var ci = $('<div class="ci"><button class="eraseCI">x</button></div>');
                var fields = $(this).parent().find('.f-container');
                fields.each(function(){
                    var v = $(this).find('.f-input').val(),
                        l = $(this).find('label').text(),
                        par = $('<p>'+l+'<strong>'+v+'</strong></p>');
                    ci.append(par);
                    $(this).find('.f-input').val('');
                });

                $(this).parent().prepend(ci);
            });

            $('body').on('click','.eraseCI',function(){
                $(this).parent().remove();
            })


        },

        validateFields = function(e){
            // stop what you are doing
            e.preventDefault()
            // @todo @wilfred build navigation. look at essent code :).
        },

        showHideFieldsets = function (elem) {
            // check to see if we need access to the map.

            if (elem.charAt(0) !== '#') {
                // if it has no #, add one.
                elem = '#' + elem;
            }
            // get rid of the # for this.
            var q = config.questions[getCurrentQuestion(elem.substring(1))];
            switch (q) {
                case 'bhv':
                case 'intro':
                case 'personalInformation':
                case 'exercise':
                case 'final':
                    // hide the map
                    $('#mask').show();
                    break;

                case 'contactInformation':
                    // do stuff with the contact information
                    contactInformation(q);
                    break;
                default:
                    // show the map.
                    $('#mask').hide();
                    //  console.log('set marker?')
                    break;

            }
            if ( q === 'intro'){
                disableElement($('#prev'));
            }
            if ( q === 'final'){
                disableElement($('#confirm'));
            }

            // hide all fieldsets
            deActivate();
            // show the correct one.
            activate($(elem));

            // reset the navigation classes
            deActivate($('.navigate'));
            // and activate the correct one...
            activate($('.navigate[href="' + elem + '"]'));

            // push the element into the history stack.
            setHistory(elem);

        },
        disableElement = function(elem){
            // disable an element.
            elem.attr('disabled','disabled');
        },
        getActiveFieldset = function () {
            // tell us which fieldset is active
            var activeId = $('fieldset.active').attr('id');
            return activeId;
        },
        navigate = function (e) {
            // stop what you are doing
            e.preventDefault();

            // depending on what we pressed
            switch (e.target.className.split(' ')[0]) {
                case "navigate":
                    // we navigate with the top buttons
                    topNavigation(e.target);
                    break;

                case "f-button":
                    // or the bottom ones
                    bottomNavigation(e.target);
                    break;

                default:
                    break;
            }

        },

        topNavigation = function (elem) {
            // get the url
            var loc = elem.href.split('#')[1];
            // show the correct fieldset, hide the others and update the history.
            showHideFieldsets(loc);
        },

        bottomNavigation = function (elem) {
            // get the place of the current question in the array.
            var i = getCurrentQuestion(getActiveFieldset());

            // depending on which button we press
            switch (elem.id) {
                case "confirm":
                    // we need to save here
                    // go forward
                    // @todo check if we are not at the end.
                    showHideFieldsets(config.questions[i + 1]);
                    break;

                case "prev":
                    // if we are not at the beginning
                    if (i > 0) {
                        // go back;
                        showHideFieldsets(config.questions[i - 1]);
                    }
                    break;

                default:
                    break;

            }
        },


        getCurrentQuestion = function (elem) {
            // get the questions
            var q = config.questions,
                // cache the length
                ql = q.length,
                // set a var to count with
                i;

            // loop over the questions
            for (i = 0; i < ql; i += 1) {
                // if we find the current question
                if (q[i] === elem) {
                    // give back it's number in the array.
                    return i;
                }
            }
            // otherwise assume we are just starting fresh
            return 0;
        },

        doNavigation = function () {
            // learn from the past. and set the correct state when we load.
            getHistory();

            // what do we listen to for navigation.
            var triggers = $('.navigate, .f-button');
            // do stuff
            $('body').on('click', triggers, navigate);
        },

        buildContactOption = function(data){
            // get the data for contact.
            var h = data.contact.header,
                b = data.contact.body,
                e = data.contact.email,
                t = data.contact.tel;

            // and build the contact form...
            $('#contact h3').text(h);
            $('#contact .body').text(b);
            $('#contact .email a').attr('href','mailto:'+e).text(e);
            $('#contact .tel a').attr('href','tel:'+t).text(t);

            // show hide contact form...
            $('body').on('click','.contact, #hideContact',function(){
                $('#contact').toggle();
            });




        },

        addBuilding = function (multipolygon) {
            // @milo comments please, this is way too smart for me...
            var map = config.map;
            var proj = new Proj4js.Proj("EPSG:28992");
            $.each(multipolygon[0], function (index, gebouw) {
                var result = [];
                for (var i = 0, max = gebouw.length; i < max; i++) {
                    var test = {x:gebouw[i][0], y:gebouw[i][1]};
                    Proj4js.transform(proj, Proj4js.WGS84, test);
                    result.push([test.y, test.x]);
                }
                ;
                var polygon = L.polygon(result);
                polygon.setStyle({
                    weight:5,
                    color:'#ff0000',
                    dashArray:'',
                    fillOpacity:0.1
                });
                polygon.addTo(map);
                polygon.on({
                    mouseover:highlightFeature,
                    mouseout:resetHighlight
                });

            });
        },
        resetHighlight = function (e) {
            var layer = e.target;
            layer.setStyle( config.css.map.defaultStyle);
        },
        highlightFeature = function (e) {
            var layer = e.target;

            layer.setStyle( config.css.map.highLightedStyle);

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
        },
//        select = function(e,map){
////            var layer = e.target;
////            console.log(layer);
//            var layer = e.target;
//
//            /*
//                @milo
//                bovenstaande geeft in chrome de volgende foutmelding
//
//             Uncaught TypeError: Converting circular structure to JSON :8080/:3
//
//             in firefox:
//             TypeError: cyclic object value
//
//                    heb het idee dat dit door iets geheel anders komt, is dit iets wat jij herkent?
//                    maar ik krijg dat ook als ik e.target wil benaderen.
//                    maw ik kan nu niets zetten...
//             */
//            // @milo can this be done with css?
//            layer.setStyle( config.css.map.activeStyle );
//            addMarker(layer);
//
//        },

        addMarker = function(options){

            var custom = 'img/nen1414/' + config.markers[options.activeId] + '.png';

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
            var marker = new L.marker(options.e.latlng, {draggable: 'true', title: options.activeId, icon: redIcon}).
                bindPopup('this is the place for the '+options.activeId).
                openPopup();
            // console.log(marker);

            marker.on('click',function(){
                options.map.removeLayer(marker);
            });
            options.map.addLayer(marker);
            /*
                @milo
                here I want to have the possibilty to set one or more markers for each question
                each on it's own layer
                these layers I want to turn on and off by setting a class to them or something.

             */
         //  console.log($(this));
           // do stuff.
        },

        doMaps = function (data) {

/*
 @milo
 can we build the initial map from the bag.json data.
 I hope we can put each building on it's own layer. that way we can add stuff to buildings and focus
 and highlight the building we are adding stuff to.
 */
            var thiz = $('#map'),
                it = data.buildings[0].id,
                coordz = data.buildings[0].geometry.coordinates;


            window.onresize = function (event) {
                // maximize the map.
                setMapSize();
            };

            var map = new L.map('map', {minZoom:16, maxZoom:22, zoomControl: false}).setView(coordz, 19);
// @milo here i set the controls to the right, is this the way?
            map.addControl( L.control.zoom({position: 'topright'}) );

            config.map = map;

            var lcms = L.tileLayer.wms("http://www.mapcache.org/wms/lcms?", {
                minZoom:18,
                maxZoom:22,
                layers:'default',
                format:'image/png',
                transparent:true,
                attribution:""
            });
            map.addLayer(lcms);
            var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
                subDomains = ['1', '2', '3', '4'],
                cloudmade = new L.TileLayer(cloudmadeUrl, {
                    subdomains:subDomains,
                    minZoom:16,
                    maxZoom:18,
                });
            map.addLayer(cloudmade);
//        var gbkn = L.tileLayer.wms("http://view.safetymaps.nl/map/mapserv?MAP=/home/mapserver/doiv.map", {
//            minZoom: 16,
//            maxZoom:22,
//            layers: 'gbkn_topografie,gbkn_panden',
//            format: 'image/png',
//            transparent: true,
//            attribution: ""
//        });
//        map.addLayer(gbkn);
            $.ajax({
                type:'GET',
                url:'js/json/bag.json',
                dataType:'json',
                success:function (data) {
                    $.each(data.features, function (index, item) {
                        // @milo please put some comment in here, so I know what is going on. pretty please?
                        switch (item.geometry.type) {
                            case "Point":
                                break;
                            case "Polygon":
                                break;
                            case "MultiPolygon":
                                addBuilding(item.geometry.coordinates);

                                //  console.log(item.id);
                                break;
                        }
                        if (item.properties.pandgeometrie) {
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
// @milo is this neccesary...
            map.on('zoomend', function (e) {
                //  console.log(config.map.getZoom());
            });

            map.on('click',function(e){
                var options = {
                    "e":e,
                    "map":map,
                    "activeId" :getActiveFieldset(),
                    "single":"false"
                }
                switch (options.activeId){
                    case "entrances":
o                       options.single = 'true'
                        break;

                    default:
                        addMarker(options);
                        break;
                }

            });


            return map;
        },
        addData = function (e) {

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

                    $('#' + activeId + ' .f-input').each(function () {
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
        init:init
    };
}();
brandweer.init();

