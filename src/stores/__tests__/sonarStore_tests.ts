var sinon= require('sinon');
var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


describe('sonar store unit and integration tests',function(){
	var store, action, dispatcher;
	beforeEach(function(){
		store = require('../sonarStore');
		action = require('../../actions/sonarActions');
		dispatcher = require('../../dispatcher/AppDispatcher');
		appConfig = require('../../appConfig');			
	})
	it('projectslist should be initialized empty',function(){
		expect(store.getProjects()).to.be.empty;
	});
	
	it('should get projects list from sonar',function(){
		var result = store.getProjectsFromSonar();
		return result.then(function(response,error) {
			var projects=store.getProjects();
			expect(projects).to.be.an('object');
			expect(projects).to.have.property('isSuccess',true);
			expect(projects).to.have.deep.property('data').to.be.an.instanceof(Array);
  		});
	});
	
	it('should reject the promise when sonar is not available',function(){
		sinon.stub(appConfig.sonar.prototype,"config").returns({
            baseurl: "http://invalid.url"
        });
		var _sonar = new appConfig.sonar();
		var result = store.getProjectsFromSonar();
		return result.then(null,function(error){
			expect(error).to.have.property('isSuccess',false);
			});		
	})
	
})