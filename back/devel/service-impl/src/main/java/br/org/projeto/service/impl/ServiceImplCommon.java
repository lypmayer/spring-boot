package br.org.projeto.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

public class ServiceImplCommon {

	@Autowired
	private MessageSource messageSource;
	
	protected String getMessage(String key) {
		return this.messageSource.getMessage(key, null, LocaleContextHolder.getLocale());
	}
}
