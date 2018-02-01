
/*document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Y U hide?');
    }
});*/


/*$(window).blur(function() {
    console.log('I see what you did here!');
    window.location.href="http://localhost:8080/";
});

$(document).bind("contextmenu",function(e) {
    e.preventDefault();
});

$(document).keydown(function(e){
    if(e.which === 123){
        return false;
    }

    if (e.ctrlKey &&
        (e.keyCode === 67 ||
            e.keyCode === 86 ||
            e.keyCode === 85 ||
            e.keyCode === 117)) {
        return false;
    }


    if (e.ctrlKey && e.shiftKey &&
        (e.keyCode === 67 ||
            e.keyCode === 86 ||
            e.keyCode === 85 ||
            e.keyCode === 117 ||
            e.keyCode === 105 ||
            e.keyCode === 73)) {
        return false;
    }
});*/

$(function () {
    $('#confirm_password').on('keyup',function () {
        //alert($(this).val());
        if($(this).val() === $('#password').val()){
            $(this).css("border","1px solid green");
        }else {
            $(this).css("border","1px solid red");
        }
    });

    $('.reg').on('click',function () {
        var sendData = {};
        sendData['fname'] = $('#fname').val();
        sendData['pass'] = $('#password').val();
        sendData['mobile'] = $('#mobile').val();
        sendData['college'] = $('#college').val();
        sendData['college_id'] = $('#college_id').val();
        sendData['stream'] = $('#stream').val();
        sendData['year'] = $('#year').val();
        $.ajax({
            url: 'http://192.168.0.102:8080/registration',
            type:'POST',
            data: JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            success : function(data) {
                alert(data['msg']);
                if (data['msg'] === "Great job!") {
                    setTimeout(function () {
                        c_output.text(data['msg']);
                        op.fadeIn(700);
                        op.get(0).scrollIntoView();
                    }, 500);
                } else {
                    setTimeout(function () {
                        c_output.text(data['status']);
                        op.fadeIn(700);
                        op.get(0).scrollIntoView();
                    }, 500);
                }
            },
            error:function (e) {

            }
        });
    });
});