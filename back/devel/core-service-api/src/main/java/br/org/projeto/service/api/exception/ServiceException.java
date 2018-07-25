package br.org.projeto.service.api.exception;

public class ServiceException extends Exception {
	private static final long serialVersionUID = 1L;

	public static final Integer ERROR_CODE = 2;
	
	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
