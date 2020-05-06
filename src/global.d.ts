type KeyBoardEventKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'z';
type KeyDown<T> = { [key in KeyBoardEventKey]?: T };

declare global {
  interface Window {
    score: number;
    keyDown: KeyDown<boolean>;
  }
}

export {};
