/// <refernce path="../dispatcher/appDispatcher.ts"/>
/// <reference path="../constants/actionTypes.ts" />
import Dispatcher = require("../dispatcher/appDispatcher");
import actionTypes = require("../constants/actionTypes");

class _productIndexActions{
	getProducts(){
		//Hey dispatcher, go and tell the stores to get products from backend
		Dispatcher.dispatch({
			actionType: actionTypes.actions.GET_PRODUCTS
		})		
	}
} 
var productIndexActions = new _productIndexActions();
export = productIndexActions;