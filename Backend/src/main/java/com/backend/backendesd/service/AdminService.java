package com.backend.backendesd.service;

import com.backend.backendesd.entity.CoursePrerequisite;
import com.backend.backendesd.entity.Courses;
import com.backend.backendesd.repository.CoursePrerequisiteRepository;
import com.backend.backendesd.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private CourseRepository cr;

    @Autowired
    private CoursePrerequisiteRepository coursePrerequisiteRepository;

    public List<Courses> getCourses() {
        List<Courses> courses = new ArrayList<Courses>();
        cr.findAll().forEach(course -> courses.add(course));
        return courses;
    }

    public Courses getCourseById(int id) {
        return cr.findById(id).orElse(null);
    }

    public String getPrerequisiteCourse(int id) {
        CoursePrerequisite coursePrerequisite = coursePrerequisiteRepository.findByCourseId(id);
        if (coursePrerequisite == null) {
            return "None.";
        }
        int cid = coursePrerequisite.getPrerequisite();

        Courses course = cr.findById(cid).orElse(null);

        return course.getName();
    }

    public void updateCredits(int id, int credits) throws Exception {
        if (credits < 0 || credits > 6) {
            throw new Exception("Invalid credits");
        }
        else {
            Courses course = cr.findById(id).orElse(null);
            assert course != null;
            course.setCredits(credits);
            cr.save(course);
        }
    }

    public void updateCapacity(int id, int capacity) throws Exception {
        if (capacity < 0 || capacity > 120) {
            throw new Exception("Invalid Capacity!");
        }
        else {
            Courses course = cr.findById(id).orElse(null);
            assert course != null;
            course.setCapacity(capacity);
            cr.save(course);
        }
    }

    public void updateCourseCode(int id, int ccode) {
        Courses course = cr.findById(id).orElse(null);
        assert course != null;
        course.setCourseCode(ccode);
        cr.save(course);
    }

    public void updateTerm(int id, int term) throws Exception {
        if (term < 1 || term > 2) {
            throw new Exception("Invalid Term!");
        }
        else {
            Courses course = cr.findById(id).orElse(null);
            assert course != null;
            course.setTerm(term);
            cr.save(course);
        }
    }

    public void updateYear(int id, int year) throws Exception {
        if (year < 1998 || year > 2024) {
            throw new Exception("Invalid Year!");
        }
        else {
            Courses course = cr.findById(id).orElse(null);
            assert course != null;
            course.setYear(year);
            cr.save(course);
        }
    }

    public void updateFaculty(int id, String faculty) {
        Courses course = cr.findById(id).orElse(null);
        assert course != null;
        course.setFaculty(faculty);
        cr.save(course);
    }

    public void setPrerequisiteCourse(int id, int pid) throws Exception {

        if (pid == 0) {
            CoursePrerequisite cpreq = coursePrerequisiteRepository.findByCourseId(id);
            coursePrerequisiteRepository.delete(cpreq);
        }
        else if (pid < 0 || pid > 4) {
            throw new Exception("Course doesn't exist!");
        }
        else {
            CoursePrerequisite coursePrerequisite = coursePrerequisiteRepository.findByCourseId(id);

            if(coursePrerequisite == null) {
                CoursePrerequisite cpr = new CoursePrerequisite();
                cpr.setCourseId(id);
                cpr.setDescription("Welcome to the course.");
                cpr.setPrerequisite(pid);
                coursePrerequisiteRepository.save(cpr);
            }
            else {
                coursePrerequisite.setPrerequisite(pid);
                coursePrerequisiteRepository.save(coursePrerequisite);
            }
        }
    }

    public void deleteCourse(int id) {
        CoursePrerequisite coursePrerequisite = coursePrerequisiteRepository.findByPrerequisite(id);
        coursePrerequisiteRepository.delete(coursePrerequisite);
        Courses course = cr.findById(id).orElse(null);
        assert course != null;
        cr.delete(course);
    }

}
