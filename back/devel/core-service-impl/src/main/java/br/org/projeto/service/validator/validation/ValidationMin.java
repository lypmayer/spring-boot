package br.org.projeto.service.validator.validation;

import java.util.EnumSet;

import br.org.projeto.service.api.exception.validation.ValidationType;
import br.org.projeto.service.validator.validation.common.ValidationHasType;
import br.org.projeto.service.validator.validation.common.ValidationMessageImpl;

public class ValidationMin extends ValidationMessageImpl implements ValidationHasType {

	public final int value;

	public ValidationMin(final int value, final String message) {
		super(message);
		this.value = value;
	}

	@Override
	public EnumSet<ValidationType> type() {
		return EnumSet.of(ValidationType.INVALID_MIN);
	}

	public static ValidationMin min(final int value) {
		return min(value, null);
	}

	public static ValidationMin min(final int value, final String message) {
		return new ValidationMin(value, message);
	}
}