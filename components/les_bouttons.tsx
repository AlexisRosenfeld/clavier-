import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function LesBouttons({ circles }) {
  // On utilise les dimensions de la fenêtre pour le canevas
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.absoluteContainer, { width, height }]}> 
      {circles.map((c, i) => (
        <Pressable
          key={i}
          style={[styles.button, { position: 'absolute', left: c.x - 30, top: c.y - 30 }]}
          onPress={() => alert(`Bouton cercle #${i}`)}
        >
          <Text style={styles.buttonText}>{`Cercle ${i + 1}`}</Text>
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
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 60,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
