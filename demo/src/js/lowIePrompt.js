/***
 * version : v1.0
 * author : whj
 * @pramas {Number} z css样式z-index层级自定义，默认999
 * 
***/

(function(){

	var css_zindex = 999,	// 默认Z
		agent = navigator.userAgent.toLowerCase(),
		isIe = agent.indexOf("msie")>-1,
		regStr_ie = /msie [\d.]+;/gi,
		downLoadObj = {		//所有链接更改，统计后台分析点击率
			"chrome" : "http://tongji.m3guocdn.com/?aid=1666",
			"ie" : "http://tongji.m3guocdn.com/?aid=1665",
			"box" : "http://tongji.m3guocdn.com/?aid=1664"
		},
		lowIeFn = {

			init : function(){

				//判断浏览器类型
				if(!isIe){ 
					return false;
				};
				//判断浏览器版本 大于等于IE7则返回
				//agent.match(regStr_ie) != "msie 7.0;"
				if(agent.match(regStr_ie) != "msie 6.0;" && agent.match(regStr_ie) != "msie 5.5;"){
					return false;
				};

				var urlParams = this.urlFn();
				if(urlParams["z"]){ css_zindex = urlParams["z"] };

				//start
				this.innerHTML();

			},

			innerHTML : function(){
				var bodyH = document.documentElement.clientHeight,
					filename="http://static.m3guo.com/17m3/lowIePrompt/styles/lowIe.min.css?",
					fileref=document.createElement("link");  
				    fileref.setAttribute("rel", "stylesheet");  
				    fileref.setAttribute("type", "text/css");  
				    fileref.setAttribute("href", filename);  
				    document.getElementsByTagName("head")[0].appendChild(fileref);  

				document.getElementsByTagName('body')[0].innerHTML = this.IEDOM();
				document.getElementById("fn_lowIeBg").style.height = bodyH + "px";
			},

			IEDOM : function(){
				return 	"<div id=\"fn_lowIeBg\" style=\"z-index:" + css_zindex + "\">"+
								"<div id=\"fn_lowIe\">"+
									"<h3 id=\"fn_lowIeH\">hi,您的当前的浏览器版本过低，可能存在安全风险，<br/>建议升级浏览器：</h3>"+
									"<div id=\"fn_lowIeBtnBar\">"+
										"<a href="+ downLoadObj.chrome +" target=\"_blank\">"+
											"<img src=\"http://static.m3guo.com/17m3/lowIePrompt/img/ic_chrome.gif\" width=\"38\" height=\"38\"/>"+
											"谷歌 Chrome"+
										"</a>"+
										"<a href=" + downLoadObj.ie + " target=\"_blank\">"+
											"<img src=\"http://static.m3guo.com/17m3/lowIePrompt/img/ic_ie.gif\" width=\"38\" height=\"38\"/>"+
											"升级 IE"+
										"</a>"+
									"</div>"+
									"<p>更多电魂游戏，尽在电魂梦平台客户端：</p>"+
									"<ul id=\"fn_lowIeDownloadBar\">"+
										"<li>"+
											"<a href=" + downLoadObj.box + " target=\"_blank\">"+
												"<img src=\"http://static.m3guo.com/17m3/lowIePrompt/img/pic_box.jpg\" width=\"72\" height=\"72\"/>"+
												"下载梦平台"+
											"</a>"+
										"</li>"+
										"<li>"+
											"<img src=\"http://static.m3guo.com/17m3/lowIePrompt/img/pic_weixin.jpg\" width=\"72\" height=\"72\"/>"+
											"扫一扫关注"+
										"</li>"+
									"</ul>"+
								"</div>"+
							"</div>";
			},  

			//分解url
			urlFn: function() {

				var _url = document.getElementById("fn_lowIePrompt"),
					_src = _url.getAttribute("src");

					if(_src.indexOf("?") > -1){
						var urLArr = _src.split("?")[1].split("&"),
							urlObj = {};
						
						for(key in urLArr){
							urlObj[urLArr[key].split("=")[0]] = urLArr[key].split("=")[1]
						};

						return urlObj;
					}
				

				return false;

			}

		};

	lowIeFn.init();
}());

//var b = 2;