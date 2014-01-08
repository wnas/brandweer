var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.js"
    }, init = function () {

        populate();
           doMaps();
   //   navigate();
        getLiveData();

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
    }, populate = function () {

        var contact = render('contact', {});
        var buildings = render('buildings',{});


        var contactTemplate = Handlebars.compile(contact);
        var buildingTemplate = Handlebars.compile(buildings);


            $.getJSON('js/json/dummy.js',function(data){
                var res = data.data;
//                return res;
                console.log(res);
                $('#contact').prepend(contactTemplate(data.data));
                $('#buildings').append(buildingTemplate(res));

                multipleSelects();
            });
        //console.log(getData());



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

        var popup = L.popup();


        function onMapClick(e) {
            showLayer(e);
//            L.marker()
        }

        map.on('click', onMapClick);

    },   showLayer = function(e){
        console.log('foo');
    },  multipleSelects = function(){
//        function populatetitle() {
//            var firstSelect = $("#creator");
//            var secondSelect = $("#title");
//            var valuesForSecondSelect = values[firstSelect.val()]; //get values based on 1st selection box
//            secondSelect.empty(); // remove old options
//            $.each(valuesForSecondSelect, function(key, value) {
//                //loop through all values for 2nd box and add them
//                secondSelect.append($("<option></option>")
//                    .attr("value", value).text(key));
//            });
//        }

        $('.multiple-select').each(function(){
            var thiz = $(this),
                firstSelect = thiz.find('.multiple-select-origin'),
                secondSelect = thiz.find('.multiple-select-target'),
                valuesForSecondSelect= [],
                firstSelectedOption = firstSelect.val();

            console.log(secondSelect.find('optgroup'));

            secondSelect.find('optgroup[data-group='+firstSelectedOption+'] option').each(function(){
                console.log(this.value);
                console.log(this.innerText);
                valuesForSecondSelect.push({"value":this.value,"name":this.innerText});
            });

           // secondSelect.empty();
//            $.each(valuesForSecondSelect, function(key, value) {
//                //loop through all values for 2nd box and add them
//                secondSelect.append($("<option></option>")
//                    .attr("value", value).text(key));
//            });

            console.log(valuesForSecondSelect);
         //   secondSelect.empty();

        });

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


