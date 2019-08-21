/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NestedList from "NestedList";
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const { classes, color, logo, image, logoText, routes } = props;
  var open = false;
  function handleClick(e){
    console.log(`SubMenu is ${open? 'open': 'closed'}`);
    console.log(e);
    open = !open;
  }

  function renderSubRoutes(name, classes, color, routes) {
    console.log(`Found subroutes on ${name}!`);
      return (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {routes.map((prop, key) => {
              var activePro = " ";
              var listItemClasses;
              if (prop.path === "/upgrade-to-pro") {
                activePro = classes.activePro + " ";
                listItemClasses = classNames({
                  [" " + classes[color]]: true
                });
              } else {
                listItemClasses = classNames({
                  [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                });
              }
              const whiteFontClasses = classNames({
                [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
              });
              return (
                <NavLink
                  to={prop.layout + prop.path}
                  className={activePro + classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    {typeof prop.icon === "string" ? (
                      <Icon
                        className={classNames(
                          classes.itemIcon,
                          whiteFontClasses,
                          { [classes.itemIconRTL]: false }
                        )}
                      >
                        {prop.icon}
                      </Icon>
                    ) : (
                      <prop.icon
                        className={classNames(
                          classes.itemIcon,
                          whiteFontClasses,
                          { [classes.itemIconRTL]: false }
                        )}
                      />
                    )}
                    <ListItemText
                      primary={prop.name}
                      className={classNames(classes.itemText, whiteFontClasses, {
                        [classes.itemTextRTL]: false
                      })}
                      disableTypography={true}
                    />
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        </Collapse>
      );
  }

  function renderRoutes(classes, color, routes) {
    return(
      <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          // <NavLink
          //   to={prop.layout + prop.path}
          //   className={activePro + classes.item}
          //   activeClassName="active"
          //   key={key}
          // >
          <div>
            <ListItem button className={classes.itemLink + listItemClasses} onClick={handleClick}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                  />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
              
              {prop.subroutes ? 
                renderSubRoutes(prop.name, classes, color, prop.subroutes) : 
                console.log(`No subroutes on ${prop.name}!`)
              }
            </ListItem>
            
          {/* </NavLink> */}
          {prop.subroutes ? (open ? <ExpandLess /> : <ExpandMore />) : <div/>}
          </div>
      );
    })}
  </List>);
  }

  var links = renderRoutes(classes, color, routes);

  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=mdr-sidebar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default withStyles(sidebarStyle)(Sidebar);
