package valentinkroner.tracker.controller;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.NotEqual;
import net.kaczmarzyk.spring.data.jpa.domain.NotNull;
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
import valentinkroner.tracker.domain.IssueStage;
import valentinkroner.tracker.repository.IssueRepository;
import valentinkroner.tracker.repository.IssueStageRepository;
import valentinkroner.tracker.repository.UserRepository;

import java.rmi.ServerException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ControllerApiIssue {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueStageRepository issueStageRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/issues/{id}")
    public Issue getOne(@PathVariable Long id) {

        return issueRepository.findById(id).orElseThrow();
    }

    @GetMapping(path = "/api/issues")
    public Page<Issue> findIssues(
            @Join(path = "assignee", alias = "a")
            @Join(path = "stage", alias = "s")
            @Join(path = "priority", alias = "p")
            @And({
                    @Spec(path = "a.id", params = "assignee", spec = Equal.class),
                    @Spec(path = "s.id", params = "stage", spec = Equal.class),
                    @Spec(path = "s.hiddenByDefault", params = "hidden", spec = Equal.class),
                    @Spec(path = "p.id", params = "priority", spec = Equal.class)
            })
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
        newIssue.setStage(issueStageRepository.findById(1L).orElseThrow());
        //TODO use system user when implemented
        newIssue.setCreator(userRepository.findById(1L).orElseThrow());
        return issueRepository.save(newIssue);
    }

    @PutMapping(path = "/api/issues",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(
            @RequestBody Issue update
    ) {

        //TODO use DTO/Mapper generation if this gets any bigger

        Issue issue = issueRepository.findById(update.getId()).orElseThrow();
        issue.setDescription(update.getDescription());
        issue.setTitle(update.getTitle());

        if (update.getCreator() != null)
            issue.setAssignee(update.getCreator());
        if (update.getAssignee() != null)
            issue.setAssignee(update.getAssignee());
        if (update.getStage() != null)
            issue.setStage(update.getStage());
        if (update.getPriority() != null)
            issue.setPriority(update.getPriority());
        if (update.getProject() != null)
            issue.setPriority(update.getPriority());

        issueRepository.save(issue);
    }

    @DeleteMapping("/api/issues/{id}")
    public void delete(@PathVariable Long id) {

        Issue issue = issueRepository.findById(id).orElseThrow();
        issueRepository.delete(issue);
    }

    @GetMapping("/api/issues/advance/{id}")
    public void advanceIssue(@PathVariable Long id) {

        Issue issue = issueRepository.findById(id).orElseThrow();

        int ordinal = issue.getStage().getOrdinal();
        IssueStage stageNew = null;
        for(IssueStage stage : issueStageRepository.findAll()) {
            if(stage.getOrdinal() <= ordinal)
                continue;
            if(stageNew == null || stageNew.getOrdinal() > stage.getOrdinal())
                stageNew = stage;
        }

        if(stageNew != null) {
            issue.setStage(stageNew);
            issueRepository.save(issue);
        }
    }

    @GetMapping("/api/issues/revert/{id}")
    public void revertIssue(@PathVariable Long id) {

        Issue issue = issueRepository.findById(id).orElseThrow();

        int ordinal = issue.getStage().getOrdinal();
        IssueStage stageNew = null;
        for(IssueStage stage : issueStageRepository.findAll()) {
            if(stage.getOrdinal() >= ordinal)
                continue;
            if(stageNew == null || stageNew.getOrdinal() < stage.getOrdinal())
                stageNew = stage;
        }

        if(stageNew != null) {
            issue.setStage(stageNew);
            issueRepository.save(issue);
        }
    }


}
