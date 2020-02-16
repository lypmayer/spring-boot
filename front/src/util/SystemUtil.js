class SystemUtil {
	static isLocalHost() {
		return process.env.NODE_ENV === 'development';
	}

	static getUrlFrontEnd() {
		if (window.location.port) {
			return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
		}

		return `${window.location.protocol}//${window.location.hostname}`;
	}

	static getContextPath() {
		if (process.env.CONTEXT) {
			return `/${process.env.CONTEXT}`;
		}

		return '';
	}

	static getVersion() {
		return `${process.env.VERSION}`;
	}

	static getNameEnvironment() {
		if (SystemUtil.isLocalHost()) {
			return 'Localhost';
		}

		return 'undefined';
	}

	static getUrlImage(image) {
		if (SystemUtil.isLocalHost()) {
			return SystemUtil.getUrlFrontEnd() + image;
		}

		return SystemUtil.getUrlFrontEnd() + SystemUtil.getContextPath() + image;
	}

	static getUrlBackEnd(path) {
		return path;
	}

	static getUrlBackEndGateway(path) {
		const backEndpoint = process.env.BACK_END_GATEWAY || '';

		if (path) {
			return `${backEndpoint}/${path}`;
		}

		return backEndpoint;
	}
}

export default SystemUtil;
