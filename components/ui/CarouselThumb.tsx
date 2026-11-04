import React from "react";

type PropType = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, onClick, children } = props;

  return (
    <div className="h-full rounded-[inherit]">
      <button
        onClick={onClick}
        type="button"
        className={`focus-visible:ring-ring relative flex h-full w-full cursor-pointer overflow-hidden rounded-[inherit] transition-opacity focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
          selected ? "" : "opacity-60 hover:opacity-90"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-all ${
            selected ? "ring-wine/80 ring-2 ring-inset" : ""
          }`}
        />
        {children}
      </button>
    </div>
  );
};
