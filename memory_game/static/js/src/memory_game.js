/* Javascript for MemoryGameXBlock. */
function MemoryGameXBlock(runtime, element) {

    var incrementFlipsUrl = runtime.handlerUrl(element, 'increment_flips');
    var userWinsUrl = runtime.handlerUrl(element, 'user_wins');

    incrementFlips = function() {
        $.ajax({
            type: 'POST',
            url: incrementFlipsUrl,
            data: JSON.stringify({"increment_flips": "1"}),
            success: function (result) {
                $('.flips_counter', element).text(result.flips);
                if (result.win_status_msg) {
                    $('.win_status', element).text(result.win_status_msg);
                    $('.board').empty();
                    $('.board').text(result.win_status_msg);
                }
            },
            error: function(){
                alert("increment_flips error!");
            }
        });
    }

    user_wins = function() {
        $.ajax({
            type: 'POST',
            url: userWinsUrl,
            data: JSON.stringify({"win": "1"}),
            success: function (result) {
                $('.win_status', element).text(result.win_status_msg);
            },
            error: function(){
                alert("win error!");
            }
        });
    }
    return{};
}
