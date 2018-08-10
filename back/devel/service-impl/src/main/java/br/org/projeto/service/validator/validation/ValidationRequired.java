package br.org.projeto.service.validator.validation;

import java.util.EnumSet;

import br.org.projeto.service.api.exception.validation.ValidationType;
import br.org.projeto.service.validator.validation.common.ValidationHasType;
import br.org.projeto.service.validator.validation.common.ValidationMessageImpl;

public class ValidationRequired extends ValidationMessageImpl implements ValidationHasType {

	public final boolean empty;

	public ValidationRequired(final boolean empty, final String message) {
		super(message);
		this.empty = empty;
	}

	public ValidationRequired(final String message) {
		this(false, message);
	}

	@Override
	public EnumSet<ValidationType> type() {
		return EnumSet.of(ValidationType.REQUIRED);
	}

	public boolean isEmpty() {
		return this.empty;
	}

	public static ValidationRequired required(final boolean empty, final String message) {
		return new ValidationRequired(empty, message);
	}

	public static ValidationRequired required(final String message) {
		return new ValidationRequired(message);
	}
	
	public static ValidationRequired required() {
		return new ValidationRequired(null);
	}


}