type KeyBoardEventKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'z';
type KeyDown<T> = { readonly [key in KeyBoardEventKey]?: T };

declare global {
  interface Window {
    score: number;
    keyDown: KeyDown<boolean>;
  }
}

export {};
