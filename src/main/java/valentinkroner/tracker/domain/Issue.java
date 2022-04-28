package valentinkroner.tracker.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Issue {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private User creator;

    private User assignee;

    @NotNull
    private Project project;

    @NotNull
    private IssuePriority priority;

    @NotNull
    private IssueStage stage;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(nullable = false)
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
    @JoinColumn(nullable = false)
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @ManyToOne(targetEntity = IssuePriority.class)
    @JoinColumn(nullable = false)
    public IssuePriority getPriority() {
        return priority;
    }

    public void setPriority(IssuePriority priority) {
        this.priority = priority;
    }

    @ManyToOne(targetEntity = IssueStage.class)
    @JoinColumn(nullable = false)
    public IssueStage getStage() {
        return stage;
    }

    public void setStage(IssueStage stage) {
        this.stage = stage;
    }
}
