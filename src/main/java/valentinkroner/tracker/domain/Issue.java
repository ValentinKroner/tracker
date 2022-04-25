package valentinkroner.tracker.domain;

import javax.persistence.*;

@Entity
public class Issue {

    private Long id;

    private String title;
    private String description;

    private User creator;

    private User assignee;

    private Project project;

    private IssuePriority priority;

    private IssueStage stage;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne(targetEntity = User.class)
    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    @ManyToOne(targetEntity = User.class)
    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    @ManyToOne(targetEntity = Project.class)
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @ManyToOne(targetEntity = IssuePriority.class)
    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

    @ManyToOne(targetEntity = IssueStage.class)
    public IssueStage getStage() {
        return stage;
    }

    public void setStage(IssueStage stage) {
        this.stage = stage;
    }
}
