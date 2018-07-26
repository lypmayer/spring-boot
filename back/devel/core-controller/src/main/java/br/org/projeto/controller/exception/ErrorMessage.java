package br.org.projeto.controller.exception;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorMessage {

	private Integer code;
	private String message;
	private Validation validation;
	
	public ErrorMessage(final String message) {
		this.message = message;
	}

	public ErrorMessage(final String message, final Integer code) {
		this.message = message;
		this.code = code;
	}

	public Integer getCode() {
		return this.code;
	}

	public void setCode(final Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(final String message) {
		this.message = message;
	}
	
	public Validation getValidation() {
		return validation;
	}

	public void setValidation(Validation validation) {
		this.validation = validation;
	}

	public static class Validation {
		private List<String> messages = Collections.emptyList();
		private Map<String, Map<String, String>> validationMessages = new HashMap<String, Map<String, String>>();
		
		public Validation(List<String> messages, Map<String, Map<String, String>> validationsMap) {
			this.messages = messages;
			this.validationMessages = validationsMap;
		}

		public List<String> getMessages() {
			return messages;
		}

		public void setMessages(List<String> messages) {
			this.messages = messages;
		}
		
		public Map<String, Map<String, String>> getValidationMessages() {
			return validationMessages;
		}

		public void setValidationMessages(Map<String, Map<String, String>> validationMessages) {
			this.validationMessages = validationMessages;
		}
	}
}