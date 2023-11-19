import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from "@mui/material"; // Import InputLabel, Select, and MenuItem
    import { createUserWithEmailAndPassword } from "firebase/auth"; // Implement Firebase functions for sign up

export default function SignUpWithEmail() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            // Implement firebase function to create user with email and password
            await createUserWithEmailAndPassword(email, password);

            // Perform actions after successful account creation 
            console.log('Account created successfully with email!');
        }
        catch (error) {
            // Handle error while creating an account
            console.error('Error creating account with email:', error.message);
            
            // Display error message
            let errorMessage = 'An error occured while creating an account. Please try again.';

            // Handle specific error codes/messages for different scenarios 
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'The email address is already in use by another account.';
            } 
            else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid.';
            } 
            else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
            } 
            else {
                // Handle other Firebase Auth errors
                errorMessage = 'An error occurred during account creation. Please try again later.';
            }

            // Display or ahndle the error message in UI 
            alert(errorMessage);
        }
    };

    return ( 
        <div className = "sign-up-email">
            <h2>Sign Up with Email</h2>
            <TextField 
                label = "Email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                style = {{ marginBottom: "10px" }} // Add margin to create space
            />
            <TextField 
                label = "Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                style = {{ marginBottom: "10px" }} // Add margin to create space
            />
            <Button variant = "contained" onClick = {handleSignUp}>
                Sign Up
            </Button>
        </div>
    );
}