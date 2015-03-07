(function(GLOBAL){

    var timeouts = [];

    //IE 7 is not supported
    if( typeof document.querySelectorAll == "undefined") return;

    GLOBAL.waitForElement = function (selectors, callback, options, count) {
        var selectorsStr = JSON.stringify(selectors);
        clearTimeout(timeouts[selectorsStr]);

        // maximum intervals for waiting for element is 10, count won't be passed in the first time
        if( typeof count === "undefined")
        {
            count = 0;
        }else if(count > 10)
        {
            return false;
        }

        var DEFULAT_OPTIONS = {
            "max_count": 25,
            "time_out_id": (new Date).getTime(),
            "interval": 1000
        };

        options = options || DEFULAT_OPTIONS;

        var getElement = function (selectors) {
            var element;
            if (selectors instanceof Array) {
                for (var i = 0; i < selectors.length; i++) {
                    var selector = selectors[i];
                    element = document.querySelectorAll(selector);

                    if (element.length) break;
                }
            } else {
                element = document.querySelectorAll(selectors);
            }

//                    return !!element.length && callback(element[0]);
            return element[0];
            //                        return element[0];

        };

        var element = getElement(selectors);

        // don't add listener if element is found
        if (element) {
            return callback(element);
        }

        if ( window.MutationObserver ) {
            var observer = new MutationObserver(function (mutations, observerListener) {
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];

                    if ( mutation.addedNodes ) {
                        var element = getElement(selectors);
                        if (element) {

                            observerListener.disconnect();
                            return callback(element);
                        }
                    }
                }
            });

            observer.observe(document.body, {
                childList: true, subtree: true, attributes: false, characterData: false
            });


        } else {
            return timeouts[selectorsStr] = setTimeout(function ()
            {
                count++;
                GLOBAL.waitForElement(selectors, callback, options, count);
            }, options.interval)
        }


    };

})(typeof window !== "undefined" ? window : this);


