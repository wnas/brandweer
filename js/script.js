var brandweer = function () {
    "use strict";
    var config = {
            // foo: bar
            "src":"js/json/data.json",
            "multipleSelectClone":'',
            "headerHeight":$('#header').height(),
            "navHeight":$('#main-nav').height(),
            "questions":[
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
            "answers":[],
            "active":"active",
            "numberOfQuestions":15,
            "tmpl_dir":'/Brandweer/templates',
            "mainNavigation":$('.top-navigation'),
            "info":{
                "show":".revealInformation",
                "hide":".hideInformation"
            }
        },
        init = function () {

            $.ajax({
                type:'GET',
                url:config.src,
                data:{ name:'Brandweer' },
                dataType:'json',
                success:function (data) {
                    // Do some nice stuff here
                    for (var i in config.questions) {
                        // create the various templates
                        popTmpl(config.questions[i], data);
                        if (i > 0 && i <= config.numberOfQuestions) {
                            // create the top navigation links
                            renderNavigationItem(config.questions[i], i);
                        }

                    }
                    doMaps();
                },
                error:function (xhr, type) {
                    console.log('oops.')
                }
            });

            // set up the navigation.
            doNavigation();
            toggleInfo();

        },
        toggleInfo = function(){
//
            $('body').on('click',config.info.show,function(){
                $(this).closest('fieldset').toggleClass('info');
            });
            $('body').on('click',config.info.hide,function(){
                $(this).closest('fieldset').toggleClass('info');
            })

        },
        render = function (tmpl_name, tmpl_data) {

            if (!render.tmpl_cache) {
                render.tmpl_cache = {};
            }

            if (!render.tmpl_cache[tmpl_name]) {
                var tmpl_url = config.tmpl_dir + '/' + tmpl_name + '.tmpl';

                var tmpl_string;
                $.ajax({
                    url:tmpl_url,
                    method:'GET',
                    async:false,
                    success:function (data) {
                        tmpl_string = data;
                    }
                });

                render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
            }

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
        setMapSize = function () {

            var headerHeight = config.headerHeight + 20,
                map = $('#map');

            map.height(window.innerHeight - headerHeight);
            map.css('top', headerHeight);

        },
        activate = function (elem) {
            elem.addClass(config.active);
        },
        deActivate = function (elem) {
            if (!elem) {
                elem = $('fieldset');
            }
            elem.removeClass(config.active);
        },
        setHistory = function (x) {

                history.pushState(null, null, x);


        },
        showHideFieldsets = function (theFieldset) {

            deActivate();
            activate($(theFieldset));

        },
        doNavigation = function () {

            // if we click on a navigation item (event delegation like)
            $('body').on('click', '.navigate', function () {

                // we look what it points to.
                var theFieldset = $(this).attr('href');

                // and we set our history up to re
                // http://diveintohtml5.info/history.html
                setHistory(theFieldset);
            });
            $('#confirm').click(saveAndNext);
            window.addEventListener("popstate", function () {
                showHideFieldsets(location.hash);
            });

        },
        saveAndNext = function () {

            // get the active fieldset
            var activeFieldset = $('fieldset.active'),
                // and it's id
                activeId = activeFieldset.attr('id');

            // put it into history
            setHistory('#'+activeId);

            // reset the top navigation
            deActivate($('.navigate').removeClass('active'));
            // and activate the currenct one.
            activate($('.navigate[href="#' + activeId + '"]'));

            // hide all fieldsets
            deActivate();
            // and show the current one...
            activate(activeFieldset.next('fieldset').not('.last'));

            // show the data we are about to send...
            console.log(config.answers);
            return false;

        },
        doMaps = function () {
            // $('#kaart').show();

            var thiz = $('#map'),
                it = thiz.data('bagid'),
                coordz = thiz.data('coords'),
                zoom = thiz.data('zoom');

            setMapSize();

            window.onresize = function (event) {
                setMapSize();
            }

            var map = new L.map('map').setView(coordz, zoom);
            var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
                subDomains = ['1', '2', '3', '4'],
                cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:zoom});

            map.addLayer(cloudmade);

            map.on('click', addCoords);
        },
        addCoords = function (e) {
            var activeQuestion = $('.active'),
                activeId = activeQuestion.attr('id'),
                coords = e.latlng,
                answer = {};

            answer.id = activeId;
            answer.coords = coords;

            config.answers.push(answer);
            //console.log(activeQuestion);
            //   data.push({activeId:coords});
            $('#data').append('<input id="' + activeId + '" value="' + coords + '">')
            console.log(config.answers);
            activeId = '';
        };
    return {
        init:init
    };
}();
Zepto(function($){
    brandweer.init();
});
