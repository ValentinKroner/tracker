package valentinkroner.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import valentinkroner.tracker.domain.IssuePriority;
import valentinkroner.tracker.repository.IssuePriorityRepository;

@RestController
@RequestMapping("/api/issuePriorities")
public class ControllerApiIssuePriority {

    @Autowired
    private IssuePriorityRepository issuePriorityRepository;

    @GetMapping
    public Page<IssuePriority> findIssuePriorities(
            Pageable pageable) {
        return issuePriorityRepository.findAll(pageable);
    }
}
