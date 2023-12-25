# Project Proposal

This proposal has 3 pages - Landing, FAQs, and Contact Us. There is also a header with the branding logo and buttons for navigating to FAQs and Contact Us. Clicking on the branding icon redirects to the landing page.

* *Date Created*: 20 June 2023
* *Last Modification Date*: 20 June 2023
* *Git URL*: <https://git.cs.dal.ca/pbshah/csci-5709-grp-16>
* *Netlify Deployment URL*: <https://proposal-travel-blog.netlify.app/>


## Authors

* Pakshal Shah (pk277027@dal.ca) - B00935061
* Meet Pravinbhai Sinojia (mt845464@dal.ca) - B00933562
* Jamini Bhatt (jm857276@dal.ca) - B00929835
* Jasmeet Singh (js893478@dal.ca) - B00930022
* Taha Zanzibarwala (th803624@dal.ca) - B00925460
* Sreejith Nair (sr816885@dal.ca) - B00902264


## Deployment

We pushed the same code (as linked above the GitLab repository) to GitHub. Then, we connected that GitHub account to Netlify, gave access to the project repository, and deployed it after configuring the build commands (yarn) and website name.


## Built With

* [React](https://react.dev/) - The front-end web framework used
* [Material UI](https://mui.com/) - Styling library
* [Yarn](https://yarnpkg.com/) - Dependency Management


## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implement, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

### src/Header.js

*Lines 50,  133 - 155*

```
const isSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

{
  !isSmallerScreen && (
    <>
      <IconButton
        color="inherit"
        onClick={() => {
          contact();
        }}
      >
        <ContactUsIcon />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => {
          faq();
        }}
      >
        <FAQsIcon />
      </IconButton>
      <Button color="inherit" variant="outlined" startIcon={<LoginIcon />}>
        Login
      </Button>
    </>
  );
}
```

The code above was created by adapting the code in [javascript.works-hub.com](https://javascript.works-hub.com/learn/how-to-create-a-responsive-navbar-using-material-ui-and-react-router-f9a01) as shown below: 

```
const isMobile = useMediaQuery(theme.breakpoints.down("md"));

{
  isMobile ? (
    <DrawerComponent />
  ) : (
    <div className={classes.navlinks}>
      <Link to="/" className={classes.link}>
        Home
      </Link>
      <Link to="/about" className={classes.link}>
        About
      </Link>
      <Link to="/contact" className={classes.link}>
        Contact
      </Link>
      <Link to="/faq" className={classes.link}>
        FAQ
      </Link>
    </div>
  );
}
```

- The above code was implemented by Damilola Adedoyin Ezekiel (author of the article).
- This code was used because I needed a side menubar with a Hamburger icon if the website is opened on a small screen.
- In this case, my code is fairly different as I only needed to understand how it could be done, and then I used my own React components with a similar`if` condition.


### src/Header.js

*Lines 52 - 56, 159 - 163*

```
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};

<NavigationDrawer
  anchor="left"
  isDrawerOpen={isDrawerOpen}
  toggleDrawer={toggleDrawer}
></NavigationDrawer>;
```

The code above was created by adapting the code in [MUI - Responsive Drawer](https://mui.com/material-ui/react-drawer/#responsive-drawer) as shown below: 

```
const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};

<Drawer
  container={container}
  variant="temporary"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  ModalProps={{
    keepMounted: true, // Better open performance on mobile.
  }}
  sx={{
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
  }}
>
  {drawer}
</Drawer>;
```

- The above code was implemented by MUI Documentation.
- This code was used because I wanted the ability to toggle the side menubar on mobile devices.
- I took inspiration from the code by using a similar state management idea.

## Acknowledgments

* [Unsplash](https://unsplash.com/images/stock) provided high-quality images that have been used in the background and the landing page's carouse
* [reactrouter.com](https://reactrouter.com/en/main) provided a good documentation for a starting point, we started from there and then searched for specific things as required.
* [Material UI Documentation](https://mui.com/material-ui/) is also a good source for styling ideas and examples.
