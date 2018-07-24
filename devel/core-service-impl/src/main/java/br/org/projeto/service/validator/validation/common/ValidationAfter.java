package br.org.projeto.service.validator.validation.common;

import br.org.projeto.service.api.exception.validation.ValidationResponse;

@FunctionalInterface
public interface ValidationAfter extends ValidationRules {

	void validate(ValidationResponse throwerValidations);

}