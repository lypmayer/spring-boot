package br.org.projeto.service.api.exception.validation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import br.org.projeto.service.api.exception.validation.ValidationResponse.ValidationCallBack;

public class ValidationException extends Exception {
	
	public static final Integer ERROR_CODE = 1;
	
	private static final long serialVersionUID = 1L;

	private String key;

	private final LinkedHashMap<String, ValidationCallBack> validationsMap;

	private List<ValidationType> listValidationType = new ArrayList<>();

	public ValidationException(final String key, final LinkedHashMap<String, ValidationCallBack> validationsMap) {
		super();
		this.key = key;
		this.validationsMap = validationsMap;
	}

	public ValidationException(LinkedHashMap<String, ValidationCallBack> validationsMap, List<ValidationType> listValidationType) {
		super();
		this.validationsMap = validationsMap;
		this.listValidationType = listValidationType;
	}

	public Map<String, ValidationCallBack> getValidationsMap() {
		return this.validationsMap;
	}

	public boolean contaisValidationType(ValidationType validationType) {
		return this.listValidationType.contains(validationType);
	}

	public Map<String, String> getMapMessagesByField() {
		final Map<String, String> mapMessageCallBack = new LinkedHashMap<>();

		for (final Entry<String, ValidationCallBack> validationMap : this.validationsMap.entrySet()) {
			mapMessageCallBack.put(validationMap.getKey(), validationMap.getValue().getMessage());
		}

		return mapMessageCallBack;
	}

	public Map<String, Map<String, String>> getDougleMapMessagesByField() {

		if (this.validationsMap.isEmpty()) {
			return Collections.emptyMap();
		}

		final Map<String, Map<String, String>> mapMessageCallBack = new LinkedHashMap<>(this.validationsMap.size());

		for (final Entry<String, ValidationCallBack> validationMap : this.validationsMap.entrySet()) {
			Map<String, String> map = mapMessageCallBack.get(validationMap.getKey());
			if (map == null) {
				map = new LinkedHashMap<>();
				mapMessageCallBack.put(validationMap.getKey(), map);
			}
			map.put(validationMap.getValue().getType().name(), validationMap.getValue().getMessage());
		}

		return mapMessageCallBack;
	}

	/** {@inheritDoc} */
	@Override
	public String getMessage() {
		final StringBuilder message = new StringBuilder();
		if (this.validationsMap != null && this.validationsMap.size() > 0) {
			final Iterator<String> it = this.validationsMap.keySet().iterator();
			while (it.hasNext()) {
				final String key = it.next();
				message.append(key).append(": ").append(this.validationsMap.get(key).getType()).append("\n");
			}
		}
		return message.toString();
	}

	public String getMessageText() {
		final StringBuilder message = new StringBuilder();
		if (this.validationsMap != null && this.validationsMap.size() > 0) {
			final Iterator<String> it = this.validationsMap.keySet().iterator();
			while (it.hasNext()) {
				final String key = it.next();
				message.append(this.validationsMap.get(key).getMessage()).append("\n");
			}
		}

		return message.toString();
	}

	public String getKey() {
		return this.key;
	}

	public void setKey(String key) {
		this.key = key;
	}
}
