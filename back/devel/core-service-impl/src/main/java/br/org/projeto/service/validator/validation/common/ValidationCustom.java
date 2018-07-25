package br.org.projeto.service.validator.validation.common;

import br.org.projeto.service.api.exception.validation.ValidationResponse;

public interface ValidationCustom<T extends Object> extends ValidationRules {

	void validate(String key, T value, ValidationResponse throwerValidations);

}