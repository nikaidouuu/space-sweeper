declare global {
  interface Window {
    score: number;
  }
}

declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
declare module '*.wav'
declare module '*.ogg'
declare module '*.mp3'

export {};
