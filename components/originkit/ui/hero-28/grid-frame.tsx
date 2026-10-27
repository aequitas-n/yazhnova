"use client";

const RULE = "bg-[#1f1f1f]";
const TICK = "bg-[#4c4c4c]";

const RAIL_L = "left-[32px] ipad:left-[62px] desktop-sm:left-[80px]";
const RAIL_R = "right-[32px] ipad:right-[62px] desktop-sm:right-[80px]";

type TickVariant = "cross" | "arm" | "tee";

type Rule = {
  y: string;
  end: TickVariant;

  centre?: TickVariant;

  anchor?: "bottom";
};

const RULES: Rule[] = [
  {
    y: "top-[42px] ipad:top-[62px] desktop-sm:top-[80px]",
    end: "cross",
    centre: "tee",
  },
  {
    y: "top-[95px] ipad:top-[136px] desktop-sm:top-[173px]",
    end: "arm",
    centre: "cross",
  },
  { y: "top-[485px] ipad:top-[551px] desktop-sm:hidden", end: "arm" },
  { y: "top-[537px] ipad:top-[622px] desktop-sm:hidden", end: "arm" },
  {
    y: "top-[857px] ipad:top-[1024px] desktop-sm:top-auto desktop-sm:bottom-[167px]",
    end: "arm",
    centre: "cross",
    anchor: "bottom",
  },
  {
    y: "top-[1097px] ipad:top-[1148px] desktop-sm:top-auto desktop-sm:bottom-[37px]",
    end: "arm",
    centre: "cross",
    anchor: "bottom",
  },
  { y: "top-[1187px] ipad:top-[1281px] desktop-sm:hidden", end: "arm" },
];

const DOT_TILE = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="51.58" height="45.28"><rect width="29.11" height="29.22" rx="4.2" fill="#909090" fill-opacity="0.1"/></svg>',
)}")`;

const BAND = `absolute bg-[length:5.158px_4.528px] left-[32px] right-[32px] ipad:left-[62px] ipad:right-[62px] desktop-sm:left-[80px] desktop-sm:right-[80px]`;

type TickProps = {
  variant: TickVariant;

  flip?: boolean;
  anchor?: "bottom";
  className: string;
};

const Tick = ({ variant, flip = false, anchor, className }: TickProps) => {
  const centreOnRule =
    anchor === "bottom"
      ? "-translate-y-1/2 desktop-sm:translate-y-1/2"
      : "-translate-y-1/2";

  if (variant === "tee") {
    return (
      <span className={`absolute h-2.5 w-5 -translate-x-1/2 ${className}`}>
        <span className={`${TICK} absolute top-0 left-0 h-px w-full`} />
        <span
          className={`${TICK} absolute top-0 left-1/2 h-full w-px -translate-x-1/2`}
        />
      </span>
    );
  }

  if (variant === "cross") {
    return (
      <span
        className={`absolute size-4 ipad:size-5 ${centreOnRule} ${
          flip ? "translate-x-1/2" : "-translate-x-1/2"
        } ${className}`}
      >
        <span
          className={`${TICK} absolute top-0 left-1/2 h-full w-px -translate-x-1/2`}
        />
        <span
          className={`${TICK} absolute top-1/2 left-0 h-px w-full -translate-y-1/2`}
        />
      </span>
    );
  }

  return (
    <span
      className={`absolute h-4 w-2 ipad:h-5 ipad:w-2.5 ${centreOnRule} ${className}`}
    >
      <span
        className={`${TICK} absolute top-1/2 left-0 h-px w-full -translate-y-1/2`}
      />
      <span
        className={`${TICK} absolute top-0 h-full w-px ${flip ? "right-0" : "left-0"}`}
      />
    </span>
  );
};

export const GridRails = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-full max-w-[402px] -translate-x-1/2 ipad:max-w-[744px] desktop-sm:max-w-[1920px]"
  >
    <div className={`${RULE} absolute inset-y-0 w-px ${RAIL_L}`} />
    <div className={`${RULE} absolute inset-y-0 w-px ${RAIL_R}`} />
    <div
      className={`${RULE} absolute top-[80px] bottom-0 left-1/2 hidden w-px -translate-x-1/2 desktop-sm:block`}
    />
  </div>
);

export const GridFrame = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
    {}
    {RULES.map((rule) => (
      <div
        key={rule.y}
        className={`${RULE} absolute inset-x-0 h-px ${rule.y}`}
      />
    ))}

    <div className="relative mx-auto h-full w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1920px]">
      {}
      <div
        className={`${BAND} top-[42px] h-[53px] ipad:top-[62px] ipad:h-[74px] desktop-sm:top-[80px] desktop-sm:h-[93px]`}
        style={{ backgroundImage: DOT_TILE }}
      />
      <div
        className={`${BAND} top-[485px] h-[52px] ipad:top-[551px] ipad:h-[71px] desktop-sm:hidden`}
        style={{ backgroundImage: DOT_TILE }}
      />

      {RULES.map((rule) => (
        <div key={rule.y} className="contents">
          <Tick
            variant={rule.end}
            anchor={rule.anchor}
            className={`${rule.y} ${RAIL_L}`}
          />
          <Tick
            variant={rule.end}
            flip
            anchor={rule.anchor}
            className={`${rule.y} ${RAIL_R}`}
          />
          {rule.centre ? (
            <Tick
              variant={rule.centre}
              anchor={rule.anchor}
              className={`left-1/2 hidden desktop-sm:block ${rule.y}`}
            />
          ) : null}
        </div>
      ))}
    </div>
  </div>
);