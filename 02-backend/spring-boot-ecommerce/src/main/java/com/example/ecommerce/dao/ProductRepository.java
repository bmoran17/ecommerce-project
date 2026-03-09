package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecommerce.entity.Product;

// Spring Data REST will create endpoints based on entity => Product
public interface ProductRepository extends JpaRepository<Product, Long> {

}
