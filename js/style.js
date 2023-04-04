$(".quizbox").hide();
$(".restartquiz").hide();

var Fname="";
var count=0;
var checkid="";
var point=0;
var totaltime=0;  
var in_min=0;
var in_sec=0;     
var quiztime="";        

$("#startquizbtn").click(function(){
    Fname=$("#playername").val();
    $(".quizbox").show();
    $(".startquizbox").hide();
    if(Fname!="")
    {
        $("#name").text(Fname);
    }
    callquestion();
});


function timer()
{
    totaltime=60;
    function intervaltime()
    {
        totaltime--;
        var in_min=Math.floor(totaltime/60);
        var in_sec=totaltime%60;

        if(in_sec<10)
            in_sec = "0" + in_sec;
        if(in_min<10)
            in_min = "0" + in_min;

        $("#time").text(in_min +":"+ in_sec);
        if(totaltime<=20)
        {
            $("#time").css("color","red")
        }
        if(totaltime==0)
        {
            clearInterval(quiztime);
            automate();
        }  
    }
    quiztime=setInterval(intervaltime,1000);
}

function callquestion()
{
    $("#time").text("00:00");
    $("#time").css("color","");
    timer();
    $("#nextbtn").css("display","none");
    $("#questionNo").text("Question No. " + (count+1) + "/" + questions.length);

    $("#question").text((count+1)+ ". " + questions[count].q);
    $("#a").val(questions[count].a);
    $("#b").val(questions[count].b);
    $("#c").val(questions[count].c);
    $("#d").val(questions[count].d);
}

$(".opt").click(function(){
    $("#nextbtn").css("display","block");
    clearInterval(quiztime);
    $(this).css("background","Teal");
    $(this).css("color","white");

    checkid=$(this).attr("id");
    if(checkid == questions[count].ans)
    {
        point++;
    }
    $(".opt").prop("disabled","true");
});

$("#nextbtn").click(function(){
    automate();
});


function automate()
{
    count++;
    $(".opt").css("background","");
    $(".opt").prop("disabled","");
    $(".opt").css("color","");

    if(count>=questions.length)
    {
        $(".quizbox").hide();
        $(".restartquiz").show();
        $("#totalpoints").text("Total Points: "+ point+ "/"+ questions.length);
    }
    else
    {
        callquestion();
    }
}


function resetquiz()
{
    point=0;
    count=0;
    clearInterval(quiztime);
    $("#time").text("00:00");
    $("#points").text("Points:" + point);
    callquestion();
}


$("#restartquizbtn").click(function()
{
    $(".quizbox").show();
    $(".restartquiz").hide();
    resetquiz();
})
