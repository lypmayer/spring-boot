package br.org.projeto.service.validator;

import java.io.InvalidObjectException;
import java.util.LinkedHashMap;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.GenericValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import br.org.projeto.service.api.exception.validation.ValidationException;
import br.org.projeto.service.api.exception.validation.ValidationResponse;
import br.org.projeto.service.api.exception.validation.ValidationType;
import br.org.projeto.service.validator.validation.ValidationMax;
import br.org.projeto.service.validator.validation.ValidationMin;
import br.org.projeto.service.validator.validation.ValidationRequired;
import br.org.projeto.service.validator.validation.common.ValidationAfter;
import br.org.projeto.service.validator.validation.common.ValidationCustom;
import br.org.projeto.service.validator.validation.common.ValidationRules;

public class Validator {

	private static final Logger logger = LoggerFactory.getLogger(Validator.class);

	private final LinkedHashMap<FieldValidation, ValidationRules[]> mapFiels = new LinkedHashMap<>();
	private ValidationAfter validationAfter;

	public Validator() {
	}

	public void addAfterValidation(ValidationAfter validationAfter) {
		this.validationAfter = validationAfter;
	}

	public void setRules(String key, Object value, ValidationRules... rules) {
		this.mapFiels.put(new FieldValidation(key, value), rules);
	}

	public ValidationResponse validate() {
		if (this.mapFiels.isEmpty() && this.validationAfter == null) {
			return ValidationResponse.EMPTY;
		}

		final ValidationResponse validations = new ValidationResponse();

		for (final Entry<FieldValidation, ValidationRules[]> field : this.mapFiels.entrySet()) {
			final FieldValidation fieldValidation = field.getKey();

			final ValidationRules[] validationRules = field.getValue();
			if (validationRules != null) {
				this.runValidations(validations, fieldValidation, validationRules);
			}
		}

		if (this.validationAfter != null) {
			this.validationAfter.validate(validations);
		}
		return validations;
	}

	public ValidationResponse validateAndThrows() throws ValidationException {
		final ValidationResponse validate = this.validate();
		validate.throwException();
		return validate;
	}

	@SuppressWarnings("unchecked")
	private void runValidations(final ValidationResponse validations, final FieldValidation fieldValidation, final ValidationRules[] validationRules) {
		final String key = fieldValidation.key;
		final Object value = fieldValidation.value;

		for (final ValidationRules rule : validationRules) {
			if(rule == null){
				continue;
			}
			
			if (rule instanceof ValidationRequired) {
				final ValidationRequired requerid = (ValidationRequired) rule;

				final boolean invalid = this.required(requerid, value);
				if (invalid) {
					validations.addValidationType(key, ValidationType.REQUIRED, requerid.getMessage());
					break;
				}
			}else if (rule instanceof ValidationMax) {
				final ValidationMax validationMax = (ValidationMax) rule;
				final int max = validationMax.value;

				final boolean invalid = this.maxValidation(value, max);
				if (invalid) {
					validations.addValidationType(key, ValidationType.INVALID_MAX, validationMax.getMessage());
					break;
				}
			}else if (rule instanceof ValidationMin) {
				final ValidationMin validationMin = (ValidationMin) rule;
				final int min = validationMin.value;

				final boolean invalid = this.minValidation(value, min);
				if (invalid) {
					validations.addValidationType(key, ValidationType.INVALID_MIN, validationMin.getMessage());
					break;
				}
			}else if (rule instanceof ValidationCustom) {
				final ValidationCustom<Object> customValidation = (ValidationCustom<Object>) rule;
				customValidation.validate(key, value, validations);
				if (validations.size() > 0) {
					break;
				}
			}else{
				logger.info("Unregistered validation rule: " + rule.getClass());
			}
		}
	}

	private boolean required(final ValidationRequired required, final Object value) {
		try {
			if(value == null){
				return true;
			}
			
			if (required.isEmpty()) {
				if (value.getClass() == String.class) {
					return StringUtils.isBlank(String.valueOf(value));
				}
			}
			
			if (value.getClass() == Boolean.class) {
				return !this.toBoolean(value);
			}
			
			return false;
		} catch (final Exception e) {
			logger.error(e.getMessage(), e);
			return Boolean.FALSE;
		}
	}

	private boolean maxValidation(final Object value, final int max) {
		if(value == null){
			return false;
		}
		
		try {
			if (value.getClass() == String.class) {
				return !GenericValidator.maxLength(String.valueOf(value), max);
			}

			if (value.getClass() == Integer.class || value.getClass() == int.class) {
				return !GenericValidator.maxValue(((Number) value).intValue(), max);
			}

			if (value.getClass() == Long.class || value.getClass() == long.class) {
				return !GenericValidator.maxValue(((Number) value).longValue(), max);
			}

			if (value.getClass() == Double.class || value.getClass() == double.class) {
				return !GenericValidator.maxValue(((Number) value).doubleValue(), max);
			}

			if (value.getClass() == Float.class || value.getClass() == float.class) {
				return !GenericValidator.maxValue(((Number) value).floatValue(), max);
			}
			
			throw new InvalidObjectException("Object type not registered: " + value.toString());
		} catch (final Exception e) {
			logger.error(e.getMessage(), e);
			return Boolean.FALSE;
		}
	}

	private boolean minValidation(final Object value, final int min) {
		try {
			if (value.getClass() == String.class) {
				return !GenericValidator.minLength((String) value, min);
			}

			if (value.getClass() == Integer.class || value.getClass() == int.class) {
				return !GenericValidator.minValue(((Number) value).intValue(), min);
			}

			if (value.getClass() == Long.class || value.getClass() == long.class) {
				return !GenericValidator.minValue(((Number) value).longValue(), min);
			}

			if (value.getClass() == Double.class || value.getClass() == double.class) {
				return !GenericValidator.minValue(((Number) value).doubleValue(), min);
			}

			if (value.getClass() == Float.class || value.getClass() == float.class) {
				return !GenericValidator.minValue(((Number) value).floatValue(), min);
			}

			throw new InvalidObjectException("Object type not registered: " + value.toString());
		} catch (final Exception e) {
			logger.error(e.getMessage(), e);
			return Boolean.FALSE;
		}
	}

	private static class FieldValidation {

		public final String key;
		public final Object value;

		public FieldValidation(final String key, final Object value) {
			this.key = key;
			this.value = value;
		}
	}
	
	private Boolean toBoolean(final Object value) {
		if (value != null) {
			if (value instanceof Boolean) {
				return (Boolean) value;
			} else if (value instanceof Number) {
				return ((Number) value).doubleValue() != 0;
			} else if (value instanceof String) {
				return "true".equalsIgnoreCase((String) value);
			}
		}
		return null;
	}
}