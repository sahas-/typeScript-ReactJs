/// <refernce path="../dispatcher/appDispatcher.ts"/>
/// <reference path="../constants/actionTypes.ts" />
import Dispatcher = require("../dispatcher/appDispatcher");


class productIndexActions{
	getProducts(){
		//Hey dispatcher, go and tell the stores to get products from backend
		Dispatcher.dispatch({
			actionType: "GET_PRODUCTS"
		})		
	}
} 
var _productIndexActions = new productIndexActions();
export = _productIndexActions;