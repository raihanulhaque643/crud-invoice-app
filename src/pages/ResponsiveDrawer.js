import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import InvoiceIcon from '@material-ui/icons/Receipt';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddJobIcon from '@material-ui/icons/Add';
import AllJobsIcon from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route,useHistory, Redirect } from 'react-router-dom';
import CreateJob from '../features/jobs/Create-job';
import AllJobs from '../features/jobs/All-jobs';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const history = useHistory();

  function pushFirstBlockRoute (index) {
    switch(index){
      case 0:
        history.push('/home/dashboard');
        break;
      case 1:
        history.push('/home/create-jobs');
        break;
      case 2:
        history.push('/home/all-jobs');
        break;
      case 3:
        history.push('/home/invoices');
        break;
      default:
        history.push('/home/dashboard');
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Dashboard', 'Create Job', 'All Jobs', 'Invoices'].map((text, index) => (
          <ListItem button key={text} onClick={() => pushFirstBlockRoute(index)}>
            <ListItemIcon>
            {index === 0 && <DashboardIcon /> }
            {index === 1 && <AddJobIcon />}
            {index === 2 && <AllJobsIcon />}
            {index === 3 && <InvoiceIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route exact path="/home">
             <Redirect to="/home/dashboard" />
            </Route>
            <Route exact path="/home/dashboard">
              <h1>Dashbord component</h1>
            </Route>
            <Route exact path="/home/create-jobs">
              <CreateJob />
            </Route>
            <Route exact path="/home/all-jobs">
              <AllJobs />
            </Route>
            <Route exact path="/home/invoices">
              <h1>Invoices Component goes here...</h1>
            </Route>
            <Route  path="">
              <h1>Eror 404! Component not found...</h1>
            </Route>
          </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;