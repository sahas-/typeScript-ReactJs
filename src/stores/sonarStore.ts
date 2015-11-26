///<reference path="../dispatcher/appDispatcher"/>
///<reference path="../constants/actionTypes"/>
///<reference path="../../typings/eventemitter3/eventemitter3.d.ts"/>
///<reference path="../../typings/object-assign/object-assign.d.ts" />
///<reference path="../../typings/superagent/superagent.d.ts" />

import EventEmitter = require('eventemitter3');
import http = require('superagent');
import promise = require('promise');
import dispatcher = require('../dispatcher/appDispatcher');
import actionTypes = require('../constants/actionTypes');



var CHANGE_EVENT = 'change';
var projectsList=[];
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
		return projectsList;
	}
	
	getProjectsFromSonar(){
		return new promise((fulfill, reject) =>{
			http.get("http://nemo.sonarqube.org/api/projects")
					.end((err,res)=>{
						if(err) reject(err);
						fulfill(res.body);	
					})
		})
	}

}

var sonarStore = new _sonarStore();

dispatcher.register((payload)=>{
	switch(payload.actionType){
		case actionTypes.actions.GET_SONAR_PROJECTS:
			projectsList=[];
			sonarStore.getProjectsFromSonar()
				.then((res)=>{
					projectsList = res;
					sonarStore.emitChange();					
				},(error)=>{
					console.log(err);
					sonarStore.emitChange();
				})
			break;
	}
})

export = sonarStore;
