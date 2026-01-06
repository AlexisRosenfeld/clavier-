import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function LesBouttons({ circles, text, setText }) {
  const { width, height } = useWindowDimensions();
  // Mapping QWERTZ (26 lettres, sans accents ni chiffres)
  const qwertz = [
    'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Y', 'X', 'C', 'V', 'B', 'N', 'M'
  ];

  return (
    <View style={[styles.absoluteContainer, { width, height }]}> 
      {/* Affichage du texte saisi */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text || 'Tapez sur les cercles...'}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.resetButton,
            pressed && { backgroundColor: '#c0392b' }
          ]}
          onPress={() => setText("")}
        >
          <Text style={styles.resetButtonText}>Reset texte</Text>
        </Pressable>
      </View>
      {circles.map((c, i) => {
        if (c.type === "normal" || !c.type) {
          return (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.button,
                { position: 'absolute', left: c.x - 30, top: c.y - 30 },
                pressed && { backgroundColor: 'black' }
              ]}
              onPress={() => {
                const letter = qwertz[i % qwertz.length];
                setText((prev) => prev + letter);
              }}
            >
              <Text style={styles.buttonText}>{qwertz[i % qwertz.length]}</Text>
            </Pressable>
          );
        } else if (c.type === "space") {
          return (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.button,
                styles.spaceButton,
                { position: 'absolute', left: c.x - 75, top: c.y - 30, backgroundColor: '#eee' },
                pressed && { backgroundColor: 'black' }
              ]}
              onPress={() => setText((prev) => prev + ' ')}
            >
              <Text style={styles.buttonText}>␣</Text>
            </Pressable>
          );
        } else if (c.type === "backspace") {
          return (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.button,
                styles.backspaceButton,
                { position: 'absolute', left: c.x - 60, top: c.y - 30, backgroundColor: '#eee' },
                pressed && { backgroundColor: 'black' }
              ]}
              onPress={() => setText((prev) => prev.slice(0, -1))}
            >
              <Text style={styles.buttonText}>⌫</Text>
            </Pressable>
          );
        } else if (c.type === "shift") {
          return (
            <Pressable
              key={i}
              style={({ pressed }) => [
                styles.button,
                styles.shiftButton,
                { position: 'absolute', left: c.x - 30, top: c.y - 50, backgroundColor: '#eee' },
                pressed && { backgroundColor: 'black' }
              ]}
              // Ajoutez ici la logique shift si besoin
            >
              <Text style={styles.buttonText}>⇧</Text>
            </Pressable>
          );
        }
        return null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    flex: 1,
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
    paddingBottom: 16,
  },
  text: {
      resetButton: {
        marginTop: 8,
        alignSelf: 'flex-end',
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        zIndex: 30,
      },
      resetButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
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
  spaceButton: {
    minWidth: 150,
    width: 150,
    maxWidth: 200,
  },
  backspaceButton: {
    minWidth: 120,
    width: 120,
    maxWidth: 150,
  },
  shiftButton: {
    minHeight: 100,
    height: 100,
    maxHeight: 120,
  },
  buttonText: {
    color: '#191717ff',
    fontWeight: 'bold',
  },
});
