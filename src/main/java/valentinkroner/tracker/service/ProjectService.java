package valentinkroner.tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import valentinkroner.tracker.domain.IssuePriority;
import valentinkroner.tracker.domain.IssueStage;
import valentinkroner.tracker.domain.Project;
import valentinkroner.tracker.repository.IssuePriorityRepository;
import valentinkroner.tracker.repository.IssueStageRepository;
import valentinkroner.tracker.repository.ProjectRepository;

@Component
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final IssueStageRepository issueStageRepository;
    private final IssuePriorityRepository issuePriorityRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, IssueStageRepository issueStageRepository, IssuePriorityRepository issuePriorityRepository) {
        this.projectRepository = projectRepository;
        this.issueStageRepository = issueStageRepository;
        this.issuePriorityRepository = issuePriorityRepository;
    }

    public Project createBlankProject() {

        Project project = new Project();
        project.setName("Example project");
        project.setDescription("A sample project, with some sample issues.");
        this.projectRepository.save(project);

        //Initial priorities config
        IssuePriority priorityLow = new IssuePriority();
        priorityLow.setDescription("low");
        priorityLow.setValue(0);
        priorityLow.setColor("#03fc98");
        priorityLow.setProject(project);
        this.issuePriorityRepository.save(priorityLow);

        IssuePriority priorityMedium = new IssuePriority();
        priorityMedium.setDescription("medium");
        priorityMedium.setValue(1);
        priorityMedium.setColor("#6ffc03");
        priorityMedium.setProject(project);
        this.issuePriorityRepository.save(priorityMedium);

        IssuePriority priorityHigh = new IssuePriority();
        priorityHigh.setDescription("high");
        priorityHigh.setValue(2);
        priorityHigh.setColor("#fc4e03");
        priorityHigh.setProject(project);
        this.issuePriorityRepository.save(priorityHigh);

        //Initial stages config
        IssueStage stageOpen = new IssueStage();
        stageOpen.setDescription("open");
        stageOpen.setOrdinal(0);
        stageOpen.setProject(project);
        this.issueStageRepository.save(stageOpen);

        IssueStage stageInProgress = new IssueStage();
        stageInProgress.setDescription("in progress");
        stageInProgress.setOrdinal(1);
        stageInProgress.setProject(project);
        this.issueStageRepository.save(stageInProgress);

        IssueStage stageFinished = new IssueStage();
        stageFinished.setDescription("finished");
        stageFinished.setOrdinal(2);
        stageFinished.setProject(project);
        this.issueStageRepository.save(stageFinished);

        IssueStage stageClosed = new IssueStage();
        stageClosed.setDescription("closed");
        stageClosed.setOrdinal(3);
        stageClosed.setHiddenByDefault(true);
        stageClosed.setProject(project);
        this.issueStageRepository.save(stageClosed);

        return project;
    }
}
