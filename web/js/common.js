/*
*	author	:	andetu
*	update_time	:	2016-7-29
*	console.log(s);
*/

var html_wt = $(window).width(),wrap_wt = $('.container').width();
var last_wt = parseInt(html_wt) - parseInt(wrap_wt);
var pt_left = last_wt/2 + 10 + parseInt(wrap_wt);
$(function(){
	$('.ui-txt').focus(function(){
		$(this).addClass('focus-txt');
	}).blur(function(){
		$(this).removeClass('focus-txt');
	});
	$('[data-toggle="tooltip"]').tooltip({'container':'body'});//提示
	$('.ajax-link').click(function(){ajax_link($(this));return false;});//ajax-link
	$('.ajax-load').click(function(){ajax_load($(this));return false;});//load
	$('.ajax-login').click(function(){$('.modal').modal('hide');$('.login-modal-box').modal('show');return false;});//弹出登录
	$('.ajax-form').submit(function(){ajax_post($(this));return false;});
	$('.form-district>select').change(function(){district($(this));});//地区选择
	$('.submit-btn').click(function(){
		var action = $(this).data('action'),form = $($(this).data('form'));
		if(action){
			form.find("input[name='action']").val(action);
		}
		ajax_post(form)
		return false;
	});
	$('.radio-ul').each(function(){chose_radio($(this).attr('id'));});
	//$('.dropdown-toggle').dropdownHover();
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){
			$(".footer-fixed").fadeIn(300).css({'left':pt_left});
		}else{
			$(".footer-fixed").fadeOut(300);
		}
	});
	$(".go-top").click(function(){
		$('body,html').animate({scrollTop:0},500);
	});
});
function ajax_link(obj,sure){
	var href = obj.data('href') ? obj.data('href') : obj.attr('href'),action=obj.data('action'),param=obj.data('param'),type=obj.data('type') ? obj.data('type') : 'POST',id='';
	if(action == 'delete' && !sure){
		var id = 'ajax_link_'+Date.parse(new Date());
		obj.attr('id',id);
		var html = '<div class="modal-header"><a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;"><span aria-hidden="true">&times;</span></a><h4 class="modal-title">删除提醒</h4></div>';
		html += '<div class="modal-body"><p>你确定要删除该条数据吗，删除后不可恢复！</p></div>';
		html += '<div class="modal-footer"><a class="btn btn-success" onclick="ajax_link($(\'#'+id+'\'),1);" href="javascript:;">确认删除</a><a class="btn btn-info" data-dismiss="modal" href="javascript:;">取消</a></div>';
		if($('.ajax-link-box').length > 0){
			content = $('.ajax-link-box .modal-content');
		}else{
			fade = $('<div></div>').addClass('modal fade ajax-link-box').appendTo('body');
			dialog = $('<div></div>').addClass('modal-dialog').appendTo(fade);
			content = $('<div></div>').addClass('modal-content').appendTo(dialog);
		}
		content.html(html);
		$('.ajax-link-box').modal('show');
		return false;
	}else{
		$('.ajax-link-box').remove();
		id = obj.attr('id');
	}
	$.ajax({
		type:type,
		url: href,
		data:{param},
		cache:false,
		dataType:'json',
		success:function(s){
			if(s.data.other){
				var other = eval(s.data.other);
				$.each(other,function(key,val){
					if(key == 'self'){
						obj.html(val);
					}else{
						$(key).html(val);
					}
				});
			}
			if(id && !s.data.login){
				setTimeout(function(){
					$('.modal-backdrop').remove();
				}, s.wait*1000);
			}
			showdialog('{"info":"'+s.msg+'","status":'+s.code+',"url":"'+s.url+'","login":"'+s.data.login+'"}');
		}
	});
	return false;
}
function ajax_load(obj){
	var left = obj.offset().left,top=obj.offset().top,obj_wt=obj.outerWidth(),id='ajax_load_'+Date.parse(new Date()),type=obj.data('type') ? obj.data('type') : 'POST',href = obj.data('href') ? obj.data('href') : obj.attr('href'),param=obj.data('param');
	if(obj.attr('id')){
		$('.'+obj.attr('id')).addClass('in');
		return false;
	}
	$.ajax({
		type:type,
		url: href,
		data:{param},
		cache:true,
		dataType:'json',
		success:function(s){
			obj.attr('id',id);
			var html = '<div class="arrow" style="left:50%"></div><h3 class="popover-title">'+s.title+'</h3><div class="popover-content">'+s.msg+'</div>';
			var popover =$('<div></div>').addClass('popover fade top '+id).html(html).appendTo('body').show();
			var p_w = popover.outerWidth(),p_h = popover.outerHeight();
			left = parseInt(left)-parseInt(p_w)/2+parseInt(obj_wt)/2,top=parseInt(top)-parseInt(p_h);
			popover.css({top:top,left:left}).addClass('in');
			$(document).click(function(e){
				popover.removeClass('in');
			});
		}
	});
}
function ajax_post(obj,sure){
	if(!obj.hasClass('lock-form')){
		var action = obj.find("input[name='action']").val(),id='',before_call = obj.attr('before_call'),after_call = obj.attr('after_call');
		if(action == 'delete' && !sure){
			var id = 'ajax_post_'+Date.parse(new Date());
			obj.attr('id',id);
			var html = '<div class="modal-header"><a class="close" data-dismiss="modal" aria-label="Close" href="javascript:;"><span aria-hidden="true">&times;</span></a><h4 class="modal-title">删除提醒</h4></div>';
			html += '<div class="modal-body"><p>你确定要删除选中数据吗，删除后不可恢复！</p></div>';
			html += '<div class="modal-footer"><a class="btn btn-success" onclick="ajax_post($(\'#'+id+'\'),1);" href="javascript:;">确认删除</a><a class="btn btn-info" data-dismiss="modal" href="javascript:;">取消</a></div>';
			if($('.ajax-form-modal').length > 0){
				content = $('.ajax-form-modal .modal-content');
			}else{
				fade = $('<div></div>').addClass('modal fade ajax-form-modal').appendTo('body');
				dialog = $('<div></div>').addClass('modal-dialog').appendTo(fade);
				content = $('<div></div>').addClass('modal-content').appendTo(dialog);
			}
			content.html(html);
			$('.ajax-form-modal').modal('show');
			return false;
		}else{
			$('.ajax-form-modal').remove();
			id = obj.attr('id');
		}
		if(before_call){
			window[before_call](obj,id,sure);
		}
		var btn_html = obj.find('button.btn').html();
		obj.find('button.btn').addClass('btn-info').removeClass('btn-success').html('数据处理中...');
		obj.addClass('lock-form');//锁定表单
		var formData = new FormData(obj[0]);
		$.ajax({
			url:obj.attr("action"),
			type:'POST',
			data:formData,
			dataType:'json',
			cache: false,
			contentType: false,
			processData: false,
			success:function(s){
				obj.find('button.btn').addClass('btn-success').removeClass('btn-info').html(btn_html);
				if(after_call){
					window[after_call](obj,id,s);return false;
				}
				if(id){
					setTimeout(function(){
						$('.modal-backdrop').remove();
					}, s.wait*1000);
				}
				if(s.code==1){
					showdialog('{"info":"'+s.msg+'","status":'+s.code+',"url":"'+s.url+'","wait":"'+s.wait+'"}');
				} else {
					showdialog('{"info":"'+s.msg+'","status":'+s.code+',"login":"'+s.data.login+'"}');
				}
			},
		});
	}
	return false;
}
function district(obj,province,city,district_id,community,street){
	if(province){
		obj.val(province);
	}
	obj.nextAll().remove();
	if(!obj.val()){return false;}
	$.ajax({
		type:'POST',
		url: 'misc/district',
		data:{upid:obj.val(),level:obj.data('level')},
		cache:false,
		dataType:'json',
		success:function(s){
			if(s.data){
				obj.after(s.data);
			}
			if(city){
				obj.next("select[name='city']").val(city);
				district($("select[name='city']"),'','',district_id,community,street);
			}
			if(district_id){
				obj.next("select[name='district']").val(district_id);
				district(obj.next("select[name='district']"),'','','',community,street);
			}
			if(community){
				obj.next("select[name='community']").val(community);
				district(obj.next("select[name='community']"),'','','','',street);
			}
			if(street){
				obj.next("select[name='street']").val(street);
			}
			$('.form-district select').unbind().change(function(){district($(this));});
		}
	})
}
function chose_radio(id){
	var index = 0,old_val = $("input[name='"+id+"']").val();
	$('#'+id+'>li').each(function(index){
		if(!index){
			_chose_radio($(this),id);
		}
		if(old_val == $(this).attr('val')){
			_chose_radio($(this),id);
		}
		$(this).click(function(){
			_chose_radio($(this),id);
		});
	})
}
function _chose_radio(obj,id){
	var after_call = $('#'+id).attr('after_call');
	obj.addClass('active').siblings().removeClass('active');
	$("input[name='"+id+"']").val(obj.attr('val'));
	if(after_call){
		window[after_call](obj,id);
	}
}
function showdialog(data){
	var data = JSON.parse(data),zalert='';
	if(parseInt(data.login) == 1){
		$('.login-modal-box').modal('show');
		$("button:submit").attr("disabled", false);
		$('.ajax-form').removeClass('lock-form');
		$('#ajax_parent').empty();
		return false;
	}
	if(parseInt(data.wait) == -1 && data.url){
		location.href = data.url;
		return false;
	}
	if(parseInt(data.status) == 1){
		zalert = 'jSuccess';
	}else if(parseInt(data.status) == -1){
		zalert = 'jError';
	}else{
		zalert = 'jNotify';
	}
	jNotify(data.info,{
		autoHide 			: data.unhide ? false :true,						//是否自动关闭
		MinWidth 			: data.minwidth ? data.minwidth : '',				// 最小宽度 
		ShowTimeEffect 		: data.showtimeeffect ? data.showtimeeffect : 300,	// 显示到页面上所需时间：毫秒 
		HideTimeEffect 		: data.HideTimeEffect ? data.HideTimeEffect : 300,	// 从页面上消失所需时间：毫秒 
		LongTrip 			: data.LongTrip ? data.LongTrip : 30,				// 当提示条显示和隐藏时的位移
		ColorOverlay 		: data.ColorOverlay ? data.ColorOverlay : "#000",	// 设置遮罩层的颜色 
		OpacityOverlay 		: data.OpacityOverlay ? data.OpacityOverlay : 0.3,	// 设置遮罩层的透明度
		TimeShown 			: data.wait ? data.wait*1000 : 2000,				//自动关闭时间
		VerticalPosition 	: data.vposition ? data.vposition : 'top',		//页面上中下
		HorizontalPosition 	: data.hposition ? data.hposition : 'center',		//页面左中右
		clickOverlay 		: data.clickoverlay ? true : false,					// 是否单击遮罩层才关闭提示条 
		ShowOverlay 		: data.soverlay ? true : false,						//是否显示遮罩层，只有有遮罩层上面一条设置才生效
		onClosed:function(){
			$("button:submit").attr("disabled", false);
			$('.ajax-form').removeClass('lock-form');
			$('#ajax_parent').empty();
			if(data.url && data.url!= ''){
				location.href = data.url;
			}
		}
	},zalert);
};
/******************************************jNotify-start************************************************/
$.jNotify = {
	defaults: {
		autoHide : true,
		clickOverlay : false,
		MinWidth : 200,
		TimeShown : 1500,
		ShowTimeEffect : 200,
		HideTimeEffect : 200,
		LongTrip : 15,
		HorizontalPosition : 'right',
		VerticalPosition : 'bottom',
		ShowOverlay : true,
		ColorOverlay : '#000',
		OpacityOverlay : 0.3,
		onClosed : null,
		onCompleted : null
	},
	init:function(msg, options, id) {
		opts = $.extend({}, $.jNotify.defaults, options);
		if($("#"+id).length == 0){
			$Div = $('<div class="jNotify" id="'+id+'"/>').css({opacity : 0,minWidth : opts.MinWidth}).html(msg).appendTo('body');
		}
		WidthDoc = parseInt($(window).width());
		HeightDoc = parseInt($(window).height());
		ScrollTop = parseInt($(window).scrollTop());
		ScrollLeft = parseInt($(window).scrollLeft());
		posTop = $.jNotify.vPos(opts.VerticalPosition);
		posLeft = $.jNotify.hPos(opts.HorizontalPosition);
		if(opts.ShowOverlay && $("#jOverlay").length == 0)
			$.jNotify._showOverlay($Div);
		$.jNotify._show(msg);
	},
	vPos:function(pos) {
		switch(pos) {
			case 'top':
				var vPos = parseInt($Div.outerHeight(true)/2);
				break;
			case 'center':
				var vPos = (HeightDoc/2) - (parseInt($Div.outerHeight(true))/2);
				break;
			case 'bottom':
				var vPos = HeightDoc - parseInt($Div.outerHeight(true));
				break;
		}
		return vPos;
	},
	hPos:function(pos) {
		switch(pos) {
			case 'left':
				var hPos = ScrollLeft;
				break;
			case 'center':
				var hPos = ScrollLeft + (WidthDoc/2) - (parseInt($Div.outerWidth(true))/2);
				break;
			case 'right':
				var hPos = ScrollLeft + WidthDoc - parseInt($Div.outerWidth(true));
				break;
		}
		return hPos;
	},
	_show:function(msg) {
		$Div.css({
			top: posTop,
			left : posLeft
		});
		switch (opts.VerticalPosition) {
			case 'top':
				var top = posTop + opts.LongTrip;
				break;
			case 'center':
				var top = posTop;
				break;
			case 'bottom' :
				var top = posTop - opts.LongTrip;
				break;
		}
		$Div.animate({
			top: top,
			opacity:1
		},opts.ShowTimeEffect,function(){
			if(opts.onCompleted) opts.onCompleted();
		});
		if(opts.autoHide){
			$.jNotify._close();
		}else{
			$Div.css('cursor','pointer').click(function(e){
				$.jNotify._close();
			});
		}
	},
	_showOverlay:function(el){
		var overlay = 
		$('<div id="jOverlay" />').css({
			backgroundColor : opts.ColorOverlay,
			opacity: opts.OpacityOverlay
		}).appendTo('body').show();
		if(opts.clickOverlay)
		overlay.click(function(e){
			e.preventDefault();
			$.jNotify._close();
		});
	},
	_close:function(){
			switch (opts.VerticalPosition) {
				case 'top':
					var top = posTop-opts.LongTrip;
					break;
				case 'center':
					var top = posTop;
					break;
				case 'bottom' :
					var top = posTop+opts.LongTrip;
					break;
			}
			if(!opts.autoHide)
				opts.TimeShown = 0;
			$Div.delay(opts.TimeShown).animate({
				top: top,
				opacity:0
			},opts.HideTimeEffect,function(){
				$(this).remove();
				if(opts.ShowOverlay && $("#jOverlay").length > 0)
					$("#jOverlay").remove();
					if(opts.onClosed) opts.onClosed();
			});
	},
	_isReadable:function(id){
		if($('#'+id).length > 0)
			return false;
		else
			return true;
	}
};
jNotify = function(msg,options,zalert) {
	if($.jNotify._isReadable(zalert)){
		$.jNotify.init(msg,options,zalert);return false;
	}
};
/******************************************jNotify-end************************************************/	
(function($, window, undefined) {
    var $allDropdowns = $();
    $.fn.dropdownHover = function(options) {
        $allDropdowns = $allDropdowns.add(this.parent());
        return this.each(function() {
            var $this = $(this).parent(),
                defaults = {
                    delay: 300,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                options = $.extend(true, {}, defaults, options, data),
                timeout;

            $this.hover(function() {
                if(options.instantlyCloseOthers === true){
                	$allDropdowns.removeClass('open');
                }
                window.clearTimeout(timeout);
                $(this).addClass('open');
            }, function() {
                timeout = window.setTimeout(function() {
                    $this.removeClass('open');
                }, options.delay);
            });
        });
    };
    $('[data-hover="dropdown"]').dropdownHover();
})(jQuery, this);