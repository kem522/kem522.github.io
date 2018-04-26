$(() => {
  console.log('JS Loaded');


  //Sticky Navbar
  window.onscroll = function() {
    myFunction();
    onScroll();
  };
  // Get the navbar
  var $navbar = $('.navbar');

  // Get the offset position of the navbar
  var sticky = $navbar.offset().top;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      $navbar.addClass('sticky');
    } else {
      $navbar.removeClass('sticky');
    }
  }

  // Smooth scrolling anchor links
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off('scroll');

    $('a').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');

    var target = this.hash;
    const $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on('scroll', onScroll);
    });
  });


  //highlight navbar items on scroll
  function onScroll(){
    const scrollPos = $(document).scrollTop();
    $('.navbar-start a').each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));
      if (refElement.position().top <= scrollPos + 52 && refElement.position().top + refElement.height() > scrollPos) {
        $('.navbar-start ul li a').removeClass('active');
        currLink.addClass('active');
      } else{
        currLink.removeClass('active');
      }
    });
  }

  // Navbar burger
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }


  //Media Queries
  //Subtitles when navbar burger is in effect
  function mediaSize() {
    /* Set the matchMedia */
    if ($(window).width() < 1088) {
      $('.subtitle').each((i, subtitle) => {
        $(subtitle).removeClass('hidden');
      });
    } else {
      $('.subtitle').each((i, subtitle) => {
        if (!$(subtitle).hasClass('hidden')) $(subtitle).addClass('hidden');
      });
    }
  }
  mediaSize();
  window.addEventListener('resize', mediaSize, false);
});
