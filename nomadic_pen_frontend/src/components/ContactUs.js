/* Author: Meet Sinojia */

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Paper,
    Card,
    CardContent,
    CardHeader,
    Box,
    Grid,
    Container,
    IconButton,
    Link,
    Snackbar,
    Alert,
    Divider,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import {
    LocationOn,
    Phone,
    Email,
    Facebook,
    Instagram,
    Twitter,
    FavoriteBorder as FavoriteIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    message: yup.string().required("Message is required"),
});

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
    const theme = useTheme();

    const handleFormSubmit = (data) => {
        console.log(data);
        setIsFormSubmitted(true);
        reset();
    };

    const handleCloseNotification = () => {
        setIsFormSubmitted(false);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background_image/boat_bg.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        padding: 4,
                        boxShadow: theme.shadows[3],
                    }}
                >
                    <Box textAlign="center" mb={4}>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.getContrastText(
                                    theme.palette.primary.main
                                ),
                                padding: 2,
                                boxShadow: theme.shadows[3],
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                            >
                                CONTACT US
                            </Typography>
                        </Box>
                        <Divider />
                        <Box mt={2}>
                            <Typography
                                variant="h5"
                                component="h2"
                                gutterBottom
                            >
                                We'd{" "}
                                <IconButton>
                                    <FavoriteIcon />
                                </IconButton>{" "}
                                to help!
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Feel free to say hello!
                            </Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            Have questions? Check out our{" "}
                            <Link
                                href="/faq"
                                color="secondary"
                                underline="hover"
                            >
                                FAQs
                            </Link>{" "}
                            page for quick answers.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 4 }}>
                                <Typography variant="h6" gutterBottom>
                                    Get in Touch
                                </Typography>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <TextField
                                        label="Your Name"
                                        fullWidth
                                        {...register("name")}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        {...register("email")}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Message"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        {...register("message")}
                                        error={!!errors.message}
                                        helperText={errors.message?.message}
                                        sx={{ mb: 2 }}
                                    />
                                    <Box display="flex" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Send
                                        </Button>
                                    </Box>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardHeader title="Contact Details" />
                                <CardContent>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <LocationOn sx={{ mr: 1 }} />
                                        <Typography variant="body2">
                                            6056 University Ave, Halifax, NS B3H 1W5
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Phone sx={{ mr: 1 }} />
                                        <Typography variant="body2">
                                            +1 (782) 123-4567
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={2}
                                    >
                                        <Email sx={{ mr: 1 }} />
                                        <Typography variant="body2">
                                            thenomadicpen@gmail.com
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box mt={2}>
                                        <IconButton
                                            color="secondary"
                                            href="https://facebook.com"
                                        >
                                            <Facebook />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            href="https://instagram.com"
                                        >
                                            <Instagram />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            href="https://twitter.com"
                                        >
                                            <Twitter />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Snackbar
                open={isFormSubmitted}
                autoHideDuration={5000}
                onClose={handleCloseNotification}
            >
                <Alert onClose={handleCloseNotification} severity="success">
                    Message sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactUs;
