(function($) {
    
    var growl = {};
    var meterCount;
    
    growl.close = function() {
        growl.container.fadeOut('slow', function() {
            if (growl && growl.container) {
                growl.container.unbind('click');
                growl.container.remove();
            }
        });
    }
    
    function getMeterCount() {
        var count = document.cookie.match(/v=i.([0-9]+)/);
        if (count) return count[1];
    }
    
    function hasPageChanged() {
        return meterCount != getMeterCount();
    }
    
    function checkGrowl() {
        if (hasPageChanged()) {
            if (growl) growl.close();
        }
        else {
            setTimeout(checkGrowl, 1000);
        }
    }
    
    function getData() {
        var element = $('#growlCampaignScript');
        
        var keywords = element.attr('data-keywords');
        keywords = (keywords && keywords.length > 0) ? keywords : '';
        
        var query = element.attr('data-query');
        query = (query && query.length > 0) ? query : '';
        
        return {keywords: keywords, query: query};
    }
    
    function addGrowl(){
        meterCount = getMeterCount();
        
        var data = getData();
        
        $.getJSON('http://www.nytimes.com/adx/bin/adxrun.html?v=3&jsonp=?&keywords='+data.keywords+'&page=www.nytimes.com/growl&type=fastscript&positions=Left9&query='+data.query,
            function(data) {
                // if it doesn't have any ads, quit
                if (!data || !data.ads) return;
                // quit if by the time we got the growl creative, the user has already changed page
                // this happens most on ajax applications such as video, nyt5, etc
                if (hasPageChanged()) {
                    return;
                }
                // place the growl creative
                var body = $('body');
                if (data.ads.Left9 && body) {
                    // removes previous growl, if there is one
                    if (growl.container) {
                        growl.container.off('click').remove();
                    }
                    // TODO: strip out scripts
                    body.append(data.ads.Left9.creative);
                    // get new container
                    growl.container = $(".nytdGrowlUIContainer");
                    //bind a click event that will close container
                    growl.container.on('click', '.nytdGrowlNotifyCross', function() {
                        growl.close();
                    });
                    // dispatch event notifying the page that growl has loaded
                    $(document).trigger('NYTD:AuthGrowlLoaded', {count: getMeterCount()}); 
                    // Set timeout to remove grow if cookie changes
                    // this is so dynamic applications can implement swipe gestures and 
                    // not have the growl stick on the page with the wrong count
                    setTimeout(checkGrowl, 1000);
                }
                if (data.ads.ADX_CLIENTSIDE && body) {
                    // display confirmation
                    body.append(data.ads.ADX_CLIENTSIDE.creative);
                }
            }
        );
    }
    
    if (NYTD && NYTD.Meter && NYTD.Meter.loaded) {
        addGrowl();
    }
    else {
        $(document).on('NYTD:MeterLoaded', function() { 
            addGrowl(); 
        });
    }
    
    
    //legacy compatibility
    if (NYTD) {
        NYTD.AuthGrowl = growl;
    }
    // end legacy compatibility
    
    // exposes meter check for new requirejs pages
    if (typeof define === "function" && define.amd) {
        define( "growl", function () {
            return growl;
        } );
    }
    
})(NYTD.jQuery || jQuery || $);
