"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRole = useRole;
var React = _interopRequireWildcard(require("react"));
var _useId = require("@base-ui-components/utils/useId");
var _utils = require("../utils");
var _FloatingTree = require("../components/FloatingTree");
const componentRoleToAriaRoleMap = new Map([['select', 'listbox'], ['combobox', 'listbox'], ['label', false]]);

/**
 * Adds base screen reader props to the reference and floating elements for a
 * given floating element `role`.
 * @see https://floating-ui.com/docs/useRole
 */
function useRole(context, props = {}) {
  const {
    open,
    elements,
    floatingId: defaultFloatingId
  } = context;
  const {
    enabled = true,
    role = 'dialog'
  } = props;
  const defaultReferenceId = (0, _useId.useId)();
  const referenceId = elements.domReference?.id || defaultReferenceId;
  const floatingId = React.useMemo(() => (0, _utils.getFloatingFocusElement)(elements.floating)?.id || defaultFloatingId, [elements.floating, defaultFloatingId]);
  const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
  const parentId = (0, _FloatingTree.useFloatingParentNodeId)();
  const isNested = parentId != null;
  const reference = React.useMemo(() => {
    if (ariaRole === 'tooltip' || role === 'label') {
      return {
        [`aria-${role === 'label' ? 'labelledby' : 'describedby'}`]: open ? floatingId : undefined
      };
    }
    return {
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
      'aria-controls': open ? floatingId : undefined,
      ...(ariaRole === 'listbox' && {
        role: 'combobox'
      }),
      ...(ariaRole === 'menu' && {
        id: referenceId
      }),
      ...(ariaRole === 'menu' && isNested && {
        role: 'menuitem'
      }),
      ...(role === 'select' && {
        'aria-autocomplete': 'none'
      }),
      ...(role === 'combobox' && {
        'aria-autocomplete': 'list'
      })
    };
  }, [ariaRole, floatingId, isNested, open, referenceId, role]);
  const floating = React.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      ...(ariaRole && {
        role: ariaRole
      })
    };
    if (ariaRole === 'tooltip' || role === 'label') {
      return floatingProps;
    }
    return {
      ...floatingProps,
      ...(ariaRole === 'menu' && {
        'aria-labelledby': referenceId
      })
    };
  }, [ariaRole, floatingId, referenceId, role]);
  const item = React.useCallback(({
    active,
    selected
  }) => {
    const commonProps = {
      role: 'option',
      ...(active && {
        id: `${floatingId}-fui-option`
      })
    };

    // For `menu`, we are unable to tell if the item is a `menuitemradio`
    // or `menuitemcheckbox`. For backwards-compatibility reasons, also
    // avoid defaulting to `menuitem` as it may overwrite custom role props.
    switch (role) {
      case 'select':
      case 'combobox':
        return {
          ...commonProps,
          'aria-selected': selected
        };
      default:
    }
    return {};
  }, [floatingId, role]);
  return React.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}