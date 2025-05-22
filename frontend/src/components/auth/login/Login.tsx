import { useForm } from "react-hook-form";
import "./Login.css";
import LoginModel from "../../../models/user/Login";
import auth from "../../../services/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, CircularProgress, Paper } from "@mui/material";

export default function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { newLogin } = useContext(AuthContext)!;

    async function submit(login: LoginModel) {
        try {
            setIsLoading(true);
            const jwt = await auth.login(login);
            newLogin(jwt);
            navigate("/vacations");
        } catch (e) {
            console.error("login failed", e);
            if (axios.isAxiosError(e) && e.response) {
                alert(e.response.data || "Login failed. Please try again.");
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
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit(submit)} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                    <TextField
                        label="Email"
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
                            minLength: { value: 4, message: "Password must be at least 4 characters long" },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Continue"}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: 10 }}>
                    Don't have an account? <Link to="/signUp">Sign Up Here</Link>
                </Typography>
            </Paper>
        </Container>
    );
}
