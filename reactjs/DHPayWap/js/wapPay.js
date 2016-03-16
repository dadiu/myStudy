var PayBar, PayTabBar, PayTabHeader, PayTabBody, PayTabBodyQQ, PayTabBodyGame, PayTabBodySecver;

PayBar = React.createClass({
	render : function(){
		return (
			<div>
				<PayTabBar>
					<PayTabBodyQQ name="QB" />
					<PayTabBodyGame name="Game" />
					<PayTabBodySecver name="Secver" />
				</PayTabBar>
			</div>
		);
	}
})

// TABBar
PayTabBar = React.createClass({
	getInitialState: function() {
		return {
			currentIndex : 0
		};
	},
	changeHeaderCurrent : function(index){
		return this.state.currentIndex == index ? "crt" : "";
	},
	changeBodyCurrent : function(index){
		return this.state.currentIndex == index ? "" : "dn";
	},
	render : function(){
		var _t = this;

		return (
			<div>
				<ul className="payTabHeader">
					{React.Children.map(_t.props.children, function(el, index){
						return (
							<li className={_t.changeHeaderCurrent(index)} onClick={function(){_t.setState({currentIndex : index})}}>{el.props.name}</li>
						)
					})}
				</ul>
				<div className="payTabBody">
					{React.Children.map(_t.props.children, function(el, index){
						return (
							<div className={_t.changeBodyCurrent(index)}>{el}</div>
						)
					})}
				</div>
			</div>
		);
				
	}
});

// QB
PayTabBodyQQ = React.createClass({
	getInitialState: function() {
		return {
			"qq" : 451404370,
			"nickName" : "昵称",
			"balance" : 4.02,
			"payArr" : [10, 20, 100],
			"otherPrice" : 0,
			"endPay" : 0
		};
	},
	handleChangeA : function(num,e){
		this.setState({endPay : num});
		this.setState({otherPrice : 0});
	},
	handleChangeACss : function(num,e){

		if(typeof e === "object"){
			if(this.state.otherPrice === 0){
				this.setState({otherPrice : ""});
			};
			this.setState({endPay : 0});
		};
		return this.state.endPay === num ? "priceItem crt" : "priceItem";
	},
	handleChangeInput : function(e){
		this.setState({otherPrice : e.target.value});
		this.setState({endPay : e.target.value});
	},
	//提交表单
	handleSumbit : function(){
		console.log(this.state.endPay);
	},
	render : function(){
		var _t = this;
		var PAYLISTHTML = this.state.payArr.map(function(num,index){
			return <a href="javascript:;" className={_t.handleChangeACss(num)} onClick={_t.handleChangeA.bind(this,num)}>{num}</a>
		});

		return (
			<div className="payTabBody_qb">
				<ul>
					<li>
						<b>{this.state.qq}</b>
						<small>
							{this.state.nickName}
						</small>
					</li>
				</ul>
				<p>
					余额 ：{this.state.balance} Q币
				</p>
				<div className="priceBar">
					{PAYLISTHTML}
					<input onChange={this.handleChangeInput} onFocus={this.handleChangeACss.bind(this,null)} placeholder="其他数额" className="priceItem" value={this.state.otherPrice}/>
				</div>
				<p>
					{this.state.endPay*95/100}元（95折）
				</p>
				<p>
					<a href="javascript:;" onClick={this.handleSumbit} className="btn bgc_green">立即充值</a>
				</p>
			</div>
		)
	}
});

// game
PayTabBodyGame = React.createClass({
	getInitialState: function() {
		return {
			gameList : gameDataType
		};
	},
	render : function(){
		var gameList = gameDataType, GAMELISTHTML="";
			
			// function printList(){
			// 	for(var key in gameList){
			// 		console.log(gameList[key])
			// 		GAMELISTHTML += <li>{gameList[key]}</li>
			// 	};
			// }
			// printList();
			console.log(gameList)
		return (
			<div>
				<div><input placeholder="请输入游戏名称搜索" className="searchBar"/></div>
				<ul className="gameListBar">
					{

						Object.keys(gameList).map(function(item){
							return (<li>{gameList[item]["name"]}</li>)
						})
						
					}
				</ul>
			</div>
		)
	}
});
PayTabBodySecver = React.createClass({
	render : function(){
		return (
			<div>secver</div>
		)
	}
});

ReactDOM.render(
	<PayBar />,
	document.getElementById("payBar")
);