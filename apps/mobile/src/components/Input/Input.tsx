// Source: Wireframe 0.4 — .field / .label / .charcount (text field + textarea).
// TODO: Code Connect map once Figma frame exists.
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { theme } from "@/theme/tokens";

export type InputProps = {
  label?: string;
  multiline?: boolean;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function Input({
  label,
  multiline = false,
  maxLength,
  value,
  defaultValue = "",
  placeholder,
  onChangeText,
  style,
  inputStyle,
}: InputProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const v = value ?? internal;

  return (
    <View style={style}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={v}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={theme.color.muted}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(t) => {
          setInternal(t);
          onChangeText?.(t);
        }}
        style={[
          styles.field,
          multiline && styles.multiline,
          // Focused field takes the single ember accent (only one field is ever focused).
          { borderColor: focused ? theme.color.ember : theme.neutral.hairlineStrong },
          inputStyle,
        ]}
      />
      {maxLength != null && (
        <Text style={styles.charcount}>
          {v.length} / {maxLength}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 13,
    color: theme.color.muted,
    marginBottom: theme.spacing.s2,
  },
  field: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 16, // wireframe .field padding: 15px 16px
    borderRadius: theme.radius.md,
    borderWidth: 1,
    backgroundColor: theme.color.paper,
    color: theme.color.pine,
    fontFamily: theme.fontFamily.body,
    fontSize: 17,
  },
  multiline: { minHeight: 120, textAlignVertical: "top" }, // wireframe textarea.field
  charcount: {
    textAlign: "right",
    fontFamily: theme.fontFamily.semibold,
    fontSize: 11.5,
    color: theme.color.muted,
    marginTop: 6,
  },
});
