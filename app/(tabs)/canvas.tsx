import CanvasCircles from "@/components/CanvasCircles";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CirclesContext } from "./_layout";

export default function CanvasScreen() {
  const { circles, setCircles } = useContext(CirclesContext);
  return (
    <View style={styles.container}>
      <CanvasCircles circles={circles} setCircles={setCircles} />
      {/* Bouton superposé */}
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                style={[styles.button, { backgroundColor: '#e67e22' }]}
                onPress={() => setCircles(prev => prev.slice(0, -1))}
                disabled={circles.length === 0}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => setCircles([])}>
                <Text style={styles.buttonText}>Vider</Text>
              </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  overlay: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    width: '100%',
    alignItems: 'flex-end',
    pointerEvents: 'box-none',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
