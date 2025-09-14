export interface Caption {
  text: string;
  start: number;
  end: number;
  top: number;   // %
  left?: number;  // %
  right?: number;  // %
  scale: number; // required now
  rotate?: number;
  fadeOut?: number;
}
