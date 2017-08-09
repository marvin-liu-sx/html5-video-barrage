<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Demo">
        <meta name="keywords" content="">
        <!-- 新 Bootstrap 核心 CSS 文件 -->
        <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <!-- 可选的Bootstrap主题文件（一般不用引入） -->
        <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

        <link rel="stylesheet" type="text/css" href="css/barrager.css">
        <!-- socket IO  -->
        <script src='//cdn.bootcss.com/socket.io/1.3.7/socket.io.js'></script>
        <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
        <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
        <!--<script src="js/jquery-1.12.0.min.js"></script>-->
        <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <script src="//cdn.bootcss.com/json2/20150503/json2.min.js"></script>

        <script src="js/jquery.barrager.js"></script>



        <!--视频-->
<!--        <script src="js/jquery-1.12.0.min.js"></script>-->
        <script src="js/Andetu-player-2.0.js"></script>
        <script src="js/common.js"></script>
        <!--<script src="js/bootstrap.min.js"></script>-->


        <link href="css/Andetu-player.css" rel="stylesheet">
        <!--<link href="css/bootstrap.min.css" rel="stylesheet">-->
        <link href="css/common.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">





        <title>弹幕Demo</title>
    </head>
    <body style="background-color：red">
        <div class="andetu-player" style="height:100%;"></div>
        <!--<video src="//media.html5media.info/video.mp4" width="320" height="200" controls preload></video>--> 
        <!--<div class="">-->
        <!--            <video class="video" poster="//media.html5media.info/poster.jpg" width="" height="" controls preload>
                        <source src="//media.html5media.info/video.mp4" type='video/mp4' />
                        <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' />
                        <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
                    </video>-->

        <!--</div>-->

<!--        <div class="container navbar-fixed-bottom" style="overflow: hidden;">
           

            <div class="row">
                <p></p>
                <div class="col-lg-12">
                    <div class="input-group input-group-lg">
                        <input type="text" id="announcement" class="form-control" placeholder="chat...">
                        <span class="input-group-btn">
                            <button class="btn btn-success announcement" type="button">
                                我要吐槽
                            </button>
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <p></p>
                <div class="col-lg-12">
                    <div class="alert alert-info" id="online_count" style="text-align: center;"></div>
                </div>
            </div>

        </div>-->
        <script>
            $(document).ready(function () {
                // 连接服务端
                var http = 'http://' + document.domain;
//                var old_num = 0;
//                var socket = io(http + ':2120/');
//
//                var uid = Date.parse(new Date());
//
//                // 连接后登录
//                socket.on('connect', function () {
//                    socket.emit('login', uid);
//                });


//                socket.on('update_online_count', function (online_stat) {
//                    $('#online_count').html(online_stat);
//                });
//
                $(".player-barrage-btn").click(function () {
                    alert('ss');
                    _sendMsg();
                    $("#announcement").val('');
                });

//                document.onkeydown = function (e) {
//                    var ev = document.all ? window.event : e;
//                    if (ev.keyCode == 13) {
//                        $(".announcement").click();
//                    }
//                };
//
//                String.prototype.format = function (args) {
//                    var result = this;
//                    if (arguments.length < 1) {
//                        return result;
//                    }
//                    var data = arguments;
//                    if (arguments.length == 1 && typeof (args) == "object") {
//                        data = args;
//                    }
//                    for (var key in data) {
//                        var value = data[key];
//                        if (undefined != value) {
//                            result = result.replace("{" + key + "}", value);
//                        }
//                    }
//                    return result;
//                };

//                var barrager_code =
//                        'var item={\n' +
//                        "   img:'{img}', //图片 \n" +
//                        "   info:'{info}', //文字 \n" +
//                        "   href:'{href}', //链接 \n" +
//                        "   close:{close}, //显示关闭按钮 \n" +
//                        "   speed:{speed}, //延迟,单位秒,默认6 \n" +
//                        "   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n" +
//                        "   color:'{color}', //颜色,默认白色 \n" +
//                        "   old_ie_color:'{old_ie_color}', //ie低版兼容色,不能与网页背景相同,默认黑色 \n" +
//                        " }\n" +
//                        "$('body').barrager(item);";
//
//                var default_item = {
//                    'img': 'img/avatar.png',
//                    'info': '弹幕文字信息',
//                    'href': '',
//                    'close': true,
//                    'speed': 5,
//                    'bottom': 70,
//                    'color': '#fff',
//                    'old_ie_color': '#000000'
//                };

//                socket.on('new_msg', function (rs) {
//
//                    var obj = JSON.parse(rs);
//
//                    var item = {
//                        'img': 'img/avatar.png',
//                        'info': obj.data,
//                        'close': true
//                    };
//
//                    $('#barrager-code').val(barrager_code.format(default_item));
//
//                    $('.andetu-player').barrager(item);
//                });


//                socket.on('old_msg', function (rs) {
//
//                    var obj = JSON.parse(rs);
//
//                    var item = {
//                        'img': 'img/avatar.png',
//                        'info': obj.data,
//                        'close': true
//                    };
//
//                    $('#barrager-code').val(barrager_code.format(default_item));
//
//                    $('.andetu-player').barrager(item);
//                    old_num++;
////                    console.log(old_num);
//                    if (old_num > 30) {
//                        $('video').removeAll();
//                        old_num = 0;
//                    }
//                });


                /**
                 * 发送信息
                 * @returns {boolean}
                 * @private
                 */
                function _sendMsg()
                {
                    var content = $("#announcement").val();
                    if (!content) {
                        alert('请输入内容');
                        return false;
                    }
                    var _url = http + ':2121/?type=send_msg';
                    $.ajax({
                        url: _url, // 请求url
                        type: "get", // 提交方式
                        dataType: "json", // 数据类型
                        data: {
                            'content': content
                        },
                        beforeSend: function () {
                        },
                        success: function (s) {
                        console.log(s);
                                $("#announcement").val('');
                                that.barrage_form.find('input').val('').prop('disabled', true).attr('placeholder', '弹幕发送成功(*^_^*)');
                                that.barrage_btn.addClass('player-barrage-btn-locked').html('<em>' + that.o.post_time + '</em> 秒');
                                var interval = setInterval(function () {
                                var time = parseInt(that.barrage_btn.find('em').html()) - 1;
                                        if (time <= 0) {
                                clearInterval(interval);
                                        that.barrage_form.find('input').prop('disabled', false).attr('placeholder', '看都看了，来一发吧！');
                                        that.barrage_btn.removeClass('player-barrage-btn-locked').html('发送');
                                }
                                ;
                                        that.barrage_btn.find('em').html(time);
                                }, 1000);
                        },
                        error: function () {
                        }
                    });
                }

            });


//            视频弹幕*******************************************************************

            $(function () {
                
               
                
                
                $('.re-comment').click(function () {
                    replay_box($(this));
                });
                $('.andetu-player').adtplayer({
                    'video': [
                        ['流畅', 'http://media.html5media.info/video.mp4', 'http://media.html5media.info/video.mp4'],
                        ['标清', 'http://www.andetu.com/static/player/2.mp4', 'http://www.andetu.com/static/player/2.mp4'],
                        ['高清', 'http://www.andetu.com/static/player/3.mp4', 'http://www.andetu.com/static/player/3.mp4'],
                        ['蓝光', 'http://www.andetu.com/static/player/4.mp4', 'http://www.andetu.com/static/player/4.mp4'],
                    ],
//                    'socket':socket,
                    'velocity': ['1.0X', '1.5X', '2.0X', '3.0X'],
                    'post_url': 'http://localhost/danmu/web/data',
                    'get_url': 'http://localhost/danmu/web/data?get',
                });
            });
            function replay_box(obj) {
                var html = '', cid = obj.data('cid');
                html += '<div class="replay-text">';
                html += '	<form class="ajax-form" method="post" autocomplete="off" action="http://player.andetu.com/comment">';
                html += '		<input type="hidden" name="upcid" value="' + cid + '">';
                html += '		<i class="arrow-top"></i>';
                html += '		<textarea name="message"></textarea>';
                html += '		<div class="replay-btn clearfix">';
                html += '			<button class="replay-submit" type="submit">点评回复</button>';
                html += '		</div>';
                html += '	</form>';
                html += '</div>';
                if ($('#replay_wrap_' + cid + ' div').length > 0) {
                    obj.html('回复');
                    $('#replay_wrap_' + cid).html("");
                } else {
                    obj.html('收起');
                    $('#replay_wrap_' + cid).html(html);
                    $(".ajax-form").submit(function () {
                        ajax_post($(this));
                        return false;
                    });
                }
            }
        </script>
    </body>
</html>

