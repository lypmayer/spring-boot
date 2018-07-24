package br.org.projeto.service.validator.validation;

import java.util.EnumSet;

import br.org.projeto.service.api.exception.validation.ValidationType;
import br.org.projeto.service.validator.validation.common.ValidationHasType;
import br.org.projeto.service.validator.validation.common.ValidationMessageImpl;

public class ValidationMax extends ValidationMessageImpl implements ValidationHasType {

	public final int value;

	public ValidationMax(final int value, final String message) {
		super(message);
		this.value = value;
	}

	public static ValidationMax max(final int value) {
		return max(value, null);
	}

	public static ValidationMax max(final int value, final String message) {
		return new ValidationMax(value, message);
	}

	@Override
	public EnumSet<ValidationType> type() {
		return EnumSet.of(ValidationType.INVALID_MAX);
	}

}