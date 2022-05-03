package valentinkroner.tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import valentinkroner.tracker.auth.TrackerUserPrincipal;
import valentinkroner.tracker.domain.User;
import valentinkroner.tracker.repository.UserRepository;

@RestController
public class ControllerApiUser {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path="/api/users")
    public Page<User> findUsers(
            Pageable pageable) {

        return userRepository.findAll(pageable);
    }

    @GetMapping("/api/users/current")
    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof TrackerUserPrincipal) {
            TrackerUserPrincipal p = (TrackerUserPrincipal) principal;
            return p.getUser();
        }
        return null;
    }

}
