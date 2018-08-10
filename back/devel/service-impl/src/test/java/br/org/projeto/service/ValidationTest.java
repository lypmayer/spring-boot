package br.org.projeto.service;

import static br.org.projeto.service.validator.validation.ValidationMax.max;
import static br.org.projeto.service.validator.validation.ValidationMin.min;
import static br.org.projeto.service.validator.validation.ValidationRequired.required;
import static org.junit.Assert.assertEquals;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import br.org.projeto.service.api.exception.validation.ValidationException;
import br.org.projeto.service.api.exception.validation.ValidationResponse.ValidationCallBack;
import br.org.projeto.service.api.exception.validation.ValidationType;
import br.org.projeto.service.validator.Validator;
import br.org.projeto.service.validator.validation.common.ValidationCustom;

public class ValidationTest {

	private static final String KEY_NAME = "name";
	private static final String NAME_VALUE = "The Pokémon Company";

	private static final String KEY_EMAIL = "emailId";
	private static final String EMAIL_VALUE = "pokemon@stela.org.br";

	@Rule
	public ExpectedException thrown = ExpectedException.none();

	@Test
	public void nameRequired() throws ValidationException {
		this.thrown.expect(ValidationException.class);

		final Validator validation = new Validator();
		validation.setRules(KEY_NAME, null, required());
		validation.validateAndThrows();
	}

	@Test
	public void nameRequiredMessage() {
		final String messageNameValidation = "Infome um nome";

		final Validator validation = new Validator();
		validation.setRules(KEY_NAME, null, required(messageNameValidation));

		try {
			validation.validateAndThrows();
		} catch (final ValidationException e) {
			final ValidationCallBack validationCallBack = e.getValidationsMap().get(KEY_NAME);
			assertEquals(validationCallBack.getMessage(), messageNameValidation);
		}
	}

	@Test
	public void nameMin() throws ValidationException {
		this.thrown.expect(ValidationException.class);
		final Validator validation = new Validator();
		validation.setRules(KEY_NAME, NAME_VALUE, min(100));
		validation.validateAndThrows();
	}

	@Test
	public void nameMax() throws ValidationException {
		this.thrown.expect(ValidationException.class);
		final Validator validation = new Validator();
		validation.setRules(KEY_NAME, NAME_VALUE, max(5));
		validation.validateAndThrows();
	}

	@Test
	public void nameRequiredMinMaxSuccess() throws ValidationException {
		final Validator validation = new Validator();
		validation.setRules(KEY_NAME, NAME_VALUE, required(), min(5), max(100));
		validation.validateAndThrows();
	}

	@Test
	public void emailCustomValidation() throws ValidationException {
		this.thrown.expect(ValidationException.class);
		final ValidationCustom<String> validationEmail = (key, value, throwerValidations) -> {
			if (!value.equals("pescador@ilha.com.br")) {
				throwerValidations.addValidationType(key, ValidationType.REQUIRED);
			}
		};

		final Validator validation = new Validator();
		validation.setRules(KEY_EMAIL, EMAIL_VALUE, required(), validationEmail, min(5), max(100));
		validation.validateAndThrows();
	}

	@Test
	public void emailValidationMessageAllTest() throws ValidationException {
		final String messageEmailRequired = "Infome um email";
		final String messageEmailMin = "Infome um email com no minimo 5 caracteres";
		final String messageEmailMax = "Infome um email com no maximo 100 caracteres";
		final String messageEmailInvalid = "Email invalido";

		try {
			final Validator validation = new Validator();
			validation.setRules(KEY_EMAIL, null, required(messageEmailRequired), min(5, messageEmailMin), max(100, messageEmailMax));
			validation.validateAndThrows();
		} catch (final ValidationException e) {
			final ValidationCallBack validationCallBack = e.getValidationsMap().get(KEY_EMAIL);
			assertEquals(validationCallBack.getMessage(), messageEmailRequired);
		}

		try {
			final Validator validation = new Validator();
			validation.setRules(KEY_EMAIL, "demo", required(messageEmailRequired), min(5,messageEmailMin), max(100, messageEmailMax));
			validation.validateAndThrows();
		} catch (final ValidationException e) {
			final ValidationCallBack validationCallBack = e.getValidationsMap().get(KEY_EMAIL);
			assertEquals(validationCallBack.getMessage(), messageEmailMin);
		}

		try {
			final Validator validation = new Validator();
			validation.setRules(KEY_EMAIL,
					"carlosalbaniojosecasidemouradasilvacarlosalbaniojosecasidemouradasilvacarlosalbaniojosecasidemouradasilva@stela.org.br", 
				min(5,messageEmailMin), 
				max(100, messageEmailMax));
			validation.validateAndThrows();
		} catch (final ValidationException e) {
			final ValidationCallBack validationCallBack = e.getValidationsMap().get(KEY_EMAIL);
			assertEquals(validationCallBack.getMessage(), messageEmailMax);
		}

		try {
			final ValidationCustom<String> validationEmail = (key, value, throwerValidations) -> {
				if (!value.equals("pescador@ilha.com.br")) {
					throwerValidations.addValidationType(key, ValidationType.INVALID, messageEmailInvalid);
				}
			};

			final Validator validation = new Validator();
			validation.setRules(KEY_EMAIL, EMAIL_VALUE, required(messageEmailRequired), min(5, messageEmailMin), max(100, messageEmailMax), validationEmail);
			validation.validateAndThrows();
		} catch (final ValidationException e) {
			final ValidationCallBack validationCallBack = e.getValidationsMap().get(KEY_EMAIL);
			assertEquals(validationCallBack.getMessage(), messageEmailInvalid);
		}
	}

	@Test
	public void emailCustomValidationSuccess() throws ValidationException {
		final ValidationCustom<String> validationEmail = (key, value, throwerValidations) -> {
			if (!value.equals(EMAIL_VALUE)) {
				throwerValidations.addValidationType(key, ValidationType.REQUIRED);
			}
		};

		final Validator validation = new Validator();
		validation.setRules(KEY_EMAIL, EMAIL_VALUE, validationEmail, required(), min(5), max(100));
		validation.validateAndThrows();
	}
}