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
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window) {
    var Offcanvas, OffcanvasDropdown, OffcanvasTouch, transformCheck;
    OffcanvasDropdown = (function() {
      function OffcanvasDropdown(element) {
        this.element = element;
        this._clickEvent = __bind(this._clickEvent, this);
        this.element = $(this.element);
        this.dropdown = this.element.parent().find(".dropdown-menu");
        this.element.on('click', this._clickEvent);
      }

      OffcanvasDropdown.prototype._clickEvent = function(e) {
        if (!this.dropdown.hasClass('shown')) {
          e.preventDefault();
        }
        this.dropdown.toggleClass("shown");
        return this.element.parent().toggleClass('active');
      };

      return OffcanvasDropdown;

    })();
    OffcanvasTouch = (function() {
      function OffcanvasTouch(button, element, location, offcanvas) {
        this.button = button;
        this.element = element;
        this.location = location;
        this.offcanvas = offcanvas;
        this._getFade = __bind(this._getFade, this);
        this._getCss = __bind(this._getCss, this);
        this._touchEnd = __bind(this._touchEnd, this);
        this._touchMove = __bind(this._touchMove, this);
        this._touchStart = __bind(this._touchStart, this);
        this.endThreshold = 130;
        this.startThreshold = this.element.hasClass('navbar-offcanvas-right') ? $("body").outerWidth() - 60 : 20;
        this.maxStartThreshold = this.element.hasClass('navbar-offcanvas-right') ? $("body").outerWidth() - 20 : 60;
        this.currentX = 0;
        this.fade = this.element.hasClass('navbar-offcanvas-fade') ? true : false;
        $(document).on("touchstart", this._touchStart);
        $(document).on("touchmove", this._touchMove);
        $(document).on("touchend", this._touchEnd);
      }

      OffcanvasTouch.prototype._touchStart = function(e) {
        this.startX = e.originalEvent.touches[0].pageX;
        if (this.element.is('.in')) {
          return this.element.height($(window).outerHeight());
        }
      };

      OffcanvasTouch.prototype._touchMove = function(e) {
        var x;
        if ($(e.target).parents('.navbar-offcanvas').length > 0) {
          return true;
        }
        if (this.startX > this.startThreshold && this.startX < this.maxStartThreshold) {
          e.preventDefault();
          x = e.originalEvent.touches[0].pageX - this.startX;
          x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
          if (Math.abs(x) < this.element.outerWidth()) {
            this.element.css(this._getCss(x));
            return this.element.css(this._getFade(x));
          }
        } else if (this.element.hasClass('in')) {
          e.preventDefault();
          x = e.originalEvent.touches[0].pageX + (this.currentX - this.startX);
          x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
          if (Math.abs(x) < this.element.outerWidth()) {
            this.element.css(this._getCss(x));
            return this.element.css(this._getFade(x));
          }
        }
      };

      OffcanvasTouch.prototype._touchEnd = function(e) {
        var end, x;
        if ($(e.target).parents('.navbar-offcanvas').length > 0) {
          return true;
        }
        x = e.originalEvent.changedTouches[0].pageX;
        end = this.element.hasClass('navbar-offcanvas-right') ? Math.abs(x) > (this.endThreshold + 50) : x < (this.endThreshold + 50);
        if (this.element.hasClass('in') && end) {
          this.currentX = 0;
          this.element.removeClass('in').css(this._clearCss());
          this.button.removeClass('is-open');
        } else if (Math.abs(x - this.startX) > this.endThreshold && this.startX > this.startThreshold && this.startX < this.maxStartThreshold) {
          this.currentX = this.element.hasClass('navbar-offcanvas-right') ? -this.element.outerWidth() : this.element.outerWidth();
          this.element.toggleClass('in').css(this._clearCss());
          this.button.toggleClass('is-open');
        } else {
          this.element.css(this._clearCss());
        }
        return this.offcanvas.bodyOverflow();
      };

      OffcanvasTouch.prototype._getCss = function(x) {
        x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
        return {
          "-webkit-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-webkit-transition-duration": "0s",
          "-moz-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-moz-transition": "0s",
          "-o-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-o-transition": "0s",
          "transform": "translate3d(" + x + "px, 0px, 0px)",
          "transition": "0s"
        };
      };

      OffcanvasTouch.prototype._getFade = function(x) {
        if (this.fade) {
          return {
            "opacity": x / this.element.outerWidth()
          };
        } else {
          return {};
        }
      };

      OffcanvasTouch.prototype._clearCss = function() {
        return {
          "-webkit-transform": "",
          "-webkit-transition-duration": "",
          "-moz-transform": "",
          "-moz-transition": "",
          "-o-transform": "",
          "-o-transition": "",
          "transform": "",
          "transition": "",
          "opacity": ""
        };
      };

      return OffcanvasTouch;

    })();
    window.Offcanvas = Offcanvas = (function() {
      function Offcanvas(element) {
        var t, target;
        this.element = element;
        this.bodyOverflow = __bind(this.bodyOverflow, this);
        this._sendEventsAfter = __bind(this._sendEventsAfter, this);
        this._sendEventsBefore = __bind(this._sendEventsBefore, this);
        this._documentClicked = __bind(this._documentClicked, this);
        this._close = __bind(this._close, this);
        this._open = __bind(this._open, this);
        this._clicked = __bind(this._clicked, this);
        this._navbarHeight = __bind(this._navbarHeight, this);
        target = this.element.attr('data-target') ? this.element.attr('data-target') : false;
        if (target) {
          this.target = $(target);
          if (this.target.length && !this.target.hasClass('js-offcanvas-done')) {
            this.element.addClass('js-offcanvas-has-events');
            this.location = this.target.hasClass("navbar-offcanvas-right") ? "right" : "left";
            this.target.addClass(transform ? "offcanvas-transform js-offcanvas-done" : "offcanvas-position js-offcanvas-done");
            this.target.data('offcanvas', this);
            this.element.on("click", this._clicked);
            this.target.on('transitionend', (function(_this) {
              return function() {
                if (_this.target.is(':not(.in)')) {
                  return _this.target.height('');
                }
              };
            })(this));
            $(document).on("click", this._documentClicked);
            if (this.target.hasClass('navbar-offcanvas-touch')) {
              t = new OffcanvasTouch(this.element, this.target, this.location, this);
            }
            this.target.find(".dropdown-toggle").each(function() {
              var d;
              return d = new OffcanvasDropdown(this);
            });
            this.target.on('offcanvas.toggle', (function(_this) {
              return function(e) {
                return _this._clicked(e);
              };
            })(this));
            this.target.on('offcanvas.close', (function(_this) {
              return function(e) {
                return _this._close(e);
              };
            })(this));
            this.target.on('offcanvas.open', (function(_this) {
              return function(e) {
                return _this._open(e);
              };
            })(this));
          }
        } else {
          console.warn('Offcanvas: `data-target` attribute must be present.');
        }
      }

      Offcanvas.prototype._navbarHeight = function() {
        if (this.target.is('.in')) {
          return this.target.height($(window).outerHeight());
        }
      };

      Offcanvas.prototype._clicked = function(e) {
        e.preventDefault();
        this._sendEventsBefore();
        $(".navbar-offcanvas").not(this.target).removeClass('in');
        this.target.toggleClass('in');
        this.element.toggleClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._open = function(e) {
        e.preventDefault();
        if (this.target.is('.in')) {
          return;
        }
        this._sendEventsBefore();
        this.target.addClass('in');
        this.element.addClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._close = function(e) {
        e.preventDefault();
        if (this.target.is(':not(.in)')) {
          return;
        }
        this._sendEventsBefore();
        this.target.removeClass('in');
        this.element.removeClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._documentClicked = function(e) {
        var clickedEl;
        clickedEl = $(e.target);
        if (!clickedEl.hasClass('offcanvas-toggle') && clickedEl.parents('.offcanvas-toggle').length === 0 && clickedEl.parents('.navbar-offcanvas').length === 0 && !clickedEl.hasClass('navbar-offcanvas')) {
          if (this.target.hasClass('in')) {
            e.preventDefault();
            this._sendEventsBefore();
            this.target.removeClass('in');
            this.element.removeClass('is-open');
            this._navbarHeight();
            return this.bodyOverflow();
          }
        }
      };

      Offcanvas.prototype._sendEventsBefore = function() {
        if (this.target.hasClass('in')) {
          return this.target.trigger('show.bs.offcanvas');
        } else {
          return this.target.trigger('hide.bs.offcanvas');
        }
      };

      Offcanvas.prototype._sendEventsAfter = function() {
        if (this.target.hasClass('in')) {
          return this.target.trigger('shown.bs.offcanvas');
        } else {
          return this.target.trigger('hidden.bs.offcanvas');
        }
      };

      Offcanvas.prototype.bodyOverflow = function() {
        if (this.target.is('.in')) {
          $('body').addClass('offcanvas-stop-scrolling');
        } else {
          $('body').removeClass('offcanvas-stop-scrolling');
        }
        return this._sendEventsAfter();
      };

      return Offcanvas;

    })();
    transformCheck = (function(_this) {
      return function() {
        var asSupport, el, regex, translate3D;
        el = document.createElement('div');
        translate3D = "translate3d(0px, 0px, 0px)";
        regex = /translate3d\(0px, 0px, 0px\)/g;
        el.style.cssText = "-webkit-transform: " + translate3D + "; -moz-transform: " + translate3D + "; -o-transform: " + translate3D + "; transform: " + translate3D;
        asSupport = el.style.cssText.match(regex);
        return _this.transform = asSupport.length != null;
      };
    })(this);
    return $(function() {
      transformCheck();
      $('[data-toggle="offcanvas"]').each(function() {
        var oc;
        return oc = new Offcanvas($(this));
      });
      $(window).on('resize', function() {
        return $('.navbar-offcanvas.in').each(function() {
          return $(this).height('').removeClass('in');
        });
      });
      return $('.offcanvas-toggle').each(function() {
        return $(this).on('click', function(e) {
          var el, selector;
          if (!$(this).hasClass('js-offcanvas-has-events')) {
            selector = $(this).attr('data-target');
            el = $(selector);
            if (el) {
              el.height('');
              el.removeClass('in');
              return $('body').css({
                overflow: '',
                position: ''
              });
            }
          }
        });
      });
    });
  })(window.jQuery, window);

}).call(this);


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