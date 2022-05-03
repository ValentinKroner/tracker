package valentinkroner.tracker.domain;

import org.hibernate.boot.model.source.spi.Sortable;

import javax.persistence.*;

@Entity
public class IssuePriority implements Comparable<IssuePriority> {

    private Long id;

    private Project project;

    private String description;
    private String color;
    private int value;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public int compareTo(IssuePriority o) {
        return this.getValue() - o.getValue();
    }
}
