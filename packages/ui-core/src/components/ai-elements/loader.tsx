import { cn } from "../../lib/utils";
import type { HTMLAttributes } from "react";
import { useState, useEffect, useRef } from "react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  Labels?: Array<string>;
  maxRotationTime?: number; // Time in milliseconds before stopping rotation
};

export const Loader = ({ 
  className, 
  size = 16, 
  Labels = ["Understanding Query", "Analyzing", "Thinking", "Collecting Data", "Generating Response"],
  maxRotationTime = 12500, // Default 12.5 seconds
  ...props 
}: LoaderProps) => {
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (Labels.length <= 1) return;

    const rotateLabels = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Stop rotating after maxRotationTime and show last label
      if (elapsed >= maxRotationTime) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        // Set to last label in array
        setCurrentLabelIndex(Labels.length - 1);
        setIsVisible(true);
        return;
      }

      setIsVisible(false);
      
      setTimeout(() => {
        const elapsedAfterDelay = Date.now() - startTimeRef.current;
        // Double-check time before updating (in case delay caused us to exceed limit)
        if (elapsedAfterDelay < maxRotationTime) {
          setCurrentLabelIndex((prev) => (prev + 1) % Labels.length);
          setIsVisible(true);
        } else {
          // If we exceeded time during fade, show last label
          setCurrentLabelIndex(Labels.length - 1);
          setIsVisible(true);
        }
      }, 300); // Fade out duration
    };

    // Start rotation
    intervalRef.current = setInterval(rotateLabels, 2500);

    // Set a timeout to stop rotation and show last label after maxRotationTime
    const timeoutId = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentLabelIndex(Labels.length - 1);
      setIsVisible(true);
    }, maxRotationTime);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearTimeout(timeoutId);
    };
  }, [Labels.length, maxRotationTime]);

  const currentLabel = Labels[currentLabelIndex] || Labels[Labels.length - 1];

  return (
    <div
      className={cn(
        "ai-loader-wrapper inline-flex items-center justify-center",
        className
      )}
      aria-label="Loading"
      role="status"
      style={{ ["--loader-dot-size" as string]: `${size / 2}px` }}
      {...props}
    >
      <div className="ai-loader-content">
        <span 
          className={cn(
            "ai-loader-text text-sm font-medium transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {currentLabel}
        </span>
        <div className="ai-loader-dots">
          <span className="ai-loader-dot ai-loader-dot-1" />
          <span className="ai-loader-dot ai-loader-dot-2" />
          <span className="ai-loader-dot ai-loader-dot-3" />
        </div>
      </div>
    </div>
  );
};
