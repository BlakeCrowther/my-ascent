import React from "react";

type PropType = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, onClick, children } = props;

  return (
    <div className="h-full">
      <button
        onClick={onClick}
        type="button"
        className="ring-offset-background focus-visible:ring-ring relative flex h-full w-full cursor-pointer overflow-hidden rounded-md transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div
          className={`absolute inset-0 rounded-md transition-all ${
            selected
              ? "border-wine/60 ring-wine/80 border-2 bg-white/10 ring-2 ring-offset-2 ring-offset-transparent"
              : "opacity-50 hover:opacity-75"
          }`}
        />
        {children}
      </button>
    </div>
  );
};
