import axios from 'axios';
import classNames from 'classnames';

var fw = {};

fw.getActiveClassState = function (error, id) {	
	if(error){
		if(error.response){
			let code = error.response.data.code || 0;
			if (code == 1) {
				let validation = error.response.data.validation;

				if (id in validation.validationMessages) {
					return classNames('form-control', 'invalid', 'is-invalid');
				}
			}
		}
	}
	
	return classNames('form-control');
};

fw.post = function (path, data) {	
	let callback = {reponse: null, error: null};

	axios.post(fw.getHostUrl() + path, JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then(response => {
		callback.reponse = response;
		return callback;
	})
	.catch((error) => {
		callback.error = error;
		return callback;
	});
};

fw.get = function (path, functionCallback) {	
	let callback = functionCallback;
	axios.get(fw.getHostUrl() + '/' + path)
	.then(response => {
		callback(esponse.data);
	})
	.catch((error) => {
		callback(error);
	});
};	


fw.delete = function (path) {	
	let callback = {reponse: null, error: null};

	axios.delete(fw.getHostUrl() + path,{
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then(response => {
		callback.reponse = true;
		return callback;
	})
	.catch((error) => {
		callback.error = error;
		return callback;
	});
};	

fw.getHostUrl = function () {
	let host = `${process.env.PUBLIC_URL}`;
	let location = window.location;
	if (location.hostname === 'localhost' && location.port === '8081') {
		let protocol = (location.protocol === 'https:') ? 'https://' : 'http://';
		host = protocol + 'localhost:8080';
	}

	return host;
}

export default fw;