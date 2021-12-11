interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

const PaperIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 66 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.5"
        y="1.5"
        width="63"
        height="86"
        rx="3.5"
        stroke="black"
        stroke-width="3"
      />
      <line x1="11" y1="12" x2="55" y2="12" stroke="black" stroke-width="2" />
      <line x1="11" y1="53" x2="33" y2="53" stroke="black" stroke-width="2" />
      <line x1="11" y1="44" x2="55" y2="44" stroke="black" stroke-width="2" />
      <line x1="11" y1="33" x2="55" y2="33" stroke="black" stroke-width="2" />
      <line x1="11" y1="22" x2="55" y2="22" stroke="black" stroke-width="2" />
    </svg>
  );
};

export default PaperIcon;
