package valentinkroner.tracker;

import org.springframework.security.crypto.password.PasswordEncoder;
import valentinkroner.tracker.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import valentinkroner.tracker.repository.*;
import valentinkroner.tracker.service.ProjectService;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProjectService projectService;

    @Autowired
    public DataInitializer(
            UserRepository userRepository,
            IssueRepository issueRepository,
            PasswordEncoder passwordEncoder,
            ProjectService projectService
    ) {
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
        this.passwordEncoder = passwordEncoder;
        this.projectService = projectService;
    }

    @Override
    public void run(String... args) throws Exception {

        //Do not generate initial data if there is already initial data
        Iterable<User> allUsers = this.userRepository.findAll();
        for (User u : allUsers) {
            return;
        }

        User user = new User();
        user.setFirstName("This");
        user.setLastName("Person");
        user.setLogin("user");
        user.setPassword(passwordEncoder.encode("demo"));
        this.userRepository.save(user);

        User userB = new User();
        userB.setFirstName("Other");
        userB.setLastName("Person");
        userB.setLogin("user_2");
        userB.setPassword(passwordEncoder.encode("demo"));
        this.userRepository.save(userB);

        //Project
        Project project = this.projectService.createBlankProject();
        List<IssuePriority> priorities = project.getPriorities();
        List<IssueStage> stages = project.getStages();

        //Some issues
        Issue issue;

        issue = new Issue();
        issue.setTitle("Example issue #1");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stages.get(0));
        issue.setPriority(priorities.get(1));
        this.issueRepository.save(issue);

        issue = new Issue();
        issue.setTitle("Example issue #2");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stages.get(1));
        issue.setPriority(priorities.get(2));
        this.issueRepository.save(issue);

        issue = new Issue();
        issue.setTitle("Example issue #3");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stages.get(2));
        issue.setPriority(priorities.get(0));
        this.issueRepository.save(issue);

        issue = new Issue();
        issue.setTitle("Example issue #4");
        issue.setDescription("This is just an example");
        issue.setAssignee(userB);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stages.get(0));
        issue.setPriority(priorities.get(1));
        this.issueRepository.save(issue);

    }
}
