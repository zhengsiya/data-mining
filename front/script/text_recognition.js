$(function(){
    
    $(".start_dtg").click(function(){
        $('.result').empty();//清空显示结果的div内的内容
        var dt = $('#tt').val();//获取textarea中的内容
        //alert(dt);
        $.ajax({
            type:	'POST',
            url:	"http://121.5.70.176:8888/textCensor/texttest/?text=" + dt,
            success:function(data){
            console.log(data);
            if(data['code']==1){
                if(data['data']['conclusion']==1){
                    $('.result').css('color',"#099b04");
                    var ctnt = '通过';//用绿色
                    $('.result').append(ctnt);
                }

                else if(data['data']['conclusion']==2||data['data']['conclusion']==3){
                    if(data['data']['conclusion']==2){
                        $('.result').css('color',"#9b0425");
                        var ctnt = '不通过';//红色
                    }
                    else if(data['data']['conclusion']==3){
                        $('.result').css('color',"#04349b");
                        var ctnt = '疑似';//蓝色
                    }
                    if(data['data']['type']==0){
                        $('.result').append(ctnt+":(未确定垃圾文本)");
                    }
                    else if(data['data']['type']==1){
                        $('.result').append(ctnt+":(黄色文本)");
                    }
                        
                    else if(data['data']['type']==2){
                        $('.result').append(ctnt+":(广告文本)");
                    }
                    else if(data['data']['type']==3){
                        $('.result').append(ctnt+":(低俗辱骂)");
                    }
                    else if(data['data']['type']==999){
                        $('.result').append(ctnt+":(其他情况)");
                    }

                }
                
                
            }
            else if(data['code']==2){
                $('.result').css('color',"#64049b");
                $('.result').append("检测失败!");//紫色
            }
        },
        error:function(){
            alert("error");
        },
    
        })

        $('a').text('再次检测');
    });
    
})
