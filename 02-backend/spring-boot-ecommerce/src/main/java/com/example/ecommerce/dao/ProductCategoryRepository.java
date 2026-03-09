package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.example.ecommerce.entity.ProductCategory;


// Spring Data REST will create endpoints based on entity => ProductCategory
// collectionResourceRel = "productCategory" => endpoint will be /product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
