package com.example.ecommerce.dto;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Customer;

// give reference to entity class Customer & primary key type 
// Customer b/c it has collection of orders
// purchase comes across -> grab customer, assemble accordingly -> save actual customer using his customer repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
