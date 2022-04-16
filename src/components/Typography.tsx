import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

interface Props {
  text: string;
  size?: number;
  color?: string;
  bold?: boolean;
  style?: any;
}

const Typography: FC<Props> = ({ text, bold, style, size, color }) => {
  return (
    <Text
      style={{
        fontSize: size ? size : 14,
        fontWeight: bold ? "bold" : "400",
        color: color ? color : "#333",
        ...style
      }}
    >
      {text}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({});
