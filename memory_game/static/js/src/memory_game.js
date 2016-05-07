/* Javascript for MemoryGameXBlock. */
function MemoryGameXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var incrementAttmsUrl = runtime.handlerUrl(element, 'increment_attempts');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

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

    return{};
}
