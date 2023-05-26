import { styled, keyframes, css } from "solid-styled-components";

const SvgView = styled("svg")({});

export function spinRect(context) {
  return (props) => {
    const visibility = () => !props.invisible;
    const color = props.color || "black";
    const size = () => props.size || "36";
    return (
      <svg
        class={css`
          visibility: ${visibility() ? "visible" : "hidden"};
        `}
        {...props}
        version="1.1"
        id="L6"
        x="0px"
        y="0px"
        width={size()}
        height={size()}
        viewBox={`0 0 100 100`}
        enableBackground={`new 0 0 100 100`}
        role="img"
      >
        <rect
          fill="none"
          stroke={color}
          strokeWidth="4"
          x="25"
          y="25"
          width="50"
          height="50"
        >
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end"
          />
        </rect>
        <rect x="27" y="27" fill={color} width="46" height="50">
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50"
            to="0"
            id="rectBox"
            fill="freeze"
            begin="0s;strokeBox.end"
          />
        </rect>
      </svg>
    );
  };
}

export function spinCircle(context) {
  return (props) => {
    const visibility = () => !props.invisible;
    const size = () => props.size || "200";
    const duration = () => props.duration || "1300";

    return (
      <svg
        class={css`
          visibility: ${visibility() ? "visible" : "hidden"};
        `}
        {...props}
        width={size()}
        height={size()}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          <linearGradient id="spinner-secondHalf">
            <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
            <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
          </linearGradient>
          <linearGradient id="spinner-firstHalf">
            <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
            <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
          </linearGradient>
        </defs>

        <g stroke-width="8">
          <path
            stroke="url(#spinner-secondHalf)"
            d="M 4 100 A 96 96 0 0 1 196 100"
          />
          <path
            stroke="url(#spinner-firstHalf)"
            d="M 196 100 A 96 96 0 0 1 4 100"
          />

          <path
            stroke="currentColor"
            stroke-linecap="round"
            d="M 4 100 A 96 96 0 0 1 4 98"
          />
        </g>

        <animateTransform
          from="0 0 0"
          to="360 0 0"
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur={duration() + "ms"}
        />
      </svg>
    );
  };
}

const arrow = (context) => {
  const anim = keyframes`
    90%,100% {
        flex-grow: 1;
        }
    `;

  return styled("div")((props) => {
    const width = () => props?.width || 100;
    const height = () => props.height || 30;
    const color = () => props.color || "midnightblue";

    return {
      width: `${width()}px`,
      height: `${height()}px`,
      display: "flex",
      "&:before": {
        content: '""',
        background: `${color()}`,
        width: "15px",
        clipPath: `polygon(
        0 10px,
        calc(100% - 15px) 10px,
        calc(100% - 15px) 0,
        100% 50%,
        calc(100% - 15px) 100%,
        calc(100% - 15px) calc(100% - 10px),
        0 calc(100% - 10px)
      )`,
        animation: `${anim} 2.5s infinite linear`,
      },
    };
  });
};

const classic = () => {
  return styled("div")((props) => {
    const size = () => props?.size || 50;
    const color1 = () => props?.color1 || "midnightblue";
    const color2 = () => props.color2 || "bisque";

    const anim = keyframes`     
    100% {
        transform: rotate(.5turn);
        }
    `;
    return {
      width: `${size()}px`,
      aspectRatio: 1,
      borderRadius: "50%",
      background: `repeating-conic-gradient(${color1()} 0 90deg, ${color2()} 0 180deg)`,
      animation: `${anim} 1s infinite linear`,
    };
  });
};

const loadingMsg = (context) =>
  styled("div")((props) => {
    const msg = () => props?.msg || "working...";
    const size = () => props?.size || 40;

    // const len = () => msg().length;

    const trail = keyframes`
      to {
        clip-path: inset(0 -1ch 0 0);
      }
    `;

    return {
      fontWeight: "bold",
      fontFamily: "monospace",
      fontSize: `${size()}px`,
      clipPath: `inset(0 4ch 0 0)`,
      animation: `${trail} 2s steps(5) infinite`,
      "&:before": {
        content: `"${msg()}"`,
      },
    };
  });

const spinCirclePart = () =>
  styled("div")((props) => {
    const rotate = keyframes`
    to {
      transform: rotate(1turn);
    };
  `;
    return {
      width: `${props.size}px`,
      aspectRatio: 1,
      borderRadius: "50%",
      border: `8px solid ${props.color1}`,
      borderRightColor: props.color2,
      animation: `${rotate}  2s infinite linear`,
    };
  });

const charging = (context) => {
  return styled("div")((props) => {
    const width = () => props?.width || 40;
    const height = () => props?.height || 15;
    const color = () => props?.color || "midnightblue";

    const kf = keyframes`
    100% {
        background-size:120%;
    }  
    `;

    return {
      width: `${width()}px`,
      height: `${height()}px`,
      border: `2px solid ${color()}`,
      borderRightColor: "transparent",
      padding: "3px",
      background: `repeating-linear-gradient(
        90deg,
        ${color()} 0 10px,
        #0000 0 15px
      )
      0/0% no-repeat content-box content-box`,
      position: "relative",
      animation: `${kf} 2s infinite steps(6)`,
      "&:before": {
        content: '""',
        position: "absolute",
        top: "-2px",
        bottom: "-2px",
        left: "100%",
        width: "10px",
        background: `linear-gradient(
            #0000 calc(50% - 7px),
            ${color()} 0 calc(50% - 5px),
            #0000 0 calc(50% + 5px),
            ${color()} 0 calc(50% + 7px),
            #0000 0
          )
          left / 100% 100%,
        linear-gradient(
          ${color()} calc(50% - 5px),
            #0000 0 calc(50% + 5px),
            ${color()} 0
          )
          left / 2px 100%,
        linear-gradient(
            #0000 calc(50% - 5px),
            ${color()} 0 calc(50% + 5px),
            #0000 0
          )
          right/2px 100%`,
        backgroundRepeat: "no-repeat",
      },
    };
  });
};

export { spinCirclePart, loadingMsg, charging, classic, arrow };
