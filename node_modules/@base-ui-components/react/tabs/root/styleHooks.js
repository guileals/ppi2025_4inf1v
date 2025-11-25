"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabsStyleHookMapping = void 0;
var _TabsRootDataAttributes = require("./TabsRootDataAttributes");
const tabsStyleHookMapping = exports.tabsStyleHookMapping = {
  tabActivationDirection: dir => ({
    [_TabsRootDataAttributes.TabsRootDataAttributes.activationDirection]: dir
  })
};