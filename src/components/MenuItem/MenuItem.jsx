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


class MenuItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes ? true : false,
      open: props.open
    };
    console.log(props.routes? "subroutes": "no subroutes")
  }

  activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  handleClick(e){
    console.log(`SubMenu is ${open? 'open': 'closed'}`);
    console.log(e);
    open = !open;
  }

  renderSubRoutes() {
    console.log(`Found subroutes on ${props.name}!`);
      return (
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {props.routes.map((props, key) => {
              var activePro = " ";
              var listItemClasses;
              if (props.path === "/upgrade-to-pro") {
                activePro = classes.activePro + " ";
                listItemClasses = classNames({
                  [" " + classes[color]]: true
                });
              } else {
                listItemClasses = classNames({
                  [" " + classes[color]]: activeRoute(props.layout + props.path)
                });
              }
              const whiteFontClasses = classNames({
                [" " + classes.whiteFont]: activeRoute(props.layout + props.path)
              });
              return (
                <NavLink
                  to={props.layout + props.path}
                  className={activePro + classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    {typeof props.icon === "string" ? (
                      <Icon
                        className={classNames(
                          classes.itemIcon,
                          whiteFontClasses,
                          { [classes.itemIconRTL]: false }
                        )}
                      >
                        {props.icon}
                      </Icon>
                    ) : (
                      <props.icon
                        className={classNames(
                          classes.itemIcon,
                          whiteFontClasses,
                          { [classes.itemIconRTL]: false }
                        )}
                      />
                    )}
                    <ListItemText
                      primary={props.name}
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

  render() {
    return(
      <List className={classes.list}>
      {routes.map((props, key) => {
        var activePro = " ";
        var listItemClasses;
        if (props.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(props.layout + props.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(props.layout + props.path)
        });
        return (
          <div>
            <ListItem button className={classes.itemLink + listItemClasses} onClick={handleClick}>
              {typeof props.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {props.icon}
                </Icon>
              ) : (
                <props.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                  />
              )}
              <ListItemText
                primary={props.rtlActive ? props.rtlName : props.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
              
              {props.routes ? 
                renderSubRoutes() : 
                console.log(`No subroutes on ${prop.name}!`)
              }
            </ListItem>
            
          {/* </NavLink> */}
          {props.routes ? (open ? <ExpandLess /> : <ExpandMore />) : <div/>}
          </div>
      );
    })}
  </List>);
  }

}

MenuItem.propTypes = {
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

export default withStyles(sidebarStyle)(MenuItem);
