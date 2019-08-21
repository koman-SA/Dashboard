import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import classNames from "classnames";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      routes: props.routes,
      classes: props.classes,
      color: props.color
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
      routes: this.state.routes
    });
  }

  render() {
    var classes = this.state.classes;
    var routes = this.state.routes;
    var color = this.state.color;
    function activeRoute(routeName) {
      return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    return (
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.object,
  open: PropTypes.bool
};

export default withStyles(sidebarStyle)(NestedList);
