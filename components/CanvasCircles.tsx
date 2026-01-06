import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";


// On reçoit maintenant circles et setCircles en props
export default function CanvasCircles({ circles, setCircles }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const addCircleAt = (x, y) => {
    setCircles((prev) => [...prev, { x, y, r: 30 }]);
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
          addCircleAt(locationX, locationY, "normal");
        }}
      >
        {/* Calque de dessin avec Pressable circulaires */}
        <View style={{ position: "absolute", left: 0, top: 0, width: layout.width, height: layout.height ,backgroundColor: 'black' }} pointerEvents="box-none">
          {Array.isArray(circles) && circles.map((c, i) => (
            <Pressable
              key={i}
              style={[
                styles.circle,
                {
                  position: 'absolute',
                  left: c.x - 35,
                  top: c.y - 35,
                  width: 70,
                  height: 70,
                }
              ]}
              // Ajoute ici une interaction si besoin
            />
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
     circle: {
       backgroundColor: '#f8fdffff',
       borderRadius: 30,
       borderColor: '#191717ff',
       // width, height, borderRadius sont ajoutés dynamiquement
     },
   button: {
    backgroundColor: '#f8fdffff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    minHeight: 70,
  },
});