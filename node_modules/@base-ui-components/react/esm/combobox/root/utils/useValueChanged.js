import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
export function useValueChanged(valueRef, value, onChangeParam) {
  const onChange = useEventCallback(onChangeParam);
  useIsoLayoutEffect(() => {
    if (valueRef.current === value) {
      return;
    }
    onChange(valueRef.current);
  }, [valueRef, value, onChange]);
  useIsoLayoutEffect(() => {
    valueRef.current = value;
  }, [valueRef, value]);
}