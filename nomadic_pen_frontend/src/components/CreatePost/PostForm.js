/* Author: Meet Sinojia */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  ButtonGroup,
  Chip,
  Box,
  Typography,
  Menu,
  MenuItem,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import axios from "axios";

import FileUploader from "./FileUploader";
import Editor from "./Editor";
import ScheduleForm from "./ScheduleForm";
import * as constants from "../../constants";

import styles from "../../styles/FormWindow.module.css";

const initialContent = "";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorHtmlValue, setEditorHtmlValue] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [scheduleConfirmOpen, setScheduleConfirmOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: false,
    featuredImage: false,
    content: false,
  });

  const navigate = useNavigate();

  const handleTagInput = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      addTag(tagInput.trim());
      setTagInput("");
    }
  };

  const addTag = (tag) => {
    if (tag !== "" && !tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: false }));
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setErrors((prevErrors) => ({ ...prevErrors, featuredImage: false }));
  };

  const handleEditorContentChanged = (content) => {
    setEditorHtmlValue(content.html);
    setErrors((prevErrors) => ({ ...prevErrors, content: false }));
  };

  const handleScheduleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleScheduleClose = () => {
    setAnchorEl(null);
    setIsScheduleOpen(false);
  };

  const handleScheduleOpen = () => {
    let { formValid, newErrors } = isFormValid();
    if (formValid) {
      setAnchorEl(null);
      setIsScheduleOpen(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSchedule = async (selectedDate) => {
    setIsScheduleOpen(false);
    await createPost(selectedDate);
  };

  const handleScheduleConfirmClose = async () => {
    setScheduleConfirmOpen(false);
    navigate("/posts/following");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPost();
  };

  const isFormValid = () => {
    let formValid = true;
    const newErrors = {
      title: false,
      featuredImage: false,
      content: false,
    };

    if (title.trim() === "") {
      formValid = false;
      newErrors.title = true;
    }

    if (selectedFile === null) {
      formValid = false;
      newErrors.featuredImage = true;
    }

    if (
      editorHtmlValue.trim() === "" ||
      editorHtmlValue.trim() === "<p><br></p>"
    ) {
      formValid = false;
      newErrors.content = true;
    }

    return { formValid, newErrors };
  };

  const createPost = async (scheduledDateTime = null) => {
    let { formValid, newErrors } = isFormValid();
    if (formValid) {
      const authorId = localStorage.getItem("email");

      try {
        let endpoint = "/posts";

        const postData = {
          title,
          featuredImage: selectedFile,
          content: editorHtmlValue,
          tags,
          authorId,
        };

        if (scheduledDateTime) {
          postData.scheduledDateTime = scheduledDateTime;
          endpoint = "/scheduled-posts";
        }

        const response = await axios.post(
          constants.BACKEND_URL + endpoint,
          postData
        );

        if (response && response.data) {
          console.log("Post created:", response.data);

          // Reset the form fields
          setTitle("");
          setSelectedFile(null);
          setEditorHtmlValue("");
          setTags([]);
          setTagInput("");

          if (!scheduledDateTime) {
            navigate("/posts/" + response.data.data._id);
          } else {
            setScheduleConfirmOpen(true);
          }
        } else {
          console.log("Error creating post:", response);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background_image/boat_bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "500px",
          backgroundColor: "white",
          boxShadow: "0px 0px 50px rgba(0, 0, 0, 1)",
        }}
      >
        <form className={styles["form-window"]} onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Create a New Post
          </Typography>
          <Box mt={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              error={errors.title}
              helperText={errors.title ? "Title cannot be empty" : ""}
            />
          </Box>
          <Box mt={3}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Featured Image:
            </Typography>
            <FileUploader
              selectedFile={selectedFile}
              onFileChange={handleFileChange}
            />
            {errors.featuredImage && (
              <Typography variant="body2" color="error">
                Featured image is required
              </Typography>
            )}
          </Box>
          <Box mt={3}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Content:
            </Typography>
            <Editor
              value={initialContent}
              onChange={handleEditorContentChanged}
            />
            {errors.content && (
              <Typography variant="body2" color="error">
                Content cannot be empty
              </Typography>
            )}
          </Box>
          <Box mt={3}>
            <TextField
              label="Tags"
              placeholder="Type and press space to add tags"
              fullWidth
              value={tagInput}
              onKeyDown={handleTagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Box mt={1} display="flex" alignItems="center">
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  style={{ marginRight: "0.5rem" }}
                />
              ))}
            </Box>
          </Box>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Post
            </Button>
            <Button
              variant="contained"
              onClick={handleScheduleClick}
              sx={{ marginTop: 2 }}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleScheduleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleScheduleOpen}>Schedule Post</MenuItem>
          </Menu>
          <ScheduleForm
            open={isScheduleOpen}
            onClose={handleScheduleClose}
            onSchedule={handleSchedule}
          />
          <Dialog
            open={scheduleConfirmOpen}
            onClose={handleScheduleConfirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Post Scheduled</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your blog post has been scheduled successfully!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleScheduleConfirmClose}
                color="primary"
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Paper>
    </Box>
  );
};

export default PostForm;
