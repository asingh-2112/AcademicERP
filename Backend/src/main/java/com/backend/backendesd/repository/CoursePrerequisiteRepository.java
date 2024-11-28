package com.backend.backendesd.repository;

import com.backend.backendesd.entity.CoursePrerequisite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursePrerequisiteRepository extends JpaRepository<CoursePrerequisite, Integer> {

    CoursePrerequisite findByPrerequisite(int prerequisite);

    CoursePrerequisite findByCourseId(int courseId);
}
