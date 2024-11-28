package com.backend.backendesd.controller;

import com.backend.backendesd.entity.Courses;
import com.backend.backendesd.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/auth")
public class CourseController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/getCourses")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Courses> fetchCourseDetails() {
        return adminService.getCourses();
    }

    @GetMapping("/admin/getCourses/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Courses fetchCourseDetailsById(@PathVariable int id) {
        return adminService.getCourseById(id);
    }

    @GetMapping("/admin/getCP/{id}")
    public String fetchCoursePrerequisiteName(@PathVariable int id) {
        return adminService.getPrerequisiteCourse(id);
    }

    @PutMapping("/admin/updateCredits/{id}/{credit}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateCreditsById(@PathVariable int id, @PathVariable int credit) throws Exception {
        adminService.updateCredits(id, credit);
    }

    @PutMapping("/admin/updateCapacity/{id}/{capacity}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateCapacityById(@PathVariable int id, @PathVariable int capacity) throws Exception {
        adminService.updateCapacity(id, capacity);
    }

    @PutMapping("/admin/updateCourseCode/{id}/{ccode}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateCourseCodeById(@PathVariable int id, @PathVariable int ccode) {
        adminService.updateCourseCode(id, ccode);
    }

    @PutMapping("/admin/updateTerm/{id}/{term}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateTermById(@PathVariable int id, @PathVariable int term) throws Exception {
        adminService.updateTerm(id, term);
    }

    @PutMapping("/admin/updateYear/{id}/{year}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateYearById(@PathVariable int id, @PathVariable int year) throws Exception {
        adminService.updateYear(id, year);
    }

    @PutMapping("/admin/updateFaculty/{id}/{faculty}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateFacultyById(@PathVariable int id, @PathVariable String faculty) {
        adminService.updateFaculty(id, faculty);
    }

    @PutMapping("/admin/updateCoursePrerequisite/{id}/{pid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateFacultyById(@PathVariable int id, @PathVariable int pid) throws Exception {
        adminService.setPrerequisiteCourse(id, pid);
    }

    @DeleteMapping("/admin/deleteCourse/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void updateFacultyById(@PathVariable int id) {
        adminService.deleteCourse(id);
    }
}