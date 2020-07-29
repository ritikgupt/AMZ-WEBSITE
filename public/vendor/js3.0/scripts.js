function initializeJS() {

  // tool tips
  jQuery('.tooltips').tooltip();

  // popovers
  jQuery('.popovers').popover();

  // custom scrollbar
  // for html
  jQuery('html').niceScroll({styler: 'fb', cursorcolor: '#007AFF', cursorwidth: '6', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: '', zindex: '1000'});
  // for sidebar
  jQuery('#sidebar').niceScroll({styler: 'fb', cursorcolor: '#007AFF', cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});
  // for scroll panel
  jQuery('.scroll-panel').niceScroll({styler: 'fb', cursorcolor: '#007AFF', cursorwidth: '3', cursorborderradius: '10px', background: '#F7F7F7', cursorborder: ''});

  // sidebar dropdown menu
  jQuery('#sidebar .sub-menu > a').click(function() {
    var last = jQuery('.sub-menu.open', jQuery('#sidebar'));
    jQuery('.menu-arrow').removeClass('arrow_carrot-right');
    jQuery('.sub', last).slideUp(200);
    var sub = jQuery(this).next();
    if (sub.is(':visible')) {
      jQuery('.menu-arrow').addClass('arrow_carrot-right');
      sub.slideUp(200);
    } else {
      jQuery('.menu-arrow').addClass('arrow_carrot-down');
      sub.slideDown(200);
    }
    var o = (jQuery(this).offset());
    diff = 200 - o.top;
    if (diff > 0)
      jQuery('#sidebar').scrollTo('-=' + Math.abs(diff), 500);
    else
      jQuery('#sidebar').scrollTo('+=' + Math.abs(diff), 500);
  });

  // sidebar menu toggle
  jQuery(function() {
    function responsiveView() {
      var wSize = jQuery(window).width();
      if (wSize <= 768) {
        jQuery('#container').addClass('sidebar-close');
        jQuery('#sidebar > ul').hide();
      }

      if (wSize > 768) {
        jQuery('#container').removeClass('sidebar-close');
        jQuery('#sidebar > ul').show();
      }
    }
    jQuery(window).on('load', responsiveView);
    jQuery(window).on('resize', responsiveView);
  });

  jQuery('.toggle-nav').click(function() {
    if (jQuery('#sidebar > ul').is(':visible') === true) {
      jQuery('#main-content').css({
        'margin-left': '0px',
      });
      jQuery('#sidebar').css({
        'margin-left': '-180px',
      });
      jQuery('#sidebar > ul').hide();
      jQuery('#container').addClass('sidebar-closed');
    } else {
      jQuery('#main-content').css({
        'margin-left': '180px',
      });
      jQuery('#sidebar > ul').show();
      jQuery('#sidebar').css({
        'margin-left': '0',
      });
      jQuery('#container').removeClass('sidebar-closed');
    }
  });

  // Student portal Slider carousel (uses the Owl Carousel library)
  $('.slider-portal-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    stopOnHover: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });


  // Add smooth scrolling to all links
  $('.sidebar-menu a').on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top,
      }, 1000, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });


}

jQuery(document).ready(function(){
  initializeJS();
});
