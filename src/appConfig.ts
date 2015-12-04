export interface appConfig{
	config();
}

export class sonar implements appConfig {
	public config() { 
		return {
			baseurl:"http://nemo.sonarqube.org/api/projects"
		}; 
	}
}	
