import React, { useState, useMemo } from "react";
import "../styles/UserDataForm.css";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const genderOptions = [
  { key: "M", label: "Male" },
  { key: "F", label: "Female" },
];

const UserDataForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "+852",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Calculate max date (today - 1 day)
  const maxDate = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split("T")[0];
  }, []);

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    // Email and Phone validation (at least one required)
    if (
      !formData.email &&
      (!formData.phoneNumber || formData.phoneNumber === "+852")
    ) {
      newErrors.email = "Either Email or Phone Number is required";
      newErrors.phoneNumber = "Either Email or Phone Number is required";
    }

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone number format validation
    if (formData.phoneNumber && formData.phoneNumber !== "+852") {
      if (!/^\+852\d{8}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 8 digits after +852";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="user-data-form">
      <h1>User Data</h1>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-section profile-information">
          <h2 className="profile-information-h2">Profile Information</h2>
          <div className="label-container">
            <label>
              First Name*
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </label>
            <label>
              Last Name*
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </label>
          </div>
          <div className="label-container">
            <label>
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {genderOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={maxDate}
              />
            </label>
          </div>
        </div>

        <div className="form-section login-information">
          <h2>Login Information</h2>
          <p>
            Choose one login method to input – either email address or phone
            number
          </p>
          <div className="label-container">
            <label>
              Email Address*
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+852"
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </label>
          </div>
          <div className="label-container">
            <label>
              Password*
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </label>
            <label>
              Confirm Password*
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </label>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserDataForm;
