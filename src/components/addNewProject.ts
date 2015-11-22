/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-dom/react-dom.d.ts" />

import React = require('react');
import DOM = require('react-dom');
import autobind = require('autobind-decorator');
import Modal = require('react-modal');


interface P {
  name?: string;
}

interface S {
  complete?: boolean;
}

//consolidates all components for actionbar
class actionBar extends React.Component<P,S>{
	render(){
		return React.DOM.div({className:"productIndex-container"},
				    React.createElement(addNewProject))
	}
}

class addNewProject extends React.Component<P,S>{

 customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
  }

  constructor(){
    super();
    this.state = {isModalOpen:false};
  }
  @autobind
  openModal() {
    console.log("in open modal");
    this.setState({isModalOpen: true});
  }
  @autobind
  closeModal() {
    this.setState({isModalOpen: false});
  }
  render(){
    return React.DOM.ul({className:"flexbox"},
              React.DOM.a({className:"svg createNew"}),
              React.DOM.a({className:"createNewA",id:"creaetNewAnchor",onClick:this.openModal.bind(this)},"Add new project"),
              React.createElement(Modal,{isOpen:this.state.isModalOpen,onRequestClose:this.closeModal,style:this.customStyles},
                React.DOM.div(null,
                  React.DOM.h3(null,"Add new project"),
                  React.DOM.form(null,
                    React.DOM.label(null,"COE"),
                    React.DOM.input(null),
                    React.DOM.label(null,"Application"),
                    React.DOM.input(null)),
                  React.DOM.button(null,"Save"),
                  React.DOM.button({onClick:this.closeModal},"Close")))
              )

  }
}

DOM.render(
	React.createElement(actionBar),
	document.getElementById('actionbar')
);
