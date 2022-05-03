package valentinkroner.tracker.controller;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import valentinkroner.tracker.domain.Project;
import valentinkroner.tracker.repository.ProjectRepository;
import valentinkroner.tracker.repository.UserRepository;

@RestController
@RequestMapping("/api/projects")
public class ControllerApiProject {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public Page<Project> find(
            Pageable pageable) {

        return projectRepository.findAll(pageable);
    }
}
