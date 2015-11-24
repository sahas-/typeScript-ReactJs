///<reference path="../dispatcher/appDispatcher"/>
///<reference path="../constants/actionTypes"/>
///<reference path="../../typings/eventemitter3/eventemitter3.d.ts"/>
///<reference path="../../typings/object-assign/object-assign.d.ts" />

import EventEmitter = require('eventemitter3');
import dispatcher = require('../dispatcher/appDispatcher');
import actionTypes = require('../constants/actionTypes');

var CHANGE_EVENT = 'change';
var name="nothing";
class _sonarStore extends EventEmitter {

	public emitChange(): void {
		this.emit(CHANGE_EVENT);
	}

	public addChangeListener(callback: () => void): void {
		this.on(CHANGE_EVENT, callback);
	}

	public removeChangeListener(callback: () => void) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getProjects(){
		return name;
	}

}

var sonarStore = new _sonarStore();

dispatcher.register((payload)=>{
	switch(payload.actionType){
		case actionTypes.actions.GET_SONAR_PROJECTS:
			name = "sonar";
      //here talk to sonar API
			sonarStore.emitChange();
			break;
	}
})

export = sonarStore;
