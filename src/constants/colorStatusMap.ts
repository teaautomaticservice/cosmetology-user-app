import { BadgeProps } from 'antd';

export type ColorStatus = 'created' |
  'active' |
  'disabled' |
  'deactivated' |
  'freezed';

export const colorStatusMap: Record<ColorStatus, BadgeProps['color']> = {
  'created': 'yellow',
  'active': 'green',
  'disabled': 'red',
  'deactivated': 'red',
  'freezed': 'blue',
};

export const getColorStatus = <T extends ColorStatus>(status: T):  BadgeProps['color'] => {
  if (status in colorStatusMap) {
    return colorStatusMap[status];
  }

  return 'purple';
};
