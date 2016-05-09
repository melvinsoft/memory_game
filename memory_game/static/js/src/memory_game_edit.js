function MemoryGameEditXBlock(runtime, element, params) {

    $(element).find('.action-cancel').bind('click', function () {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function () {

        var data = {
            'display_name': $('#memory_game_edit_display_name').val(),
            'max_flips': $('#memory_game_edit_max_flips').val(),
            'weight': $('#memory_game_edit_weight').val()

        };

        runtime.notify('save', { state: 'start' });

        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
            if (response.result === 'success') {
                runtime.notify('save', { state: 'end' });
            }
            else {
                runtime.notify('error', { msg: response.message });
            }
        });

    });


}
