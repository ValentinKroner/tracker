package valentinkroner.tracker.controller;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import valentinkroner.tracker.domain.IssueStage;
import valentinkroner.tracker.repository.IssueStageRepository;

@RestController
@RequestMapping("/api/issueStages")
public class ControllerApiIssueStage {

    @Autowired
    private IssueStageRepository issueStageRepository;

    @GetMapping
    public Page<IssueStage> findIssuePriorities(
            @Join(path = "project", alias = "p")
            @And({
                    @Spec(path = "p.id", params = "project", spec = Equal.class)
            })
                    Specification<IssueStage> issueStageSpecification,
            Pageable pageable) {
        return issueStageRepository.findAll(issueStageSpecification, pageable);
    }
}
