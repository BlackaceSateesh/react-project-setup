// validates email
export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "Email can't be empty.";
    if (!re.test(email)) return "Oops! We need a valid email address.";
    if (email.indexOf(" ") !== -1) return "Email cannot contain spaces.";
    return "";
}
// validates password
export function passwordValidator(password) {
    if (!password) return "Password can't be empty.";

    // Minimum length requirement
    if (password.length < 8)
        return "Password must be at least 8 characters long.";

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password))
        return "Password must contain at least one uppercase letter.";

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password))
        return "Password must contain at least one lowercase letter.";

    // Check for at least one digit
    if (!/[0-9]/.test(password))
        return "Password must contain at least one digit.";

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return "Password must contain at least one special character.";

    return ""; // Return an empty string if all validations pass
}

// Validates username
export function usernameValidator(username) {
    if (!username) return "Username can't be empty.";
    if (username.length < 4) return "Username must be at least 4 characters long.";
    if (username.length > 10) return "Username can't be more than 10 characters long.";
    return "";
}


// Validates mobile number
export function mobileNumberValidator(mobileNumber) {
    if (!mobileNumber) return "Mobile number can't be empty.";
    if (mobileNumber.length < 10)
        return "Mobile number must be at least 10 digits long.";
    if (!/^\d+$/.test(mobileNumber))
        return "Mobile number must contain only digits.";
    return "";
}

/**
 * Validates the number input to ensure it is not empty and is a valid number.
 *
 * @param {string} number - The number input to be validated.
 * @returns {string} - An error message if the number is empty or invalid, otherwise an empty string.
 */
export function numberValidator(number, limit, required = true) {
    if (required && !number) return "This field can't be empty.";
    if (isNaN(number)) return "Please enter a valid number.";
    if (number < 0) return "This field can't be negative.";
    if (limit && number > limit) return `Number can't be more than ${limit}.`;
    return "";
}


/**
 * Validates a generic field input to ensure it is not empty.
 *
 * @param {string} value - The field input to be validated.
 * @returns {string} - An error message if the field is empty, otherwise an empty string.
 */
export function fieldValidator(value, required = true) {
    if (required && !value) return "This Field can't be empty.";
    return "";
}