package com.example.ecommerce.config;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  private EntityManager entityManager;
  
  // autowire JPA entity Manager
  @Autowired
  public MyDataRestConfig(EntityManager theEntityManager) {
    entityManager = theEntityManager;
  }

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

    // array of methods of unsupported actions
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

    // disable HTTP methods for Product: PUT, POST, DELETE
    config.getExposureConfiguration()
      .forDomainType(Product.class)
      .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
      .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

    // disable HTTP methods for ProductCategory: PUT, POST, DELETE
    config.getExposureConfiguration()
      .forDomainType(ProductCategory.class)
      .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
      .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  
    // call an internal helper method
    exposeIds(config);
  }


  // expose entity ids
  private void exposeIds(RepositoryRestConfiguration config) {

    // get a list of all entity classes from the entity manager
    Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

    // create an array of the entity types
    List<Class> entityClasses = new ArrayList<>();

    // get the entity types for the entities
    for (EntityType tempEntityType: entities) {
      entityClasses.add(tempEntityType.getJavaType());
    }

    // expose the entity ids for the array of entity/domain types
    Class[] domainTypes = entityClasses.toArray(new Class[0]);
    config.exposeIdsFor(domainTypes);
  }
}