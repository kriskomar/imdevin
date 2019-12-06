$(document).ready(function() {

    var registerCount = function() {
        $.get({
            url: "https://g28h568nd2.execute-api.us-west-2.amazonaws.com/default/im-devin-lambda?action=post",
            async: true,
            success: function (data) {
                getCount();
            },
            cache: false
        });
    };

    var getCount = function() {
        $.get({
            url: "https://g28h568nd2.execute-api.us-west-2.amazonaws.com/default/im-devin-lambda?action=get",
            async: true,
            success: function (data) {
                updateOutput(data.Item.Val);
            },
            cache: false
        });
    };

    var updateOutput = function(count) {
        $("#counter").numberAnimate('set', count);
    };

    var $button = document.querySelector("#no-button");
    $button.addEventListener('click', function() {
      var duration = 0.3,
          delay = 0.08;
      TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
      TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
      TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
    });

    $("#no-button").click(function() {
        registerCount();
    });
    $("#counter").numberAnimate({ animationTimes: [100, 500, 100] });
    setInterval(getCount, 1000);
    $("body").fadeIn(2000);
});