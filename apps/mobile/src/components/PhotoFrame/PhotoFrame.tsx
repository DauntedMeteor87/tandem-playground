// Source: Wireframe 0.4 — .ph (painterly image surface / warm hatched placeholder).
// TODO: Code Connect map once Figma frame exists.
// TODO: backend seam — `src` will be a trip/memory photo URL from media storage.
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, type DimensionValue, type StyleProp, type ViewStyle } from "react-native";
import { theme } from "@/theme/tokens";
import { IconImg } from "@/components/icons";

export type PhotoFrameProps = {
  src?: string;
  height?: number;
  width?: DimensionValue;
  /** Round all corners (default: square, since cards clip their own radius). */
  rounded?: boolean;
  /** Bottom scrim so overlaid text stays legible on a photo. */
  protect?: boolean;
  /** Content pinned to the bottom over the photo (title/meta). */
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function PhotoFrame({
  src,
  height = 150,
  width,
  rounded = false,
  protect = false,
  overlay,
  children,
  style,
}: PhotoFrameProps) {
  return (
    <View
      style={[
        styles.frame,
        { height, width: width ?? "100%" },
        rounded && { borderRadius: theme.radius.lg },
        style,
      ]}
    >
      {src ? (
        <Image source={{ uri: src }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : (
        <IconImg size={40} color={theme.neutral.photoInk} />
      )}
      {/* NOTE: a true painterly grade / hero gradient wants expo-linear-gradient
          (not installed). `protect` approximates the bottom scrim with a band. */}
      {protect && <View style={styles.scrim} pointerEvents="none" />}
      {overlay != null && <View style={styles.overlay}>{overlay}</View>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.neutral.photo,
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
    backgroundColor: theme.neutral.scrim,
  },
  overlay: { position: "absolute", left: 12, right: 12, bottom: 12 },
});
