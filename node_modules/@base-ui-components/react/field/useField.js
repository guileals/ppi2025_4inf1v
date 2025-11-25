"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useField = useField;
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _getCombinedFieldValidityData = require("./utils/getCombinedFieldValidityData");
var _FormContext = require("../form/FormContext");
var _FieldRootContext = require("./root/FieldRootContext");
function useField(params) {
  const {
    formRef
  } = (0, _FormContext.useFormContext)();
  const {
    invalid,
    markedDirtyRef,
    validityData,
    setValidityData
  } = (0, _FieldRootContext.useFieldRootContext)();
  const {
    enabled = true,
    value,
    id,
    name,
    controlRef,
    commitValidation
  } = params;
  const getValueRef = (0, _useLatestRef.useLatestRef)(params.getValue);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled) {
      return;
    }
    let initialValue = value;
    if (initialValue === undefined) {
      initialValue = getValueRef.current?.();
    }
    if (validityData.initialValue === null && initialValue !== validityData.initialValue) {
      setValidityData(prev => ({
        ...prev,
        initialValue
      }));
    }
  }, [enabled, setValidityData, value, validityData.initialValue, getValueRef]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled) {
      return;
    }
    if (id) {
      formRef.current.fields.set(id, {
        controlRef,
        validityData: (0, _getCombinedFieldValidityData.getCombinedFieldValidityData)(validityData, invalid),
        validate() {
          let nextValue = value;
          if (nextValue === undefined) {
            nextValue = getValueRef.current?.();
          }
          markedDirtyRef.current = true;
          // Synchronously update the validity state so the submit event can be prevented.
          ReactDOM.flushSync(() => commitValidation(nextValue));
        },
        getValueRef,
        name
      });
    }
  }, [commitValidation, controlRef, enabled, formRef, getValueRef, id, invalid, markedDirtyRef, name, validityData, value]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    const fields = formRef.current.fields;
    return () => {
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef, id]);
}