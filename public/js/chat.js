$(function() {

    //ini koneksi wankawan!
    var url = window.location.host;
    var socket = io.connect(url);
    
    //tombol input!
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var carduser = $("#card_username");
    var cardchat = $("#card_chat");
    var memberModal = $("#memberModal");
    var alert = $("#alert");
    var feedback = $("#feedback");
    //event
    cardchat.hide();
    send_message.hide();
    message.hide();
    alert.hide();


    username.keypress(function(spacing) {
        if(spacing.which === 32)
        return false;
    })

    //emit pesan! 
    send_message.click(function() {
        socket.emit('new_message', {message : message.val()})
        message.val('');
    })

    //listen pada new_message
    socket.on("new_message", (data) => {
        console.log(data);
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + "<b>" + data.username + "</b>" + ": " + data.message + "</p>");
        // chatroom.append("<span class='message'>" + "<h6>" + data.username + ": " + "</h6>" + data.message +"</span>");
    })
    
    //emit user!

    send_username.click(function(){
        if(username.val() === "") {
            $(document).ready(function () {
                username.val('');
                alert.fadeIn(800);
                $('#memberModal').fadeIn(500);
                $('#memberModal').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                
        });
        } else {
            console.log(username.val())
            socket.emit('change_username', {username : username.val()})

            carduser.hide();
            cardchat.fadeIn(500);
            send_message.fadeIn(500);
            message.fadeIn(500);
            memberModal.fadeOut(500);
        }
    })

    message.bind("keypress", () => {
        socket.emit('typing')
    })
    
    socket.on('typing', (data) => {
        feedback.html("<p style='color:#98E221;'><i>" + data.username + ": sedang mengetik.." + "</i></p>")
    })
});


$(document).ready(function () {
        $('#memberModal').fadeIn(500);
        $('#memberModal').modal({
            backdrop: 'static',
            keyboard: false
        })
});



// username.focusin(function() {
//     send_username.prop("disabled", false);

// });

// username.focusout(function() {
//     send_username.prop("disabled", true);
// })