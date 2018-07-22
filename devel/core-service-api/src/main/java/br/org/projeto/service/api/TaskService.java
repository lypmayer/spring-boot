package br.org.projeto.service.api;

import java.util.List;

import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;

public interface TaskService {

	void register(TaskDto taskDto) throws ServiceException;
	
	void edit(TaskDto taskDto) throws ServiceException;
	
	void deleteTaskById(Long taskId) throws ServiceException;
	
	TaskDto getTaskById(Long taskId) throws ServiceException;
	
	List<TaskDto> getTasks() throws ServiceException;
}
