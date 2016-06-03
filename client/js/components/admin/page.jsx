"use strict";

import React                from "react";
import _                    from "lodash";
import { connect }          from "react-redux";
import { AppCanvas, AppBar, IconButton, FullWidthSection, Styles } from "material-ui";

import Messages             from "../common/messages";
import LeftNav              from "./left_nav";
import AdminTheme           from "./admin_theme";
import Defines              from "../defines";
import AdminStore           from "../../stores/admin";
import { changeNav }        from "../../actions/admin/navigation";


var Typography = Styles.Typography;
var ThemeManager = new Styles.ThemeManager();

var { Spacing } = mui.Styles;
var { StyleResizable } = mui.Mixins;

const select = (state) => {
  return {
    navStatus: state.adminNavigation.navStatus
  };
};

@connect(select, { changeNav }, null, {withRef: true})
class Page extends React.Component {

  constructor() {
    super();
    ThemeManager.setTheme(AdminTheme);
    this._onMenuIconButtonTouchTap = this._onMenuIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  _onMenuIconButtonTouchTap() {
    this.props.changeNav();
    this.refs.leftNav.toggle();
  }

  getStyles(status){
    var marginLeft = status ? "256px" : "0px";
    var styles = {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 'px'
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px'
      },
      a: {
        color: Defines.colors.grey
      },
      p: {
        margin: "0 auto",
        padding: "0",
        color: Defines.colors.white,
        maxWidth: "335px"
      },
      appBar: {
        position: "relative"
      },
      span: {
        marginLeft: marginLeft,
        transition: "margin .3s"
      },
      iconStyle: {
        marginRight: "10px",
        marginLeft: "10px",
        color: Defines.colors.white
      }
    };

    return styles;
  }

  render(){

    var styles = this.getStyles(this.props.navStatus);
    var title = "Admin";
    var leftNav;
    var showMenuIconButton = false;
    var leftIcon;

    var currentRoute = _.last(this.context.router.getCurrentRoutes()).name;
    var noNavRoutes = ["login", "logout"];

    if(!_.contains(noNavRoutes, currentRoute)){
      showMenuIconButton = true;
      leftNav = <LeftNav ref="leftNav" docked={false} isInitiallyOpen={false} />;
      leftIcon = (
        <span style={styles.span}>
          <IconButton
            iconStyle={styles.iconStyle}
            iconClassName="material-icons-action-dehaze"
            onTouchTap={(e) => this._onMenuIconButtonTouchTap(e)}/>
        </span>
      );
    }

    return <AppCanvas predefinedLayout={1}>
        <AppBar
          onLeftIconButtonTouchTap={(e) => this._onMenuIconButtonTouchTap(e)}
          title={title}
          zDepth={0}
          style={styles.appBar}
          iconElementLeft={leftIcon}
          showMenuIconButton = {showMenuIconButton} />
        {leftNav}
        <div style={styles.root}>
          <Messages />
          <div style={styles.content}>
            { this.props.children }
          </div>
        </div>
      </AppCanvas>;
  }
}

module.exports = Page;
