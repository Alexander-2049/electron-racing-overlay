const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      version="1.1"
      {...props}
    >
      <path d="M960 544H64a32 32 0 1 1 0-64h896a32 32 0 1 1 0 64" />
    </svg>
  );
};

export default MinimizeIcon;
