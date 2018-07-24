package br.org.projeto.service.impl;

import static br.org.projeto.service.validator.validation.ValidationRequired.required;
import static org.jooq.db.tables.EnStatus.EN_STATUS;
import static org.jooq.db.tables.EnTask.EN_TASK;

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

import br.org.projeto.service.api.TaskService;
import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.api.exception.validation.ValidationException;
import br.org.projeto.service.impl.util.ParserDto;
import br.org.projeto.service.validator.Validator;
import br.org.projeto.service.validator.validation.ValidationMax;
import br.org.projeto.service.validator.validation.ValidationMin;

@Service
public class TaskServiceImpl extends ServiceImplCommon implements TaskService{

	@Autowired
	DSLContext dsl;

	public TaskServiceImpl(DSLContext dsl) {
		this.dsl = dsl;
	}

	@Override
	public void save(TaskDto taskDto) throws ServiceException, ValidationException {
		this.validate(taskDto);

		try {
			this.dsl.insertInto(EN_TASK, EN_TASK.TITLE, EN_TASK.DESCRIPTION, EN_TASK.SEQ_EN_STATUS)
					.values(taskDto.getTitle(), taskDto.getDescription(), taskDto.getStatusTask().getId())
			.execute();
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public void edit(TaskDto taskDto) throws ServiceException, ValidationException {
		this.validate(taskDto);

		try {
			this.dsl.update(EN_TASK).set(EN_TASK.TITLE, taskDto.getTitle())
					.set(EN_TASK.DESCRIPTION, taskDto.getDescription())
					.set(EN_TASK.SEQ_EN_STATUS, taskDto.getStatusTask().getId())
					.where(EN_TASK.SEQ_EN_STATUS.eq(taskDto.getId())).execute();
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public void deleteTaskById(Long taskId) throws ServiceException {
		try {
			this.dsl.deleteFrom(EN_TASK).where(EN_TASK.SEQ_TASK.eq(taskId)).execute();
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public TaskDto getTaskById(Long taskId) throws ServiceException {
		if (taskId == null) {
			return null;
		}

		try {
			final List<Field<?>> fields = new ArrayList<>();
			fields.add(EN_TASK.SEQ_TASK);
			fields.add(EN_TASK.TITLE);
			fields.add(EN_TASK.DESCRIPTION);
			fields.add(EN_TASK.SEQ_EN_STATUS);
			fields.add(EN_STATUS.NAME);

			Record record = this.dsl.select(fields).from(EN_TASK).join(EN_STATUS)
					.on(EN_STATUS.SEQ_STATUS.eq(EN_TASK.SEQ_EN_STATUS)).where(EN_TASK.SEQ_TASK.eq(taskId)).fetchOne();

			if (record != null) {
				ParserDto.toTaskDto().apply(record);
			}

			return null;
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}

	@Override
	public List<TaskDto> getTasks() throws ServiceException {
		this.getMessage("task.validation.title.min");
		
		try {
			final List<Field<?>> fields = new ArrayList<>();
			fields.add(EN_TASK.SEQ_TASK);
			fields.add(EN_TASK.TITLE);
			fields.add(EN_TASK.DESCRIPTION);
			fields.add(EN_STATUS.SEQ_STATUS);
			fields.add(EN_STATUS.NAME);

			Result<Record> result = this.dsl.select(fields).from(EN_TASK).join(EN_STATUS)
					.on(EN_STATUS.SEQ_STATUS.eq(EN_TASK.SEQ_EN_STATUS)).fetch();

			if (result.isEmpty()) {
				return Collections.emptyList();
			}

			return result.stream().map(ParserDto.toTaskDto()::apply).collect(Collectors.toList());
		} catch (Exception e) {
			throw new ServiceException(e);
		}
	}

	private void validate(TaskDto taskDto) throws ValidationException {
		final Validator validation = new Validator();
		validation.setRules("title", taskDto.getTitle(), required(this.getMessage("task.validation.title.required")),
				ValidationMin.min(3, this.getMessage("task.validation.title.min")),
				ValidationMax.max(50, this.getMessage("task.validation.title.max")));
		
		validation.setRules("description", taskDto.getDescription(), required(this.getMessage("task.validation.description.min")),
				ValidationMin.min(3, this.getMessage("task.validation.description.min")),
				ValidationMax.max(50, this.getMessage("task.validation.description.min")));

		validation.validateAndThrows();
	}
}