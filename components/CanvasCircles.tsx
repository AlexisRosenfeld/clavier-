import React, { useRef, useState } from "react";
import { PanResponder, Pressable, StyleSheet, View } from "react-native";


// On reçoit maintenant circles et setCircles en props
export default function CanvasCircles({ circles, setCircles }) {
      // Pour stocker le move en attente si dragOffset n'est pas prêt
      const pendingMove = useRef(null);
    // Pour ignorer le premier move si dragOffset n'est pas prêt
    const moveBlocked = useRef(false);
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);
  const panResponders = useRef([]);

  const addCircleAt = (x, y) => {
    setCircles((prev) => [...prev, { x, y, r: 30 }]);
  };

  // Création des PanResponders pour chaque cercle
  panResponders.current = circles.map((c, i) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setDragIndex(i);
        setPressedIndex(i);
        setDragOffset(null); // On attend la mesure
        moveBlocked.current = true;
        pendingMove.current = null;
        if (containerRef.current) {
          containerRef.current.measure((fx, fy, width, height, px, py) => {
            setDragOffset({
              x: gestureState.x0 - (c.x + px),
              y: gestureState.y0 - (c.y + py),
              containerX: px,
              containerY: py,
            });
            moveBlocked.current = false;
            // Si un move est en attente, on l'applique maintenant
            if (pendingMove.current) {
              setCircles((prev) => {
                const newCircles = [...prev];
                newCircles[i] = {
                  ...newCircles[i],
                  x: pendingMove.current.moveX - px - (gestureState.x0 - (c.x + px)),
                  y: pendingMove.current.moveY - py - (gestureState.y0 - (c.y + py)),
                };
                return newCircles;
              });
              pendingMove.current = null;
            }
          });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Si dragOffset n'est pas prêt, on stocke le move en attente
        if (
          dragIndex === null ||
          moveBlocked.current
        ) return;
        if (!dragOffset || dragOffset.containerX === undefined || dragOffset.containerY === undefined || dragOffset.x === undefined || dragOffset.y === undefined) {
          pendingMove.current = { moveX: gestureState.moveX, moveY: gestureState.moveY };
          return;
        }
        setCircles((prev) => {
          const newCircles = [...prev];
          newCircles[i] = {
            ...newCircles[i],
            x: gestureState.moveX - dragOffset.containerX - dragOffset.x,
            y: gestureState.moveY - dragOffset.containerY - dragOffset.y,
          };
          return newCircles;
        });
      },
      onPanResponderRelease: () => {
        // On ne touche pas à la position du bouton, il reste là où il est
        setDragIndex(null);
        setPressedIndex(null);
        setDragOffset(null);
        moveBlocked.current = false;
        pendingMove.current = null;
      },
      onPanResponderTerminate: () => {
        // Idem, on ne touche pas à la position
        setDragIndex(null);
        setPressedIndex(null);
        setDragOffset(null);
        moveBlocked.current = false;
        pendingMove.current = null;
      },
    })
  );

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
        {/* Calque de dessin avec Pressable circulaires */}
        <View style={{ position: "absolute", left: 0, top: 0, width: layout.width, height: layout.height ,backgroundColor: 'black' }} pointerEvents="box-none">
          {Array.isArray(circles) && circles.map((c, i) => (
            <View
              key={i}
              style={[
                styles.circle,
                {
                  position: 'absolute',
                  left: c.x - 35,
                  top: c.y - 35,
                  width: 70,
                  height: 70,
                  backgroundColor: pressedIndex === i ? '#cccccc' : '#f8fdffff',
                }
              ]}
              {...(panResponders.current[i] ? panResponders.current[i].panHandlers : {})}
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