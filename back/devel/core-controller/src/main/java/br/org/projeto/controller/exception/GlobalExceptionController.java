package br.org.projeto.controller.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MarkerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.api.exception.validation.ValidationException;

@ControllerAdvice
public class GlobalExceptionController extends ResponseEntityExceptionHandler {

	private static final HttpHeaders HEADERS = new HttpHeaders();
	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionController.class);

	static {
		HEADERS.setContentType(MediaType.APPLICATION_JSON);
	}

	@ExceptionHandler({Exception.class, RuntimeException.class, ServiceException.class, ValidationException.class})
	public ResponseEntity<Object> waycoException(final Exception ex, final WebRequest request) {
		LOGGER.error(MarkerFactory.getMarker(ex.getClass().getName()), ex.getMessage(), ex);
		return this.handleExceptionInternal(ex, this.processErroDetail(ex), HEADERS, HttpStatus.INTERNAL_SERVER_ERROR, request);
	}

	private ErrorMessage processErroDetail(final Exception ex) {
		final ErrorMessage errorMessage = new ErrorMessage(ex.getMessage());
		
		if (ex instanceof ValidationException) {
			ValidationException validationException = (ValidationException) ex;
			errorMessage.setCode(ValidationException.ERROR_CODE);
			errorMessage.setValidationMessages(validationException.getDougleMapMessagesByField());
		}else if (ex instanceof ServiceException) {
			errorMessage.setCode(ServiceException.ERROR_CODE);
		}
		
		return errorMessage;
	}
}