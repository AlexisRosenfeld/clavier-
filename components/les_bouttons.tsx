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
      {circles.map((c, i) => (
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
      ))}
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
  buttonText: {
    color: '#191717ff',
    fontWeight: 'bold',
  },
});
