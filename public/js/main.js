
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;
        var scrolled = 20;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

   

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 90;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

   // jQuery counterUp
   $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // News carousel (uses the Owl Carousel library)
  $(".news-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    stopOnHover: true,
     nav: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

   // Video carousel (uses the Owl Carousel library)
   $(".video-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    stopOnHover: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      }
    }
  });

// TrustedBy carousel (uses the Owl Carousel library)
  $(".trustedBy-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    stopOnHover: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 6
      }
    }
  });

   // Latest Workshop (uses the Owl Carousel library)
   $(".latest-workshop-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    stopOnHover: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  });

   // Previous Workshop (uses the Owl Carousel library)
   $(".previous-workshop-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    stopOnHover: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Courses isotope and filter
  $(window).on('load', function() {
    
    var courseIsotope = $('.course-container').isotope({
      itemSelector: '.course-item',
      filter: '.filter-civil'
    });
    
    $('#course-flters li').on('click', function() {
      $("#course-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      courseIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  //  details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

  //On Campus Request Detail Modal 
  $('#modal-onCampusCourse').on('click', function() { $('#loginModal').modal('show');
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});

//Internship Course Pop Up Modal
$(window).on('load', function() {
  $('#internshipPopUpModal').modal('show');
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

});


$(window).on('load', function() {

  // On Campus Login Modal
  $('#modal-onCampusCourse').on('click', function() {
    $('#loginModal').modal('show');
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  });

});

  // On Document Load Discount Modal & Timer Home Page
  $(window).on('load', function() {

    $('#countDownTimer').countdown('2020/12/31').on('update.countdown', function(event) {
      var $this = $(this).html(event.strftime(''
      + '<span class="h1 font-weight-bold">%D</span> Day%!d'
      + '<span class="h1 font-weight-bold">%H</span> Hr'
      + '<span class="h1 font-weight-bold">%M</span> Min'
      + '<span class="h1 font-weight-bold">%S</span> Sec'));
    });

    $('#timerModal').modal('show');
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  });


})(jQuery);
