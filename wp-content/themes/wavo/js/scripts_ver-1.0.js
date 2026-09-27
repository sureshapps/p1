/*-----------------------------------------------------------------------------------

    Theme Name: Wavo
    Description: Creative Agency & Portfolio WordPress Theme
    Author: Ninetheme
    Author URI: https://ninetheme.com/
    Version: 1.0

-----------------------------------------------------------------------------------*/


(function(window, document, $) {

    "use strict";

    var wind = $(window);

    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop();

        if ( bodyScroll > 100 ) {
            $("body").addClass("scroll-start");
        } else {
            $("body").removeClass("scroll-start");
        }
    });
    /* Navbar Menu */
    function wavoNoScroll() {
        window.scrollTo(0, 0);
    }
    function wavoHeader() {
        var open = false,
            navDark = $(".topnav.dark"),
            myNav = $(".topnav"),
            logoChan = $(".topnav.dark .logo img"),
            lastScroll = 0;

        $(".sub-menu .link").removeClass("link").addClass("sub-link");
        myNav.addClass("no-scroll");
        wind.on("scroll", function () {
            var bodyScroll = wind.scrollTop(),
                navbar = $(".topnav:not(.sticky-header-off)");

            navbar.removeClass("no-scroll");

            if (navbar.hasClass('scroll-bt')) {

                if (bodyScroll > lastScroll) {
                    navbar.removeClass("nav-scroll");
                } else {
                    navbar.addClass("nav-scroll");
                }

            } else {

                if (bodyScroll > 100) {
                    navbar.addClass("nav-scroll");
                } else {
                    navbar.removeClass("nav-scroll");
                }
            }
            lastScroll = bodyScroll;
            if (lastScroll == 0 && navbar.hasClass('scroll-bt')) {
                navbar.removeClass("nav-scroll").addClass("no-scroll");
            }
        });

        $('.topnav .menu-icon, .topnav .hamburger').on('click', function () {
            open = !open;
            $('.topnav').toggleClass("open");
            $('.hamenu').toggleClass("open");
            $('.hamburger').toggleClass("is-active");
            var menu_direction = $('.hamenu').data("position");
            if (open) {
                if ( $('body').hasClass('rtl') || menu_direction == 'right' ) {
                    $('.hamenu').animate({ right: 0 });
                } else {
                    $('.hamenu').animate({ left: 0 });
                }
                $('.topnav .menu-icon .text').addClass('open');
                navDark.addClass("navlit");
                //logoChan.attr('src', 'img/logo-light.png');
                window.addEventListener('scroll', wavoNoScroll);
            } else {
                if ( $('body').hasClass('rtl') || menu_direction == 'right' ) {
                    $('.hamenu').delay(300).animate({ right: "-100%" });
                } else {
                    $('.hamenu').delay(300).animate({ left: "-100%" });
                }
                $('.topnav .menu-icon .text').removeClass('open');
                navDark.removeClass("navlit");
                //logoChan.attr('src', 'img/logo-dark.png');
                window.removeEventListener('scroll', wavoNoScroll);
            }
        });

        $('.internal .link').on('click', function () {
            open = !open;
            $('.hamenu').addClass('has-internal-link').toggleClass("open").css({ left: "-100%",opacity: "0" });
            $('.topnav').toggleClass("open");
            $('.hamburger').toggleClass("is-active");

            $('.topnav .menu-icon .text').removeClass('open');
            navDark.removeClass("navlit");
            window.removeEventListener('scroll', wavoNoScroll);
            setTimeout(function() {
                $('.hamenu').css({ opacity: "1" }).removeClass('has-internal-link');
            }, 2000);
        });

        $('.hamenu .menu-links .main-menu li').on('mouseenter', function () {
            $(this).css("opacity", "1").siblings().css("opacity", ".5");
        });
        $('.hamenu .menu-links .main-menu li').on('mouseleave', function () {
            $(".hamenu .menu-links .main-menu li").css("opacity", "1");
        });
        $('li .dmenu').on('click', function () {
            $(".main-menu").addClass("gosub");
            $(this).parents('.sub-menu').removeClass("sub-open");
            $(this).parent().next().addClass("sub-open");
        });
        $('.sub-menu.depth_0 > ul > li > div > .sub-link.back').on('click', function () {
            $(".main-menu").removeClass("gosub");
            var parent0 = $(this).parents('.sub-menu');
            parent0.removeClass("sub-open");
        });
        $('.sub-menu.depth_1 > ul > li > div > .sub-link.back').on('click', function () {
            var parent = $(this).parents('.sub-menu.depth_1');
            var parparent = parent.parents('.sub-menu.depth_0');
            parent.removeClass("sub-open");
            parparent.addClass("sub-open");
        });
        $('.sub-menu.depth_2 > ul > li > div > .sub-link.back').on('click', function () {
            var parent = $(this).parents('.sub-menu.depth_2');
            var parparent = parent.parents('.sub-menu.depth_1');
            parent.removeClass("sub-open");
            parparent.addClass("sub-open");
        });
    }

    function wavoSidebarMenu() {
        const open = false;
        const toggleBtn = $('.sidebarmenu--hamburger-menu');
        const navMenu = $('.sidebarmenu--navigation');
        const searchBox = $('.sidebarmenu--search-box');
        const searchOpen = $('.sidebarmenu--search-open');
        const searchClose = $('.sidebarmenu--search-close');

        if ( navMenu.length ) {
            $('body').addClass('has-sidebar-menu');
            // Hamburger
            toggleBtn.on('click', function(e) {
                toggleBtn.toggleClass('open');
                navMenu.toggleClass('open');
                $('.hamenu').toggleClass("open");

                if (!$(this).hasClass('open')) {
                    $('.main-menu').removeClass("gosub");
                    $('.sub-menu').removeClass("sub-open");
                }
                if (searchBox.hasClass('open')) {
                    searchOpen.removeClass('hide');
                    searchClose.removeClass('show');
                    searchBox.removeClass('open');
                }
            });

            // Search Open
            searchOpen.on('click', function(e) {
                searchOpen.addClass('hide');
                searchClose.addClass('show');
                searchBox.addClass('open');
                if (toggleBtn.hasClass('open')) {
                    toggleBtn.toggleClass('open');
                }
                if (navMenu.hasClass('open')) {
                    navMenu.toggleClass('open');
                    $('.hamenu').toggleClass("open");
                    $('.main-menu').removeClass("gosub");
                    $('.sub-menu').removeClass("sub-open");
                }
            });

            // Search Close
            searchClose.on('click', function(e) {
                searchOpen.removeClass('hide');
                searchClose.removeClass('show');
                searchBox.removeClass('open');
            });

            $(window).on("scroll", function () {
                //var bodyScroll = $(window).scrollTop();
                if ( $('body').hasClass('scroll-start')) {
                    if (toggleBtn.hasClass('open')) {
                        toggleBtn.toggleClass('open');
                        navMenu.toggleClass('open');
                        $('.hamenu').toggleClass("open");
                        $('.main-menu').removeClass("gosub");
                        $('.sub-menu').removeClass("sub-open");
                    }
                    if (searchBox.hasClass('open')) {
                        searchOpen.removeClass('hide');
                        searchClose.removeClass('show');
                        searchBox.removeClass('open');
                    }
                }
            });

            $(".sub-menu .link").removeClass("link").addClass("sub-link");

            $('.internal .link').on('click', function () {
                open = !open;
                $('.hamenu').addClass('has-internal-link').toggleClass("open");
                setTimeout(function() {
                    $('.hamenu').css({ opacity: "1" }).removeClass('has-internal-link');
                }, 2000);
            });

            $('.hamenu .menu-links .main-menu li').on('mouseenter', function () {
                $(this).css("opacity", "1").siblings().css("opacity", ".5");
            });
            $('.hamenu .menu-links .main-menu li').on('mouseleave', function () {
                $(".hamenu .menu-links .main-menu li").css("opacity", "1");
            });
            $('li .dmenu').on('click', function () {
                $(".main-menu").addClass("gosub");
                $(this).parents('.sub-menu').removeClass("sub-open");
                $(this).parent().next().addClass("sub-open");
            });
            $('.sub-menu.depth_0 > ul > li > div > .sub-link.back').on('click', function () {
                $(".main-menu").removeClass("gosub");
                $(this).parents('.sub-menu').removeClass("sub-open");
            });
            $('.sub-menu.depth_1 > ul > li > div > .sub-link.back').on('click', function () {
                $(this).parents('.sub-menu.depth_1').removeClass("sub-open");
                $(this).parents('.sub-menu.depth_0').addClass("sub-open");
            });
            $('.sub-menu.depth_2 > ul > li > div > .sub-link.back').on('click', function () {
                $(this).parents('.sub-menu.depth_2').removeClass("sub-open");
                $(this).parents('.sub-menu.depth_1').addClass("sub-open");
            });
        }
    }

    function wavoHeaderLang() {
        $('.lang-select .lang-item.active').on('click', function (e) {
            var lang = $(this),
                langselect = $('.lang-select'),
                sublang = lang.parent().find('.sub-list');

            if ( langselect.hasClass( 'lang-active' ) ) {
                langselect.removeClass( 'lang-active' );
            } else {
                langselect.addClass( 'lang-active' );
            }
            if ( sublang.hasClass( 'show' ) ) {
                sublang.removeClass( 'show' );
            } else {
                sublang.addClass( 'show' );
            }
        });

        $('.lang-select .sub-lang-item a').on('click', function (e) {

            var sublang = $(this),
                langText = sublang.text(),
                activeLangText = $('.lang-select .lang-item.active .uppercase').text(),
                sublangList = sublang.parents('.sub-list');

            sublangList.removeClass( 'show' );

            $('.lang-select .lang-item.active .uppercase').html(langText);
            sublang.html(activeLangText);
        });

        // Bind to scroll
        jQuery(window).scroll(function(){

            var sublang = $('.sub-list');
            var langselect = $('.lang-select');
            if ( langselect.hasClass( 'lang-active' ) ) {
                langselect.removeClass( 'lang-active' );
            }
            if ( sublang.hasClass( 'show' ) ) {
                sublang.removeClass( 'show' );
            }
        });
    }

    function wavoMcolumnSlider() {
        var mySwiper = $('.mcolumn .swiper-container');
        if ( mySwiper.length ) {
            var mcolumnSwiper = new SwiperNT('.mcolumn .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 0,
                speed: 1000,
                loop: true,
                centeredSlides: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    }
                },
                navigation: {
                    nextEl: '.mcolumn .next-ctrl',
                    prevEl: '.mcolumn .prev-ctrl'
                }
            });
        }
    }

    function wavoRelatedSlider() {
        var mySwiper = $('.nt-related-post .swiper-container');
        if ( mySwiper.length ) {
            var relatedSwiper = new SwiperNT('.nt-related-post .swiper-container', {
                slidesPerView: 5,
                spaceBetween: 0,
                speed: 1000,
                loop: true,
                centeredSlides: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 0
                    }
                },
                navigation: {
                    nextEl: '.nt-related-post .next-ctrl',
                    prevEl: '.nt-related-post .prev-ctrl'
                }
            });
        }
    }

    /* wavoSwiperSlider */
    function wavoSwiperSlider() {
        $('.wavo-swiper-slider').each(function () {
            const options  = $(this).data('swiper-options');
            const mySlider = new SwiperNT(this, options );
            $(this).hover(function() {
                if ( options.autoplay == true ) {
                    mySlider.autoplay.stop();
                }
            }, function() {
                if ( options.autoplay == true ) {
                    mySlider.autoplay.start();
                }
            });
        });
    }

    function wavoSingleParallaxie() {

        var myParallaxie = $( '.single .parallaxie' );
        if ( myParallaxie.length ) {
            myParallaxie.parallaxie({
                speed: 0.2,
                size : 'contain'
            });
        }
    }

    /* Mouse Hover */
    function wavoMouseHover() {
        $('.team .item .img').on('mouseenter', function () {
            $(".team .item .img").addClass("filter");
            $(this).removeClass("filter");
        });

        $('.team .item .img').on('mouseleave', function () {
            $(".team .item .img").removeClass("filter");
        });
    }

    /* page Section */
    function wavoSectionBg() {
        var pageSection = $(".bg-img, section");

        pageSection.each(function (indx) {
            var myEl = $(this);
            var myBg = myEl.data("wavo-background");
            if ( myBg ) {
                myEl.css("background-image", "url(" + myBg + ")");
            }
        });
    }

    /* wavoBlgImg */
    function wavoBlgImg() {
        var myBlgImg = $(".nt-blog-grid .post-img .img");
        if ( myBlgImg ) {
            var blgImg = myBlgImg.outerHeight() + 120;
            $(".nt-blog-grid .bg-pattern").css("height", blgImg);
        }
    }

    /* wavoBackToTop */
    function wavoBackToTop() {

        //Scroll back to top
        var progressPath = document.querySelector('.progress-wrap path');
        if ( progressPath ) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);
            var offset = 150;
            var duration = 550;
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.progress-wrap').addClass('active-progress');
                } else {
                    jQuery('.progress-wrap').removeClass('active-progress');
                }
            });
            jQuery('.progress-wrap').on('click', function (event) {
                event.preventDefault();
                jQuery('html, body').animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
    }

    /* simpleParallax*/
    function wavoSimpleParallax() {
        var imageUp = document.getElementsByClassName('thumparallax');
        var imageDown = document.getElementsByClassName('thumparallax-down');
        if ( imageUp.length || imageDown.length ) {
            new simpleParallax(imageUp, {
                delay: 1
            });
            new simpleParallax(imageDown, {
                orientation: 'down',
                delay: 1
            });
        }
    }

    /* hide-show navbar */
    function wavoNavi() {
        var navi = $('#navi');
        if ( navi ) {

            var didScroll;
            var lastScrollTop = 0;
            var delta = 5;
            var navbarHeight = navi.outerHeight();
            $(window).on("scroll", function (event) {
                didScroll = true;
            });

            var hasScrolled = function() {

                var st = $(this).scrollTop();

                if (st > lastScrollTop && st > navbarHeight) {
                    navi.css('top', '-100px');
                }

                lastScrollTop = st;
            }

            setInterval(function () {
                if ( didScroll ) {

                    hasScrolled;
                    didScroll = false;
                }
            }, 250);
        }
    }

    // wavoHeadingSplit
     function wavoHeadingSplit() {
         $('body:not(.split-animation-none) .wavo-headig-split').each(function () {
             var myElement = $(this);
             var myId      = myElement.data( 'id' );
             var myData    = myElement.data( 'split-settings' );
             var mySplit   = myElement.find( '.elementor-heading-title' );
             if ( myElement.hasClass( 'wavo-headig-split' ) && myData ) {
                var myType = myData.type ? myData.type : 'chars';
                mySplit.addClass('wow');
                Splitting({
                    target: mySplit,
                    by: myType
                });
             }
         });
     }

    /* Wow Animation */
    function wavoWow() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100
        });
        wow.init();

        var wow2 = new WOW({
            boxClass: 'wow2',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        });
        wow2.init();
    }

    /* fade slideshow  */
    function wavofadeSlideshow() {
        $(window).scroll(function () {
            var scrolled = $(this).scrollTop();
            $('.slider .caption').css({
                'transform': 'translate3d(0, ' + -(scrolled * 0.20) + 'px, 0)',
                'opacity': 1 - scrolled / 600
            });
        });
    }

    /* fade slideshow  */
    function splitHeading() {

        var splitElement = $('.nt-sidebar-inner-widget-title');
        splitElement.each(function (indx) {
            var myText = $(this).text().split(' ').slice(-1)[0];
            if( myText ) {
                $(this).html($(this).html().replace(myText,'<span class="stroke">'+myText+'<span>'));
            }
        });
    }

    function ntrUITooltip() {
        var myTooltips = $('[data-wavo-ui-tooltip]');
        if (myTooltips.length) {
            myTooltips.each(function(i, el) {
                var myTooltip = $(el);
                var myData = myTooltip.data('wavoUiTooltip');
                if (!myData) {
                    return true; // next iteration
                }
                var myPosition = {};
                var myClasses = {
                    'ui-tooltip': 'ui-corner-all ui-widget-shadow'
                };
                if (myData.position === 'top') {
                    myPosition.my = 'center bottom-25';
                    myPosition.at = 'center top';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-top'
                    };
                }
                if (myData.position === 'left') {
                    myPosition.my = 'right-25 center';
                    myPosition.at = 'left center';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-left'
                    };
                }
                if (myData.position === 'right') {
                    myPosition.my = 'left+25 center';
                    myPosition.at = 'right center';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-right'
                    };
                }
                if (myData.position === 'bottom') {
                    myPosition.my = 'center top+25';
                    myPosition.at = 'center bottom';
                    myClasses = {
                        'ui-tooltip': 'ui-corner-all ui-widget-shadow is-bottom'
                    };
                }
                myTooltip.tooltip({
                    classes: myClasses,
                    position: myPosition,
                    items: myTooltip,
                    content: function() {
                        return myData.content;
                    }
                });
            });
        }
    }

    function ntrLightbox() {
        var myLightboxes = $('[data-wavo-lightbox]');
        if (myLightboxes.length) {
            myLightboxes.each(function(i, el) {
                var myLightbox = $(el);
                var myData = myLightbox.data('wavoLightbox');
                var myOptions = {};
                if (!myData || !myData.type) {
                    return true; // next iteration
                }
                if (myData.type === 'gallery') {
                    if (!myData.selector) {
                        return true; // next iteration
                    }
                    myOptions = {
                        delegate: myData.selector,
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    };

                }
                if (myData.type === 'image') {
                    myOptions = {
                        type: 'image'
                    };
                }
                if (myData.type === 'iframe') {
                    myOptions = {
                        type: 'iframe'
                    };
                }
                if (myData.type === 'inline') {
                    myOptions = {
                        type: 'inline',
                    };
                }
                if (myData.type === 'modal') {
                    myOptions = {
                        type: 'inline',
                        modal: false
                    };
                }
                if (myData.type === 'ajax') {
                    myOptions = {
                        type: 'ajax',
                        overflowY: 'scroll'
                    };
                }
                myLightbox.magnificPopup(myOptions);
            });
        }
    }

    // wavoPopupTemplate
    function wavoPopupTemplate() {
        var myPopups = $('.wavo-popup-item');
        if ( !myPopups.length ) {
            return;
        }
        myPopups.each(function (i, el) {
            var myPopup = $(el),
                myId    = myPopup.attr('id'),
                myEl    = $('body a[href="#'+myId+'"]' );

            if ( myEl.length ) {
                myEl.addClass('wavo-open-popup');
            }
        });
        $(".wavo-open-popup").magnificPopup({
            type: 'inline',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'scroll',
            closeBtnInside: false,
            preloader: false,
            midClick: true,
            removalDelay: 0,
            mainClass: 'wavo-mfp-slide-bottom',
            tClose: '',
            tLoading: '',
            callbacks: {
                open: function() {},
                close: function() {}
            }
        });
    }

    // ntrNavMenus
    function wavoNavMenus() {
        $('[data-ntr-custom-header]').each(function (i, el) {
            var myHeader = $(el);
            if (myHeader.length) {
                myHeader.find('.header_nav_sub').each(function (i, eli) {
                    var $_this = $(eli);
                    $_this.find('> ul > li').each(function (i, eli) {
                        var $_this = $(eli);
                        $_this.attr( 'style', '--char-index:'+i );
                    });
                });
                if (myHeader.hasClass('is-split')) {
                    if ( $('body').hasClass('split-animation-enabled') ) {
                        Splitting({
                            target: '.button_text',
                        });
                    }
                }
                myHeader.each(function (i, ell) {
                    var myHeader2 = $(ell);
                    var myHeaderNav = myHeader2.find('.header_nav');
                    var myHeaderNavArrows = $('.header_nav_arrow', myHeaderNav);
                    var myHeaderNavToggle = $('.header_nav_toggle', myHeader);
                    var myHeaderNavClose = $('.header_nav_close', myHeader);
                    var myHeaderHandlers = {
                        navOpen: function () {
                            myHeaderNav.addClass('is-active');
                            $(document).on('click.ntrHeaderNav', function (e) {
                                if (!$(e.target).closest(myHeaderNavToggle).length) {
                                    if (!$(e.target).closest(myHeaderNav).length) {
                                        myHeaderHandlers.navClose();
                                    }
                                }
                            });
                            $(document).on('keyup.ntrHeaderNav', function (e) {
                                if (e.keyCode === 27) {
                                    myHeaderHandlers.navClose();
                                }
                            });
                        },
                        navClose: function () {
                            myHeaderNav.removeClass('is-active');
                            $(document).off('click.ntrHeaderNav');
                            $(document).off('keyup.ntrHeaderNav');
                        },
                    };

                    // Conditional Handlers
                    var myMedia = window.matchMedia('(max-width: 1199px)');
                    var myMediaHandler = function (m) {
                        if (m.matches) {
                            myHeaderNavToggle.on('click.ntrHeaderNavToggle', function (e) {
                                e.preventDefault();
                                if (myHeaderNav.hasClass('is-active')) {
                                    myHeaderHandlers.navClose();
                                } else {
                                    myHeaderHandlers.navOpen();
                                }
                            });
                            myHeaderNavClose.on('click.ntrHeaderNavClose', function (e) {
                                e.preventDefault();
                                myHeaderHandlers.navClose();
                            });
                            myHeaderNavArrows.on('click.ntrHeaderNavArrows', function (e) {
                                e.preventDefault();
                                var myArrow = $(this);
                                var myParent = myArrow.parent('li');
                                if (myParent.hasClass('is-active')) {
                                    myParent.removeClass('is-active');
                                    $('.icon', myArrow).toggleClass('is-arrow-up2 is-arrow-down2');
                                } else {
                                    myParent.addClass('is-active');
                                    $('.icon', myArrow).toggleClass('is-arrow-down2 is-arrow-up2');
                                }
                            });
                        } else {
                            // Remove Nav Events
                            $(document).off('click.ntrHeaderNav');
                            $(document).off('keyup.ntrHeaderNav');
                            myHeaderNavToggle.off('click.ntrHeaderNavToggle');
                            myHeaderNavClose.off('click.ntrHeaderNavClose');
                            myHeaderNavArrows.off('click.ntrHeaderNavArrows');
                        }
                    };
                    myMedia.addListener(myMediaHandler);
                    myMediaHandler(myMedia);

                    // Sticky
                    if (myHeader.hasClass('is-sticky')) {
                        var myWindow = $(window);
                        var myHeaderHolder = $('.header_holder', myHeader);
                        var myHeaderContainer = $('.header_container', myHeader);
                        var mystickyOffset = myHeader.attr('data-ntr-sticky-offset');
                        var myHeaderHeight = myHeaderContainer.outerHeight();
                        var mystickyOffset = myHeaderContainer.offset().top;
                        var mystickyOffsetone = mystickyOffset ? mystickyOffset : myHeaderHeight;
                        var mystickyOffsetTwo = mystickyOffset ? mystickyOffset+myHeaderHeight : 1;
                        var myHeaderTimer;
                        if (!myHeader.hasClass('is-overlay')) {
                            myHeaderHolder.css({'height': myHeaderHeight});
                        }
                        myWindow.on('scroll', function() {
                            if (myHeaderTimer) {
                                clearTimeout(myHeaderTimer);
                            }

                            if (myWindow.scrollTop() > mystickyOffsetone) {
                                myHeader.addClass('is-sticky-active');
                            } else if (myWindow.scrollTop() < mystickyOffsetTwo ) {
                                myHeader.removeClass('is-sticky-active');
                            }
                        });
                    }
                });
            }
        });
    }

    function wavoAnimationFix() {
        $('body:not(.elementor-page) .elementor-invisible').each(function () {

            var myEl = $( this ),
            animData  = myEl.data('settings'),
            animName  = animData._animation,
            animDelay = animData._animation_delay;
            myEl.addClass( 'wow2 '+ animName );

            myEl.css({
                "animation-name": animName,
            });

        });
    }

    function wavoHeaderLnag() {

        $('.lang-select .lang-item.active').on('click', function (e) {
            $('.lang-select').toggleClass("lang-active");
            var lang = $(this);
            var sublang = lang.parent().find('.sub-list');
            if ( sublang.hasClass( 'show' ) ) {
                sublang.removeClass( 'show' );
            } else {
                sublang.addClass( 'show' );
            }
        });

        $('.lang-select .sub-lang-item a').on('click', function (e) {

            var sublang = $(this);
            var langText = sublang.text();
            var activeLangText = $('.lang-select .lang-item.active .uppercase').text();
            var sublangList = sublang.parents('.sub-list');

            sublangList.removeClass( 'show' );

            $('.lang-select .lang-item.active .uppercase').html(langText);
            sublang.html(activeLangText);
        });
    }

    function wavoImageReveal() {

        $('.wavo-image-reveal').each(function () {
            var myEl = $( this ),
            animData = myEl.data('image-reveal-settings'),
            pos = animData.orientation,
            offset = animData.offset,
            once = animData.once,
            delay = animData.delay;
            myEl.find('.elementor-widget-container')
            .addClass('reveal-holder')
            .attr({"data-aos":"reveal-item","data-aos-delay": delay,"data-aos-offset": offset,"data-aos-once": once})
            .prepend( '<div class="reveal-block '+pos+'" data-aos="reveal-'+pos+'"></div>' );
            myEl.find('.reveal-block')
            .attr({"data-aos-delay": delay,"data-aos-offset": offset,"data-aos-once": once});
        });
        if ( $('.wavo-image-reveal').length ) {
            AOS.init({
                duration: 500,
                easing: 'ease-out-quart',
                mirror: true,
            });
        }
    }

    // NtVegas Preview function
    function wavoVegasSlider() {
        $(".home-slider-vegas-wrapper").each(function (i, el) {
            var myEl         = jQuery(el),
                myVegasId    = myEl.find('.nt-home-slider-vegas').attr('id'),
                myVegas      = $( '#' + myVegasId ),
                myPrev       = myEl.find('.vegas-control-prev'),
                myNext       = myEl.find('.vegas-control-next'),
                mySettings   = myEl.find('.nt-home-slider-vegas').data('slider-settings'),
                myContent    = myEl.find('.nt-vegas-slide-content'),
                myCounter    = myEl.find('.nt-vegas-slide-counter'),
                mySocials    = myEl.find('.social .icon');

            myEl.parents('.elementor-widget-wavo-vegas-slider').removeClass('elementor-invisible');

            if( mySettings.slides.length ) {
                var slides = mySettings.slides,
                    anim   = mySettings.animation ? mySettings.animation : 'kenburns',
                    trans  = mySettings.transition ? mySettings.transition : 'slideLeft',
                    delay  = mySettings.delay ? mySettings.delay : 7000,
                    dur    = mySettings.duration ? mySettings.duration : 2000,
                    autoply= mySettings.autoplay,
                    shuf   = 'yes' == mySettings.shuffle ? true : false,
                    timer  = 'yes' == mySettings.timer ? true : false,
                    over   = 'none' != mySettings.overlay ? true : false;

                myVegas.vegas({
                    autoplay: autoply,
                    delay: delay,
                    timer: timer,
                    shuffle: shuf,
                    animation: anim,
                    transition: trans,
                    transitionDuration: dur,
                    overlay: over,
                    slides: mySettings.slides,
                    init: function (globalSettings) {
                        myContent.eq(0).addClass('active');
                        var total = myContent.length;
                        myCounter.find('.total').html(total);
                    },
                    walk: function (index, slideSettings) {
                        myContent.removeClass('active').eq(index).addClass('active');
                        var current = index +1;
                        myCounter.find('.current').html(current);
                    },
                    end: function (index, slideSettings) {
                    }
                });

                myPrev.on('click', function () {
                    myVegas.vegas('previous');
                });

                myNext.on('click', function () {
                    myVegas.vegas('next');
                });

                mySocials.on( 'click', function () {
                    $( this ).parent().toggleClass( "active" );
                });
            }
        });
    }
    // NtVegas Preview function
    function wavoVegasTemplate() {
        $(".slider-vegas-template-wrapper").each(function () {
            var myEl         = $(this),
                myVegasId    = myEl.find('.slider-vegas-template').attr('id'),
                myVegas      = $( '#' + myVegasId ),
                myPrev       = myEl.find('.vegas-control-prev'),
                myNext       = myEl.find('.vegas-control-next'),
                mySettings   = myEl.find('.slider-vegas-template').data('slider-settings'),
                myContent    = myEl.find('.elementor-top-section'),
                myCounter    = myEl.find('.nt-vegas-slide-counter'),
                mySocials    = myEl.find('.social .icon');

            myEl.parents('.elementor-widget-wavo-vegas-template').removeClass('elementor-invisible');

            var mySlides = [];
            myEl.find( '.elementor-top-section' ).each( function(){
                var mySlide = $(this),
                    bgImage = mySlide.css('background-image');
                    bgImage = bgImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''),
                    bgImage = {"src": bgImage};

                mySlides.push( bgImage );
                mySlide.addClass('vegas-slide-template-section').css({
                    'background-image' : 'none',
                    'background-color' : 'transparent',
                });
            });

            if( mySlides.length ) {
                var anim   = mySettings.animation ? mySettings.animation : 'kenburns',
                    trans  = mySettings.transition ? mySettings.transition : 'slideLeft',
                    delay  = mySettings.delay ? mySettings.delay : 7000,
                    dur    = mySettings.duration ? mySettings.duration : 2000,
                    autoply= mySettings.autoplay,
                    shuf   = 'yes' == mySettings.shuffle ? true : false,
                    timer  = 'yes' == mySettings.timer ? true : false,
                    over   = 'none' != mySettings.overlay ? true : false;

                myVegas.vegas({
                    autoplay: autoply,
                    delay: delay,
                    timer: timer,
                    shuffle: shuf,
                    animation: anim,
                    transition: trans,
                    transitionDuration: dur,
                    overlay: over,
                    slides: mySlides,
                    init: function (globalSettings) {
                        myContent.eq(0).addClass('active');
                        var total = myContent.length;
                        myCounter.find('.total').html(total);
                        myContent.find( '[data-split-settings]' ).each( function(){
                            var mySplit = $(this),
                                myData = mySplit.data('split-settings'),
                                myAnim = myData.animation;
                            myContent.find('.elementor-heading-title').removeClass('wow animated');
                        });
                        myContent.each( function(){
                            var myElAnim = $(this).find( '.elementor-element[data-settings]' ),
                                myData = myElAnim.data('settings'),
                                myAnim = myData && myData._animation ? myData._animation : '',
                                myDelay = myData && myData._animation_delay ? myData._animation_delay / 1000 : '';

                            if (myData && myAnim ) {
                                myElAnim.removeClass( 'animated' );
                                $(this).find(myElAnim).css({
                                    'animation-delay' : myDelay+'s',
                                });
                            }
                        });
                    },
                    walk: function (index, slideSettings) {

                        myContent.removeClass('active').eq(index).addClass('active');

                        myContent.find( '[data-split-settings]' ).each( function(){
                            var mySplit = $(this),
                                myData = mySplit.data('split-settings'),
                                myAnim = myData.animation;

                                myContent.find('.elementor-heading-title').removeClass('animated');
                                myContent.eq(index).find('.elementor-heading-title').addClass('animated');
                        });

                        myContent.each( function(){
                            var myElAnim = $(this).find( '.elementor-element[data-settings]' ),
                                myData = myElAnim.data('settings'),
                                myAnim = myData && myData._animation ? myData._animation : '',
                                myDelay = myData && myData._animation_delay ? myData._animation_delay / 1000 : '';

                            if (myData && myAnim ) {
                                myElAnim.removeClass( 'animated ' + myAnim );
                                myContent.eq(index).find(myElAnim).addClass('animated ' + myAnim);
                            }
                        });
                        var current = index +1;
                        myCounter.find('.current').html(current);
                    },
                    end: function (index, slideSettings) {
                    }
                });

                myPrev.on('click', function () {
                    myVegas.vegas('previous');
                });

                myNext.on('click', function () {
                    myVegas.vegas('next');
                });
            }
        });
    }
    // wavoFixedSection
    function wavoFixedSection() {
        var myFixedSection = $('.wavo-section-fixed-yes');

        if ( myFixedSection.length ) {
            myFixedSection.parents('[data-elementor-type="section"]').addClass( 'wavo-section-fixed wavo-custom-header' );
            myFixedSection.parents('[data-elementor-type="header"]').addClass("wavo-section-fixed wavo-custom-header");
            $(window).on("scroll", function () {
                var bodyScroll = $(window).scrollTop();
                if ( bodyScroll>100 ) {
                    myFixedSection.parents('[data-elementor-type="section"]').addClass( 'section-fixed-active' );
                    myFixedSection.parents('[data-elementor-type="header"]').addClass( 'section-fixed-active' );
                } else {
                    myFixedSection.parents('[data-elementor-type="section"]').removeClass( 'section-fixed-active' );
                    myFixedSection.parents('[data-elementor-type="header"]').removeClass( 'section-fixed-active' );
                }
            });
        }
    }

    class ShapeOverlays {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.find('path');
            this.numPoints = 18;
            this.duration = 600;
            this.delayPointsArray = [];
            this.delayPointsMax = 300;
            this.delayPerPath = 100;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            const range = 4 * Math.random() + 6;
            for (var i = 0; i < this.numPoints; i++) {
                const radian = i / (this.numPoints - 1) * Math.PI;
                this.delayPointsArray[i] = (Math.sin(-radian) + Math.sin(-radian * range) + 2) / 4 * this.delayPointsMax;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.addClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.removeClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints + 1; i++) {
                points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? 'M 0 0 V ' + points[0] : 'M 0 ' + points[0];
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += ' C ' + cp +' '+ points[i] +' '+ cp +' '+ points[i + 1] +' '+ p +' '+ points[i + 1];
            }
            str += (this.isOpened) ? 'V 0 H 0' : 'V 100 H 0';
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }

    class ShapeOverlays2 {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.find('path');
            this.numPoints = 4;
            this.duration = 800;
            this.delayPointsArray = [];
            this.delayPointsMax = 180;
            this.delayPerPath = 70;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            const range = Math.random() * Math.PI * 2;
            for (var i = 0; i < this.numPoints; i++) {
                const radian = (i / (this.numPoints - 1)) * Math.PI * 2;
                this.delayPointsArray[i] = (Math.sin(radian + range) + 1) / 2 * this.delayPointsMax;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.addClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.removeClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? 'M 0 0 V ' + points[0] : 'M 0 ' + points[0];
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += ' C ' + cp +' '+ points[i] +' '+ cp +' '+ points[i + 1] +' '+ p +' '+ points[i + 1];
            }
            str += (this.isOpened) ? 'V 0 H 0' : 'V 100 H 0';
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }
    class ShapeOverlays3 {
        constructor(elm) {
            this.elm = elm;
            this.path = elm.find('path');
            this.numPoints = 2;
            this.duration = 600;
            this.delayPointsArray = [];
            this.delayPointsMax = 0;
            this.delayPerPath = 200;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {
            this.isAnimating = true;
            for (var i = 0; i < this.numPoints; i++) {
                this.delayPointsArray[i] = 0;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.addClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.removeClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                const thisEase = this.isOpened ?
                (i == 1) ? ease.cubicOut : ease.cubicInOut:
                (i == 1) ? ease.cubicInOut : ease.cubicOut;
                points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }

            let str = '';
            str += (this.isOpened) ? 'M 0 0 V ' + points[0] : 'M 0 ' + points[0];
            for ( var i = 0; i < this.numPoints - 1; i++ ) {
                var p = (i + 1) / (this.numPoints - 1) * 100;
                var cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += ' C ' + cp +' '+ points[i] +' '+ cp +' '+ points[i + 1] +' '+ p +' '+ points[i + 1];
            }
            str += (this.isOpened) ? 'V 0 H 0' : 'V 100 H 0';
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }
    class ShapeOverlays4 {
        constructor(elm) {
            this.elm              = elm;
            this.path             = elm.find('path');
            this.numPoints        = 4;
            this.duration         = 1000;
            this.delayPointsArray = [];
            this.delayPointsMax   = 0;
            this.delayPerPath     = 60;
            this.timeStart        = Date.now();
            this.isOpened         = false;
            this.isAnimating      = false;
        }
        toggle() {
            this.isAnimating = true;
            for (var i = 0; i < this.numPoints; i++) {
                this.delayPointsArray[i] = 0;
            }
            if (this.isOpened === false) {
                this.open();
            } else {
                this.close();
            }
        }
        open() {
            this.isOpened = true;
            this.elm.addClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {
            this.isOpened = false;
            this.elm.removeClass('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {
            const points = [];
            for (var i = 0; i < this.numPoints; i++) {
                const thisEase = (i % 2 === 1) ? ease.sineOut : ease.exponentialInOut;
                points[i] = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
            }

            let str = '';
            str += (this.isOpened) ? 'M 0 0 H ' + points[0] : 'M ' + points[0] + ' 0';
            for (var i = 0; i < this.numPoints - 1; i++) {
                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += ' C ' + points[i] +' '+ cp +' '+ points[i + 1] +' '+ cp +' '+ points[i + 1] +' '+ p;
            }
            str += (this.isOpened) ? 'H 100 V 0' : 'H 0 V 0';
            return str;
        }
        render() {
            if (this.isOpened) {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {
                for (var i = 0; i < this.path.length; i++) {
                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {
            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
                requestAnimationFrame(() => {
                    this.renderLoop();
                });
            }
            else {
                this.isAnimating = false;
            }
        }
    }
    function shapeOverlaysMenu() {
        $('.wavo-shape-overlay-menu').each(function(){
            const elmNavi      = $(this);
            const elmHamburger = elmNavi.find('.hamburger');
            const gNavItems    = elmNavi.find('.global-menu__item');
            const elmOverlay   = elmNavi.find('.shape-overlays');
            var overlay        = new ShapeOverlays(elmOverlay);

            if ( $(elmNavi).hasClass('demo-2') ){
                overlay = new ShapeOverlays2(elmOverlay);
            }
            if ( $(elmNavi).hasClass('demo-3') ){
                overlay = new ShapeOverlays3(elmOverlay);
            }
            if ( $(elmNavi).hasClass('demo-4') ){
                overlay = new ShapeOverlays4(elmOverlay);
            }

            $(elmHamburger).on('click', function() {
                if (overlay.isAnimating) {
                    return false;
                }
                overlay.toggle();
                if (overlay.isOpened === true) {
                    elmNavi.addClass('is-opened-navi');
                    elmHamburger.addClass('is-opened-navi');
                    for (var i = 0; i < gNavItems.length; i++) {
                        $(gNavItems[i]).addClass('is-opened');
                    }
                } else {

                    for (var i = 0; i < gNavItems.length; i++) {
                        $(gNavItems[i]).removeClass('is-opened');
                    }
                    setTimeout(function(){
                    elmNavi.removeClass('is-opened-navi');
                    elmHamburger.removeClass('is-opened-navi');
                    }, 1000);
                }
            });

            for (var i = 0; i < gNavItems.length; i++) {
                $(gNavItems[i]).on('click', function() {
                    if (overlay.isAnimating) {
                        return false;
                    }
                    overlay.toggle();
                    if (overlay.isOpened === true) {
                        elmNavi.addClass('is-opened-navi');
                        elmHamburger.addClass('is-opened-navi');
                        for (var i = 0; i < gNavItems.length; i++) {
                            $(gNavItems[i]).addClass('is-opened');
                        }
                    } else {

                        for (var i = 0; i < gNavItems.length; i++) {
                            $(gNavItems[i]).removeClass('is-opened');
                        }
                        setTimeout(function(){
                        elmNavi.removeClass('is-opened-navi');
                        elmHamburger.removeClass('is-opened-navi');
                        }, 1000);
                    }
                });
            }
        });
    }

    function wavoCustomScrollbar() {
        if( ! $('.page-template-locomotive-pag').length ) {
            if( $('#main-scrollbar').length ) {
                $('html').addClass('has-custom--scrollbar');
                var myScrollData= $('#main-scrollbar').data('wavo-scrollbar');
                SmoothScroll(
                    {
                        // Scrolling Core
                        animationTime    : myScrollData.time, // [ms]
                        stepSize         : myScrollData.step, // [px]
                        // Acceleration
                        accelerationDelta : myScrollData.delta,  // 50
                        accelerationMax   : myScrollData.max,   // 3
                        // Keyboard Settings
                        keyboardSupport   : true,  // option
                        arrowScroll       : 10,    // [px]
                        // Pulse (less tweakable)
                        // ratio of "tail" to "acceleration"
                        pulseAlgorithm    : true,
                        pulseScale        : 4,
                        pulseNormalize    : 1,
                        // Other
                        touchpadSupport   : false, // ignore touchpad by default
                        fixedBackground   : true,
                        excluded          : ''
                    }
                );
            }
        }
    }

    function projectsLoadMore(){
        if( ! $('.wavo-loadmore-button').length ) {
            return;
        }
        $(document).on('click', '.wavo-loadmore-button:not(.no-more)', function(event){

            event.preventDefault();
            var btn     = $(this);
            var container = btn.parents('.portfolio');
            var obj     = btn.data('loadmore');
            var title   = obj.loadmore;
            var loading = obj.loading;
            var more    = obj.nomore;

            var data = {
                cache      : false,
                action     : 'wavo_gallery_load_more',
                beforeSend : function() {
                    var height = container.find('.gallery').height();
                    container.find('.gallery').css('min-height',height);
                    btn.addClass('ajax-loading').find('span').html(loading);
                },
                'ajaxurl'      : obj.ajaxurl,
                'query_type'   : obj.query_type,
                'post_type'    : obj.post_type,
                'per_page'     : obj.per_page,
                'taxonomy'     : obj.taxonomy,
                'order'        : obj.order,
                'orderby'      : obj.orderby,
                'max_page'     : obj.max_page,
                'current_page' : obj.current_page,
                'column'       : obj.column,
                'linktype'     : obj.linktype,
                'hidetitle'    : obj.hidetitle,
                'hideexcerpt'  : obj.hideexcerpt,
                'edit_mode'    : obj.edit_mode
            };
            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            $.post(obj.ajaxurl, data, function(response) {

                container.find('.gallery').append(response);
                obj.current_page++;

                var $container = container.find('.gallery');
                $container.isotope('destroy');
                $container.isotope({
                    itemSelector : '.items',
                    layoutMode   : obj.layoutmode
                });

                if ( $('body').hasClass('split-animation-enabled') && $('.added-item [data-splitting]').length ) {
                    Splitting();
                }

                $('html, body').animate({
                   scrollTop: $container.height() - 30},
                   1400
                );
                container.find('.gallery').css('min-height','auto');

                btn.removeClass('ajax-loading').find('span').html(title);

                if ( obj.current_page == obj.max_page ) {
                    btn.removeClass('ajax-loading').addClass('no-more').find('span').html(more);
                    setTimeout(function(){
                        btn.parent().slideUp('slow');
                    },2500);
                    container.addClass('all-loaded');
                }
            });
        });
    }

    $( document ).ready( function() {

        $('a').on('click', function () {
           $(window).on('beforeunload', function(){
                $('body').addClass('page-transition-start');
            });
        });
        if ( $(".home-slider-vegas-wrapper").length ) {
            $.vegas.isVideoCompatible = function () {
                return true;
            }
        }
        if ( $(window).width() <= 1024 ) {
            $('body').removeClass('nt-desktop').addClass('nt-mobile');
        } else {
            $('body').removeClass('nt-mobile').addClass('nt-desktop');
        }

        $(window).on('resize', function () {
            if ( $(window).width() <= 1024 ) {
                $('body').removeClass('nt-desktop').addClass('nt-mobile');
            } else {
                $('body').removeClass('nt-mobile').addClass('nt-desktop');
            }
        });
        wavoHeader();
        wavoSidebarMenu();
        wavoHeaderLang();
        wavoRelatedSlider();
        wavoSwiperSlider();
        wavoMouseHover();
        wavoSectionBg();
        wavoBlgImg();
        wavoBackToTop();
        wavoNavi();
        wavofadeSlideshow();
        ntrUITooltip();
        ntrLightbox();
        wavoSingleParallaxie();
        wavoAnimationFix();
        wavoImageReveal();
        wavoNavMenus();
        wavoVegasSlider();
        wavoVegasTemplate();
        wavoCustomScrollbar();
        wavoHeadingSplit();
        wavoFixedSection();
        //wavoOnePagePopupVideoFix();
        wavoPopupTemplate();
        projectsLoadMore();
        if ( $('.wavo-shape-overlay-menu').length){
            shapeOverlaysMenu();
        }
        if ( $('.open-lightbox').length ) {
            $('.open-lightbox').magnificPopup({
                type: 'image',
                gallery:{
                    enabled:true
                }
            });
        }
        if ( $('body').hasClass('split-animation-enabled') ) {
            if ( $('[data-splitting]').length ) {
                Splitting();
            }
        }
    });


    // === window When Loading === //
    $( window ).on("load", function () {

        $('body').addClass('page-loaded');

        /* ===============================  Preloader page  =============================== */
        if ( $('body').hasClass('preloader-on') && $('body').hasClass('preloader-default') ) {

            var counter = 0;
            var count = 0;
            var i = setInterval(function() {
              $(".pace-progress").css('transform','translate3d('+count+'%, 0px, 0px)');

              counter++;
              count++;

              if ( counter == 100 ) {
                clearInterval(i);
                $('#preloader,.loading-text').addClass("isdone");
                $('.pace').addClass("pace-inactive");
              }
            });
        }

        wavoWow();

        if ( $('body').hasClass('split-animation-enabled') ) {
            if ( $('[data-splitting]').length ) {
                Splitting();
            }
        }

        $('body.split-animation-enabled .wavo-headig-split').each(function () {
            var myElement = $(this);
            var myId      = myElement.data( 'id' );
            var myData    = myElement.data( 'split-settings' );
            var mySplit   = myElement.find( '.elementor-heading-title' );
            if ( myElement.hasClass( 'wavo-headig-split' ) && myData ) {
               var myType = myData.type ? myData.type : 'chars';
               mySplit.addClass('wow');
               Splitting({
                   target: mySplit,
                   by: myType
               });
            }
        });

        wavoSimpleParallax();

    });

})(window, document, jQuery);
