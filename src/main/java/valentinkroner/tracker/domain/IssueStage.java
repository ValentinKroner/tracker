package valentinkroner.tracker.domain;

import javax.persistence.*;

@Entity
public class IssueStage {

    private Long id;

    private Project project;

    private String description;
    private int ordinal;

    private boolean hiddenByDefault;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(nullable = false)
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Column(length = 4095)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrdinal() {
        return ordinal;
    }

    public void setOrdinal(int order) {
        this.ordinal = order;
    }

    public boolean isHiddenByDefault() {
        return hiddenByDefault;
    }

    public void setHiddenByDefault(boolean hiddenByDefault) {
        this.hiddenByDefault = hiddenByDefault;
    }
}
