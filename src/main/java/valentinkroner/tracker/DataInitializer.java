package valentinkroner.tracker;

import valentinkroner.tracker.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import valentinkroner.tracker.repository.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final IssueStageRepository issueStageRepository;
    private final IssuePriorityRepository issuePriorityRepository;

    @Autowired
    public DataInitializer(
            UserRepository userRepository,
            IssueRepository issueRepository,
            ProjectRepository projectRepository,
            IssueStageRepository issueStageRepository,
            IssuePriorityRepository issuePriorityRepository) {
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.issueStageRepository = issueStageRepository;
        this.issuePriorityRepository = issuePriorityRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        //Do not generate dummy data if there is already dummy data
        Iterable<User> allUsers = this.userRepository.findAll();
        for (User u : allUsers) {
            return;
        }

        User user = new User();
        user.setFirstName("This");
        user.setLastName("Person");
        this.userRepository.save(user);

        User userB = new User();
        userB.setFirstName("Other");
        userB.setLastName("Person");
        this.userRepository.save(userB);

        //Initial priorities config
        IssuePriority priorityLow = new IssuePriority();
        priorityLow.setDescription("low");
        priorityLow.setValue(0);
        priorityLow.setColor("#03fc98");
        this.issuePriorityRepository.save(priorityLow);

        IssuePriority priorityMedium = new IssuePriority();
        priorityMedium.setDescription("medium");
        priorityMedium.setValue(1);
        priorityMedium.setColor("#6ffc03");
        this.issuePriorityRepository.save(priorityMedium);

        IssuePriority priorityHigh = new IssuePriority();
        priorityHigh.setDescription("high");
        priorityHigh.setValue(2);
        priorityHigh.setColor("#fc4e03");
        this.issuePriorityRepository.save(priorityHigh);

        //Initial stages config
        IssueStage stageOpen = new IssueStage();
        stageOpen.setDescription("open");
        stageOpen.setOrdinal(0);
        this.issueStageRepository.save(stageOpen);

        IssueStage stageInProgress = new IssueStage();
        stageInProgress.setDescription("in progress");
        stageInProgress.setOrdinal(1);
        this.issueStageRepository.save(stageInProgress);

        IssueStage stageFinished = new IssueStage();
        stageFinished.setDescription("finished");
        stageFinished.setOrdinal(2);
        this.issueStageRepository.save(stageFinished);

        //Project
        Project project = new Project();
        project.setName("Example project");
        project.setDescription("A sample project, with some sample issues.");
        this.projectRepository.save(project);

        //Some issues
        Issue issue;

        issue = new Issue();
        issue.setTitle("Example issue #1");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stageOpen);
        issue.setPriority(priorityMedium);
        this.issueRepository.save(issue);

        issue = new Issue();
        issue.setTitle("Example issue #2");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stageInProgress);
        issue.setPriority(priorityHigh);
        this.issueRepository.save(issue);

        issue = new Issue();
        issue.setTitle("Example issue #3");
        issue.setDescription("This is just an example");
        issue.setAssignee(user);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stageFinished);
        issue.setPriority(priorityMedium);
        this.issueRepository.save(issue);


        issue = new Issue();
        issue.setTitle("Example issue #4");
        issue.setDescription("This is just an example");
        issue.setAssignee(userB);
        issue.setCreator(user);
        issue.setProject(project);
        issue.setStage(stageOpen);
        issue.setPriority(priorityMedium);
        this.issueRepository.save(issue);

    }
}
