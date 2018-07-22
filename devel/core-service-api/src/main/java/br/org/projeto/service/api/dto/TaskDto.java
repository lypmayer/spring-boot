package br.org.projeto.service.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskDto {
	private Long id;
	private String title;
	private String description;
	private StatusTaskDto statusTask;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public StatusTaskDto getStatusTask() {
		return statusTask;
	}

	public void setStatusTask(StatusTaskDto statusTask) {
		this.statusTask = statusTask;
	}
}