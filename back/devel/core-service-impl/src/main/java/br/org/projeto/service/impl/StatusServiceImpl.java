package br.org.projeto.service.impl;

import static org.jooq.db.tables.EnStatus.EN_STATUS;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.org.projeto.service.api.StatusService;
import br.org.projeto.service.api.dto.StatusTaskDto;
import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.impl.util.ParserDto;

@Service
public class StatusServiceImpl extends ServiceImplCommon implements StatusService{

	@Autowired
	DSLContext dsl;

	public StatusServiceImpl(DSLContext dsl) {
		this.dsl = dsl;
	}

	@Override
	public List<StatusTaskDto> getListStatus() throws ServiceException {
		try {
			final List<Field<?>> fields = new ArrayList<>();
			fields.add(EN_STATUS.SEQ_STATUS);
			fields.add(EN_STATUS.NAME);

			Result<Record> result = this.dsl.select(fields).from(EN_STATUS).orderBy(EN_STATUS.NAME.asc()).fetch();

			if (result.isEmpty()) {
				return Collections.emptyList();
			}

			return result.stream().map(ParserDto.toStatusTaskDto()::apply).collect(Collectors.toList());
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}
}