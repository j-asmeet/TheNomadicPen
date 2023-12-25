/*Author : Sreejith Nair */
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    Chip,
    Typography,
    TextField,
    Button,
    MenuItem,
    Modal,
    Alert,
    Backdrop,
    CircularProgress,
    CardContent,
    Box, CardActionArea, CardMedia,
} from '@mui/material';
import { styled } from '@mui/system';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '300px',
});

const BannerContainer = styled('div')({
    position: 'relative',
    height: '200px',
    marginBottom: '2rem',
    backgroundImage: `url('/assets/profile-page/card-images/istockphoto-5.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const BannerText = styled(Typography)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '4rem',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
});

const GalleryPage = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [country, setCountry] = useState('');
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [alert, setAlert] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]); // State to store fetched images
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://nomadic-pen.onrender.com/gallery/getImages');
            console.log('getImages data:',response.data);
            setLoading(false);
            setImages(response.data);
        } catch (error) {
            showAlert('Error', 'Error in fetching images!');
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const showAlert = (severity, message) => {
        setAlert({ severity, message });
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const handleImageUpload = async () => {
        if (!uploadedImage) {
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Image = event.target.result;
                const email = localStorage.getItem("email");
                const response = await axios.post('https://nomadic-pen.onrender.com/gallery/uploadImage', {
                    email,
                    picture: base64Image,
                    tags,
                    country,
                });
                console.log('response.status:',response.status);
                if (response.status === 201) {
                    setUploadModalOpen(false);
                    setUploadedImage(null);
                    setTags([]);
                    setCountry('');
                    setNewTag('');
                    fetchImages();
                    showAlert('success', 'Image uploaded successfully!');
                } else {
                    showAlert('error', 'Error uploading image.');
                }
            };

            reader.readAsDataURL(uploadedImage);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
};

    const handleTagFilter = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const applyFilters = (image) => {
        if (
            (selectedCountry === '' || selectedCountry === image.country) &&
            (selectedTags.length === 0 || selectedTags.some((tag) => image.tags.includes(tag)))
        ) {
            return true;
        }
        return false;
    };

    const filteredImages = images.filter(applyFilters);

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <BannerContainer>
                <BannerText variant="h1">Gallery</BannerText>
            </BannerContainer>
            {alert && (
                <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                    {alert.message}
                </Alert>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Button variant="contained" color="primary" onClick={() => setUploadModalOpen(true)}>
                    Upload your travel photos
                </Button>
            </div>
            <Backdrop open={loading} style={{ zIndex: 2, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress color="inherit" style={{ marginBottom: '8px' }} />
                <Typography sx={{ marginTop: '8px', color: '#fff', fontWeight: 'bold' }}>
                    Please wait while we fetch uploaded photos!
                </Typography>
            </Backdrop>
            {/* Upload Modal */}
            <Modal
                open={isUploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                aria-labelledby="upload-modal-title"
                aria-describedby="upload-modal-description"
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ width: '300px', padding: '2rem', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Typography variant="h5" style={{ marginTop: '1rem' }}>
                            Upload your picture
                        </Typography>
                        <Dropzone accept="image/*" onDrop={(acceptedFiles) => setUploadedImage(acceptedFiles[0])}>
                            {({ getRootProps, getInputProps, acceptedFiles }) => (
                                <div
                                    {...getRootProps()}
                                    style={{
                                        border: '2px dashed #ccc',
                                        borderRadius: '4px',
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: '#f7f7f7',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {acceptedFiles.length > 0 ? (
                                        <img
                                            src={URL.createObjectURL(acceptedFiles[0])}
                                            alt="Selected"
                                            style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem' }}
                                        />
                                    ) : (
                                        <Typography variant="body1" style={{ marginTop: '1rem' }}>
                                            Drag & drop an image here or click to select a file
                                        </Typography>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                        <TextField
                            label="Add Tags"
                            variant="outlined"
                            fullWidth
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && newTag.trim()) {
                                    setTags((prevTags) => [...prevTags, newTag.trim()]);
                                    setNewTag('');
                                } else if (e.key === ' ' && newTag.trim()) {
                                    setTags((prevTags) => [...prevTags, newTag.trim()]);
                                    setNewTag('');
                                }
                            }}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => setTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag))}
                                    style={{ margin: '0.25rem' }}
                                />
                            ))}
                        </div>
                    </div>
                    <TextField
                        select
                        label="Country"
                        variant="outlined"
                        fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="UAE">UAE</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                        <MenuItem value="Singapore">Singapore</MenuItem>
                        <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                        <MenuItem value="Amsterdam">Netherlands</MenuItem>
                    </TextField>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleImageUpload}
                                style={{ marginRight: '1rem' }}
                                disabled={!country}
                            >
                                Upload
                            </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setUploadModalOpen(false);
                                setUploadedImage(null);
                                setTags([]);
                                setCountry('');
                                setNewTag('');
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                    </div>
                </div>
            </Modal>
            <div style={{ marginTop: '2rem' }}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: 2,
                        borderRadius: 5,
                        boxShadow: 1,
                    }}
                >
                    <TextField
                        select
                        label="Filter by Country"
                        variant="outlined"
                        fullWidth
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        InputProps={{
                            style: { color: '#655DBB' },
                        }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="UAE">UAE</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                        <MenuItem value="Singapore">Singapore</MenuItem>
                        <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                        <MenuItem value="Amsterdam">Netherlands</MenuItem>
                    </TextField>
                </Box>
                <div style={{ marginTop: '1rem' }}>
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            variant={selectedTags.includes(tag) ? 'default' : 'outlined'}
                            onClick={() => handleTagFilter(tag)}
                            style={{ margin: '0.25rem' }}
                        />
                    ))}
                </div>
            </div>
            <Grid container spacing={3}>
                {filteredImages.map((image, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <StyledCard sx={{ width: '100%' }}>
                            <CardActionArea onClick={() => openImageModal(image.picture)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image= {image.picture}
                                    alt={image.picture}
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {image.tags.map((tag, index) => (
                                            <Chip variant="outlined" size="small" key={index} label={tag} />
                                        ))}
                                    </Box>
                                    <Typography variant="subtitle1">Country: {image.country}</Typography>
                                    <Typography variant="body2">by {image.email}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={selectedImage !== null}
                onClose={closeImageModal}
                aria-labelledby="image-modal-title"
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ alignSelf: 'flex-end', margin: '1rem', cursor: 'pointer', zIndex: 1 }}>
                        <Button onClick={closeImageModal} style={{ color: 'white' }}>
                            Close
                        </Button>
                    </div>
                    {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '80vh' }} />}
                </div>
            </Modal>

        </Container>
    );
};

export default GalleryPage;
