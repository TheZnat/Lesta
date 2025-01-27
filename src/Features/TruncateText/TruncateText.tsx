import React, { useEffect, useRef, useState } from "react";
import { TruncateTextProps } from "./TruncateTextProps";

const TruncateText: React.FC<TruncateTextProps> = ({ text, className }) => {
  const [truncatedText, setTruncatedText] = useState(text);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const truncate = () => {
      const element = textRef.current;
      if (!element) return;

      element.textContent = text;

      if (
        element.scrollHeight <= element.clientHeight &&
        element.scrollWidth <= element.clientWidth
      ) {
        setTruncatedText(text);
        return;
      }

      let truncated = text;

      while (
        truncated.length > 0 &&
        (element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth)
      ) {
        truncated = truncated.slice(0, -1);
        element.textContent = `${truncated}...`;
      }

      setTruncatedText(`${truncated}...`);
    };

    truncate();

    window.addEventListener("resize", truncate);
    return () => {
      window.removeEventListener("resize", truncate);
    };
  }, [text]);

  return (
    <div ref={textRef} className={className} title={text}>
      {truncatedText}
    </div>
  );
};

export default TruncateText;
