package br.org.projeto.service.validator.validation.common;

public class ValidationMessageImpl implements ValidationMessage {

	private final String message;

	public ValidationMessageImpl(String message) {
		this.message = message;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

}
