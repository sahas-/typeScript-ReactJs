///<reference path="../../../react/react.d.ts" />
///<reference path="../../../mocha/mocha.d.ts"/>
///<reference path="../../../chai/chai.d.ts" />
///<reference path="../addNewProject"/>


import jsdom = require('jsdom');

describe('addNewProject view tests',function(){
	var React, TestUtils,DOM, expect, chai,MyComponent;
	before(function(){
		jsdom = require('jsdom');
		global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
		global.window = global.document.parentWindow;
	
		React = require('react');
		TestUtils = require('react-addons-test-utils');
		DOM = require('react-dom');
		chai = require('chai');
		expect = require('chai').expect;
		
	})
	it('should load a component into shallow dom',function(){
		const shallowRenderer = TestUtils.createRenderer();
		shallowRenderer.render(React.createElement(MyComponent, { className: 'MyComponent' }, 'some child text'));
		const component = shallowRenderer.getRenderOutput();

	})	
})