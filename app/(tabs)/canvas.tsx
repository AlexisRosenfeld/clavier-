import CanvasCircles from "@/components/CanvasCircles";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CirclesContext } from "./_layout";

export default function CanvasScreen() {
  const { circles, setCircles } = useContext(CirclesContext);
  const [nextType, setNextType] = useState("normal");
  // On injecte une version custom de setCircles qui ajoute le type voulu
  const handleSetCircles = (updater) => {
    if (typeof updater === "function") {
      setCircles((prev) => {
        const res = updater(prev);
        // Si on ajoute un cercle, on applique le type choisi
        if (Array.isArray(res) && res.length > prev.length) {
          const last = res[res.length - 1];
          if (last && (!last.type || last.type === "normal")) {
            res[res.length - 1] = { ...last, type: nextType };
          }
          setNextType("normal");
        }
        return res;
      });
    } else {
      setCircles(updater);
    }
  };
  return (
    <View style={styles.container}>
      <CanvasCircles circles={circles} setCircles={handleSetCircles} />
      {/* Bouton superposé */}
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8 }}>
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
        <View style={{ marginTop: 16, width: '100%', alignItems: 'flex-end' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 10, marginRight: 4, textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 4 }}>
            Touches particulières
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable
              style={[styles.button, nextType === "space" && { backgroundColor: '#27ae60' }]}
              onPress={() => setNextType("space")}
            >
              <Text style={styles.buttonText}>Espace</Text>
            </Pressable>
            <Pressable
              style={[styles.button, nextType === "shift" && { backgroundColor: '#27ae60' }]}
              onPress={() => setNextType("shift")}
            >
              <Text style={styles.buttonText}>Shift</Text>
            </Pressable>
            <Pressable
              style={[styles.button, nextType === "backspace" && { backgroundColor: '#27ae60' }]}
              onPress={() => setNextType("backspace")}
            >
              <Text style={styles.buttonText}>Backspace</Text>
            </Pressable>
          </View>
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
