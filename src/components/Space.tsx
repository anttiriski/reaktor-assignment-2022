type SpaceProps = {
  size?: 2 | 4 | 8;
};

const Space: React.FC<SpaceProps> = ({ size = 4 }) => {
  const classes = `w-full mt-${size}`;
  return <div className={classes} />;
};

export default Space;
