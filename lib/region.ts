export type Region = "北海道" | "本州" | "四国" | "九州" | "沖縄"

export const REGIONS: Region[] = ["北海道", "本州", "四国", "九州", "沖縄"]

export function regionTagsFromDistribution(distribution: string): Region[] {
  const regions = new Set<Region>()

  const isNationwide =
    /全国|日本全国|日本各地/.test(distribution) &&
    !/九州・四国（自生）/.test(distribution)

  if (isNationwide) {
    regions.add("北海道")
    regions.add("本州")
    regions.add("四国")
    regions.add("九州")
    if (/沖縄/.test(distribution)) regions.add("沖縄")
    return [...regions]
  }

  // Check explicit mentions
  if (/北海道/.test(distribution)) regions.add("北海道")
  if (/本州|関東|近畿|東北|岩手|茨城/.test(distribution)) regions.add("本州")
  if (/四国/.test(distribution)) regions.add("四国")
  if (/九州/.test(distribution)) regions.add("九州")
  if (/沖縄/.test(distribution)) regions.add("沖縄")

  // Fill in implied regions from range patterns (〜)
  if (/北海道.*〜.*九州/.test(distribution)) {
    regions.add("本州")
    regions.add("四国")
  }
  if (/北海道.*〜.*沖縄/.test(distribution)) {
    regions.add("本州")
    regions.add("四国")
    regions.add("九州")
  }
  if (/本州.*〜.*九州/.test(distribution)) {
    regions.add("四国")
  }
  if (/本州.*〜.*沖縄/.test(distribution)) {
    regions.add("四国")
    regions.add("九州")
  }
  if (/関東.*〜.*九州/.test(distribution) || /近畿.*〜.*九州/.test(distribution)) {
    regions.add("本州")
    regions.add("四国")
  }
  if (/関東.*〜.*沖縄/.test(distribution) || /近畿.*〜.*沖縄/.test(distribution)) {
    regions.add("本州")
    regions.add("四国")
    regions.add("九州")
  }

  return [...regions]
}
