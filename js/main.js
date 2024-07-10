$('.singer').on('click', 'h3', function() {
    $(this).parent('.singer').siblings().each(function() {
        $(this).removeClass('active')
            .children('p').slideUp(600);
    });
    $(this).siblings('p').slideToggle(600)
        .parent().addClass('active');
})

var duration, interval, date;

var eventDateRow = Date.parse('2024-08-10T22:00:00');
$(document).ready(function() {
    countdown(); 
    interval = setInterval(countdown, 1000);
});

function countdown() {
    let eventDate = getDuration(eventDateRow);

    $('#days').text('-' + eventDate.days + 'd');
    $('#hours').text(eventDate.hours + 'h');
    $('#minutes').text(eventDate.minutes + 'm');
    $('#seconds').text(eventDate.seconds + 's');

    if (duration <= 0) {
        clearInterval(interval);
        $('.countdown').text(' Celebrate Party! ');
        $('.countdown').children().css('display', 'none');
    }

    duration -= 1000;
}


function getDuration(endTime) {
    const duration = endTime - $.now();
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor(duration / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((duration / (1000 * 60))) % 60;
    const seconds = Math.floor((duration / (1000))) % 60;

    return {duration, days, hours, minutes, seconds}
}

var counter = 100;
$('#chars').text(counter);

$('[name="message"]').on('input propertychange', function(e) {
    var text = e.target.value;

    counter = 100 - text.length;
    $('#chars').text(counter);

    if(text.length > 100) {
        e.target.value = text.slice(0, 100) + '';
        e.preventDefault();
        $('#chars').text('your available character finished');
    }
})

const homeOffsetTop = $('#hero').offset().top;
const detailsOffsetTop = $('#details').offset().top;
const durationOffsetTop = $('#duration').offset().top;
const contactOffsetTop = $('#contact').offset().top;

var navList = [
    {
        ref: '#hero',
        offsetTop: homeOffsetTop,
    },
    {
        ref: '#details',
        offsetTop: detailsOffsetTop,
    },
    {
        ref: '#duration',
        offsetTop: durationOffsetTop,
    },
    {
        ref: '#contact',
        offsetTop: contactOffsetTop,
    },
]

$('header ul>li>a').on('click', function() {
    const currSection = $(this).attr('href');
    const secOffsetTop = $(currSection).offset().top;
    $('html', 'body').animate({scrollTop: secOffsetTop}, 2000);
    
    $(this).addClass('text-accent')
    .parent('li').siblings()
    .children('a').each(function() {
        $(this).removeClass('text-accent')
    });
})

/* Change anchors' text-color while scrolling through refered sections */
$(window).on('scroll', function () {
    if($('header .offcanvas').hasClass('show')) {
        navList.forEach(nav => {
            linkColorChanging(nav.ref, nav.offsetTop);
        })
    } 
})

function linkColorChanging(ref, offsetTop) {
    if($(window).scrollTop() >= (offsetTop - 300) ) {
        $(`header ul>li>a[href="${ref}"]`).addClass('text-accent')
            .parent('li').siblings()
            .children('a').each(function() {
                $(this).removeClass('text-accent')
            });
}
}

$('#open-nav').on('click', function() {
    $('#hero').children().each(function() {
        $('#hero .container').animate({left: '100px'}, 500);
        $('#hero #open-nav').animate({left: '250px'}, 300);
    })
})

$('header .btn-close').on('click', function() {
    $('#hero').children().each(function() {
        $('#hero .container').animate({left: '0'}, 500);
        $('#hero #open-nav').animate({left: '0'}, 300);
    })
})
