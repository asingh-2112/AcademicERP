package com.backend.backendesd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@Table(name = "Department")
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue
    @Column(name = "department_id")
    private int departmentId;

    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private int capacity;
}
