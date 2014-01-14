var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/data.json",
        "multipleSelectClone":'',
        "headerHeight": $('#header').height(),
        "navHeight": $('#main-nav').height()

    }, init = function () {

        var request = $.ajax({
            url: config.src,
            type: "GET",
            data: { id : 'yay' },
            dataType: "json"
        });

        request.done(function( msg ) {
            console.log(msg);
        //    popTmpl('contactInformation',msg);
            populate(msg)
        });

        request.fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });




       // console.log(dat);
//        populate();

   //   navigate();
      //  getLiveData();

        $('body').on('change','.multiple-select-origin',function(){
            multipleSelects();
        });



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

    },  navigate = function(){
        $('button[type=submit]').click(function () {
            var $activeFieldset = $('fieldset.active'),
                $nextFieldset = $activeFieldset.next('fieldset');

            $activeFieldset.toggleClass('active done').next('fieldset').addClass('active');

            if( $activeFieldset.data('map')){
                console.log('maps')
                doMaps();
            }


        });
    }, populate = function (msg) {
        var contact = render('contact', {});
        var buildings = render('buildings',{});
        var contactInformation = render('contactInformation',{});


        var contactTemplate = Handlebars.compile(contact);
        var buildingTemplate = Handlebars.compile(buildings);
        var contactInformationTemplate = Handlebars.compile(contactInformation);

     //  $('#contact').prepend(contactTemplate(msg));
        $('#buildings').append(buildingTemplate(msg));
     //   $('#contactInformation').append(contactInformationTemplate(msg));

        doMaps();
        doInformation();

    }, popTmpl = function(arg,msg){

        var src = render( arg , {}),
            tmp = Handlebars.compile(arg);

        console.log(msg);
        $('#'+arg).append(tmp(msg));

    },  doInformation = function(){
        $('body').on('click','.close',function(e){
            console.log(e.target);
            alert('ayayay')
            e.stopPropagation();
            $(e.target).closest('.information').hide(slow);
        });
//        $('.information').each(function(){
//            var thiz = $(this);
//            $('.close').click(function(e){
//                console.log('ay');
//                e.stopPropagation()
//                thiz.hide(slow);
//            });
//        })
    }, doMaps = function () {
       // $('#kaart').show();
        var w = document.body.clientWidth,
            h = window.innerHeight - config.headerHeight - config.navHeight;



        var thiz = $('#map'),
            it = thiz.data('bagid'),
        // maybe we wanna use jsonparse in the future...
            coordz = thiz.data('coords'),
            zoom = thiz.data('zoom');

       // thiz.width(w);
        thiz.height(h);
        thiz.css('top',config.headerHeight);

        var map = new L.map('map').setView(coordz,zoom);
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
            subDomains = ['1', '2', '3', '4'],
            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:zoom});


        if (w <= 768){
            // if we are on a small screen, disable zoom...
            map.dragging.disable();
            map.scrollWheelZoom.disable();
            map.touchZoom.disable();
        }

        map.addLayer(cloudmade);

        showLayer();

    },   showLayer = function(e){
            $('#map').click(function(){
                alert('boooo')
                var contactInformation = $('#contactInformation');
                $(this).append(contactInformation).show();
            })



    },  multipleSelects = function(){
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

    }, testing = function () {



    },  getLiveData = function(){
        console.log('get live data')

        $( "body" ).on( "click", ".f-button-primary", function(e) {
            var f = $('fieldset.active');
            console.log(f);
        });
    };

    return {
        init:init
    };
}();

brandweer.init();


