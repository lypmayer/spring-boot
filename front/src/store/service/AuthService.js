import { BackEndPath } from '../../util/Paths';
import SystemUtil from '../../util/SystemUtil';
import HttpRequestAxios from './HttpRequestAxios';

class AuthService {
	static login = payload => {
		const url = SystemUtil.getUrlBackEnd(BackEndPath.LOGIN);
		return HttpRequestAxios.postPromisse(url, payload);
	};

	static logout = payload => {
		const url = SystemUtil.getUrlBackEnd(BackEndPath.LOGOUT);
		return HttpRequestAxios.postPromisse(url, payload);
	};
}

export default AuthService;
