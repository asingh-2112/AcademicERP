package com.backend.backendesd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursePrerequisite {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "course_id")
    private int courseId;

    private int prerequisite;

    private String description;
}
