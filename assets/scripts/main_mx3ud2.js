$ = jQuery.noConflict();

$(window).load(function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
	
	$("#masthead").addClass("active");
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
	
    if (scroll >= 500) {
        $("#masthead").removeClass("active");
    }else{
		$("#masthead").addClass("active");
	}
});

$(document).ready(function() {

    AOS.init({
        once: true,
        duration: 1300,
        disable: 'mobile'
    });

    if(window.innerWidth >= 1200) {

        $( window ).scroll(function() {

            var currentScrollPos = window.pageYOffset;

            prevScrollpos = currentScrollPos;

            if($('.home.page-template-default').length > 0) {
                if (currentScrollPos == 0) {
                    $('header.site-header').addClass('active');
                } else {
                    $('header.site-header').removeClass('active');
                }
            }

            if (currentScrollPos == 0) {
                $('nav.nav').removeClass('scroll-bottom');
            } else {
                $('nav.nav').addClass('scroll-bottom');
            }
        });

    }

    // ==========================================================
    // =================================================== HEADER
    // ==========================================================

    if(window.innerWidth >= 1200) {
        if($('.home.page-template-default').length > 0) {
            if(window.pageYOffset == 0) {
                $('header.site-header').addClass('active');
            }
        }
    }
        
    $('#nav-icon4').click(function() {
        // e.preventDefault();
        $('.nav--content .content--menus').toggleClass('active');
        $(this).children().toggleClass('active');
    });

    
    // ==========================================================
    // ================================================ HOME PAGE
    // ==========================================================

    //Carousel Cabecera motos
    $('.carousel-home-header').owlCarousel({
        loop:true,
        margin:0,
        autoplay:true,
        autoplayTimeout:3000,
        smartSpeed: 1000,
        items: 1
    });

    $('.carousel-home-header-responsive').owlCarousel({
        loop:true,
        margin:0,
        autoplay:false,
        // autoplayTimeout:3000,
        // smartSpeed: 1000,
        items: 1
    });

    if($('.spr-contents').length > 0) {
        $altura = $('.tab-content.visible').outerHeight() + 80;
        $('.spr-contents').css('height', $altura);
    }

    /*--------------------------------------------------------------
    # Tabs click
    --------------------------------------------------------------*/
    $('.tab-thumbcont').click(function(){
        // alert($(this).attr('data-tab'));
        if (!$(this).hasClass('active')){
            $('.tab-thumbcont').not(this).removeClass('active');
            $(this).toggleClass('active');
            $('.tab-content[data-target="' + $(this).attr('data-tab') + '"]').toggleClass('visible').siblings().removeClass('visible');
        }
    });  
    
    $('.prodtab').click(function(){
        if (!$(this).hasClass('active')){
            $('.prodtab').not(this).removeClass('active');
            $(this).toggleClass('active');
            $('.srp-prodcontent-cont[data-target="' + $(this).attr('data-tab') + '"]').toggleClass('visible').siblings().removeClass('visible');;
            $('.home .srp-main-row.srp-single-prod').height($('.srp-prodcontent-cont.visible').height()+50);
        }
    }); 
    
    $('.srp-tag').click(function(){
        if (!$(this).hasClass('tag-actived')){
            $('.srp-tag').not(this).removeClass('tag-actived');
            $(this).toggleClass('tag-actived');
            $('.infoespec[data-target="' + $(this).attr('data-tag') + '"]').toggleClass('displayed').siblings().removeClass('displayed');;
        }
    });    
    $('.dealer_tab').click(function(){
        // if (!$(this).hasClass('active')){
            $('.dealer_tab').not(this).removeClass('active');
            $(this).toggleClass('active');
            $('.dealer_content[data-target="' + $(this).attr('data-tab') + '"]').toggleClass('opened');
            $('.dealer_content').not($('.dealer_content[data-target="' + $(this).attr('data-tab') + '"]')).removeClass('opened');
            // $('.srp-main-row.srp-single-prod').height($('.srp-prodcontent-cont.visible').height()+50);
        // }
    }); 

    if ($(window).width() < 992){
        $('.spr-contents').height($('.tab-content.visible').height());        
    }


    // ==========================================================
    // ====================================== PRODUCTO INDIVIDUAL
    // ==========================================================

    if($('body').hasClass('single-productos')) {

        $('#masthead').addClass('black-menu');

        $('.color-gallery.owl-carousel').owlCarousel({
            loop:true,
            margin:0,
            autoplay:true,
            autoplayTimeout:3000,
            smartSpeed: 1000,
            animateOut: 'fadeOut',
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item',
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1200: {
                    items:1,
                    nav:true,
                    loop:true,
                    navText: ['','']
                }
            }
        });
        
        $('.gallery.owl-carousel').owlCarousel({
            margin: 20,
            dots: true,
            loop:false,
            nav: false,
            responsive:{
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                }
            }
        });

        $('.related-models-gallery.owl-carousel').owlCarousel({
            margin: 20,
            dots: true,
            loop:false,
            nav: false,
            responsive:{
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                }
            }
        });

        $('.row-property').on('click', function(e) {
            $(this).find('.plus-minus-toggle').toggleClass('collapsed');
            $(this).find('.dynamic-content').toggleClass('open');
        });

        $('.main-product-info .colors .box').on('click', function() {
            var index = $(this).index();

            $('.color-gallery-container .color-gallery').siblings().css('display', 'none');
            $('.main-product-info .colors .box').siblings().addClass('desactive');
            $('.model-price-holder .color-price').siblings().css('display', 'none');

            $(this).removeClass('desactive');
            $($('.color-gallery-container .color-gallery')[index]).css('display', 'block');
            $($('.model-price-holder .color-price')[index]).css('display', 'block');
            
        });


        $('.color-gallery-container .color-gallery:nth-of-type(1)').css('display', 'block');
        $('.main-product-info .colors .box:nth-of-type(1)').removeClass('desactive');
        $('.model-price-holder .color-price:nth-of-type(1)').css('display', 'block');

        $titulo = $('.product-name h1').text();
        $('.pop-up--reserva form').find('input[name="model"]').val($titulo);
        $('.pop-up--info form').find('input[name="model"]').val($titulo);

        $('.contact-buttons-holder #test-button').on('click', function() {
            $('.pop-up--reserva').addClass('active');
            $('.pop-up--info').removeClass('active');
            $('.transparencia').addClass('active');
        });
        
        $('.contact-buttons-holder #info-button').on('click', function() {
            $('.pop-up--reserva').removeClass('active');
            $('.pop-up--info').addClass('active');
            $('.transparencia').addClass('active');
        });

        $('.pop-up--form .cross').on('click', function() {
            $(this).parent().removeClass('active');
            $('.transparencia').removeClass('active');
        });

        $('.transparencia').on('click', function() {
            $('.pop-up--info').removeClass('active');
            $('.pop-up--reserva').removeClass('active');
            $(this).removeClass('active');
        });

        $("#lightgallery").lightGallery({
            selector: '.owl-item .img-wrap'
        });

    }

});