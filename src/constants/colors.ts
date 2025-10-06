import { colors as antColors } from '@ant/colors';
import { blue, gold, green, grey, red  } from '@ant-design/colors';

export const colors = {
  // main
  '--accent': blue[6],
  '--light-accent': blue[2],

  // backgrounds
  '--background': antColors.colorWhite,
  '--background-accent': blue[1],
  '--background-light': '#f0f0f0',

  // text
  '--text-primary': grey[9],
  '--text-secondary': grey[7],
  '--text-invert':  antColors.colorWhite,

  // positive
  '--success': green[6],
  '--success-light': green[2],

  // warning
  '--warning': gold[6],
  '--warning-light': gold[2],

  // error
  '--danger': red[5],
  '--danger-light': red[2],

  // borders
  '--border': grey[3],
  '--border-strong': grey[4],
} as const;
