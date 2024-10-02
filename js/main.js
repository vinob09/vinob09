jQuery(document).ready(function ($) {

    'use strict';

    // Function to animate skill bars
    function animateSkillBars() {
        $('.progress-bar').each(function () {
            var $this = $(this);
            var percent = $this.data('percent');
            $this.css('width', percent + '%');
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        var progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(function(bar) {
            bar.style.setProperty('background-color', '#4CAF50', 'important');
        });
    });

    $(window).on('load', function () { // makes sure the whole site is loaded
        $(".seq-preloader").fadeOut(); // will first fade out the loading animation
        $(".sequence").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.

        setTimeout(animateSkillBars, 3500);
    });

    // Animate on scroll (if skills section is not visible on initial load)
    $(window).on('scroll', function () {
        var skillsSection = $('.right-content');
        var skillsSectionTop = skillsSection.offset().top;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop > (skillsSectionTop - windowHeight + 200)) {
            animateSkillBars();
            // Remove scroll event listener after animation
            $(window).off('scroll');
        }
    });

    // Toggle between Experience and Education
    $('#experience-btn').click(function () {
        $('.education-content').hide();
        $('.experience-content').show();
    });

    $('#education-btn').click(function () {
        $('.experience-content').hide();
        $('.education-content').show();
    });

    $(function () {

        function showSlide(n) {
            // n is relative position from current slide

            // unbind event listener to prevent retriggering
            $body.unbind("mousewheel");

            // increment slide number by n and keep within boundaries
            currSlide = Math.min(Math.max(0, currSlide + n), $slide.length - 1);

            var displacment = window.innerWidth * currSlide;
            // translate slides div across to appropriate slide
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
            // delay before rebinding event to prevent retriggering
            setTimeout(bind, 700);

            // change active class on link
            $('nav a.active').removeClass('active');
            $($('a')[currSlide]).addClass('active');

        }

        function bind() {
            $body.bind('false', mouseEvent);
        }

        function mouseEvent(e, delta) {
            // On down scroll, show next slide otherwise show prev slide
            showSlide(delta >= 0 ? -1 : 1);
            e.preventDefault();
        }

        $('nav a, .main-btn a').click(function (e) {
            // When link clicked, find slide it points to
            var newslide = parseInt($(this).attr('href')[1]);
            // find how far it is from current slide
            var diff = newslide - currSlide - 1;
            showSlide(diff); // show that slide
            e.preventDefault();
        });

        $(window).resize(function () {
            // Keep current slide to left of window on resize
            var displacment = window.innerWidth * currSlide;
            $slides.css('transform', 'translateX(-' + displacment + 'px)');
        });

        // cache
        var $body = $('body');
        var currSlide = 0;
        var $slides = $('.slides');
        var $slide = $('.slide');

        // give active class to first link
        $($('nav a')[0]).addClass('active');

        // add event listener for mousescroll
        $body.bind('false', mouseEvent);
    })


    $('#form-submit .date').datepicker({
    });


    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 100) {
            $(".header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".header").removeClass("active");
        }
    });
});
