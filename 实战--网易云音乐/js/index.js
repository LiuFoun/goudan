// d5059c632a7f42dd96b7d9dfedcdc0e9         f9ea7241948048ab8ed57fae8445b114   (58176)
//d5059c632a7f42dd96b7d9dfedcdc0e9
// 58171
//https://route.showapi.com/213-1?keyword=海阔天空&page=1&showapi_appid=58171&showapi_test_draft=false&showapi_timestamp=20180305171348&showapi_sign=f9ea7241948048ab8ed57fae8445b114


//showapi_appid=51833
// showapi_sign=288ae6dfd1f34e0b8463848fc4006c5a   one of fy's count


$(function (){
    var $Audio = $("audio"),
        $Tbody = $("#tbody"),
        $Play = $("#play"),
        timeArr,num=0;
    console.log($Tbody);
    //初始满音量
    $Audio[0].volume = 1;// 0到1，音量值

    // $("<tr><td>rrr</td></tr>").appendTo($Tbody);
    // console.log($Tbody);
    searchMusic("海阔天空",1);
//先初始化一首歌
    function searchMusic(songname,page){
        $Tbody.html("");
        var url = "https://route.showapi.com/213-1?keyword="+songname+"&page="+page+"&showapi_appid=51833&showapi_test_draft=false&showapi_timestamp="+getTime()+"&showapi_sign=288ae6dfd1f34e0b8463848fc4006c5a";

        $.getJSON(url,function(msg){
            var songInfo = msg.showapi_res_body.pagebean;
            console.log(songInfo);
            console.log(typeof songInfo.currentPage);


            //存歌曲信息数组
            var $list = songInfo.contentlist;
            var $main = $("#main");

            for(var key in songInfo.contentlist){
                //通过自定义属性记录歌曲的信息
                var $tr = $("<tr></tr>");
                $tr.data({
                    singername : $list[key].singername,
                    albumpicsmall : $list[key].albumpic_small,
                    albumpicbig : $list[key].albumpic_big,
                    songid : $list[key].songid,
                    songname : $list[key].songname,
                    m4a : $list[key].m4a,
                    albumname : $list[key].albumname
                }).append($("<td>"+fm(key*1+1)+"</td><td>"+$list[key].songname+"</td><td>"+$list[key].singername+"</td><td>"+$list[key].albumname+"</td>")).appendTo($Tbody)
            }
            if(songInfo.currentPage === 1){


                $Tbody.data("allPages",songInfo.allPages);//记录本首歌曲搜索结果总页数
            }
            scrollBar($main.find(".block"),$main.children(".content"),$main);//确定滚动条高度

            // scrollBar($main.find(".block"),$main.children(".content"),$main)//确定最后一页滚动条高度


            console.log($tr.data("albumpicsmall"))
            $Tbody.data({songname : songname,  //记录当前的页数
                    currentPage : songInfo.currentPage}); //记录歌名





        })
    }
//歌曲列表滚动条
    function scrollBar($obj1,$obj2,$obj3){
        //此处可以在查找到数据后改变top值到顶部，改善用户体验
        $obj3.off("mousewheel");
        //$obj1 滚动条的滑块
        //$obj2 监听高度的对象
        //$obj3 绑定滚动事件的对象
        var $obj1OffsetHeight = $obj1.offsetParent().height();
        $obj1.height($obj3.height()*$obj1OffsetHeight/$obj2.height());
        //确定滚动的最大范围
        var scrollMax = $obj1OffsetHeight - $obj1.height();


        $obj3.on("mousewheel",function(e,d){
            e.preventDefault();//阻止默认事件
            var top = $obj1.position().top;
            var contentMax = $obj2.height() - $obj3.height();

            if(d>0){ //向上滚
                top -= 30;
            }else{
                top += 30;
            }
            top = Math.max(0,top);
            top = Math.min(top,scrollMax);
            //console.log(top);

            $obj1.css("top",top);
            $obj2.css("top",-top/scrollMax*contentMax)

        })

    }
//翻页
    (function(){
        var $nextPage = $("#nextPage"),
            $prevPage = $("#prevPage"),
            $firstPage = $("#firstPage"),
            $lastPage = $("#lastPage");
        //下一页
        $nextPage.on("click",function() {
            if ($Tbody.data("currentPage") === $Tbody.data("allPages")) {
                return
            }
            $Tbody.html("");
            console.log("下一页");
            searchMusic($Tbody.data("songname"), $Tbody.data("currentPage") + 1);
        });
        //上一页
        $prevPage.on("click",function(){
            if($Tbody.data("currentPage") === 1){return};
            console.log("上一页");
            searchMusic($Tbody.data("songname"),$Tbody.data("currentPage")-1);
        });
        //首页
        $firstPage.on("click",function(){
            if($Tbody.data("currentPage") === 1){return};
            console.log("首页");
            searchMusic($Tbody.data("songname"),1);
        });
        //尾页
        $lastPage.on("click",function(){
            if($Tbody.data("currentPage") === $Tbody.data("allpages")){return};
            console.log("尾页");
            searchMusic($Tbody.data("songname"),$Tbody.data("allPages"));
        });


    })();




//点击播放
    $Tbody.on("dblclick","tr",function(){

        console.log("播放歌曲");

        //    播放当前点击的歌曲
        //$Audio.prop("src",$(this).data("m4a"))[0].play();
        $Play.find(".play").addClass("zanting").removeClass("bofang");
        $Audio.data({
            "showTime":$(this).index(),
            "smallImg":$(this).data("albumpicsmall"),
            "songname":$(this).data("songname"),
            "singername":$(this).data("singername"),
            "songid":$(this).data("songid")
        });
        console.log($Audio.data())
    });
// input搜索歌曲
    $("#header .search").keyup(function(e){
        if(e.keyCode !== 13){return};
        var val = $(this).val();
        if(val){
            $Tbody.data("songname",val);
            searchMusic(val,1);
            closeLayer();
        }
    });
//点击播放暂停
    (function(){
        //  播放暂停
        var $player = $Play.find(".play"),
            $prev = $Play.find(".prev"),
            $next = $Play.find(".next");


        // function switchSong(showTime,$tr){
        //
        //     var m4a = $tr.eq(showTime).data("m4a");
        //
        //     $Audio.prop("src",m4a)[0].play(0);
        //     $Audio.data("showTime",showTime);
        //
        // }


        $player.on("click",function(){
            if($(this).hasClass("bofang")){//真就是没有播放音乐
                $Audio[0].play();
            }else{//正在播放音乐，点击暂停
                $Audio[0].pause();
            }
            $(this).toggleClass("zanting bofang");
        });
        //  上一首
        $prev.on("click",function(){
            var showTime = $Audio.data("showTime") - 1;
            var $tr = $Tbody.children();
            showTime = (showTime === -1) ? $tr.length-1 : showTime;
            var $trThis = $tr.eq(showTime);
            $Audio.prop("src",$trThis.data("m4a"))[0].play(0);
            console.log($Audio.prop("src"));
            $Audio.data({
                "showTime":showTime,
                "smallImg":$trThis.data("albumpicsmall"),
                "songname":$trThis.data("songname"),
                "singername":$trThis.data("singername"),
                "songid":$(this).data("songid")
            });
        });
        //  下一首
        $next.on("click",function(){
            var showTime = $Audio.data("showTime") + 1;
            var $tr = $Tbody.children();
            showTime %= $tr.length;
            var $trThis = $tr.eq(showTime);
            $Audio.prop("src",$trThis.data("m4a"))[0].play(0);
            console.log($Audio.prop("src"));
            $Audio.data({
                "showTime":showTime,
                "smallImg":$trThis.data("albumpicsmall"),
                "songname":$trThis.data("songname"),
                "singername":$trThis.data("singername"),
                "songid":$(this).data("songid")
            })
        });


    })();
//同步进度条
function Synchronize(){
    var $control = $Play.children(".control"),
        $progressBar = $control.find(".progress");
    //获取总时长
    var $TotalTime = $Audio[0].duration,
        currentTime = $Audio[0].currentTime;

    var x = Math.floor($Audio[0].currentTime)/Math.floor($TotalTime)*$progressBar.width();
    $progressBar.children(".red").css("width",x);
    $progressBar.children(".bar").css("width",x - $progressBar.children(".bar").width()/2);

    //格式化时间
    var time = fm(Math.floor($currentTime/60)) + fm(Math.floor(currentTime%60));//03:04
    $control.children(".time").html(time);

    console.log("已经播放");
}
//  进度条拖动
    (function(){
        $(".progress .bar").on("mousedown",function(e){
            $Audio.off("timeupdate");
            var $target = $(this);
            var mouseOldX = e.clientX,//点击时坐标x到页面左端距离
                max = $target.parent().width(),//350
                left = $target.position().left,//-7
                OldWidth = $target.prev().width();//进度条红线长度

            $(document).on("mousemove",function(e){
                console.log(e.clientX);
                var _X = e.clientX - mouseOldX + left;
                // var _X = e.clientX - mouseOldX;
                _X = Math.max(0,_X);
                _X = Math.min(_X,max);
                OldWidth = _X;
                $target.prev().css("width",_X);
                $target.css("left",_X - $target.width()/2);
            });

            $(document).one("mouseup",function(){
                // $Audio[0].currentTime = OldWidth/max * Math.floor($Audio[0].duration);//此处因连接有问题无法获取数据报错，中断后面解除绑定时间
                $Audio.on("timeupdate",function () {
                    Synchronize();
                });
                console.log("up");
                $(this).off("mousemove");
            });

        })
    })();


    // Audio 的事件
    // Audio 的currentTime发生改变触发的事件
    $Audio.on("timeupdate",function(){
        var $aLi = $("#lyricList").children();
        Synchronize();

        if($Audio[0].currentTime > timeArr[num]*1){
            num++;
            $aLi.each(function(index,key){
                if(index < num){
                    $(key).css("color","#666")
                }else if(index === num){
                    if(num > 4 && num<$aLi.length-5){// 控制ul滚动
                        $("#lyricList").css("top",-(index-4)*27);
                    }
                    $(key).css("color","#f60")
                }
            })
        }
    });
    //Audio 的资源开始加载时触发的事件
    $Audio.on("loadstart",function(){
        var $sidebarFooter = $(".sidebarFooter"),
            $smallImg =   $sidebarFooter.children("img"),
            $songname = $sidebarFooter.find(".singname"),
            $singername = $sidebarFooter.find(".singername");
        console.log($(this).data);

        //  歌曲小头像
        $smallImg.prop("src",$(this).data("albumpicsmall"));
        //    歌名
        $songname.html($(this).data("songname"));
        //    歌手名
        $singername.html($(this).data("singername"));
        // 歌曲 id 用于获取歌词
        getLyric($(this).data("songid"));
        num = 0;
        $("#lyricList").css("top",0);
    });
    //音量控制
    (function(){
        $(".volume .bar").on("mousedown",function(e){
            var $target = $(this);
            var mouseOldX = e.clientX,
                max = $target.parent().width(),
                left = $target.position().left,
                OldWidth = $target.prev().width();

            $(document).on("mousemove",function(e){
                console.log(e.clientX);
                var _X = e.clientX - mouseOldX + left;
                // var _X = e.clientX - mouseOldX;
                _X = Math.max(0,_X);
                _X = Math.min(_X,max);
                OldWidth = _X;
                $target.prev().css("width",_X);
                $target.css("left",_X - $target.width()/2);
                $Audio[0].volume = OldWidth/max;
            });

            $(document).one("mouseup",function(){
                $(this).off("mousemove");
            });

        })
    })();
    //打开歌词层
    (function(){
        $(".sidebarFooter").click(layer);
        $(".lyric .top .icon-suoxiaole").click(closeLayer);
        $(".contentDetails").css("opacity",0);

        function layer(){
            $(".containerList").fadeTo(1000,0,function(){
                $(this).css("z-index",3);
                $(".contentDetails").fadeTo(1000,1,function(){
                    $(this).css("z-index",3)
                })
            });

        }






    })();
    function closeLayer(){
        console.log(1);
        $(".contentDetails").fadeTo(1000,0,function(){
            $(this).css("z-index",3);
            $(".containerList").fadeTo(1000,1,function(){
                $(this).css("z-index",3)
            })
        });
    }

//请求歌词
    function getLyric(songid){
        $("#lyricList").html("");
        var url = "https://route.showapi.com/213-2?musicid="+songid+"&showapi_appid=58171&showapi_test_draft=false&showapi_timestamp="+getTime()+"&showapi_sign=68217dfbac906d6e6689d69c7a23be1b";
        $.getJSON(url,function(msg){
           // console.log(msg.showapi_res_body.lyric);
            $("#FMlyric").html(msg.showapi_res_body.lyric);
            $("#FMlyric").html().replace(/\[([\d:.]+)\](.*)/,function(a,$1,$2){
                $("<li></li>").data("time",$1).html($2).appendTo($("#lyricList"))
            });
            Synchronize();
        });

    }
//歌词滚动
    function scrollLyric(){
        var $Ul = $("#lyricList"),
            $aLi = $Ul.children();

        timeArr = $aLi.map(function(value,li){//03:08.05
            return $(li).data("time").replace(/(\d{2}):(\d{2}).(\d{2})/,function(a,$1,$2){
                return $1 * 60 + $2*1
            })
        });

    }
//  下载当前
    $("#download").click(function(){
        var a = $("<a href='"+$Audio[0].src+"'></a>");
        a[0].download = "0";
        a[0].click();
    });








    //获取本地时间
    function getTime(){
        var date = new Date(),
            YY = date.getFullYear(),
            MM = fm(date.getMonth()+1),
            DD = fm(date.getDate()),
            hh = fm(date.getHours()),
            mm = fm(date.getMinutes()),
            ss = fm(date.getSeconds());

        return YY + MM + DD + hh + mm + ss;
    }
    //格式化时间
    function fm(n){
        return n< 10 ?"0"+n:n+"";
    }















});