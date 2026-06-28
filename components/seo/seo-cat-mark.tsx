const catMarkStyles = {
  apple: {
    face: {
      border: '8px solid currentColor',
      borderRadius: '44% 44% 50% 50%',
      display: 'flex',
      height: '92px',
      position: 'relative',
      width: '108px',
    },
    leftEar: {
      borderLeft: '8px solid currentColor',
      borderTop: '8px solid currentColor',
      height: '32px',
      left: '4px',
      position: 'absolute',
      top: '-18px',
      transform: 'rotate(20deg)',
      width: '32px',
    },
    leftEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '8px',
      left: '30px',
      position: 'absolute',
      top: '36px',
      width: '8px',
    },
    nose: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '10px',
      left: '49px',
      position: 'absolute',
      top: '58px',
      width: '10px',
    },
    rightEar: {
      borderRight: '8px solid currentColor',
      borderTop: '8px solid currentColor',
      height: '32px',
      position: 'absolute',
      right: '4px',
      top: '-18px',
      transform: 'rotate(-20deg)',
      width: '32px',
    },
    rightEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '8px',
      position: 'absolute',
      right: '30px',
      top: '36px',
      width: '8px',
    },
  },
  favicon: {
    face: {
      border: '2px solid currentColor',
      borderRadius: '44% 44% 50% 50%',
      display: 'flex',
      height: '18px',
      position: 'relative',
      width: '21px',
    },
    leftEar: {
      borderLeft: '2px solid currentColor',
      borderTop: '2px solid currentColor',
      height: '7px',
      left: '1px',
      position: 'absolute',
      top: '-4px',
      transform: 'rotate(20deg)',
      width: '7px',
    },
    leftEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '2px',
      left: '6px',
      position: 'absolute',
      top: '7px',
      width: '2px',
    },
    nose: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '2.5px',
      left: '9.25px',
      position: 'absolute',
      top: '11px',
      width: '2.5px',
    },
    rightEar: {
      borderRight: '2px solid currentColor',
      borderTop: '2px solid currentColor',
      height: '7px',
      position: 'absolute',
      right: '1px',
      top: '-4px',
      transform: 'rotate(-20deg)',
      width: '7px',
    },
    rightEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '2px',
      position: 'absolute',
      right: '6px',
      top: '7px',
      width: '2px',
    },
  },
  og: {
    face: {
      border: '5px solid currentColor',
      borderRadius: '44% 44% 50% 50%',
      display: 'flex',
      height: '58px',
      position: 'relative',
      width: '68px',
    },
    leftEar: {
      borderLeft: '5px solid currentColor',
      borderTop: '5px solid currentColor',
      height: '20px',
      left: '3px',
      position: 'absolute',
      top: '-12px',
      transform: 'rotate(20deg)',
      width: '20px',
    },
    leftEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '5px',
      left: '19px',
      position: 'absolute',
      top: '23px',
      width: '5px',
    },
    nose: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '6px',
      left: '31px',
      position: 'absolute',
      top: '36px',
      width: '6px',
    },
    rightEar: {
      borderRight: '5px solid currentColor',
      borderTop: '5px solid currentColor',
      height: '20px',
      position: 'absolute',
      right: '3px',
      top: '-12px',
      transform: 'rotate(-20deg)',
      width: '20px',
    },
    rightEye: {
      background: 'currentColor',
      borderRadius: '999px',
      height: '5px',
      position: 'absolute',
      right: '19px',
      top: '23px',
      width: '5px',
    },
  },
} as const;

type SeoCatMarkProps = {
  variant: keyof typeof catMarkStyles;
};

export function SeoCatMark({ variant }: SeoCatMarkProps) {
  const styles = catMarkStyles[variant];

  return (
    <div style={styles.face}>
      <div style={styles.leftEar} />
      <div style={styles.rightEar} />
      <div style={styles.leftEye} />
      <div style={styles.rightEye} />
      <div style={styles.nose} />
    </div>
  );
}
