import { colors } from '../ant/colors';

export const cssVars = {
  '--accent': colors.blue7,
  '--light-accent': colors.blue3,
} as React.CSSProperties;


export const withCssVars = (Component: React.FC): React.FC => {
  return (props: any) => {
    return (
      <div style={cssVars}>
        <Component {...props} />
      </div>
    );
  };
};