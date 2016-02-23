# ums系统总结

## angular模块引用echart(3.0.0)快速开发 - 暂时只做了pie + line + bar

1. service.js

define(["angular"], function(angular){
	var services = angular.module("common.services", []);
	//接口集体处理处
	services.factory("_getAjaxFn", function($http){
		/*
			@param {JSON} config 请求配置
			@param {Function} fn 回调方法
			@param {string} target 可选参数，如果携带则传入，如无携带则不传入。
		*/
		return function(config, fn, target){

			target = target ? target : "";

			$http(config)
				.success(function(res){
					//成功
	        if(res.result === 1000){
	            fn(res.data,target);
	        };
	
	        //其他情况
				})
				.error(function(res){
					console.log("error");
				});
		}
	});

	//图表传入参数整合
	services.factory("_eChartDataFn", function(){
		/*
			@param {array} arr 传入数组[type,txt,subtext];
			@param {object} res 接口返回参数;
		*/	
		var fn={};

		fn.pie = function(arr, res){	//饼图
			return {
					"title" : {
			            "x":"center"
			        },

				    "tooltip" : {
				        "trigger": "item",
				        "formatter": "{a} <br/>{b} : {c} ({d}%)"
				    },
			        "legend" : {
			            "orient" : "vertical",
			            "x" : "left",
			            "data" : res.explain
			        },
			        "calculable" : true,
			        "series" : [
			            {
			                "name" : arr[1],
			                "type" :"pie",
			                "radius" : "55%",
			                "center": ["50%", "50%"],
			                "data": res.lstData
			            }
			        ]
				};
		};

		fn.line = function(arr, res){
			return {
				"tooltip" : {
			        "trigger" : 'axis'
			    },
		        "legend": {
		            "data" : res.explain
		        },
		        "calculable" : true,
		        "xAxis" : [
		            {
		                "type" : "category",
		                "boundaryGap" : false,
		                "data" : ["周一","周二","周三","周四","周五","周六","周日"]
		            }
		        ],
		        "yAxis" : [
		            {
		                "type" : "value"
		            }
		        ],
		        "series" : res.lstData
    		};
		};

		fn.bar = function(arr, res){

			var yesterday = res.lstData[0]["data"],
				moreThanYesterday = res.lstData[1]["data"],
				yesterdayMin = Math.min.apply(Math,yesterday),
				yesterdayMax = Math.max.apply(Math,yesterday),
				moreThanYesterdayMin = Math.min.apply(Math,moreThanYesterday),
				moreThanYesterdayMax = Math.max.apply(Math,moreThanYesterday);
				
			return {
				"tooltip" : {
			        "trigger" : 'axis'
			    },
		        "legend": {
		            "orient" : "vertical",
		            "x" : "left",
		            "data" : ["昨日","前日"]
		        },
		        "calculable" : true,
		        "xAxis" : [
		            {
		                "type": "category",
		                "axisLabel": {
                            "interval" : 0
                        },
		                "data" : res.explain
		            }
		        ],
		        "yAxis" : [
		            {
		                "type" : "value"
		            }
		        ],
		        "series" : [
		            {
		                "name" : "昨日",
		                "type" : "bar",
		                "data" : yesterday,
		                "markPoint" : {
		                    "data" : [
		                        {"type" : "max", "name": "最大值", "value": yesterdayMax},
		                        {"type" : "min", "name": "最小值", "value": yesterdayMin}
		                    ]
		                },
		                "markLine" : {
		                    "data" : [
		                        {"type" : "average", "name": "平均值"}
		                    ]
		                }
		            },
		            {
		                "name" : "前日",
		                "type" : "bar",
		                "data" : moreThanYesterday,
		                "markPoint" : {
		                    "data" : [
		                        {"type" : "max", "name": "最大值", "value": moreThanYesterdayMax},
		                        {"type" : "min", "name": "最小值", "value": moreThanYesterdayMin}
		                    ]
		                },
		                "markLine" : {
		                    "data" : [
		                        {"type" : "average", "name" : "平均值"}
		                    ]
		                }
		            }
		        ]
		    };
		};

		return fn;
	});

	return services;
});

2. directives.js （依赖service.js / echarts.js）

define([
    'angular',
    'echarts'
], function(angular, echarts) {
    var directives = angular.module("pay.directives", []);

    //chartBody
    directives.directive("payChartBody", ["_getAjaxFn","_eChartDataFn", function(_getAjaxFn, _eChartDataFn){
        return {
            restrict : "EA",
            replace : true,
            transclude : true,
            //scope: true,
            template : '<div style="height:300px;"></div>',
            link : function(scope, el, attr, controller){
                //console.log(controller);
                _getAjaxFn({
                    "method" : "get",
                    "url" : attr.get,
                    "cache" : false
                },callFn,attr.target);

                function callFn(data,target){
                    var arr = target.split("|")
                    echarts.init(el[0]).setOption(_eChartDataFn[arr[0]](arr, data));
                };
            }
        }
    }]);

});

3. 
