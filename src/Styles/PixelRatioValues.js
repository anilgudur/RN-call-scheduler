import React from "react";
import { PixelRatio } from "react-native";
// Font size management as per dpi
let fontSizeValuesVar = {};
//console.log('PixelRatio.get()::: ', PixelRatio.get());
if (PixelRatio.get() === 1) {
  fontSizeValuesVar = {
    header: 16,
    sub_header: 14,
    regular: 12,
  };
} else if (PixelRatio.get() === 1.5) {
  fontSizeValuesVar = {
    header: 16,
    sub_header: 14,
    regular: 12,
  };
} else if (PixelRatio.get() === 2) {
  fontSizeValuesVar = {
    header: 18,
    sub_header: 16,
    regular: 14,
  };
} else if (PixelRatio.get() === 3) {
  fontSizeValuesVar = {
    header: 20,
    sub_header: 18,
    regular: 16,
  };
} else if (PixelRatio.get() === 3.5) {
  fontSizeValuesVar = {
    header: 20,
    sub_header: 18,
    regular: 16,
  };
}
export const fontSizeValues = fontSizeValuesVar;