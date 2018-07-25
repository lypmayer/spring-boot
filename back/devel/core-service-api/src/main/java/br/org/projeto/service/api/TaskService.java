package br.org.projeto.service.api;

import java.util.List;

import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.api.exception.validation.ValidationException;

public interface TaskService {

	void save(TaskDto taskDto) throws ServiceException, ValidationException;
	
	void edit(TaskDto taskDto) throws ServiceException, ValidationException;
	
	void deleteTaskById(Long taskId) throws ServiceException;
	
	TaskDto getTaskById(Long taskId) throws ServiceException;
	
	List<TaskDto> getListTasks() throws ServiceException;
}
