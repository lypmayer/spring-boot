package br.org.projeto.service.api;

import java.util.List;

import br.org.projeto.service.api.dto.StatusTaskDto;
import br.org.projeto.service.api.exception.ServiceException;

public interface StatusService {

	List<StatusTaskDto> getListStatus() throws ServiceException;
}
