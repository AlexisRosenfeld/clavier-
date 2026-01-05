import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

// On reçoit maintenant circles et setCircles en props
export default function CanvasCircles({ circles, setCircles }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  // Si pas de props, fallback à un state local
  const [localCircles, localSetCircles] = useState([]);
  const circlesSafe = circles ?? localCircles;
  const setCirclesSafe = setCircles ?? localSetCircles;

  const addCircleAt = (x, y) => {
    setCirclesSafe((prev) => [...prev, { x, y, r: 30 }]);
  };

  return (
    <View
      ref={containerRef}
      style={{ flex: 1 }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setLayout({ width, height });
      }}
    >
      {/* Zone de capture des taps */}
      <Pressable
        style={{ flex: 1 }}
        onPressIn={(e) => {
          const { locationX, locationY } = e.nativeEvent;
          addCircleAt(locationX, locationY);
        }}
      >
        {/* Calque de dessin */}
        <Svg
          width={layout.width}
          height={layout.height}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {Array.isArray(circlesSafe) && circlesSafe.map((c, i) => (
            <Circle
              key={i}
              cx={c.x}
              cy={c.y}
              r={c.r}
              stroke="black"
              strokeWidth={2}
              fill="transparent"
            />
          ))}
        </Svg>
      </Pressable>
    </View>
  );
}
