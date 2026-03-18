"use client";

import { useEffect, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function LiquidMetalButton({
  label,
  onClick,
  disabled = false,
  fullWidth = true,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMountRef = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    let mounted = true;

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import("@paper-design/shaders");

        if (!mounted || !shaderRef.current) return;

        if (shaderMountRef.current?.destroy) {
          shaderMountRef.current.destroy();
        }

        shaderMountRef.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.15,
            u_shiftBlue: 0.35,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 6,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.4,
        );
      } catch (error) {
        console.error("Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      mounted = false;
      if (shaderMountRef.current?.destroy) {
        shaderMountRef.current.destroy();
        shaderMountRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    shaderMountRef.current?.setSpeed?.(1.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMountRef.current?.setSpeed?.(0.4);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (shaderMountRef.current?.setSpeed) {
      shaderMountRef.current.setSpeed(2.4);
      setTimeout(() => {
        shaderMountRef.current?.setSpeed?.(isHovered ? 1.2 : 0.4);
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : "inline-block"}`}>
      <div style={{ perspective: "800px" }}>
        <div
          className={`relative ${fullWidth ? "w-full" : ""}`}
          style={{
            height: "52px",
            transformStyle: "preserve-3d",
            transition: "transform 0.3s ease",
            transform: isPressed ? "scale(0.97)" : "scale(1)",
          }}
        >
          {/* Text layer */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${fullWidth ? "w-full" : ""}`}
            style={{
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{
                color: disabled ? "#aaa" : "#ffffff",
                textShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
              }}
            >
              {label}
            </span>
          </div>

          {/* Inner navy layer */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(10px)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              className={fullWidth ? "w-full" : ""}
              style={{
                height: "48px",
                margin: "2px",
                borderRadius: "14px",
                background: "linear-gradient(180deg, #1a3580 0%, #0f2058 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4)"
                  : "none",
                transition: "box-shadow 0.15s ease",
              }}
            />
          </div>

          {/* Shader layer */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(0px)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div
              className={fullWidth ? "w-full" : ""}
              style={{
                height: "52px",
                borderRadius: "14px",
                boxShadow: isHovered
                  ? "0px 0px 0px 1px rgba(20, 43, 111, 0.4), 0px 8px 16px rgba(20, 43, 111, 0.2)"
                  : "0px 0px 0px 1px rgba(20, 43, 111, 0.15), 0px 4px 12px rgba(20, 43, 111, 0.1)",
                transition: "box-shadow 0.3s ease",
                overflow: "hidden",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: "52px",
                  opacity: disabled ? 0.3 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Clickable overlay */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            disabled={disabled}
            className={`absolute inset-0 ${fullWidth ? "w-full" : ""} bg-transparent border-none outline-none overflow-hidden`}
            style={{
              zIndex: 40,
              cursor: disabled ? "not-allowed" : "pointer",
              borderRadius: "14px",
              height: "52px",
            }}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
