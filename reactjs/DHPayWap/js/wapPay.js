var PayBar, PayTabBar, PayTabHeader, PayTabBody, PayList, PayTabBodyQQ, PayTabBodyGame, PayTabBodySecver;

PayBar = React.createClass({
	getInitialState : function(){
		return {
			"qq" : 451404370,
			"nickName" : "昵称",
			"balance" : 4.02
		};
	},

	render : function(){
		return (
			<div>
				<PayTabBar>
					<PayTabBodyQQ name="QB" initObj={this.state}/>
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
			currentIndex : 1
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
			"qq" : this.props.qq,
			"nickName" : this.props.nickName,
			"balance" : this.props.balance,
			"priceArr" : [10, 20, 100],
			"endPay" : 0
		};
	},
	//提交表单
	handleSumbit : function(){
		console.log(this.state.endPay);
	},

	endPrice : function(price){
		this.setState({
			endPay : price
		});
	},

	render : function(){
		var _t = this;

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
					<PayList priceArr={this.state.priceArr} fnEndPay={this.endPrice}/>
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

// 充值价目表
PayList : React.createClass({
	getInitialState : function(){
		priceArr : this.props.priceArr,
		endPriceFn : this.props.endPrice,
		otherPrice : 0
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

	render : function(){

		return (
			<div>
				{
					this.state.priceArr.map(function(num,index){
						return <a href="javascript:;" className={_t.handleChangeACss(num)} onClick={_t.handleChangeA.bind(this,num)}>{num}</a>
					});
					<input 
						onChange={this.handleChangeInput} 
						onFocus={this.handleChangeACss.bind(this,null)} 
						placeholder="其他数额" 
						className="priceItem" 
						value={this.state.otherPrice} 
						type="tel" />
				}
			</div>
		)
	}
})

// game
PayTabBodyGame = React.createClass({
	getInitialState: function() {
		return {
			currentGameId : 1213286194,
			filterText : ''
		};
	},

	handleChange : function(){
		//console.log(this.refs);
		this.setState({
			filterText : this.refs.filterTextInput.value
		});
	},

	// fnChangeId : function(){

	// },

	render : function(){
		var _t = this;

		return (
			<div>
				<div className="searchBar">
					<input type="text" placeholder="请输入游戏名称搜索" ref="filterTextInput" value={_t.state.filterText} onChange={this.handleChange} />
				</div>
				<ul className="gameListBar">
					{
						Object.keys(gameDataType).map(function(item){
							//console.log(item);

							console.log(_t.state.currentGameId);
							if(gameDataType[item]["name"].indexOf(_t.state.filterText) > -1){
								return (
									<li className="gameListBarItem" onClick={function(){_t.setState({currentGameId:item})}}>
										<img src={"https://static.m3guo.com/17m3/gameLogo/" +item+"_20x20.png"} />
										{gameDataType[item]["name"]}
									</li>
								)
							}
						})
						
					}
				</ul>
				<div className="gameInfoBar">
					<div className="gameInfoBar-header">
						<img src={"https://static.m3guo.com/17m3/gameLogo/" + _t.state.currentGameId +"_48x48.png"}/>
						{gameDataType[_t.state.currentGameId]["name"]}
					</div>
					<div>
						<p>充值数量</p>
						<ul>
						</ul>
					</div>
				</div>
			</div>
		)
	}
});
//<PayTabBodyGameInfo fnChangeId={this.fnChangeId()}/>
// PayTabBodyGameInfo = React.createClass({

// 	getInitialState : function(){
// 		return {
// 			gameId : this.props.fnChangeId
// 		}
// 	},

// 	changeGameId : function(currentGameId){
// 		setState({
// 			gameId : currentGameId
// 		})
// 	},

// 	render : function(){
// 		var _t = this;
// 		//console.log(this.state.gameId);
// 		return (
// 			<div className="gameInfoBar">
// 				<img src={"https://static.m3guo.com/17m3/gameLogo/" + _t.state.gameId +"_48x48.png"}/>
// 			</div>
// 		)
// 	}
// });
//{gameDataType[_t.state.gameId]["name"]}

					// if(_t.state.gameId !== ""){
						
					// 	return (
					// 		<img src={"https://static.m3guo.com/17m3/gameLogo/" + _t.state.gameId +"_48x48.png"}/>
					// 	);
					// }

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