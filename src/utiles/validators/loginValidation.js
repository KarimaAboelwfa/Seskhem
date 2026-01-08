export const validateLogin = (form) => {
    const errors = {};

    // Email validation
    if (!form.email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    if (!form.password) {
        errors.password = "Password is required";
    } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    return errors;
};
