/* Javascript for MemoryGameXBlock. */
function MemoryGameXBlock(runtime, element) {

    var incrementAttmsUrl = runtime.handlerUrl(element, 'increment_attempts');
    var userWinsUrl = runtime.handlerUrl(element, 'user_wins');

    incrementAttempts = function() {
        $.ajax({
            type: 'POST',
            url: incrementAttmsUrl,
            data: JSON.stringify({"increment_attms": "1"}),
            success: function (result) {
                $('.attempts_counter', element).text(result.attempts);
            },
            error: function(){
                alert("increment_attms error!");
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
                alert("increment_attms error!");
            }
        });
    }

    return{};
}
