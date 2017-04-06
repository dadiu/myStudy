
//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId)
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            if (touch.el){
              touch.el.trigger('swipe')
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            }
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
              if (touch.el) touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)
/**
 * @author 剧中人
 * @github https://github.com/bh-lay/toucher
 * @modified 2016-5-25 23:27
 * 
 */

 
(function(global,doc,factoryFn){
	//初始化toucher主方法
	var factory = factoryFn(global,doc);
	
	//提供window.util.toucher()接口
	global.util = global.util || {};
	global.util.toucher = global.util.toucher || factory;
	
	//提供CommonJS规范的接口
	global.define && define(function(require,exports,module){
		return factory;
	});
})(this,document,function(window,document){

	/**
	* class 操作
	*/
	var supports_classList = !!document.createElement('div').classList,
		// 是否含有某个 class
		hasClass = supports_classList ? function( node, classSingle ){
			return node && node.classList && node.classList.contains( classSingle );
		} : function ( node, classSingle ){
			if( !node || typeof( node.className ) !== 'string'  ){
				return false;
			}
			return !! node.className.match(new RegExp('(\\s|^)' + classSingle + '(\\s|$)'));
		};

	/**
	 * @method 事件触发器
	 * @description 根据事件最原始被触发的target，逐级向上追溯事件绑定
	 * 
	 * @param string 事件名
	 * @param object 原生事件对象
	 */
	function EMIT(eventName,e){
		this._events = this._events || {};
		//事件堆无该事件，结束触发
		if(!this._events[eventName]){
			return;
		}
		//记录尚未被执行掉的事件绑定
		var rest_events = this._events[eventName];
		
		//从事件源：target开始向上冒泡
		var target = e.target;
		while (1) {
			//若没有需要执行的事件，结束冒泡
			if(rest_events.length ==0){
				return;
			}
			//若已经冒泡至顶，检测顶级绑定，结束冒泡
			if(target == this.dom || !target){
				//遍历剩余所有事件绑定
				for(var i=0,total=rest_events.length;i<total;i++){
					var classStr = rest_events[i]['className'];
					var callback = rest_events[i]['fn'];
					//未指定事件委托，直接执行
					if(classStr == null){
						event_callback(eventName,callback,target,e);
					}
				}
				return;
			}
			
			//当前需要校验的事件集
			var eventsList = rest_events;
			//置空尚未执行掉的事件集
			rest_events = [];

			//遍历事件所有绑定
			for(var i=0,total=eventsList.length;i<total;i++){
				var classStr = eventsList[i]['className'];
				var callback = eventsList[i]['fn'];
				//符合事件委托，执行
				if(hasClass(target,classStr)){
					//返回false停止事件冒泡及后续事件，其余继续执行
					if(event_callback(eventName,callback,target,e) == false){
						return;
					}
				}else{
					//不符合执行条件，压回到尚未执行掉的列表中
					rest_events.push(eventsList[i]);
				}
			}
			//向上冒泡
			target = target.parentNode;
		}
	}
	
	/**
	 * 执行绑定的回调函数，并创建一个事件对象
	 * @param[string]事件名
	 * @param[function]被执行掉的函数
	 * @param[object]指向的dom
	 * @param[object]原生event对象
	 */
	function event_callback(name,fn,dom,e){
		//优先使用自定义的touches（目前是为了解决touchEnd无touches的问题）
		var touches = e.plugTouches || e.touches,
			touch = touches.length ? touches[0] : {},
			newE = {
				type : name,
				target : e.target,
				pageX : touch.pageX,
				pageY : touch.pageY,
				clientX : touch.clientX || 0,
				clientY : touch.clientY || 0
			};
		//为swipe事件增加交互初始位置及移动距离
		if(name.match(/^swipe/) && e.plugStartPosition){
			newE.startX = e.plugStartPosition.pageX;
			newE.startY = e.plugStartPosition.pageY;
			newE.moveX = newE.pageX - newE.startX;
			newE.moveY = newE.pageY - newE.startY;
		}
		//执行绑定事件的回调，并记录返回值
		var call_result = fn.call(dom,newE);
		//若返回false，阻止浏览器默认事件
		if(call_result == false){
			e.preventDefault();
			e.stopPropagation();
		}
		
		return call_result;
	}
	/**
	 * 判断swipe方向
	 */
	function swipeDirection(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >=	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	}

	/**
	 * 监听原生的事件，主动触发模拟事件
	 * 
	 */
	function eventListener(DOM){
		var this_touch = this;

		//轻击开始时间
		var touchStartTime = 0;
		
		//记录上一次点击时间
		var lastTouchTime = 0;
		
		//记录初始轻击的位置
		var x1,y1,x2,y2;
		
		//轻击事件的延时器
		var touchDelay;
		
		//测试长按事件的延时器
		var longTap;
		
		//记录当前事件是否已为等待结束的状态
		var isActive = false;
		//记录有坐标信息的事件
		var eventMark = null;
		//单次用户操作结束
		function actionOver(e){
			isActive = false;
			clearTimeout(longTap);
			clearTimeout(touchDelay);
		}
		
		//断定此次事件为轻击事件
		function isSingleTap(){
			actionOver();
			EMIT.call(this_touch,'singleTap',eventMark);
		}
		//触屏开始
		function touchStart(e){
			//缓存事件
			eventMark = e;
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = 0;
			y2 = 0;
			isActive = true;
			touchStartTime = new Date();
			EMIT.call(this_touch,'swipeStart',e);
			//检测是否为长按
			clearTimeout(longTap);
			longTap = setTimeout(function(){
				actionOver(e);
				//断定此次事件为长按事件
				EMIT.call(this_touch,'longTap',e);
			},500);
		}
		//触屏结束
		function touchend(e){
			//touchend中，拿不到坐标位置信息，故使用全局保存下数据
			e.plugStartPosition = eventMark.plugStartPosition;
			e.plugTouches = eventMark.touches;
			
			EMIT.call(this_touch,'swipeEnd',e);
			if(!isActive){
				return;
			}
			var now = new Date();
			//若未监听doubleTap，直接响应
			if(!this_touch._events.doubleTap || this_touch._events.doubleTap.length == 0){
				isSingleTap();
			}else if(now - lastTouchTime > 200){
				//延迟响应
				touchDelay = setTimeout(isSingleTap,190);
			}else{
				clearTimeout(touchDelay);
				actionOver(e);
				//断定此次事件为连续两次轻击事件
				EMIT.call(this_touch,'doubleTap',eventMark);
			}
			lastTouchTime = now;
		}
		
		//手指移动
		function touchmove(e){
			//缓存事件
			eventMark = e;
			//在原生事件基础上记录初始位置（为swipe事件增加参数传递）
			e.plugStartPosition = {
				pageX : x1,
				pageY : y1
			};
			//断定此次事件为移动事件
			EMIT.call(this_touch,'swipe',e);

			if(!isActive){
				return;
			}
			x2 = e.touches[0].pageX;
			y2 = e.touches[0].pageY;
			if(Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2){
				//断定此次事件为移动手势
				var direction = swipeDirection(x1, x2, y1, y2);
				EMIT.call(this_touch,'swipe' + direction,e);
			}else{
				//断定此次事件为轻击事件
				isSingleTap();
			}
			actionOver(e);
		}

		/**
		 * 对开始手势的监听
		 */
		DOM.addEventListener('touchstart',touchStart);
		DOM.addEventListener('MSPointerDown',touchStart);
		DOM.addEventListener('pointerdown',touchStart);

		/**
		 * 对手势结束的监听（轻击）
		 */
		DOM.addEventListener('touchend',touchend);
		DOM.addEventListener('MSPointerUp',touchend);
		DOM.addEventListener('pointerup',touchend);

		/**
		 * 对移动手势的监听
		 */
		DOM.addEventListener('touchmove',touchmove);
		DOM.addEventListener('MSPointerMove',touchmove);
		DOM.addEventListener('pointermove',touchmove);

		/**
		 * 对移动结束的监听
		 */
		DOM.addEventListener('touchcancel',actionOver);
		DOM.addEventListener('MSPointerCancel',actionOver);
		DOM.addEventListener('pointercancel',actionOver);
	}
	
	/**
	 * touch类
	 * 
	 */
	function Touch(DOM,param){
		var param = param || {};

		this.dom = DOM;
		//存储监听事件的回调
		this._events = {};
		//监听DOM原生事件
		eventListener.call(this,this.dom);
	}
	/**
	 * @method 增加事件监听
	 * @description 支持链式调用
	 * 
	 * @param string 事件名
	 * @param [string] 事件委托至某个class（可选）
	 * @param function 符合条件的事件被触发时需要执行的回调函数 
	 * 
	 **/
	Touch.prototype.on = function ON(eventStr,a,b){
		var className,fn;
		if(typeof(a) == 'string'){
			className = a.replace(/^\./,'');
			fn = b;
		}else{
			className = null;
			fn = a;
		}
		//检测callback是否合法,事件名参数是否存在·
		if(typeof(fn) == 'function' && eventStr && eventStr.length){
			var eventNames = eventStr.split(/\s+/);
			for(var i=0,total=eventNames.length;i<total;i++){
			
				var eventName = eventNames[i];
				//事件堆无该事件，创建一个事件堆
				if(!this._events[eventName]){
					this._events[eventName] = [];
				}
				this._events[eventName].push({
					className : className,
					fn : fn
				});
			}
		}
		
		//提供链式调用的支持
		return this;
	};
	
	//对外提供接口
	return function (dom){
		return new Touch(dom);
	};
});
var Zepto=function(){function F(a){return null==a?String(a):x[y.call(a)]||"object"}function G(a){return"function"==F(a)}function H(a){return null!=a&&a==a.window}function I(a){return null!=a&&a.nodeType==a.DOCUMENT_NODE}function J(a){return"object"==F(a)}function K(a){return J(a)&&!H(a)&&Object.getPrototypeOf(a)==Object.prototype}function L(a){return"number"==typeof a.length}function M(a){return g.call(a,function(a){return null!=a})}function N(a){return a.length>0?c.fn.concat.apply([],a):a}function O(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function P(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function Q(a,b){return"number"!=typeof b||k[O(a)]?b:b+"px"}function R(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),i[a]=c),i[a]}function S(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){return 1==a.nodeType?a:void 0})}function T(c,d,e){for(b in d)e&&(K(d[b])||E(d[b]))?(K(d[b])&&!K(c[b])&&(c[b]={}),E(d[b])&&!E(c[b])&&(c[b]=[]),T(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function U(a,b){return null==b?c(a):c(a).filter(b)}function V(a,b,c,d){return G(b)?b.call(a,c,d):b}function W(a,b,c){null==c?a.removeAttribute(b):a.setAttribute(b,c)}function X(b,c){var d=b.className,e=d&&d.baseVal!==a;return c===a?e?d.baseVal:d:(e?d.baseVal=c:b.className=c,void 0)}function Y(a){var b;try{return a?"true"==a||("false"==a?!1:"null"==a?null:/^0/.test(a)||isNaN(b=Number(a))?/^[\[\{]/.test(a)?c.parseJSON(a):a:b):a}catch(d){return a}}function Z(a,b){b(a);for(var c=0,d=a.childNodes.length;d>c;c++)Z(a.childNodes[c],b)}var a,b,c,d,A,B,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,m=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,o=/^(?:body|html)$/i,p=/([A-Z])/g,q=["val","css","html","text","data","width","height","offset"],r=["after","prepend","before","append"],s=h.createElement("table"),t=h.createElement("tr"),u={tr:h.createElement("tbody"),tbody:s,thead:s,tfoot:s,td:t,th:t,"*":h.createElement("div")},v=/complete|loaded|interactive/,w=/^[\w-]*$/,x={},y=x.toString,z={},C=h.createElement("div"),D={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},E=Array.isArray||function(a){return a instanceof Array};return z.matches=function(a,b){var c,d,e,f;return b&&a&&1===a.nodeType?(c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector)?c.call(a,b):(e=a.parentNode,f=!e,f&&(e=C).appendChild(a),d=~z.qsa(e,b).indexOf(a),f&&C.removeChild(a),d):!1},A=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},B=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},z.fragment=function(b,d,e){var g,i,j;return m.test(b)&&(g=c(h.createElement(RegExp.$1))),g||(b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=l.test(b)&&RegExp.$1),d in u||(d="*"),j=u[d],j.innerHTML=""+b,g=c.each(f.call(j.childNodes),function(){j.removeChild(this)})),K(e)&&(i=c(g),c.each(e,function(a,b){q.indexOf(a)>-1?i[a](b):i.attr(a,b)})),g},z.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},z.isZ=function(a){return a instanceof z.Z},z.init=function(b,d){var e;if(!b)return z.Z();if("string"==typeof b)if(b=b.trim(),"<"==b[0]&&l.test(b))e=z.fragment(b,RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=z.qsa(h,b)}else{if(G(b))return c(h).ready(b);if(z.isZ(b))return b;if(E(b))e=M(b);else if(J(b))e=[b],b=null;else if(l.test(b))e=z.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=z.qsa(h,b)}}return z.Z(e,b)},c=function(a,b){return z.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c){T(a,c,b)}),a},z.qsa=function(a,b){var c,d="#"==b[0],e=!d&&"."==b[0],g=d||e?b.slice(1):b,h=w.test(g);return I(a)&&h&&d?(c=a.getElementById(g))?[c]:[]:1!==a.nodeType&&9!==a.nodeType?[]:f.call(h&&!d?e?a.getElementsByClassName(g):a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=h.documentElement.contains?function(a,b){return a!==b&&a.contains(b)}:function(a,b){for(;b&&(b=b.parentNode);)if(b===a)return!0;return!1},c.type=F,c.isFunction=G,c.isWindow=H,c.isArray=E,c.isPlainObject=K,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=A,c.trim=function(a){return null==a?"":String.prototype.trim.call(a)},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,e,f,d=[];if(L(a))for(e=0;e<a.length;e++)c=b(a[e],e),null!=c&&d.push(c);else for(f in a)c=b(a[f],f),null!=c&&d.push(c);return N(d)},c.each=function(a,b){var c,d;if(L(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){x["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return v.test(h.readyState)&&h.body?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return G(a)?this.not(this.not(a)):c(g.call(this,function(b){return z.matches(b,a)}))},add:function(a,b){return c(B(this.concat(c(a,b))))},is:function(a){return this.length>0&&z.matches(this[0],a)},not:function(b){var e,d=[];return G(b)&&b.call!==a?this.each(function(a){b.call(this,a)||d.push(this)}):(e="string"==typeof b?this.filter(b):L(b)&&G(b.item)?f.call(b):c(b),this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})),c(d)},has:function(a){return this.filter(function(){return J(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return-1===a?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!J(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!J(a)?a:c(a)},find:function(a){var b,d=this;return b=a?"object"==typeof a?c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):1==this.length?c(z.qsa(this[0],a)):this.map(function(){return z.qsa(this,a)}):[]},closest:function(a,b){var d=this[0],e=!1;for("object"==typeof a&&(e=c(a));d&&!(e?e.indexOf(d)>=0:z.matches(d,a));)d=d!==b&&!I(d)&&d.parentNode;return c(d)},parents:function(a){for(var b=[],d=this;d.length>0;)d=c.map(d,function(a){return(a=a.parentNode)&&!I(a)&&b.indexOf(a)<0?(b.push(a),a):void 0});return U(b,a)},parent:function(a){return U(B(this.pluck("parentNode")),a)},children:function(a){return U(this.map(function(){return S(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return U(this.map(function(a,b){return g.call(S(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=R(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var d,e,b=G(a);return this[0]&&!b&&(d=c(a).get(0),e=d.parentNode||this.length>1),this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));for(var b;(b=a.children()).length;)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=G(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?"none"==d.css("display"):b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(a){return 0 in arguments?this.each(function(b){var d=this.innerHTML;c(this).empty().append(V(this,a,b,d))}):0 in this?this[0].innerHTML:null},text:function(a){return 0 in arguments?this.each(function(b){var c=V(this,a,b,this.textContent);this.textContent=null==c?"":""+c}):0 in this?this[0].textContent:null},attr:function(c,d){var e;return"string"!=typeof c||1 in arguments?this.each(function(a){if(1===this.nodeType)if(J(c))for(b in c)W(this,b,c[b]);else W(this,c,V(this,d,a,this.getAttribute(c)))}):this.length&&1===this[0].nodeType?!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:a},removeAttr:function(a){return this.each(function(){1===this.nodeType&&W(this,a)})},prop:function(a,b){return a=D[a]||a,1 in arguments?this.each(function(c){this[a]=V(this,b,c,this[a])}):this[0]&&this[0][a]},data:function(b,c){var d="data-"+b.replace(p,"-$1").toLowerCase(),e=1 in arguments?this.attr(d,c):this.attr(d);return null!==e?Y(e):a},val:function(a){return 0 in arguments?this.each(function(b){this.value=V(this,a,b,this.value)}):this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=V(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};"static"==d.css("position")&&(g.position="relative"),d.css(g)});if(!this.length)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,d){var e,f,g,h;if(arguments.length<2){if(e=this[0],f=getComputedStyle(e,""),!e)return;if("string"==typeof a)return e.style[A(a)]||f.getPropertyValue(a);if(E(a))return g={},c.each(E(a)?a:[a],function(a,b){g[b]=e.style[A(b)]||f.getPropertyValue(b)}),g}if(h="","string"==F(a))d||0===d?h=O(a)+":"+Q(a,d):this.each(function(){this.style.removeProperty(O(a))});else for(b in a)a[b]||0===a[b]?h+=O(b)+":"+Q(b,a[b])+";":this.each(function(){this.style.removeProperty(O(b))});return this.each(function(){this.style.cssText+=";"+h})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return a?e.some.call(this,function(a){return this.test(X(a))},P(a)):!1},addClass:function(a){return a?this.each(function(b){d=[];var e=X(this),f=V(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&X(this,e+(e?" ":"")+d.join(" "))}):this},removeClass:function(b){return this.each(function(c){return b===a?X(this,""):(d=X(this),V(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(P(a)," ")}),X(this,d.trim()),void 0)})},toggleClass:function(b,d){return b?this.each(function(e){var f=c(this),g=V(this,b,e,X(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})}):this},scrollTop:function(b){if(this.length){var c="scrollTop"in this[0];return b===a?c?this[0].scrollTop:this[0].pageYOffset:this.each(c?function(){this.scrollTop=b}:function(){this.scrollTo(this.scrollX,b)})}},scrollLeft:function(b){if(this.length){var c="scrollLeft"in this[0];return b===a?c?this[0].scrollLeft:this[0].pageXOffset:this.each(c?function(){this.scrollLeft=b}:function(){this.scrollTo(b,this.scrollY)})}},position:function(){if(this.length){var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||h.body;a&&!o.test(a.nodeName)&&"static"==c(a).css("position");)a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){var d=b.replace(/./,function(a){return a[0].toUpperCase()});c.fn[b]=function(e){var f,g=this[0];return e===a?H(g)?g["inner"+d]:I(g)?g.documentElement["scroll"+d]:(f=this.offset())&&f[b]:this.each(function(a){g=c(this),g.css(b,V(this,e,a,g[b]()))})}}),r.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,f,e=c.map(arguments,function(b){return a=F(b),"object"==a||"array"==a||null==b?b:z.fragment(b)}),g=this.length>1;return e.length<1?this:this.each(function(a,i){f=d?i:i.parentNode,i=0==b?i.nextSibling:1==b?i.firstChild:2==b?i:null;var j=c.contains(h.documentElement,f);e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();f.insertBefore(a,i),j&&Z(a,function(a){null==a.nodeName||"SCRIPT"!==a.nodeName.toUpperCase()||a.type&&"text/javascript"!==a.type||a.src||window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),z.Z.prototype=c.fn,z.uniq=B,z.deserializeValue=Y,c.zepto=z,c}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(a){function l(a){return a._zid||(a._zid=b++)}function m(a,b,c,d){if(b=n(b),b.ns)var e=o(b.ns);return(g[l(a)]||[]).filter(function(a){return!(!a||b.e&&a.e!=b.e||b.ns&&!e.test(a.ns)||c&&l(a.fn)!==l(c)||d&&a.sel!=d)})}function n(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function o(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function p(a,b){return a.del&&!i&&a.e in j||!!b}function q(a){return k[a]||i&&j[a]||a}function r(b,d,e,f,h,i,j){var m=l(b),o=g[m]||(g[m]=[]);d.split(/\s/).forEach(function(d){var g,l;return"ready"==d?a(document).ready(e):(g=n(d),g.fn=e,g.sel=h,g.e in k&&(e=function(b){var c=b.relatedTarget;return!c||c!==this&&!a.contains(this,c)?g.fn.apply(this,arguments):void 0}),g.del=i,l=i||e,g.proxy=function(a){if(a=x(a),!a.isImmediatePropagationStopped()){a.data=f;var d=l.apply(b,a._args==c?[a]:[a].concat(a._args));return d===!1&&(a.preventDefault(),a.stopPropagation()),d}},g.i=o.length,o.push(g),"addEventListener"in b&&b.addEventListener(q(g.e),g.proxy,p(g,j)),void 0)})}function s(a,b,c,d,e){var f=l(a);(b||"").split(/\s/).forEach(function(b){m(a,b,c,d).forEach(function(b){delete g[f][b.i],"removeEventListener"in a&&a.removeEventListener(q(b.e),b.proxy,p(b,e))})})}function x(b,d){return(d||!b.isDefaultPrevented)&&(d||(d=b),a.each(w,function(a,c){var e=d[a];b[a]=function(){return this[c]=t,e&&e.apply(d,arguments)},b[c]=u}),(d.defaultPrevented!==c?d.defaultPrevented:"returnValue"in d?d.returnValue===!1:d.getPreventDefault&&d.getPreventDefault())&&(b.isDefaultPrevented=t)),b}function y(a){var b,d={originalEvent:a};for(b in a)v.test(b)||a[b]===c||(d[b]=a[b]);return x(d,a)}var c,t,u,v,w,b=1,d=Array.prototype.slice,e=a.isFunction,f=function(a){return"string"==typeof a},g={},h={},i="onfocusin"in window,j={focus:"focusin",blur:"focusout"},k={mouseenter:"mouseover",mouseleave:"mouseout"};h.click=h.mousedown=h.mouseup=h.mousemove="MouseEvents",a.event={add:r,remove:s},a.proxy=function(b,c){var h,g=2 in arguments&&d.call(arguments,2);if(e(b))return h=function(){return b.apply(c,g?g.concat(d.call(arguments)):arguments)},h._zid=l(b),h;if(f(c))return g?(g.unshift(b[c],b),a.proxy.apply(null,g)):a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b,c){return this.on(a,b,c)},a.fn.unbind=function(a,b){return this.off(a,b)},a.fn.one=function(a,b,c,d){return this.on(a,b,c,d,1)},t=function(){return!0},u=function(){return!1},v=/^([A-Z]|returnValue$|layer[XY]$)/,w={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},a.fn.delegate=function(a,b,c){return this.on(b,a,c)},a.fn.undelegate=function(a,b,c){return this.off(b,a,c)},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,g,h,i,j){var k,l,m=this;return b&&!f(b)?(a.each(b,function(a,b){m.on(a,g,h,b,j)}),m):(f(g)||e(i)||i===!1||(i=h,h=g,g=c),(e(h)||h===!1)&&(i=h,h=c),i===!1&&(i=u),m.each(function(c,e){j&&(k=function(a){return s(e,a.type,i),i.apply(this,arguments)}),g&&(l=function(b){var c,f=a(b.target).closest(g,e).get(0);return f&&f!==e?(c=a.extend(y(b),{currentTarget:f,liveFired:e}),(k||i).apply(f,[c].concat(d.call(arguments,1)))):void 0}),r(e,b,i,h,g,l||k)}))},a.fn.off=function(b,d,g){var h=this;return b&&!f(b)?(a.each(b,function(a,b){h.off(a,d,b)}),h):(f(d)||e(g)||g===!1||(g=d,d=c),g===!1&&(g=u),h.each(function(){s(this,b,g,d)}))},a.fn.trigger=function(b,c){return b=f(b)||a.isPlainObject(b)?a.Event(b):x(b),b._args=c,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(g,h){d=y(f(b)?a.Event(b):b),d._args=c,d.target=h,a.each(m(h,b.type||b),function(a,b){return e=b.proxy(d),d.isImmediatePropagationStopped()?!1:void 0})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){var c,d,e;if(f(a)||(b=a,a=b.type),c=document.createEvent(h[a]||"Events"),d=!0,b)for(e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0),x(c)}}(Zepto),function(a){function l(b,c,d){var e=a.Event(c);return a(b).trigger(e,d),!e.isDefaultPrevented()}function m(a,b,d,e){return a.global?l(b||c,d,e):void 0}function n(b){b.global&&0===a.active++&&m(b,null,"ajaxStart")}function o(b){b.global&&!--a.active&&m(b,null,"ajaxStop")}function p(a,b){var c=b.context;return b.beforeSend.call(c,a,b)===!1||m(b,c,"ajaxBeforeSend",[a,b])===!1?!1:(m(b,c,"ajaxSend",[a,b]),void 0)}function q(a,b,c,d){var e=c.context,f="success";c.success.call(e,a,f,b),d&&d.resolveWith(e,[a,f,b]),m(c,e,"ajaxSuccess",[b,c,a]),s(f,b,c)}function r(a,b,c,d,e){var f=d.context;d.error.call(f,c,b,a),e&&e.rejectWith(f,[c,b,a]),m(d,f,"ajaxError",[c,d,a||b]),s(b,c,d)}function s(a,b,c){var d=c.context;c.complete.call(d,b,a),m(c,d,"ajaxComplete",[b,c]),o(c)}function t(){}function u(a){return a&&(a=a.split(";",2)[0]),a&&(a==j?"html":a==i?"json":g.test(a)?"script":h.test(a)&&"xml")||"text"}function v(a,b){return""==b?a:(a+"&"+b).replace(/[&?]{1,2}/,"?")}function w(b){b.processData&&b.data&&"string"!=a.type(b.data)&&(b.data=a.param(b.data,b.traditional)),!b.data||b.type&&"GET"!=b.type.toUpperCase()||(b.url=v(b.url,b.data),b.data=void 0)}function x(b,c,d,e){return a.isFunction(c)&&(e=d,d=c,c=void 0),a.isFunction(d)||(e=d,d=void 0),{url:b,data:c,success:d,dataType:e}}function z(b,c,d,e){var f,g=a.isArray(c),h=a.isPlainObject(c);a.each(c,function(c,i){f=a.type(i),e&&(c=d?e:e+"["+(h||"object"==f||"array"==f?c:"")+"]"),!e&&g?b.add(i.name,i.value):"array"==f||!d&&"object"==f?z(b,i,d,c):b.add(c,i)})}var d,e,y,b=0,c=window.document,f=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,g=/^(?:text|application)\/javascript/i,h=/^(?:text|application)\/xml/i,i="application/json",j="text/html",k=/^\s*$/;a.active=0,a.ajaxJSONP=function(d,e){if(!("type"in d))return a.ajax(d);var j,m,f=d.jsonpCallback,g=(a.isFunction(f)?f():f)||"jsonp"+ ++b,h=c.createElement("script"),i=window[g],k=function(b){a(h).triggerHandler("error",b||"abort")},l={abort:k};return e&&e.promise(l),a(h).on("load error",function(b,c){clearTimeout(m),a(h).off().remove(),"error"!=b.type&&j?q(j[0],l,d,e):r(null,c||"error",l,d,e),window[g]=i,j&&a.isFunction(i)&&i(j[0]),i=j=void 0}),p(l,d)===!1?(k("abort"),l):(window[g]=function(){j=arguments},h.src=d.url.replace(/\?(.+)=\?/,"?$1="+g),c.head.appendChild(h),d.timeout>0&&(m=setTimeout(function(){k("timeout")},d.timeout)),l)},a.ajaxSettings={type:"GET",beforeSend:t,success:t,error:t,complete:t,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:i,xml:"application/xml, text/xml",html:j,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},a.ajax=function(b){var g,h,x,i,j,l,m,o,s,y,c=a.extend({},b||{}),f=a.Deferred&&a.Deferred();for(d in a.ajaxSettings)void 0===c[d]&&(c[d]=a.ajaxSettings[d]);if(n(c),c.crossDomain||(c.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(c.url)&&RegExp.$2!=window.location.host),c.url||(c.url=window.location.toString()),w(c),g=c.dataType,h=/\?.+=\?/.test(c.url),h&&(g="jsonp"),c.cache!==!1&&(b&&b.cache===!0||"script"!=g&&"jsonp"!=g)||(c.url=v(c.url,"_="+Date.now())),"jsonp"==g)return h||(c.url=v(c.url,c.jsonp?c.jsonp+"=?":c.jsonp===!1?"":"callback=?")),a.ajaxJSONP(c,f);if(i=c.accepts[g],j={},l=function(a,b){j[a.toLowerCase()]=[a,b]},m=/^([\w-]+:)\/\//.test(c.url)?RegExp.$1:window.location.protocol,o=c.xhr(),s=o.setRequestHeader,f&&f.promise(o),c.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",i||"*/*"),(i=c.mimeType||i)&&(i.indexOf(",")>-1&&(i=i.split(",",2)[0]),o.overrideMimeType&&o.overrideMimeType(i)),(c.contentType||c.contentType!==!1&&c.data&&"GET"!=c.type.toUpperCase())&&l("Content-Type",c.contentType||"application/x-www-form-urlencoded"),c.headers)for(e in c.headers)l(e,c.headers[e]);if(o.setRequestHeader=l,o.onreadystatechange=function(){if(4==o.readyState){o.onreadystatechange=t,clearTimeout(x);var b,d=!1;if(o.status>=200&&o.status<300||304==o.status||0==o.status&&"file:"==m){g=g||u(c.mimeType||o.getResponseHeader("content-type")),b=o.responseText;try{"script"==g?(1,eval)(b):"xml"==g?b=o.responseXML:"json"==g&&(b=k.test(b)?null:a.parseJSON(b))}catch(e){d=e}d?r(d,"parsererror",o,c,f):q(b,o,c,f)}else r(o.statusText||null,o.status?"error":"abort",o,c,f)}},p(o,c)===!1)return o.abort(),r(null,"abort",o,c,f),o;if(c.xhrFields)for(e in c.xhrFields)o[e]=c.xhrFields[e];y="async"in c?c.async:!0,o.open(c.type,c.url,y,c.username,c.password);for(e in j)s.apply(o,j[e]);return c.timeout>0&&(x=setTimeout(function(){o.onreadystatechange=t,o.abort(),r(null,"timeout",o,c,f)},c.timeout)),o.send(c.data?c.data:null),o},a.get=function(){return a.ajax(x.apply(null,arguments))},a.post=function(){var b=x.apply(null,arguments);return b.type="POST",a.ajax(b)},a.getJSON=function(){var b=x.apply(null,arguments);return b.dataType="json",a.ajax(b)},a.fn.load=function(b,c,d){if(!this.length)return this;var h,e=this,g=b.split(/\s/),i=x(b,c,d),j=i.success;return g.length>1&&(i.url=g[0],h=g[1]),i.success=function(b){e.html(h?a("<div>").html(b.replace(f,"")).find(h):b),j&&j.apply(e,arguments)},a.ajax(i),this},y=encodeURIComponent,a.param=function(a,b){var c=[];return c.add=function(a,b){this.push(y(a)+"="+y(b))},z(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var c,b=[];return a([].slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=d&&"reset"!=d&&"button"!=d&&("radio"!=d&&"checkbox"!=d||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(a){"__proto__"in{}||a.extend(a.zepto,{Z:function(b,c){return b=b||[],a.extend(b,a.fn),b.selector=c||"",b.__Z=!0,b},isZ:function(b){return"array"===a.type(b)&&"__Z"in b}});try{getComputedStyle(void 0)}catch(b){var c=getComputedStyle;window.getComputedStyle=function(a){try{return c(a)}catch(b){return null}}}}(Zepto),function(a,b){function u(a){return a.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function v(a){return d?d+a:a.toLowerCase()}var d,k,l,m,n,o,p,q,r,s,c="",g={Webkit:"webkit",Moz:"",O:"o"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,t={};a.each(g,function(a,e){return i.style[a+"TransitionProperty"]!==b?(c="-"+a.toLowerCase()+"-",d=e,!1):void 0}),k=c+"transform",t[l=c+"transition-property"]=t[m=c+"transition-duration"]=t[o=c+"transition-delay"]=t[n=c+"transition-timing-function"]=t[p=c+"animation-name"]=t[q=c+"animation-duration"]=t[s=c+"animation-delay"]=t[r=c+"animation-timing-function"]="",a.fx={off:d===b&&i.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:c,transitionEnd:v("TransitionEnd"),animationEnd:v("AnimationEnd")},a.fn.animate=function(c,d,e,f,g){return a.isFunction(d)&&(f=d,e=b,d=b),a.isFunction(e)&&(f=e,e=b),a.isPlainObject(d)&&(e=d.easing,f=d.complete,g=d.delay,d=d.duration),d&&(d=("number"==typeof d?d:a.fx.speeds[d]||a.fx.speeds._default)/1e3),g&&(g=parseFloat(g)/1e3),this.anim(c,d,e,f,g)},a.fn.anim=function(c,d,e,f,g){var h,v,y,i={},w="",x=this,z=a.fx.transitionEnd,A=!1;if(d===b&&(d=a.fx.speeds._default/1e3),g===b&&(g=0),a.fx.off&&(d=0),"string"==typeof c)i[p]=c,i[q]=d+"s",i[s]=g+"s",i[r]=e||"linear",z=a.fx.animationEnd;else{v=[];for(h in c)j.test(h)?w+=h+"("+c[h]+") ":(i[h]=c[h],v.push(u(h)));w&&(i[k]=w,v.push(k)),d>0&&"object"==typeof c&&(i[l]=v.join(", "),i[m]=d+"s",i[o]=g+"s",i[n]=e||"linear")}return y=function(b){if("undefined"!=typeof b){if(b.target!==b.currentTarget)return;a(b.target).unbind(z,y)}else a(this).unbind(z,y);A=!0,a(this).css(t),f&&f.call(this)},d>0&&(this.bind(z,y),setTimeout(function(){A||y.call(x)},1e3*d+25)),this.size()&&this.get(0).clientLeft,this.css(i),0>=d&&setTimeout(function(){x.each(function(){y.call(this)})},0),this},i=null}(Zepto),function(a,b){function h(c,d,e,f,g){"function"!=typeof d||g||(g=d,d=b);var h={opacity:e};return f&&(h.scale=f,c.css(a.fx.cssPrefix+"transform-origin","0 0")),c.animate(h,d,null,g)}function i(b,c,d,e){return h(b,c,0,d,function(){f.call(a(this)),e&&e.call(this)})}var c=window.document,e=(c.documentElement,a.fn.show),f=a.fn.hide,g=a.fn.toggle;a.fn.show=function(a,c){return e.call(this),a===b?a=0:this.css("opacity",0),h(this,a,1,"1,1",c)},a.fn.hide=function(a,c){return a===b?f.call(this):i(this,a,"0,0",c)},a.fn.toggle=function(c,d){return c===b||"boolean"==typeof c?g.call(this,c):this.each(function(){var b=a(this);b["none"==b.css("display")?"show":"hide"](c,d)})},a.fn.fadeTo=function(a,b,c){return h(this,a,b,null,c)},a.fn.fadeIn=function(a,b){var c=this.css("opacity");return c>0?this.css("opacity",0):c=1,e.call(this).fadeTo(a,c,b)},a.fn.fadeOut=function(a,b){return i(this,a,null,b)},a.fn.fadeToggle=function(b,c){return this.each(function(){var d=a(this);d[0==d.css("opacity")||"none"==d.css("display")?"fadeIn":"fadeOut"](b,c)})}}(Zepto),function(a){function g(f,g){var k,i=f[e],j=i&&b[i];if(void 0===g)return j||h(f);if(j){if(g in j)return j[g];if(k=d(g),k in j)return j[k]}return c.call(a(f),g)}function h(c,f,g){var h=c[e]||(c[e]=++a.uuid),j=b[h]||(b[h]=i(c));return void 0!==f&&(j[d(f)]=g),j}function i(b){var c={};return a.each(b.attributes||f,function(b,e){0==e.name.indexOf("data-")&&(c[d(e.name.replace("data-",""))]=a.zepto.deserializeValue(e.value))}),c}var b={},c=a.fn.data,d=a.camelCase,e=a.expando="Zepto"+ +new Date,f=[];a.fn.data=function(b,c){return void 0===c?a.isPlainObject(b)?this.each(function(c,d){a.each(b,function(a,b){h(d,a,b)})}):0 in this?g(this[0],b):void 0:this.each(function(){h(this,b,c)})},a.fn.removeData=function(c){return"string"==typeof c&&(c=c.split(/\s+/)),this.each(function(){var f=this[e],g=f&&b[f];g&&a.each(c||g,function(a){delete g[c?d(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(Zepto),function(a){var c,b=[];a.fn.remove=function(){return this.each(function(){this.parentNode&&("IMG"===this.tagName&&(b.push(this),this.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",c&&clearTimeout(c),c=setTimeout(function(){b=[]},6e4)),this.parentNode.removeChild(this))})}}(Zepto),function(a){function e(b){return b=a(b),!(!b.width()&&!b.height())&&"none"!==b.css("display")}function j(a,b){var c,d,e,h;return a=a.replace(/=#\]/g,'="#"]'),e=g.exec(a),e&&e[2]in f&&(c=f[e[2]],d=e[3],a=e[1],d&&(h=Number(d),d=isNaN(h)?d.replace(/^["']|["']$/g,""):h)),b(a,c,d)}var b=a.zepto,c=b.qsa,d=b.matches,f=a.expr[":"]={visible:function(){return e(this)?this:void 0},hidden:function(){return e(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(a){return 0===a?this:void 0},last:function(a,b){return a===b.length-1?this:void 0},eq:function(a,b,c){return a===c?this:void 0},contains:function(b,c,d){return a(this).text().indexOf(d)>-1?this:void 0},has:function(a,c,d){return b.qsa(this,d).length?this:void 0}},g=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),h=/^\s*>/,i="Zepto"+ +new Date;b.qsa=function(d,e){return j(e,function(f,g,j){var k,l;try{!f&&g?f="*":h.test(f)&&(k=a(d).addClass(i),f="."+i+" "+f),l=c(d,f)}catch(m){throw console.error("error performing selector: %o",e),m}finally{k&&k.removeClass(i)}return g?b.uniq(a.map(l,function(a,b){return g.call(a,b,l,j)})):l})},b.matches=function(a,b){return j(b,function(b,c,e){return!(b&&!d(a,b)||c&&c.call(a,null,e)!==a)})}}(Zepto),function(a){function i(a,b,c,d){return Math.abs(a-b)>=Math.abs(c-d)?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function j(){f=null,b.last&&(b.el.trigger("longTap"),b={})}function k(){f&&clearTimeout(f),f=null}function l(){c&&clearTimeout(c),d&&clearTimeout(d),e&&clearTimeout(e),f&&clearTimeout(f),c=d=e=f=null,b={}}function m(a){return("touch"==a.pointerType||a.pointerType==a.MSPOINTER_TYPE_TOUCH)&&a.isPrimary}function n(a,b){return a.type=="pointer"+b||a.type.toLowerCase()=="mspointer"+b}var c,d,e,f,h,b={},g=750;a(document).ready(function(){var o,p,s,t,q=0,r=0;"MSGesture"in window&&(h=new MSGesture,h.target=document.body),a(document).bind("MSGestureEnd",function(a){var c=a.velocityX>1?"Right":a.velocityX<-1?"Left":a.velocityY>1?"Down":a.velocityY<-1?"Up":null;c&&(b.el.trigger("swipe"),b.el.trigger("swipe"+c))}).on("touchstart MSPointerDown pointerdown",function(d){(!(t=n(d,"down"))||m(d))&&(s=t?d:d.touches[0],d.touches&&1===d.touches.length&&b.x2&&(b.x2=void 0,b.y2=void 0),o=Date.now(),p=o-(b.last||o),b.el=a("tagName"in s.target?s.target:s.target.parentNode),c&&clearTimeout(c),b.x1=s.pageX,b.y1=s.pageY,p>0&&250>=p&&(b.isDoubleTap=!0),b.last=o,f=setTimeout(j,g),h&&t&&h.addPointer(d.pointerId))}).on("touchmove MSPointerMove pointermove",function(a){(!(t=n(a,"move"))||m(a))&&(s=t?a:a.touches[0],k(),b.x2=s.pageX,b.y2=s.pageY,q+=Math.abs(b.x1-b.x2),r+=Math.abs(b.y1-b.y2))}).on("touchend MSPointerUp pointerup",function(f){(!(t=n(f,"up"))||m(f))&&(k(),b.x2&&Math.abs(b.x1-b.x2)>30||b.y2&&Math.abs(b.y1-b.y2)>30?e=setTimeout(function(){b.el.trigger("swipe"),b.el.trigger("swipe"+i(b.x1,b.x2,b.y1,b.y2)),b={}
},0):"last"in b&&(30>q&&30>r?d=setTimeout(function(){var d=a.Event("tap");d.cancelTouch=l,b.el.trigger(d),b.isDoubleTap?(b.el&&b.el.trigger("doubleTap"),b={}):c=setTimeout(function(){c=null,b.el&&b.el.trigger("singleTap"),b={}},250)},0):b={}),q=r=0)}).on("touchcancel MSPointerCancel pointercancel",l),a(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(b){a.fn[b]=function(a){return this.on(b,a)}})}(Zepto);