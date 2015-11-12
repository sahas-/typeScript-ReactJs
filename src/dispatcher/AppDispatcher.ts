///<reference path='../../typings/flux/flux.d.ts'/>
///<reference path='../actions/ActionsMaster.ts'/>

import flux = require('flux');

var Dispatcher: flux.Dispatcher<AllActions> = new flux.Dispatcher();

export = Dispatcher;