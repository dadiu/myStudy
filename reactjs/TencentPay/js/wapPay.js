var PayBar, PayTabHeader, PayTabBody, PayTabBodyQQ, PayTabBodyGame, PayTabBodySecver;

PayBar = React.createClass({
	render : function(){
		return (
			<div>
				<PayTabHeader />
				<PayTabBody />
			</div>
		);
	}
});
PayTabHeader = React.createClass({
	getInitialState: function() {
		return {
			titleName : [
				{"name" : "QQ", "show": 1},
				{"name" : "game", "show" : 0},
				{"name" : "secver", "show": 0}
			] 
		};
	},
	changeTabBody : function(e){
		console.log(e.target);
		// 更换选中
		// this.setState({
		// 	titleName[e] : []
		// })
	},
	render : function(){
		var _t = this, crt, HEADERHTML;

		HEADERHTML = this.state.titleName.map(function(item){
			crt = item["show"] == 1 ? "crt" : "";
			return (
				<li className={crt} onClick={_t.changeTabBody}>{item["name"]}</li>
			);
		});

		return (
			<ul className="payTabHeader">
				{HEADERHTML}
			</ul>
		);
	}
});
PayTabBody = React.createClass({
	render : function(){
		return (
			<div className="payTabBody">
				<PayTabBodyQQ />
				<PayTabBodyGame />
				<PayTabBodySecver />
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
			return <a href="javascript:;" onClick={_t.handleChangeA.bind(this,num)}>{num} Q币</a>
		});

		return (
			<ul>
				<li>
					{this.state.qq}
					<span>
						{this.state.nickName}
					</span>
				</li>
				<li>
					余额 ：{this.state.balance} Q币
				</li>
				<li>
					{PAYLISTHTML}
					<input onChange={this.handleChangeInput} placeholder="其他"/>
				</li>
				<li>
					{this.state.endPay*95/100}元（95折）
				</li>
				<li>
					<button onSumbit={this.handleSumbit}>立即充值</button>
				</li>
			</ul>
		)
	}
});
PayTabBodyGame = React.createClass({
	render : function(){
		return (
			<div className="dn">game</div>
		)
	}
});
PayTabBodySecver = React.createClass({
	render : function(){
		return (
			<div className="dn">secver</div>
		)
	}
});

ReactDOM.render(
	<PayBar txt="hello"/>,
	document.getElementById("payBar")
);
