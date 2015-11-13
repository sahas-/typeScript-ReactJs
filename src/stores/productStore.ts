///<reference path="../dispatcher/appDispatcher"/>
///<reference path="../actions/productIndexActions"/>
///<reference path="../constants/actionTypes"/>
///<reference path="../../typings/eventemitter3/eventemitter3.d.ts"/>
///<reference path="../../typings/object-assign/object-assign.d.ts" />

import EventEmitter = require('eventemitter3');
import dispatcher = require('../dispatcher/appDispatcher');
import productIndexActions = require('../actions/productIndexActions');
//import actionTypes = require('../constants/actionTypes');

var CHANGE_EVENT = 'change';
var name="unchanged";
class productStore extends EventEmitter {
	
	public emitChange(): void {
		this.emit(CHANGE_EVENT);
	}
	
	public addChangeListener(callback: () => void): void {
		this.on(CHANGE_EVENT, callback);
	}
	
	public removeChangeListener(callback: () => void) {
		this.removeListener(CHANGE_EVENT, callback);
	}
	
	getProducts(){
		console.log("in store, getProducts, name is "+name);
		return name;
	}
	
}

var _productStore = new productStore();

dispatcher.register((_action)=>{
	
	switch(_action){
		default: 
			name="sahas";
			console.log(_action);
			console.log("action fired");
			_productStore.emitChange();
	}
})

export =_productStore;