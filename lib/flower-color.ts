export const FLOWER_COLORS: FlowerColor[] = [
  "白",
  "黄",
  "ピンク",
  "赤",
  "青",
  "紫",
  "橙",
]

export function flowerColorsFromPlant(plant: Plant): FlowerColor[] {
  return plant.flower_colors ?? []
}
