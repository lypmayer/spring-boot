package spring;

import java.util.Locale;
import java.util.TimeZone;

public final class LocaleProject {

	public static final Locale EN = Locale.ENGLISH;

	public static final Locale PT = new Locale("pt", "Br");

	public static final Locale ES = new Locale("es", "");

	public static final TimeZone TIMEZONE_SP = TimeZone.getTimeZone("America/Sao_Paulo");

	private LocaleProject() {
		super();
	}

	/**
	 * Retorna uma instancia de {@link Locale} de acordo com o código de linguagem selecionado no front-end.
	 * 
	 * @param language {@link String} código da linguagem vinda do front-end.
	 * @return {@link Locale}
	 */
	public static Locale getLocale(String language) {
		if (language == null) {
			throw new IllegalArgumentException("parâmetro inválido: " + language);
		}

		if (EN.getLanguage().equals(language.toLowerCase())) {
			return EN;
		}

		if (PT.getLanguage().equals(language.toLowerCase())) {
			return PT;
		}

		if (ES.getLanguage().equals(language.toLowerCase())) {
			return ES;
		}

		throw new IllegalArgumentException("parâmetro inválido: " + language);
	}
}
