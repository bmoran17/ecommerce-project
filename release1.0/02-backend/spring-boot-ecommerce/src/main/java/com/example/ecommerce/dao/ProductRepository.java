package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.ecommerce.entity.Product;

// accepts calls from web browser scripts from this origin 
@CrossOrigin("http://localhost:4200")
// Spring Data REST will create endpoints based on entity => Product
public interface ProductRepository extends JpaRepository<Product, Long> {

}
