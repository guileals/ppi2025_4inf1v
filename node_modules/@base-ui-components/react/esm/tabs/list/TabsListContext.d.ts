import * as React from 'react';
export interface TabsListContext {
  activateOnFocus: boolean;
  highlightedTabIndex: number;
  onTabActivation: (newValue: any, event: Event) => void;
  setHighlightedTabIndex: (index: number) => void;
  tabsListRef: React.RefObject<HTMLElement | null>;
}
export declare const TabsListContext: React.Context<TabsListContext | undefined>;
export declare function useTabsListContext(): TabsListContext;