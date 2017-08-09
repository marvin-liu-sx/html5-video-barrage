/**	Andetu player-v2.0 html5视频播放器
 *	License LGPL  http://player.andetu.com/ By 安德兔
 *	Date : 2017-03-31
 *	©copyright : 2016-2099
*/
+function ($) {
//	'use strict';
	var Adtplayer = function(e, o) {
		this.video = null
		this.browser = {}
		this.barrage_upid = 0
		this.top_size = 0
		this.acted_id = null
		this.locked = true
		this.playing = false;
		this.e  = $(e)
		this.o   = $.extend({}, Adtplayer.DEFAULTS, o)
		this.player_id = 'player_'+parseInt(Math.random()*1000000);
		this.player_box = $(this.o.template).attr('id',this.player_id).appendTo(this.e);
		this.getBrowser({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
		
		if(this.browser.safari || this.browser.rv) {
			this.browser.firefox = true;
		}
		this.browser.opera = this.browser.opera ? opera.version() : 0;
		this.init()
	}
	Adtplayer.DEFAULTS = {
		'video' : [],			//视频链接地址
		'post_url':false,		//弹幕发送地址
		'get_url':false,		//弹幕获取地址
		'barrage_top' : Math.floor(Math.random()*100)+"%",	//弹幕距离播放器底部距离
		'speed_time' : 10,		//快进快退时间
		'barrage_time' : 25,		//弹幕经过视频窗口的基础时间
		'post_time' : 5,		//弹幕发送间隔时间
		'width' : '100%',		//视频容器宽度
		'height' : '100%',			//视频容器高度
		'volume' : 0.5,			//视频默认音量
		'barrage_closed':false,	//完全关闭弹幕
		'barrage_status':true,	//弹幕状态
		'velocity': 1,	//视频播放速度
		'barrage_rule' : /[ ~`!@#$%^&*()_+-=;:"'\\|<>,.?\/、{}【】\[\]]/g,//弹幕过滤特殊字符
		'color' : ['#ffffff','#f30715','#fd9922','#fef032','#24fd30','#28fcfe','#0f8fec','#8620fc'],//弹幕颜色列表
		'video_error' : '<div class="player-loading-err"><p>视频地址解析错误，请刷新后重试</p><p>若多次操作后仍提示错误请联系管理员！</p></div>',
		'template' : '<div class="adt-player"><div name="video-box"><div name="video-loading"><ul name="loading-spinner"><li name="loading-rect1"></li><li name="loading-rect2"></li><li name="loading-rect3"></li><li name="loading-rect4"></li><li name="loading-rect5"></li></ul></div></div><div name="controls"><div name="progress"><div name="buffer"></div><div name="handle"></div></div><div class="player-action"><div class="adtplayer-icon picon-play-arrow" name="play-switch"></div><div name="play-time">00:00<span>/</span>00:00</div><div name="barrage-switch"><i></i></div><div class="adtplayer-icon picon-fullscreen" name="screen"></div><div name="volume-progress"><div name="volume-focus"></div></div><div class="adtplayer-icon picon-volume-down" name="volume-switch"></div><div name="clarity"><ul></ul><span>加载中</span></div><div name="velocity"><ul></ul><span>速度</span></div><a class="adtplayer-icon picon-download" name="download"></a></div></div><div name="barrage-control"><span>设置</span><div name="barrage-set"><div name="barrage-set-box"><h3>发送颜色</h3><ul name="barrage-set-c"></ul></div></div><div name="barrage-form"><input type="text"><div name="barrage-btn">发送</div></div></div></div>',
		'onTimeupdate' : function() {},
	}
	Adtplayer.prototype = {
		init : function(){
			var that = this;
			that.player_box.find('div,a,ul,li').each(function(i){
				var obj = $(this),
					name = obj.attr('name') || false;
				if(name){
					obj.addClass('player-'+name).removeAttr('name');
					name = name.replace(/-/g,'_');
					eval('that.'+name+' = obj');
				}
			});
			that.video_box.css({width:that.o.width,height:that.o.height});
			if($.isArray(that.o.video)){
				$.each(that.o.video,function(i, n){
					if(!i){
						that.video = $('<video>').attr({
							'preload':'auto',
							'src':n[1]
						}).html('<source src="'+n[1]+'" type="video/mp4">').css({width:'100%',height:'100%'}).appendTo(that.video_box);
						that.clarity.find('span').html(n[0]);
						n[2] ? that.download.attr('href',n[2]).show() : that.download.hide();
					}
					that.clarity.find('ul').append('<li '+(!i ? 'class="a"' : '')+' url="'+n[1]+'" download="'+(n[2] || '')+'">'+n[0]+'</li>');
				});
			}else{
				that.video = $('<video>').attr({
							'preload':'auto',
							'src':that.o.video
						}).html('<source src="'+that.o.video+'" type="video/mp4">').css({width:'100%',height:'100%'}).appendTo(that.video_box);
				that.clarity.remove();
				that.download.remove();
			}
			if($.isArray(that.o.velocity)){
				$.each(that.o.velocity,function(i, n){
					if(!i){
						that.video[0].playbackRate = parseFloat(n);
						that.velocity.find('span').html(n);
					}
					that.velocity.find('ul').append('<li '+(!i ? 'class="a"' : '')+' v="'+n+'">'+n+'</li>');
				})
			}else{
				that.video[0].playbackRate = parseFloat(that.o.velocity);
				that.velocity.remove();
			}
			that.velocity.find('span').on('click',function(){
				var ul = that.velocity.find('ul'),
					span = $(this);
				ul.slideToggle();
				if(ul.css('display') == 'block'){
					$(document).one('click',function(){
						ul.slideUp();
					});
					ul.find('li').on('click',function(){
						var li = $(this);
						li.addClass('a').siblings().removeClass('a');
						that.video[0].playbackRate = parseFloat(li.attr('v'));
						span.html(li.html());
						ul.find('li').off('click');
					});
					return false;
				}
			});
			that.clarity.find('span').on('click',function(){
				var ul = that.clarity.find('ul'),
					span = $(this);
				ul.slideToggle();
				if(ul.css('display') == 'block'){
					$(document).one('click',function(){
						ul.slideUp();
					});
					ul.find('li').on('click',function(){
						var li = $(this),
							down_url = li.attr('download') || false;
						if(li.hasClass('a')) return false
						ul.find('li').off('click');
						that.locked = true;
						that.video_loading.show();
						li.addClass('a').siblings().removeClass('a');
						span.html(li.html());
						down_url ? that.download.attr('href',down_url).show() : that.download.removeAttr('href').hide();
						that.videoSrc(li.attr('url'));
					});
					return false;
				}
			});
			$.each(that.o.color,function(i, n){
				if(!i) that.barrage_color = n;
				that.barrage_set_c.append('<li '+(!i ? 'class="a"' : '')+' color="'+n+'" ><i style="background:'+n+'"></i></li>');
			});
			that.screen.on('click',function(){
				if(that.fullscreenStatus()){
					return that.fullscreenExit();
				}
				return that.fullscreen();
			});

			that.barrage_velocity = (that.video_box.width() / that.o.barrage_time).toFixed(10);
			that.videoVolume(0,that.o.volume);
			that.volume_switch.off('click').on('click',function(){
				if(that.o.volume != 0){
					return that.videoVolume(0,0);
				}
				return that.videoVolume(0,0.5);
			});
			if(that.o.barrage_status){
				that.barrage_switch.addClass('player-barrage-switched');
				if(that.o.post_url){
					that.barrage_control.slideDown();
				}
			}
			that.barrage_switch.on('click',function(){
				!that.o.barrage_status ? that.o.barrage_status = true : that.o.barrage_status = false,$('.player-barrage-msg').remove();
				$(this).toggleClass('player-barrage-switched')
				if(!that.o.post_url){
					return false;
				}
				that.barrage_control.slideToggle();
			});
			that.barrage_control.find('span').on('click',function(){
				that.barrage_set.slideToggle();
				if(that.barrage_set.css('display') == 'block'){
					$(document).one('click',function(){
						that.barrage_set.slideUp();
					});
					that.barrage_set_c.find('li').off('click').on('click',function(){
						that.barrage_color = $(this).attr('color');
						$(this).addClass('a').siblings().removeClass('a');
					});
					return false;
				}
			});
			that.barrage_btn.on('click',function(){
				return that.postBarrage();
			});
			if(that.o.barrage_closed){
				that.barrage_switch.remove();
				that.barrage_control.remove();
			}
			var click_time = null;
			that.video.off().on({
				click:function(e){
					clearTimeout(click_time);
					click_time = setTimeout(function(){
						that.video[0].paused ? that.video[0].play() : that.video[0].pause();
					}, 300);
					return false;
				},
				dblclick:function(){
					clearTimeout(click_time);
					if(that.fullscreenStatus()){
						that.fullscreenExit();
					}else{
						that.fullscreen();
					}
					return false;
				},
				progress:function(){
					return that.videoBuffer();
				},
				play:function(){
					return that.buttonIcon(that.play_switch,'pause');
				},
				pause:function(){
					return that.buttonIcon(that.play_switch,'play-arrow');
				},
				waiting:function(){
					that.locked = true;
					return that.buttonIcon(that.play_switch,'loading');
				},
				timeupdate:function(){
					that.currentTime = that.video[0].currentTime;
					that.getBarrage(parseInt(that.currentTime));
					that.handle.css('width', (100 * that.currentTime / that.duration)+'%');
					that.play_time.html(that.videoTime(that.currentTime)+'<span>/</span>'+that.videoTime(that.duration));
					if (typeof that.o.onTimeupdate === 'function') {
						that.o.onTimeupdate.call(that,that);
					}
				},
				ended:function(){
					return that.buttonIcon(that.play_switch,'refresh');
				},
				playing:function(){
					that.playing = true;
					return that.buttonIcon(that.play_switch,'pause');
				},
				durationchange:function(){
					that.play_switch.off('click').on('click',function(){
						if(that.locked){
							return false;
						}
						return that.video[0].paused ? that.video[0].play() : that.video[0].pause();
					});
					that.duration = that.video[0].duration;
					return that.play_time.html('00:00'+'<span>/</span>'+that.videoTime(that.duration));
				},
				canplaythrough:function(){
					that.locked = false;
					that.video_loading.hide();
				},
				emptied:function(){
					//console.log('当前播放列表为空');
				},
				error:function(){
					that.video_loading.html(that.o.video_error);
				}
			});

			var time_up = false,
				volume_up = false;
			that.progress.on('mousedown',function(e){
				if(1 == e.which){
					time_up = true;
					if(!that.locked) that.video[0].pause();
					that.videoHandle(e.pageX);
				}
			});
			that.volume_progress.on('mousedown',function(e){
				if(1 == e.which){
					volume_up = true;
					that.videoVolume(e.pageX);
				}
			});
			$(document).on({
				mouseup:function(e) {
							if(time_up){
								time_up = false;
								if(!that.locked) that.video[0].play();
								that.videoHandle(e.pageX);
							}
							if(volume_up){
								volume_up = false;
								that.videoVolume(e.pageX);
							}
						},
				mousemove:function(e) {
							if(time_up){
								if(!that.locked) that.video[0].pause();
								that.videoHandle(e.pageX);
							}
							if(volume_up){
								that.videoVolume(e.pageX);
							}
						},
				'fullscreenchange mozfullscreenchange webkitfullscreenchange' : function(){
					if(!that.fullscreenStatus()){
						that.fullscreenExit();
					}
				}
			});
			var fastKey = function(e){
					var c_t = that.currentTime || 0;
					$(document).one('click',function(e){
						if(!$(e.target).closest('#'+that.player_id).length){
							$(document).off('keydown',fastKey);
						}
					})
					switch (e.which) {
						case 37: that.videoHandle(0,c_t-that.o.speed_time); break
						case 39: that.videoHandle(0,c_t+that.o.speed_time); break
						case 38: that.videoVolume(0,that.o.volume+0.1); break
						case 40: that.videoVolume(0,that.o.volume-0.1); break
						case 32: that.video[0].paused ? that.video[0].play() : that.video[0].pause(); break
						default: return
					}
					e.preventDefault();
				}
			$(document).on('click','#'+that.player_id,function(e){
				if($(e.target).closest('.player-barrage-form').length == 0){
					$(document).off('keydown',fastKey).on('keydown', fastKey);
				}
			})
		},
		getBrowser : function (types) {
			var other = 1,
				USERAGENT = navigator.userAgent.toLowerCase();
			for(var i in types) {
				var v = types[i] ? types[i] : i;
				if(USERAGENT.indexOf(v) != -1) {
					var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
					var matches = re.exec(USERAGENT);
					var ver = matches != null ? matches[2] : 0;
					other = ver !== 0 && v != 'mozilla' ? 0 : other;
				}else {
					var ver = 0;
				}
				eval('this.browser.' + i + '= ver');
			}
			this.browser.other = other;
		},
		getObject : function(objects) {
			for (var i in objects) {
				eval('this.'+i+' = this.player_box.find(objects[i])');
			}
		},
		buttonIcon : function(obj,a){
			return obj.attr('class', function (i,o){
					return o.replace(/picon-(pause|play-arrow|loading|refresh|volume-off|volume-down|volume-up|fullscreen-exit|fullscreen)/, '');
				}).addClass('picon-'+a);
		},
		videoVolume : function(x,v){
			var p = 'undefined' != typeof v ? (v * 100 / 1) : (100 * (x - this.volume_progress.offset().left) / this.volume_progress.width());
			p = (p >= 100 ? 100 : (p <= 0 ? 0 : p)).toFixed(0);
			this.buttonIcon(this.volume_switch,'volume-'+(p == 0 ? 'off' : (p <= 50 ? 'down' : 'up')));
			this.volume_focus.css('width', p+'%');
			return this.video[0].volume = this.o.volume = p*0.01;
		},
		videoHandle : function(x,t){
			var p = 100 * (x - this.progress.offset().left) / this.progress.width();
			if('number' == typeof t){
				p = t * 100 / this.duration;
			}
			p = p > 100 ? 100 : (p < 0 ? 0 : p);
			this.handle.css('width', p+'%');
			this.video[0].currentTime = this.duration * p *0.01;
		},
		videoSrc : function(url){
			var play_status = this.video[0].paused, // true 当前暂停，false当前正在播放
				current_time = this.video[0].currentTime; // 当前播放时长
			this.video.attr('src',url).find('source').attr('src',url);
			this.videoHandle(0,current_time);
			if(this.video[0].ended || play_status){
				this.video[0].pause();
				return this.buttonIcon(this.play_switch,'play-arrow');
			}
			return this.video[0].play();
		},
		fullscreen : function(){
			var that = this,
				e = that.player_box[0];
			if (e.requestFullscreen) {
				e.requestFullscreen();
			} else if (e.mozRequestFullScreen) {
				e.mozRequestFullScreen();
			} else if (e.webkitRequestFullScreen) {
				e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}else{
				this.player_box.css({
					'position':'fixed',
					'left':0,
					'right':0,
					'top':0,
					'bottom':0
				});
			}
			var acted = false;
			$(document).on('mousemove keyup',function(e){
				acted = true;
				that.player_box.css({'cursor':''});
				that.controls.slideDown(300);
			});
			that.acted_id = setInterval(function(){
				if(!acted){
					that.controls.slideUp(300);
					that.player_box.css({'cursor':'none'});
				}else{
					acted = false;
				}
			},3000);
			that.buttonIcon(that.screen,'fullscreen-exit');
			return that.player_box.addClass((that.browser.ie || that.browser.rv == '11.0') ? 'ie-fullscreen' : 'adt-player-full');
		},
		fullscreenExit : function(){
			var that = this,
				e = document,
				r = e.webkitCancelFullScreen ||
					e.mozCancelFullScreen ||
					e.cancelFullScreen ||
					e.exitFullscreen ||
					false;
			if(r){
				r.call(e);
				var removeClass = 'adt-player-full';
			}else{
				this.player_box.removeAttr('style').removeClass('ie-fullscreen');
				var removeClass = 'ie-fullscreen';
			}
			clearInterval(that.acted_id);
			that.player_box.removeClass(removeClass);
			that.buttonIcon(that.screen,'fullscreen');
			return that.controls.slideDown(300);
		},
		fullscreenStatus : function(){
			return document.fullscreen ||
				document.mozFullScreen ||
				document.webkitIsFullScreen ||
				this.player_box.hasClass('ie-fullscreen') ||
				false;
		},
		postBarrage : function(){
			var that = this
			var content_box = $('<div>').html(that.barrage_form.find('input').val());
			var message = (content_box.text()).replace(that.o.barrage_rule,'');
			if(that.barrage_btn.hasClass('player-barrage-btn-locked') || !that.o.barrage_status || !that.o.post_url){
				return false;
			}
			if(!message){
				return that.barrage_form.find('input').focus().val('');
			}
			$.ajax({
				url:that.o.post_url,
				type:'POST',
				data:{upid:that.barrage_upid,message:message,color:that.barrage_color,current_time:that.currentTime},
				dataType:'json',
				success:function(s){
					that.barrage_form.find('input').val('').prop('disabled',true).attr('placeholder','弹幕发送成功(*^_^*)');
					that.barrage_btn.addClass('player-barrage-btn-locked').html('<em>'+that.o.post_time+'</em> 秒');
					var interval = setInterval(function(){
						var time = parseInt(that.barrage_btn.find('em').html()) - 1;
						if(time <= 0) {
							clearInterval(interval);
							that.barrage_form.find('input').prop('disabled',false).attr('placeholder','看都看了，来一发吧！');
							that.barrage_btn.removeClass('player-barrage-btn-locked').html('发送');
						};
						that.barrage_btn.find('em').html(time);
					}, 1000);
				}
			});
		},
		getBarrage : function(t){
//                    console.log( (t == 0 || t % 5 == 0) );
			var that = this
			var get_start = new Date().getTime();
			if(that.o.barrage_status && (t == 0 || t % 5 == 0) && this.get_barrage_time!=t && that.o.get_url){
				this.get_barrage_time = t;
				$.ajax({
					url:that.o.get_url,
					type:'get',
					data:{current_time:t},
					dataType:'json',
					success:function(s){
                                            console.log(s);
						var get_end = new Date().getTime();
						$.each(s,function(i, v){
							$('<div>')
							.addClass('player-barrage-msg')
							.attr({'ct':v.current_time+parseInt((get_start-get_end)/1000)+1,'id':'barrage_msg_'+v.id})
							.css({left:parseInt(that.player_box.width())+2,color:v.color})
							.html(v.message)
							.appendTo(that.player_box);
						});
					}
				});
			}
			if(that.show_barrage_time != t){
				that.show_barrage_time = t;
				var b_a = new Array();
				$('.player-barrage-msg').each(function(i){
					if($(this).attr('ct') == t){
						if((that.top_size*30) > (that.o.barrage_top)){
							that.top_size = 0;
						}
						var prev_left = parseInt($(this).css('left')),
							run_time = that.o.barrage_time,
							top_add = 0,
							next_left = -(parseInt($(this).width())+30);
						if(b_a['time_'+that.top_size]){
							prev_left += b_a['time_'+that.top_size][0];
							run_time = run_time + parseFloat((b_a['time_'+that.top_size][0] / that.barrage_velocity).toFixed(3))+parseFloat(b_a['time_'+that.top_size][1]);
							top_add = parseInt((0.5+Math.random()+Math.random())*10);
							b_a['time_'+that.top_size] = [parseInt(b_a['time_'+that.top_size][0])+parseInt($(this).width()),parseFloat((Math.random()*10).toFixed(3))];
						}else{
							var x_time = parseFloat((Math.random()*10).toFixed(3));
							run_time += x_time;
							b_a['time_'+that.top_size] = [parseInt($(this).width()),x_time];
						}
						$(this).css({top:(that.top_size*30+top_add),left:prev_left}).removeAttr('ct').animate({left:next_left},run_time*1000,function(){
							$(this).remove();
						});
						that.top_size++;
					}
				});
			}
		},
		videoBuffer:function(){
			this.bufferTime = this.video[0].duration ? this.video[0].buffered.end(0) : 0;
			this.buffer.css('width', (100 * this.bufferTime / this.duration)+'%');
		},
		videoTime : function(s) {
			var s = 'number' == typeof s ? parseInt(s) : 0,
				m = '00';
			s = s < 10 ? '0'+s : s;
			if(s > 60){
				m = parseInt(s/60) < 10 ? '0'+parseInt(s/60) : parseInt(s/60);
				s = parseInt(s%60) < 10 ? '0'+parseInt(s%60) : parseInt(s%60);
			}
			return m+':'+s;
		}
	}
	function Plugin(option) {
		return this.each(function () {
			var options = typeof option == 'object' && option
			new Adtplayer(this, options)
		})
	}
	$.fn.adtplayer = Plugin
}(jQuery);