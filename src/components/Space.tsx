type SpaceProps = {
  size?: 2 | 4 | 8;
};

const Space: React.FC<SpaceProps> = ({ size = 4 }) => {
  switch (size) {
    case 2:
      return <div className="w-full mt-2" />;
    case 8:
      return <div className="w-full mt-8" />;
    case 4:
    default:
      return <div className="w-full mt-4" />;
  }
};

export default Space;
