/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />
/// <reference path="../actions/productIndexActions" />
/// <reference path="../stores/productStore"/>

import React = require('react');
import DOM = require('react-dom');
import autobind = require('autobind-decorator');
import actions = require('../actions/productIndexActions');
import store = require('../stores/productStore');


interface P {
  name?: string;
}

interface S {
  complete?: boolean;
}

class productIndex extends React.Component<P,S>{

  render() {
		return React.DOM.div({className:"productIndex-container"},
            React.createElement(gridHeader,{name:"gridHeader"}),
            React.createElement(gridDataDiv,{name:"gridDataDiv"}),
            React.createElement(test,{name:"test"})                        
            );
  }
}

class test extends React.Component<P,S>{
  
  constructor(){
    super();
    this.state = {name:"sahas"};
   }  
   
  @autobind    
  _onChange(){
      this.setState({name:store.getProducts()});
    }
        
  componentWillMount(){
      store.addChangeListener(this._onChange);
   }
   
  render(){
    return React.DOM.label({onClick:actions.getProducts},this.state.name); 
  }
}

class gridHeader extends React.Component<P,S>{
  render(){
     return   React.DOM.ul({className:"flexbox"},
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"COE")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"App")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"score")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Unit Testing")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Code Quality")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Build")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Deployment")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Quality Practices")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Test Automation")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"APM")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Security")),
                React.DOM.li({className:"table tableHead"}, React.DOM.span(null,"Utilization"))
                );                                                      
  }
}

class gridDataDiv extends React.Component<P,S>{
  render(){
      return React.DOM.div(null,
              React.DOM.ul({className:"flexbox"},
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"HR")),
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"Mobile Research")),
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"14")),
                    React.DOM.li({className:"table tableData coloredbox red"}, React.DOM.span(null,"L1")),
                    React.DOM.li({className:"table tableData coloredbox blue"}, React.DOM.span(null,"L4")),
                    React.DOM.li({className:"table tableData coloredbox green"}, React.DOM.span(null,"L3")),
                    React.DOM.li({className:"table tableData coloredbox red"}, React.DOM.span(null,"L1")),
                    React.DOM.li({className:"table tableData coloredbox blue"}, React.DOM.span(null,"L4")),
                    React.DOM.li({className:"table tableData coloredbox green"}, React.DOM.span(null,"L3")),
                    React.DOM.li({className:"table tableData coloredbox yellow"}, React.DOM.span(null,"L2")),
                    React.DOM.li({className:"table tableData coloredbox blue"}, React.DOM.span(null,"L4")),
                    React.DOM.li({className:"table tableData coloredbox green"}, React.DOM.span(null,"L3"))
                    ),
              React.DOM.ul({className:"flexbox"},
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"HR")),
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"Talent Sourcing")),
                    React.DOM.li({className:"table tableData"}, React.DOM.span(null,"14")),
                    React.DOM.li({className:"table tableData coloredbox yellow"}, React.DOM.span(null,"L2")),
                    React.DOM.li({className:"table tableData coloredbox yellow"}, React.DOM.span(null,"L2")),
                    React.DOM.li({className:"table tableData coloredbox green"}, React.DOM.span(null,"L3")),
                    React.DOM.li({className:"table tableData coloredbox red"}, React.DOM.span(null,"L1")),
                    React.DOM.li({className:"table tableData coloredbox blue"}, React.DOM.span(null,"L4")),
                    React.DOM.li({className:"table tableData coloredbox green"}, React.DOM.span(null,"L3")),
                    React.DOM.li({className:"table tableData coloredbox yellow"}, React.DOM.span(null,"L2")),
                    React.DOM.li({className:"table tableData coloredbox red"}, React.DOM.span(null,"L1")),
                    React.DOM.li({className:"table tableData coloredbox red"}, React.DOM.span(null,"L1")))                   
                    );                                                      
  }
}

DOM.render(
	React.createElement(productIndex,{className:'productIndex1'}),
	document.getElementById('products')
);