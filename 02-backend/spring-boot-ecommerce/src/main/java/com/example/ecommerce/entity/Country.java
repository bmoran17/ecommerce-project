package com.example.ecommerce.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// JPA entity for Country

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "code")
  private String code;

  @Column(name = "name")
  private String name;

  // one country has many states -> one-to-many relationship
  @OneToMany(mappedBy = "country")
  @JsonIgnore // will ignore the states
  private List<State> states;
}
