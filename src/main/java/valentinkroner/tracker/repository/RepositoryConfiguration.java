package valentinkroner.tracker.repository;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import valentinkroner.tracker.domain.*;

@Component
public class RepositoryConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        config.exposeIdsFor(Issue.class);
        config.exposeIdsFor(IssuePriority.class);
        config.exposeIdsFor(IssueStage.class);
        config.exposeIdsFor(Project.class);
        config.exposeIdsFor(User.class);
    }

}