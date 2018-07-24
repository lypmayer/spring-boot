package br.org.projeto.service.api.exception.validation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class ValidationResponse {

	private final LinkedHashMap<String, ValidationCallBack> validationsMap;

	private final List<ValidationType> listValidationType;

	public static final ValidationResponse EMPTY = new ValidationResponse(new LinkedHashMap<>(), new ArrayList<>());
	
	public ValidationResponse() {
		this(new LinkedHashMap<String, ValidationCallBack>(), new ArrayList<>());
	}

	public ValidationResponse(final LinkedHashMap<String, ValidationCallBack> validationsMap, ArrayList<ValidationType> listValidationType) {
		this.validationsMap = validationsMap;
		this.listValidationType = listValidationType;
	}

	public void addValidationType(final String id, final ValidationType type) {
		this.addValidationType(id, type, "");
	}

	public void addValidationType(final String id, final ValidationType type, String message) {
		this.validationsMap.put(id, new ValidationCallBack(type, message));
		this.listValidationType.add(type);
	}
	
	public void addValidate(ValidationResponse validate) {
		for (Entry<String, ValidationCallBack> entry : validate.validationsMap.entrySet()) {
			this.addValidationType(entry.getKey(), entry.getValue().getType(), entry.getValue().getMessage());
		}
	}
	
	public void throwException() throws ValidationException {
		if (!this.validationsMap.isEmpty()) {
			throw new ValidationException(this.validationsMap, this.listValidationType);
		}
	}

	public List<ValidationType> getListValidationType() {
		return listValidationType;
	}

	public int size() {
		return this.validationsMap.size();
	}

	public boolean isEmpty() {
		return this.validationsMap.isEmpty();
	}
	
	public boolean verifyField(final String field) {
		return this.validationsMap.containsKey(field);
	}

	public Map<String, ValidationCallBack> getValidationsMap() {
		return Collections.unmodifiableMap(this.validationsMap);
	}

	public static class ValidationCallBack {

		private final ValidationType type;
		private final String message;

		public ValidationCallBack(ValidationType type, String message) {
			this.type = type;
			this.message = message;
		}

		public ValidationType getType() {
			return this.type;
		}

		public String getMessage() {
			return this.message;
		}
	}
}