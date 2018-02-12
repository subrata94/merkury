window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
function openNav() {document.getElementById("mySidenav").style.width = "250px";}
function closeNav() {document.getElementById("mySidenav").style.width = "0";}

$(function(){
    var id,
        slider=1,
        p_count=3,
        c_count=2;
    $('#myBtn').on('click',function(){
        $('.dashboard').get(0).scrollIntoView({ behavior: 'smooth' });
    });
    $('.tasks').on('dragstart',function(ev){
        id = '#'+ev.target.id;
    });
    $('#drp').on('dragover',function(ev){
        ev.preventDefault();
    });
    $('#drp').on('drop',function(ev){
        ev.preventDefault();
        var s = $(id).html();
        alert(s);
        $(id+' .pending div:last-child').addClass("text-green");
        $(id+' .pending div:last-child').html("<span class=\"glyphicon glyphicon-ok-circle\"></span> Completed");
        var html = "<div class=\"completed\">"+$(id).html()+"</div>";
        $(id).hide();
        $(this).before(html);
        // $('.drag-n-drop-bg').height($('.drag-n-drop-bg').height() + $(id).height());
        $('.p-count').text('('+(--p_count)+')');
        $('.c-count').text('('+(++c_count)+')');
    });
    $('.slider-left').on('click',function(){
        if(slider != 1){
            $('.dgd-content'+slider).fadeOut(1).delay(500);
            slider--;
            $('.dgd-content'+slider).fadeIn('slow');
        }
    });
    $('.slider-right').on('click',function(){
        if(slider != 2){
            $('.dgd-content'+slider).fadeOut(1).delay(300);
            slider++;
            $('.dgd-content'+slider).removeClass("hide").fadeIn('slow');
        }
    });

    $('.completed::after').on('click',function(){
        alert("hello");
    });
});