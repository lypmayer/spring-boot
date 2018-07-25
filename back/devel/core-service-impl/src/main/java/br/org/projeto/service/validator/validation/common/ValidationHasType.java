package br.org.projeto.service.validator.validation.common;

import java.util.EnumSet;

import br.org.projeto.service.api.exception.validation.ValidationType;

public interface ValidationHasType extends ValidationRules {

	EnumSet<ValidationType> type();

}
