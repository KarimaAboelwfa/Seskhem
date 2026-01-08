export const validateProfileSetup = (form) => {
    const errors = {};

    // Academic Year
    if (!form.academic_year_slug?.trim()) {
        errors.academic_year_slug = "Please select an academic year";
    }

    // Grade
    if (!form.grade_slug?.trim()) {
        errors.grade_slug = "Please select your grade";
    }

    // Term
    if (!form.term_slug?.trim()) {
        errors.term_slug = "Please select a term";
    }

    // School
    if (!form.school?.trim()) {
        errors.school = "School name is required";
    } else if (form.school.length < 3) {
        errors.school = "School name must be at least 3 characters";
    }

    return errors;
};
