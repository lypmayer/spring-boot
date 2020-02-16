import Axios from 'axios';
import ServiceError from '../../util/erros/ServiceError';
import LocalStoreEnum from '../../util/enum/LocalStoreEnum';
import Logger from '../../util/Logger';
import { BackEndPath } from '../../util/Paths';
import SystemUtil from '../../util/SystemUtil';

class HttpRequestAxios {
	static getHttpRequest = isGraphQl => {
		const axios = Axios.create();
		axios.interceptors.request.use(
			value => {
				const config = value;
				const token = localStorage.getItem(LocalStoreEnum.TOKEN);

				if (token != null) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				config.headers['Content-Type'] = 'application/json;charset=UTF-8';
				return config;
			},
			error => error
		);

		if (isGraphQl) {
			axios.interceptors.response.use(
				response => {
					if (response.data.errors.length > 0) {
						throw new Error('Erro GraphQL');
					}

					return response.data.data;
				},
				error => {
					if (error.response && error.response.status && error.response.status === 401) {
						window.location.href = `${SystemUtil.getUrlFrontEnd()}/login`;
					}

					const errorObject = new ServiceError(error);
					Logger.serviceError(errorObject, 'HttpRequestAxios com graphql');
					return Promise.reject(errorObject);
				}
			);
		} else {
			axios.interceptors.response.use(
				response => response,
				error => {
					if (error.response && error.response.status && error.response.status === 401) {
						window.location.href = `${SystemUtil.getUrlFrontEnd()}/login`;
					}

					const errorObject = new ServiceError(error);
					Logger.serviceError(errorObject, 'HttpRequestAxios sem graphql');
					return Promise.reject(errorObject);
				}
			);
		}

		return axios;
	};

	static getPromisse = url => {
		const request = HttpRequestAxios.getHttpRequest();
		return request.get(url);
	};

	static postPromisse = (url, data) => {
		const request = HttpRequestAxios.getHttpRequest();
		return request.post(url, JSON.stringify(data));
	};

	static putPromisse = (url, data) => {
		const request = HttpRequestAxios.getHttpRequest();
		return request.put(url, JSON.stringify(data));
	};

	static deletePromisse = url => {
		const request = HttpRequestAxios.getHttpRequest();
		return request.delete(url);
	};

	// GRAPHQL
	static postPromisseGraphQL = data => {
		const url = SystemUtil.getUrlBackEnd(BackEndPath.GRAPGQL);
		const request = HttpRequestAxios.getHttpRequest(true);
		return request.post(url, JSON.stringify({ query: data }));
	};
}

export default HttpRequestAxios;
