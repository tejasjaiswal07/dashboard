document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('phoneNumber');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = {
                first_name: firstName.value,
                last_name: lastName.value,
                phone_number: phoneNumber.value,
                email: email.value,
                password: password.value
            };
            
            console.log(formData);
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;

        if (firstName.value.trim() === '') {
            showError(firstName, 'First Name is required');
            isValid = false;
        } else {
            removeError(firstName);
        }

        if (lastName.value.trim() === '') {
            showError(lastName, 'Last Name is required');
            isValid = false;
        } else {
            removeError(lastName);
        }

        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(email);
        }

        if (!isValidPhone(phoneNumber.value)) {
            showError(phoneNumber, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(phoneNumber);
        }

        if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            removeError(password);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        input.classList.remove('error');
    }
});