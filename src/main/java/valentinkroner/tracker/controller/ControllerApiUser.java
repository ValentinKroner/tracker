package valentinkroner.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            Pageable pageable) {

        return userRepository.findAll(pageable);
    }
}
