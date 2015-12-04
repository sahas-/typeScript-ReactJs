import store = require('../sonarStore');
import action = require('../../actions/sonarActions');
import dispatcher = require('../../dispatcher/AppDispatcher');
var sinon= require('sinon');
var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


describe('sonar store tests',function(){
	it('projectslist should be initialized empty',function(){
		expect(store.getProjects()).to.be.empty;
	});
	it('should get projects list from sonar',function(){
		action.getProjects();
		expect(store.getProjectsFromSonar()).to.eventually.be.fulfilled;
		expect(store.getProjectsFromSonar()).to.eventually.have.property('projects');	
		expect(store.getProjectsFromSonar()).to.eventually.have.length.above(1);		
	});
	
	
})