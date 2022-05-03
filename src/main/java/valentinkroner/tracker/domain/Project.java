package valentinkroner.tracker.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Project {

    private Long id;

    private String name;
    private String description;

    private List<IssuePriority> priorities;
    private List<IssueStage> stages;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @OneToMany(targetEntity = IssuePriority.class)
    @JoinColumn()
    public List<IssuePriority> getPriorities() {
        return priorities;
    }

    public void setPriorities(List<IssuePriority> priorities) {
        this.priorities = priorities;
    }

    @OneToMany(targetEntity = IssueStage.class)
    @JoinColumn()
    public List<IssueStage> getStages() {
        return stages;
    }

    public void setStages(List<IssueStage> stages) {
        this.stages = stages;
    }
}
