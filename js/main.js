
(function(){var z = 3;})();

$('.wt-diorama__hamburger, .wt-diorama__small-menu, .wt-lif__hamburger, .wt-lif__small-menu').click(function() {
    $('.wt-diorama__small-menu, .wt-lif__small-menu').toggleClass('open');
})

$(window).on('scroll resize', function() {
    $('.wt-diorama__small-menu, .wt-lif__small-menu').removeClass('open');
})

// PRESALE
// -------

var PRESALE_ETH_CAP = 5000;
var ETH_PREVIOUSLY_RAISED = 1850;
var ethRaised = 1850;

function setEthRaised(eth) {
    var percentComplete = eth / PRESALE_ETH_CAP * 100;
    if (percentComplete > 100) {
        percentComplete = 100;
    }

    $('.wt-presale-contribution__eth-raised').text(parseFloat(eth).toFixed(2)+' ETH')
    $('.wt-presale-contribution__progress-bar').css({
        width: Math.floor(percentComplete) + '%',
        opacity: 1,
    }).toggleClass('done', percentComplete >= 100);
}

function refreshEthRaised() {
    var lifPresaleAddress = '0x4a4aC8D0B6a2f296C155c15C2bCaf04641818b78';

    var params = $.param({
        module: 'proxy',
        action: 'eth_call',
        tag: 'latest',
        to: lifPresaleAddress,
        data: '4042b66f',
        apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
    });

    $.get('https://api.etherscan.io/api?' + params, function (data) {
        console.log('ETH Raised:', Number(data.result) / 1e18);
        var ethRaised = Number(data.result) / 1e18;
        setEthRaised(ethRaised);
    });

    // var params = $.param({
    //     module: 'account',
    //     action: 'balance',
    //     address: lifPresaleAddress,
    //     tag: 'latest',
    //     apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
    // });

    // $.get('https://api.etherscan.io/api?' + params, function(data) {
    //     var addressEthBalance = Number(data.result) / 1e18;
    //     ethRaised = ETH_PREVIOUSLY_RAISED + addressEthBalance;
    //     setEthRaised(ethRaised);
    // });
}

refreshEthRaised();
setInterval(refreshEthRaised, 1000*10); // every 10s

$('.wt-presale-contribution__continue').click(function() {
    $('body').addClass('dialog-over');
})

$('.dialog__btn-nevermind').click(function() {
    $('body').removeClass('dialog-over');
})

$('#agree-to-terms').on('change', function() {
    $('.dialog__btn-agree').toggleClass('disabled', !$('#agree-to-terms').is(':checked'));
})

$('.dialog__btn-agree').click(function() {
    $('.wt-presale-contribution__smart-contract').addClass('continue');
    $('body').removeClass('dialog-over');
    setTimeout(function() {
        window.location.hash = 'participate';
    }, 100);
})

// VIDEO UPDATES

var videoList = [
    {
        url: 'https://www.youtube.com/embed/cn94v3ZngJg',
        thumbnail: 'https://i3.ytimg.com/vi/cn94v3ZngJg/maxresdefault.jpg',
        title:'Blockchain Summit Barcelona',
    },
    {
        url: 'https://www.youtube.com/embed/x4qCt3wh98U',
        thumbnail: 'https://i3.ytimg.com/vi/x4qCt3wh98U/maxresdefault.jpg',
        title:'Token Generation Event',
    },
    {
        url: 'https://www.youtube.com/embed/881woCQN2Lo',
        thumbnail: 'https://i3.ytimg.com/vi/881woCQN2Lo/maxresdefault.jpg',
        title:'Winding Tree Update',
    },
    {
        url: 'https://www.youtube.com/embed/ns7VVrARIrM',
        thumbnail: 'https://i3.ytimg.com/vi/ns7VVrARIrM/maxresdefault.jpg',
        title:'Meet CTO Jakub Vysoky',
    },
];

var $videoThumbnailList = $('.wt-videos__thumbnail-list');

if ($videoThumbnailList.length) {
    var currentVideoIndex = 0;

    function populateVideos() {

        videoList.forEach(function(video, index) {
            var $li = $('<li data-index="' + index + '"><img src="' + video.thumbnail + '"><div class="video-title">'+ video.title +'</div></li>');
            $videoThumbnailList.append($li);
        });

        var $active = $('.wt-videos__active');

        $active.attr('src', videoList[0].url);

        $videoThumbnailList.find('li').eq(0).addClass('active');

        $videoThumbnailList.find('li').click(function() {
            var index = Number($(this).attr('data-index'));
            if (index !== currentVideoIndex) {
                currentVideoIndex = index;
                $active.attr('src', videoList[index].url);
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
    }

    $videoThumbnailList.on('mousedown', function() {
        $(this).addClass('drag');
    }).on('mouseup', function() {
        $(this).removeClass('drag');
    }).on('mouseleave', function() {
        $(this).removeClass('drag');
    });

    populateVideos();
}
