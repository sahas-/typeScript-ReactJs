///<reference path="../dispatcher/appDispatcher"/>
///<reference path="../actions/productIndexActions"/>
///<reference path="../constants/actionTypes"/>
///<reference path="../../typings/eventemitter3/eventemitter3.d.ts"/>
///<reference path="../../typings/object-assign/object-assign.d.ts" />

import EventEmitter = require('eventemitter3');
import dispatcher = require('../dispatcher/appDispatcher');
import productIndexActions = require('../actions/productIndexActions');
import actionTypes = require('../constants/actionTypes');

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
		return name;
	}

}

var _productStore = new productStore();

dispatcher.register((payload)=>{

	switch(payload.actionType){
		case actionTypes.actions.GET_PRODUCTS:
			name = "test";
			_productStore.emitChange();
			break;
	}
})

export =_productStore;
