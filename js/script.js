var brandweer = function(){
    "use strict";
    var config = {
        // foo: bar
        "src":"js/json/data.json",
        "multipleSelectClone":'',
        "headerHeight": $('#header').height(),
        "navHeight": $('#main-nav').height(),
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
        ]
    },
        init = function(){

        $.ajax({
            type: 'GET',
            url: config.src,
            data: { name: 'Brandweer' },
            dataType: 'json',
            success: function(data){

                console.log(data);
                JSON.decycle(data);
                console.log(data);
                // Do some nice stuff here
                for (var i in config.questions) {
                    popTmpl(config.questions[i],data);
                    renderNavigationItem(config.questions[i],i);
                }
                doMaps();



            },
            error: function(xhr, type){
                alert('Y U NO WORK?')
            }
        });

        $('fieldset').each(function(){
            $(this).height(window.innerHeight - config.headerHeight - config.navHeight);
        });

        doNavigation();

    }, render = function(tmpl_name, tmpl_data){

        if ( !render.tmpl_cache ) {
            render.tmpl_cache = {};
        }

        if ( ! render.tmpl_cache[tmpl_name] ) {
            var tmpl_dir = '/templates';
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

    },  popTmpl = function(arg,msg){
        var src = render(arg , {}),
            tmp = Handlebars.compile(src);
        $('#'+arg).append(tmp(msg));

    },  renderNavigationItem = function(arg,i){
        $('.top-navigation').append('<li class="top-navigation-item"><a href="#'+arg+'" class="navigate"><abbr title="'+arg+'">'+((i*1)+1)+'</abbr></a></li>');
        setMapSize($('#map'));

    },  setMapSize = function(elem){
        elem.height(window.innerHeight - config.headerHeight - config.navHeight);
        elem.css('top',config.headerHeight);

    },doNavigation = function(){
        $('body').on('click','.navigate',function(e){
            var h = $(this).attr('href');
            history.pushState(null, null, h);
            $('fieldset').hide();
            $(h).show();
        });

    }, doMaps = function () {
        // $('#kaart').show();

        var thiz = $('#map'),
            it = thiz.data('bagid'),
            coordz = thiz.data('coords'),
            zoom = thiz.data('zoom');

        setMapSize(thiz);

        window.onresize = function(event){
            setMapSize(thiz);
        }

        var map = new L.map('map').setView(coordz,zoom);
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
            subDomains = ['1', '2', '3', '4'],
            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:zoom});



        map.addLayer(cloudmade);


    };
    return {
        init:init
    };
}();

brandweer.init();