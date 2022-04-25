package valentinkroner.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import valentinkroner.tracker.domain.IssueStage;

public interface IssueStageRepository extends JpaRepository<IssueStage, Long>, JpaSpecificationExecutor<IssueStage> {
}
