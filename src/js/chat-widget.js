function initWchat(prefix) {
    var container = $('.wchat-container'),
        closePopup = $('.wchat-popup-close', container);

    // Minimize chat action
    $('.wchat-minimize', container).on('click', function() {
        container.toggleClass('wchat-window-minimized');
        return false;
    });
    // Close chat action
    $('.wchat-close', container).on('click', function() {
        container.removeClass('wchat-window-minimized').addClass('wchat-window-close-visible');
        return false;
    });
    // Close chat - Yes
    $('.wchat-popup-close-yes', closePopup).on('click', function() {
        container.removeClass('wchat-window-close-visible').removeClass('wchat-window-chat-visible').removeClass('wchat-window-visible');
        return false;
    });
    // Close chat - No
    $('.wchat-popup-close-no', closePopup).on('click', function() {
        container.removeClass('wchat-window-close-visible');
        return false;
    });

    // Let's talk button
    $('.wchat-open-chat', container).on('click', function(e) {
        console.log('click');
        container.addClass('wchat-window-visible');
        e.preventDefault();
    });
    // Start chat button
    var loginForm = $('.wchat-form-login', container);
    var ta = $('.wchat-form-message textarea', container);
    loginForm.on('submit', function() {
        container.addClass('wchat-window-chat-visible');
        ta.focus();
        return false;
    })
    loginForm.find('.wchat-form-submit').on('click', function() {
        loginForm.trigger('submit');
        return false;
    });


    ta.on('focus', function() {
        $(this).on('keyup', ChatKeyUp);
    }).on('blur', function() {
        $(this).off('keyup', ChatKeyUp);
    });

    window.ChatKeyUp = function() {
        if (event.keyCode == 13) {
            if ($(this).val().length > 0) {
                AddChatText($(this).val(), false);
                $(this).val('');
            }
            return false;
        }
    }
    window.AddChatText = function(txt, left) {
        var div = $('<div/>').addClass('wchat-line').text(txt),
            wc = $('.wchat-messages', container);
        if (typeof left != 'undefined') {
            if (left) {
                div.addClass('wchat-line-answer')
            } else {
                div.addClass('wchat-line-question')
            }
        }
        div.appendTo(wc);
        wc.scrollTop(wc[0].scrollHeight);
    }
}

$(function() {
    initWchat();
});
