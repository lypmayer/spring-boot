package br.org.projeto.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.org.projeto.service.api.TaskService;
import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;

@RestController
@RequestMapping("/tasks")
public class TaskController {

	private final Logger logger = LoggerFactory.getLogger(TaskController.class);

	@Autowired
	private TaskService service;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<TaskDto>> getTasks() {
		try {
			return new ResponseEntity<List<TaskDto>>(new ArrayList<TaskDto>(this.service.getTasks()), HttpStatus.OK);
		} catch (ServiceException e) {
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<TaskDto> getTask(@RequestParam("id") Long taskId) {
		try {
			TaskDto taskDto = this.service.getTaskById(taskId);
			if(Objects.isNull(taskDto)) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<TaskDto>(taskDto, HttpStatus.OK);
		} catch (ServiceException e) {
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<Object> saveTask(@RequestBody TaskDto taskdto) {
		try {
			this.service.register(taskdto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ServiceException e) {
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> editTask(@RequestBody TaskDto taskdto) {
		try {
			this.service.edit(new TaskDto());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ServiceException e) {
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteTask(@RequestParam("id") Long taskId) {
		try {
			this.service.deleteTaskById(taskId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ServiceException e) {
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}