/// <refernce path="../dispatcher/appDispatcher.ts"/>
/// <reference path="../constants/actionTypes.ts" />
import Dispatcher = require("../dispatcher/appDispatcher");
import actionTypes = require("../constants/actionTypes");

class _sonarActions{
	getProjects(){
		//Hey dispatcher, go and tell the stores to get products from backend
		Dispatcher.dispatch({
			actionType: actionTypes.actions.GET_SONAR_PROJECTS
		})
	}
}
var sonarActions = new _sonarActions();
export = sonarActions;
