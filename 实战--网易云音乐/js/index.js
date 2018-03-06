// d5059c632a7f42dd96b7d9dfedcdc0e9         f9ea7241948048ab8ed57fae8445b114   (58176)
//d5059c632a7f42dd96b7d9dfedcdc0e9
// 58171
//https://route.showapi.com/213-1?keyword=海阔天空&page=1&showapi_appid=58171&showapi_test_draft=false&showapi_timestamp=20180305171348&showapi_sign=f9ea7241948048ab8ed57fae8445b114


$(function (){
    var $Audio = $("audio"),
        $Tbody = $("#tbody"),
        $Play = $("#play")
    console.log($Tbody);

    // $("<tr><td>rrr</td></tr>").appendTo($Tbody);
    // console.log($Tbody);
    searchMusic("海阔天空",1);
//先初始化一首歌
    function searchMusic(songname,page){
        $Tbody.html("");
        var url = "https://route.showapi.com/213-1?keyword="+songname+"&page="+page+"&showapi_appid=58176&showapi_test_draft=false&showapi_timestamp="+getTime()+"&showapi_sign=f9ea7241948048ab8ed57fae8445b114";

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



            //确定滚动条的高度
            if($){

            }

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
        var $sidebarFooter = $(".sidebarFooter"),
            $smallImg =   $sidebarFooter.children("img"),
            $singname = $sidebarFooter.find(".singname"),
            $singername = $sidebarFooter.find(".singername");

        //  歌曲小头像
        $smallImg.prop("src",$(this).data("albumpicsmall"));
        //    歌名
        $singname.html($(this).data("songname"));
        //    歌手名
        $singername.html($(this).data("singername"));
        //    播放当前点击的歌曲
        $Audio.prop("src",$(this).data("m4a"))[0].play();
        $Play.find(".play").addClass("zanting").removeClass("bofang");
        $Audio.data("showTime",$(this).index());
    });
    $("#header .search").keyup(function(e){
        if(e.keyCode !== 13){return};
        var val = $(this).val();
        if(val){
            $Tbody.data("songname",val);
            searchMusic(val,1)
        }
    });
//点击播放暂停
    (function(){
        //  播放暂停
        var $player = $Play.find(".play"),
            $prev = $Play.find(".prev"),
            $next = $Play.find(".next");
        var $sidebarFooter = $(".sidebarFooter"),
            $smallImg =   $sidebarFooter.children("img"),
            $singname = $sidebarFooter.find(".singname"),
            $singername = $sidebarFooter.find(".singername");

        $player.on("click",function(){
            if($(this).hasClass("bofang")){//真就是没有播放音乐
                $Audio[0].play();
                //$(this).addClass("zanting")
            }else{//正在播放音乐，点击暂停
                $Audio[0].pause();
            }
            $(this).toggleClass("zanting bofang");
        });
        //  上一首
        $prev.on("click",function(){
            var showTime = $Audio.data("showTime") - 1;
            var $tr = $Tbody.children();
            var m4a = $tr.eq(showTime).data("m4a");
            showTime = (showTime === -1) ? $tr.length-1 : showTime;
            $Audio.prop("src",m4a)[0].play(0);
            $Audio.data("showTime",showTime);
            console.log(showTime);
            $smallImg.prop("src",$tr.eq(showTime).data("albumpicsmall"));
            //    歌名
            $singname.html($tr.eq(showTime).data("songname"));
            //    歌手名
            $singername.html($tr.eq(showTime).data("singername"));
        });
        //  下一首
        $next.on("click",function(){
            var showTime = $Audio.data("showTime") + 1;
            var $tr = $Tbody.children();
            var m4a = $tr.eq(showTime).data("m4a");
            showTime %= $tr.length;
            $Audio.prop("src",m4a).play(0);
            $Audio.data("showTime",showTime);
            console.log(showTime)
        });


    })();


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