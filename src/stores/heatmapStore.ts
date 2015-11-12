///<reference path="../../typings/eventemitter3/eventemitter3.d.ts" />
///<reference path='../../typings/object-assign/object-assign.d.ts'/>

import AppDispatcher = require('../dispatcher/AppDispatcher');
import ActionIDs = require('../actions/ActionIDs');
import assign = require('object-assign');
import EventEmitter = require('eventemitter3');

var CHANGE_EVENT = 'change';


export class heatmapStore extends EventEmitter {


  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  public addChangeListener(callback: () => void): void {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  public removeChangeListener(callback: () => void) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

var heatmapstore =  new heatmapStore();

// Register callback to handle all updates
AppDispatcher.register( function(_action): void {
  var text: string;

  switch(_action.actionType) {
    case ActionIDs.TODO_CREATE:
      heatmapstore.emitChange();
      break;

  }
});