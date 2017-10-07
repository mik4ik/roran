$(document).ready(function() {

    function sliderTeam() {
        var slider = $("#lightSlider").lightSlider({
            speed: 400, //ms'
            auto: true,
            loop: true,
            slideEndAnimation: true,
            pause: 3000,
            controls: false,
            responsive : [
                {
                    breakpoint:800,
                    settings: {
                        item:2
                    }
                },
                {
                    breakpoint:600,
                    settings: {
                        item:1
                    }
                }
            ]
        });

        $('.lSAction .lSPrev').click(function() {
            slider.goToPrevSlide();
        });
        $('.lSAction .lSNext').click(function() {
            slider.goToNextSlide();
        });
    }
    sliderTeam();

    function portfolioSort() {
        $('.b-portfolio__list').mixItUp({
            showOnLoad : 'icon',
            targetSelector: '.b-portfolio__item',
            filterSelector: '.filter',
            effects: ['fade'],
            easing: 'snap'
        });
    }
    portfolioSort();

    function anchorClick() {
        $(".js-anchor").click(function () {
            var $withoutHash = $(this).attr('href').split('#');
            var $margin = ($withoutHash[1] == 'about') ? 0 : 60;
            if ($withoutHash[1].length > 3) {
                $("html, body").animate({
                    scrollTop: $('#' + $withoutHash[1]).offset().top - $margin
                }, {
                    duration: 1000,
                    easing: "swing"
                });
            }
            if ($('.m-btn').length) {
                $('.m-btn').toggleClass('open');
                $('.c-nav').slideToggle();
            }
            return false;
        });

    }
    anchorClick();

    function anchorCurrent() {
        $(window).scroll(function () {
            if($(window).scrollTop() >= $('.b-header').height() + 115){
                $('.b-menu').addClass('b-menu--fixed');
            }else {
                $('.b-menu').removeClass('b-menu--fixed');
            }

            var $sections = $('.js-section');
            $sections.each(function (i, el) {
                var top = $(el).offset().top - 65;
                var bottom = top + $(el).height();
                var scroll = $(window).scrollTop();
                var id = $(el).attr('id');
                if (scroll > top && scroll < bottom) {
                    $('.c-nav__item--active').removeClass('c-nav__item--active');
                    $('a[href*="#' + id + '"]').addClass('c-nav__item--active');
                }
            });
        });
    }
    anchorCurrent();

    function btnMobile() {
        if ($(window).width() < 768 && !$('.m-btn').length) {
            $('<div class="m-btn"><div class="m-btn__icon"></div></div>').appendTo('.b-menu');
            $('.m-btn').click (function(){
                $(this).toggleClass('open');
                $('.c-nav').slideToggle();
            });
        } else if ($(window).width() > 768 && $('.m-btn').length) {
            $('.m-btn').remove();
            $('.c-nav').css('display', '');
        }
    }
    btnMobile();

    $(window).resize(function () {
        btnMobile();
    });

});
