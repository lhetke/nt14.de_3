// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


//expander

//$(document).ready(function()
$( window ).load(function() {
$('div.view').hide();
$('a.slide').click(function() {
$(this).next('div.view').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
return false;
});
});


//themen

$("#hochwasser").load("/themen/hochwasser.html #inhalthochwasser", function() {
$('.slide').simpleexpand();
});


//Menü
$( window ).load(function() {
    if($(window).width() <= 800){
        $('nav').hide();
        $('button.menu').click(function() {
            $('nav').animate({
                    height: "toggle",
                    opacity: "toggle"
                }, "slow");
        return false;
        });
    }
});

//Footer
$( window ).load(function() {
    if($(window).width() <= 700){
        $('.flist').hide();
        $('.ftitel').click(function() {
            $(this).nextAll('.flist').animate({
                    opacity: "toggle"
                }, "fast");
        return false;
        });
    }
});

//Themen

$(".js-vertical-tab-content").hide();
$(".js-vertical-tab-content:first").show();

/* if in tab mode */

$(".js-vertical-tab").click(function(event) {
  event.preventDefault();

  $(".js-vertical-tab-content").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).show();

  $(".js-vertical-tab").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(".js-vertical-tab-accordion-heading[rel^='"+activeTab+"']").addClass("is-active");
});

/* if in accordion mode */

$(".js-vertical-tab-accordion-heading").click(function(event) {
  event.preventDefault();

  $(".js-vertical-tab-content").hide();
  var accordion_activeTab = $(this).attr("rel");
  $("#"+accordion_activeTab).show();

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab").removeClass("is-active");
  $(".js-vertical-tab[rel^='"+accordion_activeTab+"']").addClass("is-active");
});


//side-menu

jQuery(document).ready(function($){
    // browser window scroll (in pixels) after which the "menu" link is shown
    var offset = 200;

    var navigationContainer = $('#cd-nav'),
        mainNavigation = navigationContainer.find('#cd-main-nav ul');

    //hide or show the "menu" link
    checkMenu();
    $(window).scroll(function(){
        checkMenu();
    });

    //open or close the menu clicking on the bottom "menu" link
    $('.cd-nav-trigger').on('click', function(){
        $(this).toggleClass('menu-is-open');
        //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
        mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

    });

    function checkMenu() {
        if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
            navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
                mainNavigation.addClass('has-transitions');
            });
        } else if ($(window).scrollTop() <= offset) {
            //check if the menu is open when scrolling up
            if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
                //close the menu with animation
                mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                    //wait for the menu to be closed and do the rest
                    mainNavigation.removeClass('is-visible is-hidden has-transitions');
                    navigationContainer.removeClass('is-fixed');
                    $('.cd-nav-trigger').removeClass('menu-is-open');
                });
            //check if the menu is open when scrolling up - fallback if transitions are not supported
            } else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
                    mainNavigation.removeClass('is-visible has-transitions');
                    navigationContainer.removeClass('is-fixed');
                    $('.cd-nav-trigger').removeClass('menu-is-open');
            //scrolling up with menu closed
            } else {
                navigationContainer.removeClass('is-fixed');
                mainNavigation.removeClass('has-transitions');
            }
        } 
    }
});


/* 
===============================================================
jQuery plugin to expand/collapse a content element when a 
expander element is clicked. When expanding/collapsing the plug-in 
also toggles a class on the element.
See https://github.com/redhotsly/simple-expand
===============================================================
Copyright (C) 2012 Sylvain Hamel

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
===============================================================
*/
/*globals $:false, window:false*/
(function ($) {
    "use strict";

    // SimpleExpand 
    function SimpleExpand() {

        var that = this;

        that.defaults = {

            // hideMode
            // -----------
            // Specifies method to hide the content element.
            //
            // Default: fadeToggle
            //
            // Values:
            // - fadeToggle: Use jquery.fadeToggle()
            // - basic: Use jquery.toggle()
            // - css: relies on user provided css to show/hide. you can define
            //   classes for "collapsed" and "expanded" classes.
            // - a function : custom toggle function. The function receives 3 arguments
            //                expander: the element that triggered the toggle
            //                targets: the items to toggle
            //                expanded: true if expanding; false if collapsing
            //
            // If un an unknown value is specified, the plug-in reverts to "css".
            'hideMode': 'fadeToggle',

            // searchMode
            // -----------
            // Specifies the defaut value for  data-expander-target-search
            // when none is specified on the expander element.
            //
            // Default: parent
            //
            // Values:
            // - parent: go up the expander's parents hierarchy searching 
            //           each parent's childens looking for a target
            //
            // - absolute : finds a target globally in the document (useful when 
            //              matching an id)
            //
            // - relative : finds a target nested inside the expander
            //
            // If un an unknown value is specified, no targets will be found.
            'defaultSearchMode': 'parent',

            // defaultTarget
            // -----------
            // Specifies the defaut value for data-expander-target when
            // none is specified on the expander element.
            //
            // Default: .content
            'defaultTarget': '.view',

            // throwOnMissingTarget
            // -----------
            // Specifies whether the plug-in throws an exception if it
            // cannot find a target for the expander 
            //
            // Default: true
            'throwOnMissingTarget': true,

            // keepStateInCookie
            // -----------
            // Specifies whether the plug-in keeps the expended/collapsed state 
            // in a cookie for the next time.
            //
            // Default: false
            //
            // Notes:
            // - This only works for expanders with an Id attribute.
            // - Make sure you load the jQuery cookie plug-in (https://github.com/carhartl/jquery-cookie/)
            //   before simple-expand is loaded.
            //     
            'keepStateInCookie': false,
            'cookieName': 'simple-expand'
        };

        that.settings = {};
        $.extend(that.settings, that.defaults);

        // Search in the children of the 'parent' element for an element that matches 'filterSelector'
        // but don't search deeper if a 'stopAtSelector' element is met.
        //     See this question to better understand what this does.
        //     http://stackoverflow.com/questions/10902077/how-to-select-children-elements-but-only-one-level-deep-with-jquery
        that.findLevelOneDeep = function (parent, filterSelector, stopAtSelector) {
            return parent.find(filterSelector).filter(function () {
                return !$(this).parentsUntil(parent, stopAtSelector).length;
            });
        };

        // Hides targets
        that.setInitialState = function (expander, targets) {
            var isExpanded = that.readState(expander);

            if (isExpanded) {
                expander.removeClass("collapsed").addClass("expanded");
                that.show(targets);
            } else {
                expander.removeClass("expanded").addClass("collapsed");
                that.hide(targets);
            }
        };        

        that.hide = function (targets) {
            if (that.settings.hideMode === "fadeToggle") {
                targets.hide();
            } else if (that.settings.hideMode === "basic") {
                targets.hide();
            }
        };

        that.show = function (targets) {
            if (that.settings.hideMode === "fadeToggle") {
                targets.show();
            } else if (that.settings.hideMode === "basic") {
                targets.show();
            }
        };

        // assert that $.cookie if 'keepStateInCookie' option is enabled
        that.checkKeepStateInCookiePreconditions = function () {
            if (that.settings.keepStateInCookie && $.cookie === undefined){
                throw new Error("simple-expand: keepStateInCookie option requires $.cookie to be defined.");
            }
        };

        // returns the cookie
        that.readCookie = function () {
            var jsonString = $.cookie(that.settings.cookieName);
            if ( jsonString === null  || jsonString === '' || jsonString === undefined ){
                return {};
            }
            else{
                return JSON.parse(jsonString);
            }
        };

        // gets state for the expander from cookies
        that.readState = function (expander) {

            // if cookies and not enabled, use the current
            // style of the element as the initial value
            if (!that.settings.keepStateInCookie){
                 return expander.hasClass("expanded");
            }

            var id = expander.attr('Id');
            if (id === undefined){
                return;
            }

            var cookie = that.readCookie();
            var cookieValue = cookie[id];

            // if a cookie is stored for this id, used that value
            if (typeof cookieValue !== "undefined"){
                return cookie[id] === true;
            }
            else{
                // otherwise use the current
                // style of the element as the initial value
                return expander.hasClass("expanded");
            }
        };

        // save states of the item in the cookies
        that.saveState = function (expander, isExpanded) {
            if (!that.settings.keepStateInCookie){
                return;
            }

            var id = expander.attr('Id');
            if (id === undefined){
                return;
            }

            var cookie = that.readCookie();
            cookie[id] = isExpanded;
            $.cookie(that.settings.cookieName, JSON.stringify(cookie), { raw: true, path:window.location.pathname });
        };

        // Toggles the targets and sets the 'collapsed' or 'expanded'
        // class on the expander
        that.toggle = function (expander, targets) {

            var isExpanded = that.toggleCss(expander);

            if (that.settings.hideMode === "fadeToggle") {
                targets.fadeToggle(150);
            } else if (that.settings.hideMode === "basic") {
                targets.toggle();
            } else if ($.isFunction(that.settings.hideMode)) {
                that.settings.hideMode(expander, targets, isExpanded);
            }

            that.saveState(expander, isExpanded);

            // prevent default to stop browser from scrolling to: href="#"
            return false;
        };

        // Toggles using css
        that.toggleCss = function (expander) {
            if (expander.hasClass("expanded")) {
                expander.toggleClass("collapsed expanded");
                return false;
            }
            else {
                expander.toggleClass("expanded collapsed");
                return true;
            }
        };

        // returns the targets for the given expander
        that.findTargets = function (expander, searchMode, targetSelector) {
            // find the targets using the specified searchMode
            var targets = [];
            if (searchMode === "absolute") {
                targets = $(targetSelector);
            }
            else if (searchMode === "relative") {
                targets = that.findLevelOneDeep(expander, targetSelector, targetSelector);
            }
            else if (searchMode === "parent") {

                    // Search the expander's parents recursively until targets are found.
                var parent = expander.parent();
                do {
                    targets = that.findLevelOneDeep(parent, targetSelector, targetSelector);

                    // No targets found, prepare for next iteration...
                    if (targets.length === 0) {
                        parent = parent.parent();
                    }
                } while (targets.length === 0 && parent.length !== 0);
            }
            return targets;
        };

        that.activate = function (jquery, options) {
            $.extend(that.settings, options);

            that.checkKeepStateInCookiePreconditions();


            // Plug-in entry point
            //
            // For each expander:
            //    search targets
            //    hide targets
            //    register to targets' click event to toggle them on click
            jquery.each(function () {
                var expander = $(this);

                var targetSelector = expander.attr("data-expander-target") || that.settings.defaultTarget;
                var searchMode = expander.attr("data-expander-target-search") || that.settings.defaultSearchMode;

                var targets = that.findTargets(expander, searchMode, targetSelector);

                // no elements match the target selector
                // there is nothing we can do
                if (targets.length === 0) {
                    if (that.settings.throwOnMissingTarget) {
                        throw "simple-expand: Targets not found";
                    }
                    return this;
                }

                that.setInitialState(expander, targets);

                // hook the click on the expander
                expander.click(function () {
                    return that.toggle(expander, targets);
                });
            });
        };
    }

    // export SimpleExpand
    window.SimpleExpand = SimpleExpand;

    // expose SimpleExpand as a jQuery plugin
    $.fn.simpleexpand = function (options) {
        var instance = new SimpleExpand();
        instance.activate(this, options);
        return this;
    };
}(jQuery));