/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
/// <reference path="../actions/sonarActions" />

import React = require('react');
import DOM = require('react-dom');
import store = require('../stores/sonarStore');
import actions = require('../actions/sonarActions');
var autobind = require('autobind-decorator');
var Modal = require('react-modal');

interface P {
  name?: string;
}

interface S {
  complete?: boolean;
}

DOM.render(
	React.createElement(actionBar),
	document.getElementById('actionbar')
);

//consolidates all components for actionbar
export class actionBar extends React.Component<P,S>{
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
  @autobind
  _getSonarProjects(){
    return {projects:actions.getProjects()}
  }

  @autobind
  _onUpdate(){
      this.setState({sonarProjectsList: store.getProjects()});
    }

  componentWillMount(){
      store.addChangeListener(this._onUpdate);
   }
  constructor(){
    super();
    this.state = ({isModalOpen:false,sonarProjectsList:null});
  }
  @autobind
  openModal() {
    actions.getProjects();
    this.setState({isModalOpen: true,isCodeQualityEnabled:false});
  }
  @autobind
  closeModal() {
    this.setState({isModalOpen: false});
  }
  @autobind
  toggleCodeQuality(){
    this.setState({isCodeQualityEnabled: !this.state.isCodeQualityEnabled})
  }
  render(){
    return React.DOM.ul({className:"flexbox"},
              React.DOM.a({className:"svg addNew"}),
              React.DOM.a({className:"genericHeader",id:"createNewAnchor",onClick:this.openModal.bind(this)},"Add new project"),
              React.createElement(Modal,{isOpen:this.state.isModalOpen,onRequestClose:this.closeModal,style:this.customStyles},
                React.DOM.div(null,
                  React.DOM.h3({className:"genericHeader"},"Project details"),
                    React.DOM.div({className:"modalContent"},
                      React.DOM.label({className:"modalContentLabels"},"COE"),
                      React.DOM.input({placeholder:"Enter COE name here",className:"modalContentData"})),
                    React.DOM.div({className:"modalContent"},
                      React.DOM.label({className:"modalContentLabels"},"Application"),
                      React.DOM.input({placeholder:"Enter App name here",className:"modalContentData"})),
                    React.DOM.div({className:"modalContent"},
                      React.DOM.input({className:"modalContentLabels",type:"checkbox",checked:this.state.isCodeQualityEnabled,onClick:this.toggleCodeQuality}),
                      React.DOM.label({className:"modalContentLabels"},"Code Quality"),
                      React.createElement(foldProjectsList,{items:this.state.sonarProjectsList,isCodeQualityEnabled:!this.state.isCodeQualityEnabled}),
                      React.createElement(exceptionComponent,{items:this.state.sonarProjectsList})),                                                                
                  React.DOM.div({className:"genericButton"},
                    React.DOM.button({className:"genericButton"},"Save"),
                    React.DOM.button({className:"genericButton",onClick:this.closeModal},"Close"))
                  )))
  }
}

class exceptionComponent extends React.Component<P,S>{
  render(){
    if(typeof this.props.items === 'undefined' || (this.props.items==='') || (this.props.items===null)){
      return React.DOM.label(null,null);
    }
    else{
        return React.DOM.a({className:(this.props.items.isSuccess?null:"svg exception")});
    }
  }
}

class foldProjectsList extends React.Component<P,S>{
  @autobind
  renderChildren(items){
    if(typeof items === 'undefined' || (items==='') || (items===null) || (!items.isSuccess)){
      return React.DOM.option(null,null);
    }
    else{
      return (items.data.map(function(item){
        return React.DOM.option({defaultValue:item.nm,key:item.id},item.nm);
      }));
    }
  }

  render(){
      return React.DOM.select({
        className:"modalContentData",
        disabled:this.props.isCodeQualityEnabled},this.renderChildren(this.props.items));      

  }
}

