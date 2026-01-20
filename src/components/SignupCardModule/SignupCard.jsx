import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; //  axios instance
import logo from "../../assets/login-bg.jpeg";
import "./SignupCard.css";

function SignupCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    address: "",
    pinCode: "",
    location: "",
    instagram: "",
    linkedin: "",
    referralCount: "",
    specialization: "",
    experience: "",
    projectsCount: "",
    brand: "",
    registeredName: "",
    tagLine: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const OPTIONAL_FIELDS = ["tagLine", "linkedin", "instagram"];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!submitted) return;

    setErrors((prev) => {
      const updated = { ...prev };

      if (!value.trim()) {
        updated[name] = "This field is mandatory";
        return updated;
      }

      delete updated[name];

      if (name === "email" && !EMAIL_REGEX.test(value)) {
        updated.email = "Please enter a valid email address";
      }

      if (name === "phone" && !/^\d{10}$/.test(value)) {
        updated.phone = "Phone number must be 10 digits";
      }

      if (name === "pinCode" && !/^\d{6}$/.test(value)) {
        updated.pinCode = "Pin code must be 6 digits";
      }

      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(form).forEach((field) => {
      if (!form[field] && !OPTIONAL_FIELDS.includes(field)) {
        newErrors[field] = "This field is mandatory";
      }
    });

    if (form.email && !EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (form.pinCode && !/^\d{6}$/.test(form.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    setSubmitted(true);

    if (!validateForm()) return;

    try {
      await api.post("/auth/signup", form);

//  end user onboarding session
await api.post("/auth/logout");

alert("Signup successful. Please login.");
navigate("/", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const fields = [
    ["name", "Full Name"],
    ["email", "Email"],
    ["type", "User Type"],
    ["phone", "Phone Number"],
    ["address", "Address"],
    ["pinCode", "Pin Code"],
    ["location", "Location"],
    ["instagram", "Instagram ID"],
    ["linkedin", "LinkedIn ID"],
    ["referralCount", "Referral Count"],
    ["specialization", "Specialization"],
    ["experience", "Experience"],
    ["projectsCount", "Project Volume"],
    ["brand", "Brand Name"],
    ["registeredName", "Registered Name"],
    ["tagLine", "Tagline"],
  ];

  return (
    <div className="signup-page">
      <div className="signup-header">
        <img src={logo} alt="Logo" />
      </div>

      <div className="signup-center">
        <div className="signup-card signup-two-column">
          <h2 className="signup-title">Create Your Account</h2>

          <div className="signup-grid">
            {fields.map(([name, label]) => (
              <div className="signup-field" key={name}>
                <label>
                  {label}
                  {!OPTIONAL_FIELDS.includes(name) && (
                    <span className="required"> *</span>
                  )}
                </label>

                <input
                  type={name === "email" ? "email" : "text"}
                  name={name}
                  value={form[name]}
                  placeholder={label}
                  maxLength={
                    name === "phone"
                      ? 10
                      : name === "pinCode"
                      ? 6
                      : undefined
                  }
                  onChange={(e) => {
                    if (
                      ["phone", "pinCode", "referralCount", "projectsCount"].includes(
                        name
                      )
                    ) {
                      if (!/^\d*$/.test(e.target.value)) return;
                    }
                    handleChange(e);
                  }}
                />

                {submitted && errors[name] && (
                  <span className="field-error">{errors[name]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="signup-btn-wrapper">
            <button
              type="button"
              className="signup-btn"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupCard;
