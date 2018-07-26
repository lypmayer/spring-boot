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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.org.projeto.service.api.StatusService;
import br.org.projeto.service.api.dto.StatusTaskDto;
import br.org.projeto.service.api.dto.TaskDto;
import br.org.projeto.service.api.exception.ServiceException;
import br.org.projeto.service.api.exception.validation.ValidationException;

@RestController
@CrossOrigin(allowCredentials="true")
@RequestMapping(path = "/status", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class StatusController {

	@Autowired
	private StatusService service;

	@GetMapping(value = "")
	public @ResponseBody List<StatusTaskDto> getStatus() throws ServiceException {
		return this.service.getListStatus();
	}

	@GetMapping(value = "/{id}")
	public @ResponseBody StatusTaskDto getStatus(@PathVariable Long statusId) throws ServiceException {
		throw new UnsupportedOperationException();
	}

	@PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void saveStatus(@RequestBody TaskDto taskdto) throws ServiceException, ValidationException {
		throw new UnsupportedOperationException();
	}

	@PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void editStatus(@RequestBody TaskDto taskdto) throws ServiceException, ValidationException {
		throw new UnsupportedOperationException();
	}

	@DeleteMapping(value = "/{id}")
	public void deleteStatus(@RequestParam("id") Long statusId) throws ServiceException {
		throw new UnsupportedOperationException();
	}
}