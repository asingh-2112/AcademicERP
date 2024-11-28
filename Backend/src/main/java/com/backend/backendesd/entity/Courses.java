package com.backend.backendesd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Courses")
@NoArgsConstructor
@AllArgsConstructor
public class Courses {
    @Id
    @Column(name = "course_id")
    @GeneratedValue
    private int id;

    @Column(name = "course_code", unique = true, nullable = false)
    private int courseCode;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String descp;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "term", nullable = false)
    private int term;

    @Column(name = "credits", nullable = false)
    private int credits;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "faculty")
    private String faculty;

}
