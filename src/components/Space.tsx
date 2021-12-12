type SpaceProps = {
  size?: 2 | 4 | 8;
};

const Space: React.FC<SpaceProps> = ({ size = 4 }) => {
  return <div className={`w-full mt-${size}`}></div>;
};

export default Space;
