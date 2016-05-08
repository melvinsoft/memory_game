function MemoryGameEditXBlock(runtime, element, params) {

    $(element).find('.action-cancel').bind('click', function () {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function () {

        var data = {
            'display_name': $('#memory_game_edit_display_name').val(),
            'weight': $('#memory_game_edit_weight').val()

        };

        runtime.notify('save', { state: 'start' });

        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');


    });


}
