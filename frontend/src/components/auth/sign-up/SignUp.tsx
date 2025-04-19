import "./SignUp.css";
import { useForm } from "react-hook-form";
import auth from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import SignUpModel from "../../../models/user/SignUp";
import axios from "axios";
import { TextField, Button, Container, Typography, CircularProgress, Paper } from "@mui/material";

export default function SignUp(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { newLogin } = useContext(AuthContext)!;

    async function submit(signUp: SignUpModel) {
        try {
            setIsLoading(true);
            const jwt = await auth.signUp(signUp);
            newLogin(jwt);
            navigate("/vacations");
        } catch (e) {
            console.error("Signup failed:", e);
            if (axios.isAxiosError(e) && e.response) {
                alert(e.response.data || "Signup failed. Please try again.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Create an account</Typography>
                <form onSubmit={handleSubmit(submit)} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        {...register("firstName", { required: "First name is required" })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        {...register("lastName", {
                            required: "Last name is required",
                            minLength: { value: 2, message: "Last name must be at least 2 characters" },
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        {...register("email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 4, message: "Password must be at least 4 characters" },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: 10 }}>
                    Already have an account? <Link to="/login">Log in here</Link>
                </Typography>
            </Paper>
        </Container>
    );
}
