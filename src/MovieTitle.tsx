import { StyleSheet, Text, type TextProps } from "react-native";
import { applyTypography } from "./utils/components/applyTypography";

type MovieTitleProps = TextProps & { title: string };

export const MovieTitle = ({ title, style, ...rest }: MovieTitleProps) => {
  const formattedTitle = applyTypography(title);
  return (
    <Text {...rest} style={[styles.title, style]} numberOfLines={2}>
      {formattedTitle}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 22,
    color: "#1a1a1a",
    flexShrink: 1,
  },
});
