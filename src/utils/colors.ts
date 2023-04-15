import { statusColor } from '@/_mock/status';

export const getColor = (status: string) => {
  return statusColor[status];
};

export const getLighterColor = (colorCode: string, opacity: number) => {
  // Convert the color code to an RGB value
  const red = parseInt(colorCode.substring(1, 3), 16);
  const green = parseInt(colorCode.substring(3, 5), 16);
  const blue = parseInt(colorCode.substring(5, 7), 16);

  // Calculate the new RGB values for the lighter color
  const newRed = Math.round((red * (1 - opacity)) + (255 * opacity));
  const newGreen = Math.round((green * (1 - opacity)) + (255 * opacity));
  const newBlue = Math.round((blue * (1 - opacity)) + (255 * opacity));

  // Convert the RGB values back to a hex color code
  const newColorCode = '#' + ((1 << 24) + (newRed << 16) + (newGreen << 8) + newBlue).toString(16).slice(1);

  return newColorCode;
};

export const getColorStyles = (status: string) => {
  const color = getColor(status);
  const backgroundColor = getLighterColor(color, 0.8);

  return {
    color,
    backgroundColor,
  };
};

