import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Mode = "menu" | "story" | "tournament";

export default function App() {
  const [mode, setMode] = useState<Mode>("menu");
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const resetFight = () => {
    setPlayerHealth(100);
    setEnemyHealth(100);
  };

  const attack = (damage: number) => {
    setEnemyHealth((health) => Math.max(0, health - damage));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar hidden />
      <View style={styles.topBar}>
        <Text style={styles.brand}>SHADOW <Text style={styles.gold}>CLASH</Text></Text>
        <Text style={styles.tag}>OFFLINE FIGHTING ARENA</Text>
      </View>

      {mode === "menu" ? (
        <View style={styles.menu}>
          <Text style={styles.eyebrow}>ENTER THE ARENA</Text>
          <Text style={styles.title}>Choose your battle</Text>
          <Text style={styles.subtitle}>Train. Fight. Unlock new warriors.</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => { resetFight(); setMode("story"); }}>
              <Text style={styles.buttonTitle}>STORY MODE</Text>
              <Text style={styles.buttonHint}>Fight through the shadows</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => { resetFight(); setMode("tournament"); }}>
              <Text style={styles.buttonTitle}>TOURNAMENT</Text>
              <Text style={styles.buttonHint}>Prove you are the champion</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.arena}>
          <View style={styles.arenaHeader}>
            <Text style={styles.modeLabel}>{mode === "story" ? "STORY MODE · FIGHT 1" : "TOURNAMENT · ROUND 1"}</Text>
            <TouchableOpacity onPress={() => setMode("menu")}><Text style={styles.back}>MAIN MENU</Text></TouchableOpacity>
          </View>
          <View style={styles.healthRow}>
            <View style={styles.healthBox}><Text style={styles.fighterName}>SHADOW</Text><View style={styles.healthTrack}><View style={[styles.healthFill,{width:playerHealth+"%"}]}/></View></View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.healthBox}><Text style={[styles.fighterName,{textAlign:"right"}]}>RIVAL</Text><View style={styles.healthTrack}><View style={[styles.enemyFill,{width:enemyHealth+"%"}]}/></View></View>
          </View>
          <View style={styles.stage}>
            <Text style={styles.fighter}>🥷</Text><Text style={styles.stageVs}>⚔</Text><Text style={styles.fighter}>🥷</Text>
            <Text style={styles.stageText}>{enemyHealth === 0 ? "VICTORY!" : "THE BATTLE BEGINS"}</Text>
          </View>
          <View style={styles.controls}>
            {[[ "PUNCH", 8 ],[ "KICK", 12 ],[ "SPECIAL", 25 ]].map(([label,damage]) => (
              <TouchableOpacity key={String(label)} style={styles.control} onPress={() => attack(Number(damage))} disabled={enemyHealth===0}>
                <Text style={styles.controlText}>{label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.controlMuted} onPress={() => setPlayerHealth((h)=>Math.max(0,h-5))}>
              <Text style={styles.controlText}>BLOCK</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={resetFight} style={styles.reset}><Text style={styles.resetText}>RESTART FIGHT</Text></TouchableOpacity>
        </View>
      )}
      <Text style={styles.footer}>SHADOW CLASH · YOUR FIGHT. YOUR LEGACY.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:"#080d18",paddingHorizontal:28,paddingVertical:14,justifyContent:"space-between"},
  topBar:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  brand:{color:"#f4f1e8",fontSize:22,fontWeight:"900",letterSpacing:3},
  gold:{color:"#f4bd55"},
  tag:{color:"#8190a7",fontSize:10,letterSpacing:2},
  menu:{flex:1,justifyContent:"center",alignItems:"center"},
  eyebrow:{color:"#f4bd55",fontSize:11,fontWeight:"800",letterSpacing:4},
  title:{color:"#fff",fontSize:34,fontWeight:"900",marginTop:8},
  subtitle:{color:"#9ba8bc",fontSize:14,marginTop:6},
  buttons:{flexDirection:"row",gap:18,marginTop:30,width:"76%"},
  primaryButton:{flex:1,backgroundColor:"#bd8132",padding:20,borderRadius:12,minHeight:88,justifyContent:"center"},
  secondaryButton:{flex:1,backgroundColor:"#17243a",borderWidth:1,borderColor:"#34435a",padding:20,borderRadius:12,minHeight:88,justifyContent:"center"},
  buttonTitle:{color:"#fff",fontSize:15,fontWeight:"900",letterSpacing:1},
  buttonHint:{color:"#e7d8bd",fontSize:11,marginTop:6},
  arena:{flex:1,justifyContent:"space-evenly"},
  arenaHeader:{flexDirection:"row",justifyContent:"space-between"},
  modeLabel:{color:"#f4bd55",fontWeight:"800",letterSpacing:2},
  back:{color:"#9ba8bc",fontSize:11,fontWeight:"700"},
  healthRow:{flexDirection:"row",alignItems:"center",gap:16},
  healthBox:{flex:1},
  fighterName:{color:"#fff",fontWeight:"900",fontSize:12,marginBottom:6},
  healthTrack:{height:12,backgroundColor:"#263348",borderRadius:8,overflow:"hidden"},
  healthFill:{height:"100%",backgroundColor:"#54d9a1"},
  enemyFill:{height:"100%",backgroundColor:"#ed5c58",alignSelf:"flex-end"},
  vs:{color:"#f4bd55",fontWeight:"900"},
  stage:{flex:1,marginVertical:10,backgroundColor:"#111d30",borderRadius:14,borderWidth:1,borderColor:"#273952",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"},
  fighter:{fontSize:62},
  stageVs:{fontSize:32,color:"#f4bd55"},
  stageText:{position:"absolute",bottom:10,color:"#8e9bb0",fontSize:10,letterSpacing:3},
  controls:{flexDirection:"row",justifyContent:"center",gap:12},
  control:{backgroundColor:"#bd8132",paddingVertical:14,paddingHorizontal:22,borderRadius:9,minWidth:88,alignItems:"center"},
  controlMuted:{backgroundColor:"#27364c",paddingVertical:14,paddingHorizontal:22,borderRadius:9,minWidth:88,alignItems:"center"},
  controlText:{color:"#fff",fontSize:11,fontWeight:"900",letterSpacing:1},
  reset:{alignSelf:"center",padding:8},
  resetText:{color:"#91a0b6",fontSize:10,letterSpacing:2},
  footer:{color:"#53627a",fontSize:9,textAlign:"center",letterSpacing:2,paddingBottom:2}
});
