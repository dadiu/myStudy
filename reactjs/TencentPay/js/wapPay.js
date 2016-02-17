var PayBar, PayTabBar, PayTabHeader, PayTabBody, PayTabBodyQQ, PayTabBodyGame, PayTabBodySecver;

PayBar = React.createClass({
	render : function(){
		return (
			<div>
				<PayTabBar>
					<PayTabBodyQQ name="DHB" />
					<PayTabBodyGame name="Game" />
					<PayTabBodySecver name="Secver" />
				</PayTabBar>
			</div>
		);
	}
})
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

PayTabBodyQQ = React.createClass({
	getInitialState: function() {
		return {
			"qq" : 451404370,
			"nickName" : "昵称",
			"balance" : 4.02,
			"payArr" : [10, 20, 100],
			"endPay" : 0
		};
	},
	handleChangeA : function(num,e){
		this.setState({endPay : num});
	},
	handleChangeInput : function(e){
		console.log(e.target);
		this.setState({endPay : e.target.value});
	},
	handleSumbit : function(e){
	},
	render : function(){
		var _t = this;
		var PAYLISTHTML = this.state.payArr.map(function(num){
			return <a href="javascript:;" className="priceItem" onClick={_t.handleChangeA.bind(this,num)}>{num}</a>
		});

		return (
			<div>
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
					<input onChange={this.handleChangeInput} placeholder="其他数额" className="priceItem"/>
				</div>
				<p>
					{this.state.endPay*98/100}元（98折）
				</p>
				<p>
					<button onSumbit={this.handleSumbit}>立即充值</button>
				</p>
			</div>
		)
	}
});
PayTabBodyGame = React.createClass({
	render : function(){
		return (
			<div>game</div>
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
