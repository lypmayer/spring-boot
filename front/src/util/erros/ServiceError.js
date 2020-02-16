const getError = callBack => {
	const response = callBack.response.data;
	if (response) {
		return { code: response.code, message: response.message, validation: response.errors, status: callBack.response.status };
	}

	return { code: callBack.status, message: callBack.message, status: null };
};

class ServiceError extends Error {
	constructor(error) {
		super('message');
		this.object = getError(error);
	}
}

export default ServiceError;
