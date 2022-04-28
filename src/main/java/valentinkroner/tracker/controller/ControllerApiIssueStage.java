package valentinkroner.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            Pageable pageable) {
        return issueStageRepository.findAll(pageable);
    }
}
