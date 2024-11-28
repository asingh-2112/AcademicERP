package com.backend.backendesd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Employees")
@NoArgsConstructor
@AllArgsConstructor
public class Employees {

    @Id
    @Column(name = "employee_id")
    @GeneratedValue
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "title")
    private String title;

    @Column(name = "photoPath")
    private String photographPath;

    @Column(name = "department")
    private int department;
}
