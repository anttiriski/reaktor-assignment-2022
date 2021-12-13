interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

const ScissorsIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 54 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="14" cy="60" r="8.5" stroke="black" strokeWidth="3" />
      <circle cx="40" cy="60" r="8.5" stroke="black" strokeWidth="3" />
      <line
        x1="2.08553"
        y1="2.38801"
        x2="35.388"
        y2="50.9145"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="18.612"
        y1="50.915"
        x2="51.9137"
        y2="2.38803"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ScissorsIcon;
