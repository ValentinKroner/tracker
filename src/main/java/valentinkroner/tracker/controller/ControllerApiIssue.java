package valentinkroner.tracker.controller;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import valentinkroner.tracker.domain.Issue;
import valentinkroner.tracker.repository.IssueRepository;
import valentinkroner.tracker.repository.IssueStageRepository;
import valentinkroner.tracker.repository.UserRepository;

import java.rmi.ServerException;

@RestController
public class ControllerApiIssue {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueStageRepository issueStageRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/api/issues")
    public Page<Issue> findIssues(
            @Join(path = "assignee", alias = "a")
            @Spec(path = "a.id", params="assignee", spec = Equal.class)
                    Specification<Issue> issueSpec,
            Pageable pageable) {

        return issueRepository.findAll(issueSpec, pageable);
    }

    @PostMapping(path = "/api/issues",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Issue create(
            @RequestBody Issue newIssue
    ) throws ServerException {

        //TODO use sort order when implemented
        newIssue.setStage(issueStageRepository.findById(1L).get());
        //TODO use system user when implemented
        newIssue.setCreator(userRepository.findById(1L).get());
        Issue issue = issueRepository.save(newIssue);

        if (issue == null) {
            throw new ServerException("Invalid data");
        } else {
            return issue;
        }
    }


}
