import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from "@mui/material"; // Import InputLabel, Select, and MenuItem
import Input from "@mui/material/Input"; // Import Input component separately
import firebaseui from "firebaseui";
// import firebase from "firebase/app";
// import "firebase/auth";

    export default function CreateProfile({ onProfileSubmit }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState("");

    useEffect(() => {
        // Check if the user has already created a profile
        const hasProfile = localStorage.getItem("hasProfile");
        if (hasProfile === "true") {
        // User has a profile, navigate to the dashboard
        onProfileSubmit();
        }
    }, [onProfileSubmit]);

    const handleProfileSubmit = () => {
        // You can perform validation here before submitting the profile data
        const profileData = {
        firstName,
        lastName,
        username,
        userType,
        };

        // Save in local storage that the user has created a profile
        localStorage.setItem("hasProfile", "true");

        onProfileSubmit(profileData);
    };

    // const handleCreateAccountWithEmail = async () => {
    //     try {
    //         // Get the email and password from your input field 
    //         const email = 'example@example.com'; // Get the email value from the input field 
    //         const password = 'password1234567890'; // Get the password value from the input field

    //         // Create the user account with email and password using Firebase Authentication
    //         await firebase.auth().createUser(email, password);

    //         // Optionallu, can add additional information to user profile 
    //         const currentUser = firebase.auth().currentUser;
    //         if(currentUser) {
    //             await currentUser.updateProfile({
    //                 displayName: `${firstName} ${lastName}`, // Set display name using first and last name 
    //             });
    //         }

    //         // Perform actions after successful account creation 
    //         console.log('Account created successfully with email!');
    //     }
    //     catch (error) {
    //         // Handle error while creating an account
    //         console.error('Error creating account with email:', error.message);
            
    //         // Display error message
    //         let errorMessage = 'An error occured while creating an account. Please try again.';

    //         // Handle specific error codes/messages for different scenarios 
    //         if (error.code === 'auth/email-already-in-use') {
    //             errorMessage = 'The email address is already in use by another account.';
    //         } 
    //         else if (error.code === 'auth/invalid-email') {
    //             errorMessage = 'The email address is invalid.';
    //         } 
    //         else if (error.code === 'auth/weak-password') {
    //             errorMessage = 'The password is too weak.';
    //         } 
    //         else {
    //             // Handle other Firebase Auth errors
    //             errorMessage = 'An error occurred during account creation. Please try again later.';
    //         }

    //         // Display or ahndle the error message in UI 
    //         alert(errorMessage);
    //     }
    // };

    return (
        <div className = "create-profile">
            <h2> Create Your Profile </h2>
            <TextField
                label = "First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginBottom: "10px" }} // Add margin to create space
            />
            <TextField
                label = "Last Name"
                value = {lastName}
                onChange = {(e) => setLastName(e.target.value)}
                style = {{ marginBottom: "10px" }} // Add margin to create space
            />
            <TextField
                label = "Username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                style = {{ marginBottom: "15px" }} // Add margin to create space
            />
            <FormControl style = {{ marginBottom: "10px" }}> {/* Add margin to create space */}
                <InputLabel shrink> User Type </InputLabel>
                <Select
                value = {userType}
                onChange = {(e) => setUserType(e.target.value)}
                input = {<Input style = {{ width: "200px" }} />}
                >
                <MenuItem value = "student">Student</MenuItem>
                <MenuItem value = "teacher">Teacher</MenuItem>
                <MenuItem value = "professional">Professional</MenuItem>
                <MenuItem value = "other">Other</MenuItem>
                </Select>
            </FormControl>
            <div style = {{ margin: "20px 0" }} />
            <div style = {{ display: "flex", justifyContent: "center" }}>
                <Button variant = "contained" onClick = {handleProfileSubmit}>
                    Submit Profile
                </Button>
            </div>
        </div>
    );
}
