var question=null;
var setId='',index=0,setId2='';
$( window ).on( "load", function() {
    //$('#inp').hide(1);
    //$('#op').hide(1);
    //$('.editarea').hide(3);
    $('#problem').css({"background-color":"#6b8d58","color":"white"});
    setId2='#pb';
    $(setId2).css("background","#61a861");

    /*function createQuestion(q){
        for(var i=0;i<q.length;i++){
           console.log(q[i]['title']);
           for (var j=0;j<q[i]['sampleTestCase'].length;j++){
               console.log(q[i]['sampleTestCase'][j]['inputs']+"\n"+q[i]['sampleTestCase'][j]['outputs']+"\n");
           }
        }
    }*/

});

function showQuestion(e){
    var id = e.id,i=0;
    var iid='';
    if(setId !== '' ){
        iid = '#'+setId;
        $(iid).css("background","transparent");
    }
    setId=id;
    iid='#'+id;
    $(iid).css("background","#12962a");
    for(var k=0;k<question.length;k++){
        if(question[k]['id'] === id)
            i=k;
    }
    index=i;

    $('.problemarea').empty();
    $('.problemarea').append("<h3 title=\"question-title\">"+question[i]['title']+"</h3>\
                                    <p title=\"problem\">"+question[i]['question']+"</p>\
                                    <h4 >Input format</h4>\
                                    <p title=\"inputs\">"+question[i]['inputFormat']+"</p>\
                                    <h4>Output format</h4>\
                                    <p>"+question[i]['outputFormat']+"</p>\
                                    <h4>Constrains</h4>\
                                    <p>"+question[i]['constraints']+"</p>\
                                    <h3>Sample Test Case</h3>\
                                    <div class=\"sample-test-case\"></div>\
                                    <br><br>");

    $('.sample-test-case').empty();
    for (var j=0;j<question[i]['sampleTestCase'].length;j++){
        $('.sample-test-case').append("<h4>Test case "+(j+1)+"</h4>\
                                    <h4>Input</h4>\
                                    <p>"+question[i]['sampleTestCase'][j]['inputs']+"</p>\
                                    <h4>Outputs</h4>\
                                    <p>"+question[i]['sampleTestCase'][j]['outputs']+"</p>");
    }

    if(question[i]['explanation'] !== "none")
        $('.sample-test-case').append("<h4>Explanation</h4>\
            <p>"+question[i]['explanation']+"</p>");

}

$(function () {
    var editor = ace.edit("editor");

    var mode = $('#mode'),
        theme = $('#theme'),
        problem = $('#problem'),
        compiler = $('#compiler'),
        compile = $('#compile'),
        compile_submit = $('#compile-submit'),
        sideLeft = $('.side-left'),
        sideRight = $('.side-right'),
        mainContent = $('.main-content'),
        swich = $('.swich'),
        font = $('#font-size'),
        editarea = $('.editarea'),
        editor_a = $('#editor'),
        c_output = $('#c-output'),
        inputcheck = $('#inputcheck'),
        custom_inputs = $('#custom-input'),
        inp = $('#inp'),
        op = $('#op'),
        footer = $('.footer')
        ;

    var flag = 0;
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange();
    if (localStorage.getItem(setId+mode.val())){
        editor.setValue(localStorage.getItem(setId+mode.val()));
    }
    else editor.setValue("");

    var hgt = $('.main-body').height();
    sideLeft.height(hgt);
    sideRight.height(hgt);

    var pad = (swich.innerWidth() - swich.width())/2;
    footer.width(swich.width());
    mainContent.height(sideRight.height() - swich.height());

    mode.on('click',function () {
        if(mode.val() === "cpp" || mode.val() === "c")
            editor.getSession().setMode("ace/mode/c_cpp");
        else if(mode.val() === "python" || mode.val() === "python3")
            editor.getSession().setMode("ace/mode/python");
        else editor.getSession().setMode("ace/mode/java");

        if (localStorage.getItem(setId+mode.val())){
            editor.setValue(localStorage.getItem(setId+mode.val()));
        }
        else editor.setValue("");
    });

    theme.on('click',function () {
        editor.setTheme("ace/theme/"+$(this).val());
    });
    font.on('click',function () {
        var ht = editor_a.height();
        editor.setFontSize(Number($(this).val()));

        //document.getElementById('editor').style.fontSize=$(this).val();
        //document.getElementById('editor').style.height='30em';
        editor.resize();
        //editor_a.height(ht);
    });
    editor.getSession().on('change', function(e) {
        // e.type, etc
        var str = editor.getValue();
        switch(mode.val()){
            case "c":localStorage.setItem(setId+"c",str);
                break;
            case "cpp":localStorage.setItem(setId+"cpp",str);
                break;
            case "java":localStorage.setItem(setId+"java",str);
                break;
            case "python":localStorage.setItem(setId+"python",str);
                break;
            case "python3":localStorage.setItem(setId+"python3",str);
                break;
        }
    });
    problem.on('click',function () {
        if(flag){
            problem.css({"background-color":"#6b8d58","color":"white"});
            compiler.css({"background-color":"transparent","color":"black"});
            sideRight.removeClass("col-lg-12");
            sideRight.addClass("col-lg-9");
            footer.width(swich.width());
            editarea.fadeOut(1);
            editarea.addClass("hidden");
            sideLeft.fadeIn();
            $('.problemarea').fadeIn();
        }
    });
    compiler.on('click',function () {
        flag = 1;
        problem.css({"background-color":"transparent","color":"black"});
        compiler.css({"background-color":"#6b8d58","color":"white"});
        sideRight.removeClass("col-lg-9");
        sideRight.addClass("col-lg-12");
        footer.width(swich.width());
        editarea.width(swich.width());
        $('.problemarea').fadeOut();
        sideLeft.fadeOut();
        editarea.removeClass("hidden");
        editarea.fadeIn();
        if (localStorage.getItem(setId+mode.val())){
            editor.setValue(localStorage.getItem(setId+mode.val()));
        }
        else editor.setValue("");
    });

    inputcheck.on('click',function () {
        if($(this).prop("checked") === true){
            inp.show(700);
        }

        if($(this).prop("checked") === false){
            inp.hide(700);
        }
    });

    $('#pb').on('click',function () {
        $(setId2).css("background","transparent");
        $(this).css("background","#61a861");
        setId2='#pb';
    });
    $('#sb').on('click',function () {
        $(setId2).css("background","transparent");
        $(this).css("background","#61a861");
        setId2='#sb';
    });
    $('#lb').on('click',function () {
        $(setId2).css("background","transparent");
        $(this).css("background","#61a861");
        setId2='#lb';
    });

    compile.on('click',function () {

        $('#compile>i').addClass("fa-spin");

        var sendData = {};
        sendData['code']=editor.getValue();
        sendData['mode']=mode.val();
        sendData['input']=inputcheck.prop("checked") === true ? custom_inputs.val() : 'ip-null';
        sendData['user']="subrata";

        var c=1;

        /*alert(editor.getValue());
        alert(JSON.stringify(sendData));*/
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener('progress', function(e) {
                    /*if (e.lengthComputable) {
                        $('.progressbar .bar').css('width', '' + (100 * e.loaded / e.total) + '%');
                    }*/
                    c++;
                });
                return xhr;
            },
            url: 'http://localhost:8080/compile',
            type:'POST',
            data: JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            success : function(data){
                //alert(data['status']);
                setTimeout(function () {
                    $('#compile>i').removeClass("fa-spin");
                    c_output.text(data['status']);
                    op.fadeIn(700);
                    op.get(0).scrollIntoView();
                }, 500);

            },error: function(data){
                alert('error : \n'+JSON.stringify(data));
            }
        });

    });


    compile_submit.on('click',function () {

        //$('#compile>i').addClass("fa-spin");

        var sendData = {};
        sendData['code']=editor.getValue();
        sendData['mode']=mode.val();
        sendData['user']="subrata";
        sendData['id']=setId;

        /*alert(editor.getValue());
        alert(JSON.stringify(sendData));*/
        $.ajax({
            url: 'http://localhost:8080/submitcode',
            type:'POST',
            data: JSON.stringify(sendData),
            contentType : 'application/json; charset=utf-8',
            dataType: 'json',
            success : function(data){
                alert(data['msg']);
                if(data['msg'] === "Great job!"){
                    setTimeout(function () {
                        c_output.text(data['msg']);
                        op.fadeIn(700);
                        op.get(0).scrollIntoView();
                    }, 500);
                }else {
                    setTimeout(function () {
                        c_output.text(data['status']);
                        op.fadeIn(700);
                        op.get(0).scrollIntoView();
                    }, 500);
                }

                //alert(data['status']);
                /*setTimeout(function () {
                    $('#compile>i').removeClass("fa-spin");
                    c_output.text(data['status']);
                    op.fadeIn(700);
                    op.get(0).scrollIntoView();
                }, 500);*/

            },error: function(data){
                alert('error : \n'+JSON.stringify(data));
            }
        });

    });

    $.ajax({
        url: 'http://localhost:8080/questions',
        type:'GET',
        dataType: 'json',
        success : function(data){
            question = data;
            createQuestion(data);

        },error: function(data){
            alert('error : \n'+JSON.stringify(data));
        }
    });

    function createQuestion(q){
        var i=0,iid='';
        for (i=0;i<q.length;i++){

            $('.side-left').append("<div id=\""+q[i]['id']+"\" class=\"col-lg-12 no-margin-h padding-2rem-h padding-05rem-v border-bottom white-border\"\
                                    onclick=\"showQuestion(this);\" >\
                                    <p class=\"font-size-18\">"+q[i]['title']+"</p>\
                                    <p class=\"pull-right\">"+q[i]['marks']+"</p>\
                                    <p>type: "+q[i]['type']+"</p>\
                                    </div>");
        }

        i=0;
        if(setId === '')
            setId=question[i]['id'];
        if(index != 0) i=index;
        iid='#'+setId;
        $(iid).css("background","#12962a");
        $('.problemarea').append("<h3 title=\"question-title\">"+question[i]['title']+"</h3>\
                                    <p title=\"problem\">"+question[i]['question']+"</p>\
                                    <h4 >Input format</h4>\
                                    <p title=\"inputs\">"+question[i]['inputFormat']+"</p>\
                                    <h4>Output format</h4>\
                                    <p>"+question[i]['outputFormat']+"</p>\
                                    <h4>Constrains</h4>\
                                    <p>"+question[i]['constraints']+"</p>\
                                    <h3>Sample Test Case</h3>\
                                    <div class=\"sample-test-case\"></div>\
                                    <br><br>");

        for (var j=0;j<question[i]['sampleTestCase'].length;j++){
            $('.sample-test-case').append("<h4>Test case "+(j+1)+"</h4>\
                                    <h4>Input</h4>\
                                    <p>"+question[i]['sampleTestCase'][j]['inputs']+"</p>\
                                    <h4>Outputs</h4>\
                                    <p>"+question[i]['sampleTestCase'][j]['outputs']+"</p>");
        }

        if(question[i]['explanation'] !== "none")
            $('.sample-test-case').append("<h4>Explanation</h4>\
            <p>"+question[i]['explanation']+"</p>");

    }

});