package br.org.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.org.projeto.service.api.TaskService;
import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.api.exception.validation.ValidationException;

@RestController
@CrossOrigin(allowCredentials="true")
@RequestMapping(path = "/tasks", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class TaskController {

	@Autowired
	private TaskService service;

	@GetMapping(value = "")
	public @ResponseBody List<TaskDto> getTasks() throws ServiceException {
		return this.service.getListTasks();
	}

	@GetMapping(value = "/{id}")
	public @ResponseBody TaskDto getTask(@PathVariable Long id) throws ServiceException {
		return this.service.getTaskById(id);
	}

	@PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void saveTask(@RequestBody TaskDto taskdto) throws ServiceException, ValidationException {
		this.service.save(taskdto);
	}

	@PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void editTask(@RequestBody TaskDto taskdto) throws ServiceException, ValidationException {
		this.service.edit(taskdto);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteTask(@PathVariable Long id) throws ServiceException {
		this.service.deleteTaskById(id);
	}
}