interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

const RockIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 88 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48.25 3.18579L81.5513 22.4123C84.1812 23.9307 85.8013 26.7367 85.8013 29.7735V68.2265C85.8013 71.2633 84.1812 74.0693 81.5513 75.5877L48.25 94.8142C45.6201 96.3326 42.3799 96.3326 39.75 94.8142L6.44873 75.5877C3.81882 74.0693 2.19873 71.2633 2.19873 68.2265V29.7735C2.19873 26.7367 3.81882 23.9307 6.44873 22.4123L39.75 3.18579C42.3799 1.66741 45.6201 1.66741 48.25 3.18579Z"
        stroke="black"
        stroke-width="3"
      />
      <line
        x1="17.5211"
        y1="30.1221"
        x2="39.5211"
        y2="18.1221"
        stroke="black"
        stroke-width="2"
      />
      <line
        x1="17.5211"
        y1="42.1221"
        x2="39.5211"
        y2="30.1221"
        stroke="black"
        stroke-width="2"
      />
    </svg>
  );
};

export default RockIcon;
