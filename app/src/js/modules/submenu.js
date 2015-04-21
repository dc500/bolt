/**
 * Popups of the collapsable sidebar secondary menu.
 *
 * @mixin
 * @namespace Bolt.submenu
 *
 * @param {Object} bolt - The Bolt module.
 * @param {Object} $ - jQuery.
 */
(function (bolt, $) {
    /**
     * Bolt.submenu mixin container.
     *
     * @private
     * @type {Object}
     */
    var submenu = {};

    /**
     * Initializes the mixin.
     *
     * @static
     * @function init
     * @memberof Bolt.submenu
     */
    submenu.init = function () {
        // Add the submenus to the data-content for bootstrap.popover
        $('#navpage-secondary a.menu-pop').each(
            function() {
                var menu = '';

                $(this).nextAll('.submenu').children().each(function () {
                    if ($(this).hasClass('subdivider')) {
                        menu += '<hr>';
                    }
                    menu += $(this).html().trim().replace(/[ \n]+/g, ' ').replace(/(>) | (<)/g, '$1$2');
                });

                $(this).attr('data-html', true).attr('data-content', menu);
            }
        );
        if ($('.navbar-toggle').is(':visible')) {
            // we're on mobile view - so do not trigger the popups,
            // console.log('mobile view');
            // only trigger the mobile open action
            $('#navpage-secondary a.menu-pop').on('click', function(e) {
                    e.preventDefault();
                    var submenu = $(this).nextAll('.submenu');

                    if (submenu.hasClass('show')) {
                        submenu.removeClass('show');
                    } else {
                        $('#navpage-secondary .submenu').removeClass('show');
                        submenu.addClass('show');
                    }
                }
            );
        } else {
            // Add hover focus and leave blur event handlers for popovers - on desktop
            $('#navpage-secondary')
                .on('mouseover focus', 'a.menu-pop', function () {
                        var item = this;
                        window.clearTimeout(timeout);
                        timeout = window.setTimeout(function () {
                            $('#navpage-secondary a.menu-pop').not(item).popover('hide');
                            $(item).popover('show');
                        }, 300);
                    }
                )
                .on('mouseenter focus', '.popover', function () {
                        window.clearTimeout(timeout);
                    }
                )
                .on('mouseleave blur', 'a.menu-pop, .popover', function () {
                        window.clearTimeout(timeout);
                        timeout = window.setTimeout(function () {
                            $('#navpage-secondary a.menu-pop').popover('hide');
                        }, 300);
                    }
                );
        }
    };

    /**
     * Timeout to open the submenu.
     *
     * @private
     * @constant {integer} Timeout resource number
     * @memberof Bolt.submenu
     */
    var timeout = 0;

    // Apply mixin container
    bolt.submenu = submenu;

})(Bolt || {}, jQuery);
