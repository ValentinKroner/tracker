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
import valentinkroner.tracker.domain.User;
import valentinkroner.tracker.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class ControllerApiUser {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Page<User> findUsers(
            @And({
                    @Spec(path = "assignee", spec = Equal.class)
            }) Specification<User> issueSpec,
            Pageable pageable) {

        return userRepository.findAll(issueSpec, pageable);
    }
}
