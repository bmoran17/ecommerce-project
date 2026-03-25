package com.example.ecommerce.entity;

import java.util.Date;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity // JPA annotation to specify class will be mapped to database table
@Table(name="product") // JPA annotation to specify name of database table
@Data // Lombok annotation automatically generates getter/setter methods
public class Product {

  // fields to map into database table

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  // many to one relationship
  // given product is associated with a category
  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private ProductCategory category;

  @Column(name = "sku")
  private String sku;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "unit_price")
  private BigDecimal unitPrice;

  @Column(name = "image_url")
  private String imageUrl;

  @Column(name = "active")
  private boolean active;

  @Column(name = "units_in_stock")
  private int unitsInStock;

  @Column(name = "date_created")
  @CreationTimestamp // Hibernate annotation to automatically manage timestamps
  private Date dateCreated;

  @Column(name = "last_updated")
  @UpdateTimestamp // Hibernate annotation to automatically manage timestamps
  private Date lastUpdated;
}
