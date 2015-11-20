/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
import React = require('react');
import DOM = require('react-dom');

interface P {
  name?: string;
}

interface S {
  complete?: boolean;
}


class centerHeader extends React.Component<P,S>{
	render(){
		return React.DOM.div({className:"centerHeader"},
			React.DOM.a({className:"howItWorks"},"How it works"),
			React.DOM.a({className:"confluence"},"Confluence")
			)
	}
}

//search component
class search extends React.Component<P,S>{

	render(){
		return React.DOM.div({className:"search-group"},
			React.DOM.input({
				className:"searchbox",
				type:"search",
				placeholder:"search here",
				name:"search",
				width:"100%"
			}))
	}
}
//consolidates all components in top header
class topheader extends React.Component<P,S>{
	render(){
		return React.DOM.div(null,
				React.DOM.ul({className:"flex-container-topheader",id:'headerUL'},
					//logo
					React.DOM.li({className:"flex-item-topheader logo"}),
					// search component
					React.DOM.li({className:"flex-item-search"},
						React.createElement(search,{name:"search"})),						
					//center header items						
					React.DOM.li({className:"flex-item-centerHeader"},
						React.createElement(centerHeader,{name:"centerHeaderLi"}))
				))
	}
}

DOM.render(
	React.createElement(topheader,{name:'TopHeader'}),
	document.getElementById('headers')
);