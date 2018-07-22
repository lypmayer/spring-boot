package br.org.projeto.service.impl.util;

import static org.jooq.db.tables.EnStatus.EN_STATUS;
import static org.jooq.db.tables.EnTask.EN_TASK;

import java.util.function.Function;

import org.jooq.Record;

import br.org.projeto.service.api.dto.StatusTaskDto;
import br.org.projeto.service.api.dto.TaskDto;


public class ParserDto {
	
	public static Function<Record, TaskDto> toTaskDto() {
		return record -> {
			StatusTaskDto statusDto = toStatusTaskDto().apply(record);
			
			final TaskDto taskDto = new TaskDto();
			taskDto.setId(record.get(EN_TASK.SEQ_TASK));
			taskDto.setTitle(record.get(EN_TASK.TITLE));
			taskDto.setDescription(record.get(EN_TASK.DESCRIPTION));
			taskDto.setStatusTask(statusDto);
			
			return taskDto;
		};
	}
	
	public static Function<Record, StatusTaskDto> toStatusTaskDto() {
		return record -> {
			final StatusTaskDto taskDto = new StatusTaskDto();
			taskDto.setId(record.get(EN_STATUS.SEQ_STATUS));
			taskDto.setName(record.get(EN_STATUS.NAME));
			return taskDto;
		};
	}
}
