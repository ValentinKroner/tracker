package valentinkroner.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import valentinkroner.tracker.domain.IssuePriority;

public interface IssuePriorityRepository extends JpaRepository<IssuePriority, Long>, JpaSpecificationExecutor<IssuePriority> {
}
