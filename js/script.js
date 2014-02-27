Proj4js.defs['EPSG:28992'] = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
    '+ellps=bessel +units=m ' +
    '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs';
var brandweer = function () {


    "use strict";
    /* jshint devel:true, indent:4, jquery:true */


    var config = {
            // foo: bar
            "map":null,
            "src":"/webdata/1031",
            "multipleSelectClone":'',
            "headerHeight":$('#header').height(),
            "navHeight":$('#main-nav').height(),
            "body":$('body'),
            "questions":[
                "intro",
                "personalInformation",
                "buildings",
                "contactInformation",
                "functions",
                "entrances",
                "sleutelbuis",
                "gasafsluiter",
                "hoofdSchakelaarElektriciteit",
                "hoofdafsluiterwater",
                "gasflessen",
                "gevaarlijkestoffen",
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
                "gevaarlijkestoffen":"Tw2.002",
                "drogestijgleiding":"Tb1.007",
                "rwa":"Tb2.005"
            },
            "gevaarlijkestoffen":{
                "Brandbare":"GHS03",
                "Ontvlambare":"GHS02",
                "Bijtend":"GHS05",
                "Giftig":"GHS06"
            },
            "answers":[],
            "buildings":[],
            "activeBuilding":null,
            "activeQuestion":"intro",
            "css":{
                "active":"active",
                "hideMap":"hideMap",
                "hide":"hide",
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
                        dashArray:'5',
                        fillOpacity:0.5
                    },
                    "selectedStyle":{
                        // style away.
                        weight:3,
                        color:'#00aa00',
                        dashArray:'',
                        fillOpacity:0.8
                    },
                    "currentStyle":{
                        weight:2,
                        color:'#33aa00',
                        dashArray:'',
                        fillOpacity:0.6
                    }
                }

            },
            "numberOfQuestions":17,
            "numberOfContacts":0,
            "numberOfMarkers":0,
            "mainNavigation":$('.top-navigation'),
            "info":{
                "show":".revealInformation",
                "hide":".hideInformation"
            },
            "globalData":null
        },
        len, i, j,
        init = function () {
            setMapSize();
            // We need to check the url during init, not somewhere else as we cannot
            // set the topnavigation item if we do so...
            // 
            // @todo Grab the data for the user, based upon the url used to log in
            //var url = "/webdata/1021";
            var url = "js/json/data-1021.json";
            var hash = window.location.href.split("#")[1];
            $.ajax({
                type:'GET',
                url:url,
                data:{name:'Brandweer'},
                dataType:'json',
                success:function (data) {
                    // if we have data
                    config.globalData = data;

                    // draw me a map
                    doMaps(data);

                    // iterate over the questions
                    len = config.questions.length;
                    for(var i = 0; i<len; i++){
                        var source   = $("#smw-template").html();
                        var template = Handlebars.compile(source);
                        $("#" + config.questions[i]).html(template(data[config.questions[i]]));

                        //render all the navigation items and check which one needs to be active
                        if (i > 0 && i <= config.numberOfQuestions) {
                            renderNavigationItem(config.questions[i], i, (config.questions[i] === hash));
                        }
                    }
                    buildContactOption(data);
                    buildIconBar();
                    buildFunctions(data.functions);
                    buildHazards(data.gevaarlijkestoffen, 0);
                    showHideFieldsets(hash);
                    //doNavigation();
                },
                error:function (xhr, type) {
                    // @todo do error handling in case someone landed here that is not registered
                }
            });

            // set up the navigation.
            doNavigation();
            toggleInfo();
            contactInformation();
        },
        buildHazards = function (data, index) {
            for( i = 0; i< data.functions.length; i++){
                $('#gevaarlijkestoffen-select'+ index).append('<option value="' + 
                        data.functions[i].value + '">' + 
                        data.functions[i].name + '</option>');
            }
        },
        buildFunctions = function (data) {
            // get us the functions
            data = data.functions;
            var store = [];

            // iterate over them
            len = data.length;
            for( i = 0; i<len; i++){
           // for (var i in data) {
                // build us an option for each function
                $('#functions-select0').append('<option value="' + data[i].value + '">' + data[i].name + '</option>');
                // get the subfunctions

                var sub = data[i].subfunctions;
                len = sub.length;
                for( j = 0; j<len; j++){
                    // and put them into the next select

                    var val = sub[j].value,
                        name = sub[j].name;
                    store[val] = name;
//                    $('#subSelect').append('<option class="'+val.charAt(0)+'" value="'+val+'">'+sub[j].name+'</option>');
                }
            }

            showCorrectSubFunctions(store);
        },

        showCorrectSubFunctions = function (store) {
            var sub = $('#functions-subselect0');

            sub.find('option').remove();
            $('body').on('change', '#functions-select0', function () {
                $('#functions-subselect0').find('option').remove();
                if ($(this).val() !== '0') {
                    // @todo refactor to look into the json sub structure.
                    var val = $(this).val().charAt(0);
                    sub.removeAttr('disabled');
                    sub.append('<option>Kies een deelfunctie</option>');
                    for (var i in store) {
                        if (i.charAt(0) === val) {
                            sub.append('<option value="' + i + '">' + store[i] + '</option>');
                        }
                    }
                } else {
                    $('#subSelect').find('option').remove();
                }
                $('#subSelect').focus();
            });

        },

        buildIconBar = function () {
            var info = '<button class="revealInformation">Informatie</button>',
                contact = '<button class="contact"><span>Contact</span></button>',
                hide = '<button class="hideFieldset"><span>Verberg</span></button>';

            $('fieldset').each(function () {
                $(this).prepend('<div class="iconBar">' + hide + contact + info + '</div>');
            });
            $('body').on('click', '.hideFieldset', function () {
                $(this).closest('fieldset').toggleClass('hideMe');
            });
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
        renderNavigationItem = function (arg, i, active) {
            if(!active){
                config.mainNavigation.append('<li class="top-navigation-item"><a href="#' + arg + '" class="navigate"><abbr title="' + arg + '">' + i + '</abbr></a></li>');
            } else {
                config.mainNavigation.append('<li class="top-navigation-item"><a href="#' + arg + '" class="navigate active"><abbr title="' + arg + '">' + i + '</abbr></a></li>');
            }
        },
        // helpers
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
        getHistory = function () {
            // if we have history support
            if (window.history && window.history.pushState) {
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
            // if we don't have history support
            else {
                // start at the beginning...
                showHideFieldsets('#intro');
            }
        },
        setHistory = function (x) {
            // if we have history suppport
            if (window.history && window.history.pushState) {
                // update the history
                history.pushState(null, null, x);
            }

        },

        contactInformation = function () {
            var fields,
                ci;
            // remove the empty fields div which get built
            // @todo @wilfred make sure only the needed elements get build.
            //$('.fields').empty().remove();
            $('body').on('click', '#addContact', function (e) {
                e.preventDefault();
                var offSet = config.numberOfContacts * 40;
                ci = $('<div class="ci" style="margin-top: ' + offSet + 'px"><button class="hideCI"><span>Verberg</span></button><button class="eraseCI"><span>Wis</span></button></div>');
                fields = $(this).parent().find('.f-container');
                fields.each(function () {
                    var v = $(this).find('.f-input').val(),
                        l = $(this).find('label').text(),
                        par = $('<label class="f-label">' + l + '<input tabindex="-1" type="text" class="f-input" readonly value="' + v + '"></label>');
                    ci.append(par);
                    $(this).find('.f-input').val('');
                });

                ci.append('<input type="hidden" name="activeBuilding" class="f-input" value="' + config.activeBuilding + '"/> ');


                $(this).parent().append(ci);
                config.numberOfContacts = config.numberOfContacts + 1;
                $('#contactInformation-firstname0').focus();
            });

            $('body').on('click', '.eraseCI', function () {
                $(this).parent().remove();
            });
            $('body').on('click', '.hideCI', function () {
                $(this).parent().toggleClass(config.css.hide);
            });
        },

        validateFields = function (e) {
            // stop what you are doing
            e.preventDefault();
            // @todo @wilfred build validation, if there is still time :).
        },

        showHideFieldsets = function (elem) {
            if (elem.charAt(0) !== '#') {
                elem = '#' + elem;
            }
            
            var q = config.questions[getCurrentQuestion(elem.substring(1))];
            // find q from the list of questions and set the corresponding top menu item.
            switch (q) {
                case 'intro':
                    $('#prev').hide();
                    $('#prev').html('Vorige');
                    $('#confirm').html('Eerste vraag');
                    if($('#confirm').css('display') !== 'none'){
                        $('#confirm').show();
                    }
                    config.body.addClass(config.css.hideMap);
                    break;
                case 'exercise':
                case 'bhv':
                case 'contactInformation':
                case 'personalInformation':
                    $('#prev').html('Vorige');
                    $('#confirm').html('Volgende vraag');
                    if($('#confirm').css('display') !== 'none'){
                        $('#confirm').show();
                    }
                    $('#prev').show();
                    config.body.addClass(config.css.hideMap);
                    break;
                case 'final':
                    if($('#confirm').css('display') === 'none'){
                        $('#confirm').hide();
                    }
                    config.body.addClass(config.css.hideMap);
                    break;
                case 'gevaarlijkestoffen':
                    $('#gevaarlijkestoffen-form0').hide();
                    $('#gevaarlijkestoffen-subselect0').parent().hide();
                    $("label[for='gevaarlijkestoffen-select0']").text('Categorie');
                    $("#gevaarlijkestoffen-select0 option[name='default']").text('Kies een categorie');
                case 'gasflessen':
                    $('#gasflessen-form0').hide();
                default:
                    $('#prev').html('Vorige');
                    $('#confirm').html('Volgende vraag');
                    if($('#confirm').css('display') !== 'none'){
                        $('#confirm').show();
                    }
                    $('#prev').show();
                    config.body.removeClass(config.css.hideMap);
                    break;
            }
            deActivate();
            activate($(elem));
            // reset the navigation classes
            deActivate($('.navigate'));
            activate($('.navigate[href="' + elem + '"]'));
            // push the element into the history stack.
            setHistory(elem);
        },
        getActiveFieldset = function () {
            // tell us which fieldset is active
            var activeId = $('fieldset.active').attr('id');
            config.activeQuestion = activeId;
            return activeId;
        },
        navigate = function (e) {
            // stop what you are doing
            console.log(e.target.tagName);

            e.preventDefault();

            // depending on what we pressed
            // oh, extreme caution, have to refactor this...
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
                case "confirmAndNext":
                case "p_confirm":
                    goNextAndSave(i);
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

        goNextAndSave = function(i) {
            // we need to save here
            // build an array for the question at hand
//            config.answers[getActiveFieldset()] = [];
//            // find the inputs where the values are in.
//
//            $('#' + getActiveFieldset()).find('.f-input, .f-select').each(function (i) {
//                // what is it's value
//                var v = $(this).val(),
//                // and id...
//                    it = $(this).attr('id');
//                // place 'm in to the array.
//                config.answers[getActiveFieldset()][it] = v;
//            });
            saveData(config.answers);
            // @todo check if we are not at the end.
            // go forward
            showHideFieldsets(config.questions[i +1]);
        },

        setData = function (p) {
            //   console.log(p);
        },

        saveData = function (arg) {
            console.log(arg);
            //   console.log('we need to send that...');
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
            $('body').on('click', triggers, navigate);
        },

        buildContactOption = function (data) {
            // get the data for contact.
            var h = data.contact.header,
                b = data.contact.body,
                e = data.contact.email,
                t = data.contact.tel;

            // and build the contact form...
            $('#contact h3').text(h);
            $('#contact .body').text(b);
            $('#contact .email a').attr('href', 'mailto:' + e).text(e);
            $('#contact .tel a').attr('href', 'tel:' + t).text(t);

            // show hide contact form...
            $('body').on('click', '.contact, #hideContact', function () {
                $('#contact').toggle();
            });
        },

        transformCoords = function (coordarray) {
            var proj = new Proj4js.Proj("EPSG:28992");
            var result = [];
            $.each(coordarray, function (index, pair) {
                if (typeof(pair) === "number") {
                    test = {x:coordarray[0], y:coordarray[1]};
                    Proj4js.transform(proj, Proj4js.WGS84, test);
                    result = [test.x, test.y];
                } else if (pair.length === 2) {
                    var test = {x:pair[0], y:pair[1]};
                    Proj4js.transform(proj, Proj4js.WGS84, test);
                    result.push([test.x, test.y]);
                } else {
                    result.push(transformCoords(pair));
                }
            });
            return result;
        },
        onEachFeature = function (feature, layer) {
            layer.on('click', function (e) {
                var buildingQuestion = false;
                if (getActiveFieldset() === 'buildings') {
                    buildingQuestion = true;
                }
                e.f = feature.properties;
                var gid = feature.properties.gid,
                    ident = feature.properties.identificatie;

                config.activeBuilding = gid;
                layer.setStyle(config.css.map.currentStyle);
                if (buildingQuestion) {
                    console.log('building question');
                    if (!feature.properties.selected) {
                        feature.properties.selected = true;
                        if (feature.geometry.type !== "Point") {
                            // add building to array
                            config.buildings.push(feature.properties);
                            // and style the layer to show the state
                            layer.setStyle(config.css.map.selectedStyle);

                            console.log(config.buildings);
                        }
                    } else {
                        feature.properties.selected = false;
                        var b = config.buildings,
                            T;
                        if (feature.geometry.type !== "Point") {
                           for (T in config.buildings) {
                                console.log(T);
                                if (config.buildings[T].gid !== undefined) {
                                    // remove the building from the array
                                    config.buildings.splice(T, 1);
                                }
                            }
                            layer.setStyle(config.css.map.activeStyle);
                        }
                    }
                }
                else {
                    var options = {
                        "e":e,
                        "map":config.map,
                        "activeId":getActiveFieldset(),
                        "activeBuilding":ident,
                        "single":"false"
                    };

                    switch (options.activeId) {
                        case "entrances":
                            options.single = 'true';
                            addMarker(options);
                            break;
                        case "functions":
                        case "bhv":
                        case "intro":
                        case "exercise":
                        case "final":
                            break;
                        default:
                            addMarker(options);
                            break;
                    }
                }
            });

            layer.on('mouseover', function (e) {
                if (!feature.properties.selected) {
                    if (feature.geometry.type !== "Point") {
                        layer.setStyle(config.css.map.highLightedStyle);
                        if (!L.Browser.ie && !L.Browser.opera) {
                            layer.bringToFront();
                        }
                    }
                }
            });
            layer.on('mouseout', function (e) {
                if (!feature.properties.selected) {
                    if (feature.geometry.type !== "Point") {
                        layer.setStyle(config.css.map.activeStyle);
                    }
                }
            });
        },

        addMarker = function (options) {
            options.numberOfMarkers = config.numberOfMarkers;
            var custom = 'img/nen1414/' + config.markers[options.activeId] + '.png';
            var BrandweerIcon = L.Icon.Default.extend({
                options:{
                    iconUrl:custom,
                    iconSize:[32, 32]
                }
            });
            var brandweerIcon = new BrandweerIcon();

            var marker = new L.marker(options.e.latlng, {draggable:'true', title:options.activeId, icon:brandweerIcon});
            // @todo put directly into answer.json;
            var answer = {
                "geometry":{
                    "type":"Point",
                    "coordinates":[options.e.latlng.lat,options.e.latlng.lng]
                },
                "properties":{
                    "building":options.activeBuilding,
                    "type":options.activeId
                }
            };

            switch (options.activeId) {
                case "gevaarlijkestoffen":
                case "gasflessen":
                    addEntry(options);
                    break;
                default:
                    break;
            }

            options.map.addLayer(marker);
            marker.on('click', function () {
                removeMarker(options, marker);
                // @todo the formfields should also be removed when the marker is
                // removed
            });
            /*
             @milo
             here I want to have the possibilty to set one or more markers for each question
             each on it's own layer
             these layers I want to turn on and off by setting a class to them or something.

             */
            config.answers.push(answer);
            answer = '';
            config.numberOfMarkers = config.numberOfMarkers + 1;
        },

        addEntry = function (options) {
            var templateid = '#' + options.activeId + '-form0';
            if(options.numberOfMarkers === 0){
                //show the first form with id ending in 0
                $(templateid).show();
                $(templateid).find('.f-input').last().focus();
            } else {
                //clone the form with id ending in 0, change id's and append
                config.numberOfMarkers = config.numberOfMarkers + 1;
                var formClone = $(templateid).clone();
                formClone.attr('id', options.activeId + '-form' + options.numberOfMarkers);
                $('#' + options.activeId).append(formClone);
                formClone.show();
                formClone.find('.f-input').last().focus();
            }
        },

        showCurrentFieldset = function (it) {
            $('#' + it).removeClass('hideMe');
        },

        removeMarker = function (options, marker) {
            options.map.removeLayer(marker);
            $('[data-id="' + options.numberOfMarkers + '"]').remove();
        },

        doMaps = function (data) {
            /*
             @milo
             can we build the initial map from the bag.json data.
             I hope we can put each building on it's own layer. that way we can add stuff to buildings and focus
             and highlight the building we are adding stuff to.

             @wnas
             That is what I am doing, each bag pand (or feature) can be handled by adding events to the onEachFeature function.
             I have created a new bag2.json and have also set up an api to get bag panden. The structure of the file has been simplified. Accuracy is in centimeters.
             The api takes a "nummeraanduiding" from a given adres, sets a buffer of 100 meters and grabs all panden that overlap the buffer.
             I have altered the code to reflect these changes.
             */
            var thiz = $('#map'),
                it = data.buildings.features[0].bag_vbo,
                coordz = data.buildings.features[0].geometry.coordinates;
                //invert coordz
                coordz = [coordz[1],coordz[0]];


            window.onresize = function (event) {
                // maximize the map.
                setMapSize();
            };

            var map = new L.map('map',
                {
                    minZoom:16,
                    maxZoom:22,
                    zoomControl:false
                }
            ).setView(coordz, 19);
            map.addControl(L.control.zoom({position:'topright'}));

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
                    maxZoom:18
                });
            map.addLayer(cloudmade);
            var adres = data.buildings.features[0].bag_vbo;
            map.on('click',function (e) {
                var options = {
                    "e": e,
                    "map": config.map,
                    "activeId": getActiveFieldset()
                    };
                addMarker(options);
            });
//            $.ajax({
//                type:'GET',
//                //url:'/api/bag/adres/' + adres + '?srid=28992',
//                url:'js/json/adres-815010000001910.json',
//                dataType:'json',
//                success:function (data) {
//                    $.each(data.features, function (index, item) {
//                        if (item.geometry) {
//                            item.geometry.coordinates = transformCoords(item.geometry.coordinates);
//                        }
//                        /* @wnas this is the point where the address information should be transfered to the input boxes.
//                         basically this means writing the address into personalInformation. We could also generate data.json
//                         directly from a database and have the address constructed in the process. Which one is in your favour?
//                         */
//                        //config.questions.personalInformation.fields[4].value = item.properties.openbareruimtenaam;
//                    });
//
//                    new L.GeoJSON(data, {
//                        style:config.css.map.activeStyle,
//                        onEachFeature:onEachFeature
//                    }).addTo(map);
//                }
//
//            });
            $.ajax({
                type:'GET',
                url:'/api/bag/panden/' + adres+ '?srid=28992',
                //url:'js/json/panden-815010000001910.json',
                dataType:'json',
                success:function (data) {
                    $.each(data.features, function (index, item) {
                        if (item.geometry) {
                            item.geometry.coordinates = transformCoords(item.geometry.coordinates);
                        }
                    });
                    new L.GeoJSON(data, {
                        style: function(feature) {
                            if (feature.properties.selected) {
                                return config.css.map.selectedStyle;
                            } else {
                                return config.css.map.activeStyle;
                            }
                        },
                        onEachFeature:onEachFeature
                    }).addTo(map);
                }

            });
            return map;
        };
    return {
        init:init
    };
}();
brandweer.init();

