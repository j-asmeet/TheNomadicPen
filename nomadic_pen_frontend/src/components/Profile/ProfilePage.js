/* Author: Sreejith Nair */
import React, { useState, useRef, useEffect} from 'react';
import * as MUI from '@mui/material';
import '../../styles/ProfilePage.css';
import { Box, Typography, Grid} from '@mui/material';
import ArticleBox from "./ArticleBox";
import UserDetailsBox from "./UserDetails";
import axios from "axios";

const ProfilePage = () => {
    const [profilePicture, setProfilePicture] = useState('');
    const fileInputRef = useRef(null);
    const [penName, setPenName] = useState('@Xcalibur11');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [totalPosts, setTotalPosts] = useState(0); // Initialize totalPosts state to 0
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');
    const [enrollmentDate, setEnrollmentDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's profile picture
        console.log('Fetching user Profile pic');
        const userEmail = localStorage.getItem("email");

        axios.get(`https://nomadic-pen.onrender.com/profile/getUserProfileDetails/${userEmail}`)
            .then((response) => {
                console.log('response:',response);
                setLoading(false);
                const { profilePic, firstName, lastName, email, penName, totalPosts, dob, contact, enrollmentDate} = response.data;
                setProfilePicture(profilePic);
                setFirstName(firstName);
                setLastName(lastName);
                setUserEmail(email);
                setPenName(penName);
                setDob(dob);
                setContact(contact);
                setEnrollmentDate(enrollmentDate);
                setTotalPosts(totalPosts);
            })
            .catch((error) => {
                console.error('Error fetching profile picture:', error);
            });
    }, []);
    
    const handleProfilePictureChange = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onloadend = () => {
                // Get the Base64 representation of the image
                const base64Image = reader.result;
                // Call the backend API to upload the profile picture
                uploadProfilePicture(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilePicture = async (base64Image) => {
        try {
            const email = localStorage.getItem("email");
            // Call the backend API to upload the profile picture
            const response = await axios.post(
                'https://nomadic-pen.onrender.com/profile/uploadProfilePicture',
                { email, profilePicture: base64Image }
            );

            if (response.status === 200) {
                setProfilePicture(base64Image);
                alert('Profile picture uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Error uploading profile picture.');
        }
    };
    /* This data will be populated once following and follower data is available from other modules*/
    const followers = 0;
    const following = 0;


    return (
        <div style={{ backgroundColor: 'white'}}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <MUI.CircularProgress />
                </div>
            ) : (
            <Box name="mainBox" sx={{display: 'flex',marginTop: '8px' }}>
                <Grid container spacing={2} sx={{ gap: 1 }}>
                    <Grid name="grid1" item xs={12} sm={2} md={2} style={{ display: 'inline-block', justifyContent: 'center', maxWidth: '100%', width: '350px' }}>
                        <Box name="detailsBox" sx={{width: 'fit-content', flexDirection: 'column', display: 'flex', gap: '0px', backgroundColor: '#ffff', alignItems: 'center' }}>
                            <Box name="profilePictureBox" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: '#ffff', padding: '20px', border: '2px solid #ffff' }}>
                                <Box sx={{width: '300px', height: '300px', borderRadius: '10px', overflow: 'hidden',boxShadow: '15px 20px 20px -10px rgba(0, 0, 0, 10)',}}>
                                    <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <input type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} style={{ display: 'none' }}/>
                                    <MUI.Button variant="contained" size="small" onClick={handleProfilePictureChange}>Change Picture</MUI.Button>
                                </div>
                            </Box>
                            <UserDetailsBox penName={penName} setPenName={setPenName} userEmail={userEmail} setUserEmail={setUserEmail} dob={dob} setDob={setDob} enrollmentDate={enrollmentDate} setEnrollmentDate={setEnrollmentDate} contact={contact} setContact={setContact}/>
                        </Box>
                    </Grid>
                    <Grid name="grid2" item xs={12} sm={6} md={9} sx={{flex: '1 1 auto', width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Box name="bannerBox" sx={{ flex: 1, flexDirection: 'column', display: 'flex', marginLeft: '20px', marginRight: '20px'}}>
                            <Box name="featureBox" sx={{ height: '180px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffff' }}>
                                <div>
                                    <h1 style={{ margin: 0 }}>{firstName} {lastName}</h1>
                                    <h3 style={{ margin: 0 }}>{penName}</h3>
                                </div>
                                <Box name="followerBox" sx={{ display: 'flex'}}>
                                    <Box sx={{ textAlign: 'center', marginRight: '10px',border: '1px solid black', borderRadius: '12px',padding: '5px', boxShadow: '2px 4px 8px rgba(0, 0, 0, 4)', }}>
                                        <Typography variant="h6">{totalPosts}</Typography>
                                        <Typography variant="subtitle1">Posts</Typography>
                                    </Box>
                                    {/* Followers */}
                                    <Box sx={{ textAlign: 'center', marginRight: '10px',border: '1px solid black', borderRadius: '12px',padding: '5px', boxShadow: '2px 4px 8px rgba(0, 0, 0, 4)',}}>
                                        <Typography variant="h6">{followers}</Typography>
                                        <Typography variant="subtitle1">Followers</Typography>
                                    </Box>
                                    {/* Following */}
                                    <Box sx={{ textAlign: 'center',border: '1px solid black', borderRadius: '12px',padding: '5px', boxShadow: '2px 4px 8px rgba(0, 0, 0, 4)', }}>
                                        <Typography variant="h6">{following}</Typography>
                                        <Typography variant="subtitle1">Following</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {/* Articles */}
                            <ArticleBox/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            )}
        </div>
    );
};

export default ProfilePage;