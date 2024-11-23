import { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import TextInput from "../inputFields/TextInput";
import SelectInput from "../inputFields/SelectInput";
import PageLoader from "../PageLoader";
import { useNavigate } from "react-router-dom"; // for navigation
import { generateUserId } from "../../utils/calculateFunc";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    sponsoremail: "admin@gmail.com",
    name: "Rajat Pradhan",
    country: "india",
    phone: "9666452435",
    position: "left",
    email: "test@gmail.com",
    password: "Test@123",
    confirmPassword: "Test@123",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [alertVariant, setAlertVariant] = useState("info"); // Alert variant

  const navigate = useNavigate(); // To navigate after successful registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sponsoremail || !formData.sponsoremail.includes("@"))
      newErrors.sponsoremail = "Sponsor email is invalid.";
    if (!formData.name) newErrors.name = "Name can't be empty.";
    if (!formData.country) newErrors.country = "Please select a country.";
    if (!formData.phone || formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.position) newErrors.position = "Please select a position.";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Email is invalid.";
    if (
      !formData.password ||
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password)
    )
      newErrors.password =
        "Password must be at least 6 characters long and include an uppercase letter.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate OTP sending process
      setNotification("OTP sent successfully.");
      setAlertVariant("success");
      setShowOtpModal(true);
    }
  };
  const addMemberToHierarchy = (currentMember, newMember, position) => {
    // Ensure the `members` array exists for the current member
    if (!currentMember.members) {
      currentMember.members = [];
    }
  
    const positionIndex = position === "left" ? 0 : 1;
  
    // If the position is empty, add the new member here
    if (!currentMember.members[positionIndex]) {
      currentMember.members[positionIndex] = {
        ...newMember,
        id: generateUserId(),
        password: undefined, // Exclude sensitive info
        confirmPassword: undefined,
        members: [], // Initialize a new `members` array for this new user
      };
      return true; // Successfully added
    }
  
    // If the position is occupied, recursively check the same position for this member
    return addMemberToHierarchy(
      currentMember.members[positionIndex],
      newMember,
      position
    );
  };
  const handleOtpSubmit = () => {
    if (otp === "1111") {
      setNotification("Registration successful!");
      setAlertVariant("success");
  
      // Retrieve users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Function to recursively check for sponsor in the hierarchy
      const findSponsorInHierarchy = (users, sponsoremail) => {
        for (let user of users) {
          if (!user) continue; // Skip if user is null or undefined
          
          // Check if the current user's email matches the sponsoremail
          if (user.email === sponsoremail) {
            return user; // Sponsor found
          }
      
          // If this user has members, recursively check their members
          if (user.members && user.members.length > 0) {
            const sponsorInMembers = findSponsorInHierarchy(user.members, sponsoremail);
            if (sponsorInMembers) {
              return sponsorInMembers; // Sponsor found within the members
            }
          }
        }
        return null; // Sponsor not found in this user's hierarchy
      };
      
  
      // Find sponsor in the users list or their nested members
      const sponsor = findSponsorInHierarchy(users, formData.sponsoremail);
  
      if (sponsor) {
        // Check the chosen position (left or right) and attempt to add the user
        const position = formData.position; // Assume `position` is provided as "left" or "right"
        const addedToPosition = addMemberToHierarchy(sponsor, formData, position);
  
        if (!addedToPosition) {
          setNotification(
            `No available ${position} position in sponsor hierarchy.`
          );
          setAlertVariant("danger");
          setShowOtpModal(false);
          return;
        }
  
        // Save updated users back to localStorage
        localStorage.setItem("users", JSON.stringify(users));
        setNotification(
          `User added under sponsor successfully in the ${position} position!`
        );
      } else {
        setNotification("Sponsor email does not exist.");
        setAlertVariant("danger");
        setShowOtpModal(false);
        return;
      }
  
      // Redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setShowOtpModal(false);
    } else {
      setNotification("OTP does not match. Please try again.");
      setAlertVariant("danger");
    }
  };
  
  
  // const handleOtpSubmit = () => {
  //   if (otp === "1111") {
  //     setNotification("Registration successful!");
  //     setAlertVariant("success");
  
  //     // Retrieve users from localStorage
  //     const users = JSON.parse(localStorage.getItem("users")) || [];
  //     const sponsorIndex = users.findIndex(
  //       (user) =>
  //         user.email === formData.sponsoremail ||
  //         user?.members?.some((mem) => mem.email === formData.sponsoremail)
  //     );
  
  //     if (sponsorIndex !== -1) {
  //       // Identify whether the sponsor is a direct user or a member
  //       let sponsor = users[sponsorIndex];
  
  //       if (sponsor.email !== formData.sponsoremail) {
  //         // If not a direct match, find the member within this user's members
  //         sponsor = sponsor.members.find(
  //           (mem) => mem.email === formData.sponsoremail
  //         );
  //       }
  
  //       if (sponsor) {
  //         // Check the chosen position (left or right) and attempt to add the user
  //         const position = formData.position; // Assume `position` is provided as "left" or "right"
  //         const addedToPosition = addMemberToHierarchy(
  //           sponsor,
  //           formData,
  //           position
  //         );
  
  //         if (!addedToPosition) {
  //           setNotification(
  //             `No available ${position} position in sponsor hierarchy.`
  //           );
  //           setAlertVariant("danger");
  //           setShowOtpModal(false);
  //           return;
  //         }
  
  //         // Save updated users back to localStorage
  //         localStorage.setItem("users", JSON.stringify(users));
  //         setNotification(
  //           `User added under sponsor successfully in the ${position} position!`
  //         );
  //       } else {
  //         setNotification("Sponsor email does not exist.");
  //         setAlertVariant("danger");
  //         setShowOtpModal(false);
  //         return;
  //       }
  
  //       // Redirect to login page
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 1000);
  //       setShowOtpModal(false);
  //     } else {
  //       setNotification("Sponsor email does not exist.");
  //       setAlertVariant("danger");
  //     }
  //   } else {
  //     setNotification("OTP does not match. Please try again.");
  //     setAlertVariant("danger");
  //   }
  // };
  
  

  // const handleOtpSubmit = () => {
  //   if (otp === "1111") {
  //     // Default OTP check: 1111
  //     setNotification("Registration successful!");
  //     setAlertVariant("success");

  //     // Retrieve users from localStorage, or initialize an empty array if not present
  //     const users = JSON.parse(localStorage.getItem("users")) || [];
  //     const sponsorIndex = users.findIndex(
  //       (user) =>
  //         user.email === formData.sponsoremail ||
  //         user?.members?.map((mem) => mem.email === formData.sponsoremail)
  //     );

  //     if (sponsorIndex !== -1) {
  //       // Check if sponsorEmail matches a direct user's email
  //       if (users[sponsorIndex].email === formData.sponsoremail) {
  //         // Add new user to this sponsor's members
  //         if (!users[sponsorIndex].members) {
  //           users[sponsorIndex].members = []; // Initialize members array if not present
  //         }
  //         users[sponsorIndex].members.push({
  //           ...formData,
  //           password: undefined, // Exclude sensitive info from members
  //           confirmPassword: undefined,
  //         });
  //       } else {
  //         // If not a direct match, find the member within this user's members list
  //         const member = users[sponsorIndex].members.find(
  //           (mem) => mem.email === formData.sponsoremail
  //         );
      
  //         if (member) {
  //           // Add new user under this member's members
  //           if (!member.members) {
  //             member.members = []; // Initialize members array if not present
  //           }
  //           member.members.push({
  //             ...formData,
  //             password: undefined, // Exclude sensitive info from members
  //             confirmPassword: undefined,
  //           });
  //         }
  //       }
      
  //       // Update localStorage with modified users array
  //       localStorage.setItem("users", JSON.stringify(users));
  //       setNotification("User added under sponsor successfully!");
  //     } else {
  //       // Sponsor email does not exist
  //       setNotification("Sponsor email does not exist.");
  //       setAlertVariant("danger");
  //       setShowOtpModal(false);
  //       return;
  //     }
      

  //     // Redirect to login page
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //     setShowOtpModal(false);
  //   } else {
  //     setNotification("OTP does not match. Please try again.");
  //     setAlertVariant("danger");
  //   }
  // };

  return (
    <>
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <h2 className="text-center mb-4 text-[2rem]">Register</h2>
        {notification && (
          <Alert
            variant={alertVariant}
            onClose={() => setNotification("")}
            dismissible
            style={{
              position: "fixed",
              bottom: "5rem",
              right: "1rem",
              zIndex: 1050,
              width: "300px",
              fontSize: ".8rem",
            }}
          >
            {notification}
          </Alert>
        )}
        {loading && <PageLoader isLoading={loading} />}
        <TextInput
          label="Sponsor E-mail"
          type="email"
          placeholder="Sponsor E-mail"
          value={formData.sponsoremail}
          onChange={handleChange}
          name="sponsoremail"
          error={errors.sponsoremail}
        />

        <TextInput
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          name="name"
          error={errors.name}
        />

        <SelectInput
          label="Select Country"
          options={[
            { value: "india", label: "India" },
            { value: "usa", label: "United States" },
            { value: "germany", label: "Germany" },
          ]}
          value={formData.country}
          onChange={handleChange}
          name="country"
          error={errors.country}
        />

        <TextInput
          label="Mobile"
          placeholder="Mobile"
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          error={errors.phone}
        />

        <SelectInput
          label="Select Position"
          options={[
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
          value={formData.position}
          onChange={handleChange}
          name="position"
          error={errors.position}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          error={errors.password}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          error={errors.confirmPassword}
        />

        <Button variant="primary" type="submit" className="w-100 text-[.9rem]">
          Get OTP
        </Button>
      </Form>

      {/* OTP Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP ---- 1111</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            label="OTP"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            name="otp"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowOtpModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleOtpSubmit}
            disabled={loading}
          >
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterForm;
