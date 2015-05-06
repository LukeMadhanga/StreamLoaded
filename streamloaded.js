(function ($, count, window) {
    
    var ef = function () {},
    methods = {
        init: function (opts) {
            var T = this;
            if (T.length > 1) {
                // If the length is more than one, apply this function to all objects
                T.each(function() {
                    $(this).streamLoaded(opts);
                });
                return T;
            } else if (!T.length) {
                // We have no objects return
                return T;
            }
            if (T.data('streamloadeddata')) {
                // We have already been initialised
                return T;
            }
            var data = {
                instanceid: ++count,
                element: [],
                s: $.extend({
                    offset: 100,
                    onbeforeload: ef,
                    oninit: ef,
                    onload: ef,
                    onscroll: ef
                }, opts),
                drawingimage: false
            },
            src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            T.append('<img class="streamloaded-img" src="' + src + '"/>');
            
            data.listener = function () {
                var coords = T[0].getBoundingClientRect(),
                height = $(window).height(); 
                data.s.onscroll.call(T, {
                    proximity: coords.top - (height + data.s.offset),
                    windowheight: height
                });
                if (!data.drawingimage) {
                    if (coords.top < height + data.s.offset) {
                        data.drawingimage = true;
                        if (data.s.onbeforeload.call(T, data) === false) {
                            // The caller cancelled the funcion
                            return false;
                        }
                        var img = new Image(),
                        attrs = T.data('streamloaded-after');
                        for (var x in attrs) {
                            // Apply all of the attributes supplied to the image
                            $(img).attr(x, attrs[x]);
                        }
                        img.onload = function () {
                            if (data.s.onload.call(T, {image: img}) === false) {
                                // The caller cancelled the function
                                return false;
                            }
                            T.replaceWith(img);
                        };
                        img.src = T[0].href;
                    }
                }
            };
            
            $(window).bind('scroll.streamloaded').bind('scroll.streamloaded', data.listener);
            data.listener();
            data.s.oninit.call(T);
            T.data('streamloadeddata', data);
            return T;
        }
    };
    
    $.fn.streamLoaded = function(methodOrOpts) {
        var T = this;
        if (methods[methodOrOpts]) {
            // The first option passed is a method, therefore call this method
            return methods[methodOrOpts].apply(T, Array.prototype.slice.call(arguments, 1));
        } else if (Object.prototype.toString.call(methodOrOpts) === '[object Object]' || !methodOrOpts) {
            // The default action is to call the init function
            return methods.init.apply(T, arguments);
        } else {
            // The user has passed us something dodgy, throw an error
            $.error(['The method ', methodOrOpts, ' does not exist'].join(''));
        }
    };
    
    $(function () {
        // Initialise the script automatically on anything with the 'streamloaded' class
        $('.streamloaded').streamLoaded();
    });
    
})(jQuery, 0, this);