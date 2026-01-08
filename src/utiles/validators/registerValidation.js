export const validateRegister = (form) => {
    const errors = {};

    // Email
    if (!form.email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.email = "Invalid email format";
    }

    // Password
    if (!form.password) {
        errors.password = "Password is required";
    } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    // Gender
    if (!form.gander) {
        errors.gander = "Gender is required";
    }

    // Date of birth
    if (!form.date_of_birth) {
        errors.date_of_birth = "Date of birth is required";
    }

    // School
    if (!form.school?.trim()) {
        errors.school = "School is required";
    }

    // Father phone
    if (!form.father_phone) {
        errors.father_phone = "Father phone is required";
    } else if (!/^[0-9]{10,15}$/.test(form.father_phone)) {
        errors.father_phone = "Invalid phone number";
    }

    // Mother phone
    if (!form.mother_phone) {
        errors.mother_phone = "Mother phone is required";
    } else if (!/^[0-9]{10,15}$/.test(form.mother_phone)) {
        errors.mother_phone = "Invalid phone number";
    }

    return errors;
};
