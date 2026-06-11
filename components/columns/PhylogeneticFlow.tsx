"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react"

type PlantExample = {
  name: string
  href: string
}

type PhyloNodeData = {
  label: string
  note: string
  tone: "root" | "early" | "seed" | "flower" | "group"
  examples?: PlantExample[]
}

type FlowVariant = "plant" | "dicot" | "monocot" | "gymno"

const toneStyles: Record<PhyloNodeData["tone"], { background: string; border: string }> = {
  root: { background: "#233024", border: "#5a9a5c" },
  early: { background: "#24302b", border: "#759b61" },
  seed: { background: "#223039", border: "#5f93a3" },
  flower: { background: "#20332b", border: "#64a979" },
  group: { background: "#2c2c32", border: "#6d7386" },
}

const PhyloNode = ({ data }: NodeProps<Node<PhyloNodeData>>) => {
  const style = toneStyles[data.tone]

  return (
    <div
      style={{
        width: 190,
        border: `1px solid ${style.border}`,
        borderRadius: 8,
        background: style.background,
        boxShadow: "0 10px 22px rgba(0,0,0,0.25)",
        color: "#e8efe8",
        padding: "0.75rem",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div style={{ fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.45 }}>
        {data.label}
      </div>
      <div style={{ color: "#b7c2b7", fontSize: "0.72rem", lineHeight: 1.55, marginTop: "0.35rem" }}>
        {data.note}
      </div>
      {data.examples && data.examples.length > 0 && (
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.55rem" }}>
          {data.examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              style={{
                background: "rgba(124,190,140,0.15)",
                color: "#9fdbad",
                border: "1px solid rgba(124,190,140,0.35)",
                borderRadius: 4,
                padding: "0.12rem 0.38rem",
                fontSize: "0.68rem",
                textDecoration: "none",
              }}
            >
              {example.name}
            </Link>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes = { phylo: PhyloNode }

const baseEdge = {
  type: "smoothstep",
  animated: false,
  style: { stroke: "#7cbe8c", strokeWidth: 2 },
}

const edge = (id: string, source: string, target: string, label?: string): Edge => ({
  id,
  source,
  target,
  label,
  labelStyle: { fill: "#cbd5cb", fontSize: 11, fontWeight: 700 },
  labelBgStyle: { fill: "#222", fillOpacity: 0.86 },
  labelBgPadding: [6, 3],
  ...baseEdge,
})

const dataByVariant: Record<FlowVariant, { nodes: Node<PhyloNodeData>[]; edges: Edge[]; height: number }> = {
  plant: {
    height: 520,
    nodes: [
      {
        id: "land",
        type: "phylo",
        position: { x: 0, y: 190 },
        data: { label: "陸上植物の祖先", note: "水辺から陸上へ。乾燥への対応が進化の軸", tone: "root" },
      },
      {
        id: "moss",
        type: "phylo",
        position: { x: 240, y: 20 },
        data: { label: "コケ植物", note: "維管束なし・胞子で繁殖。水辺や湿地に多い", tone: "early" },
      },
      {
        id: "fern",
        type: "phylo",
        position: { x: 240, y: 145 },
        data: { label: "シダ植物", note: "維管束あり・胞子で繁殖。林床に多い", tone: "early" },
      },
      {
        id: "gymno",
        type: "phylo",
        position: { x: 240, y: 270 },
        data: {
          label: "裸子植物",
          note: "種子は裸のまま。球果や仮種皮で守る",
          tone: "seed",
          examples: [
            { name: "クロマツ", href: "/plants/10" },
            { name: "ヒノキ", href: "/plants/8" },
            { name: "イチョウ", href: "/plants/5" },
          ],
        },
      },
      {
        id: "angio",
        type: "phylo",
        position: { x: 480, y: 270 },
        data: {
          label: "被子植物",
          note: "種子が果実に包まれる。花と果実で大きく多様化",
          tone: "flower",
          examples: [
            { name: "ソメイヨシノ", href: "/plants/1" },
            { name: "タンポポ", href: "/plants/11" },
            { name: "ヤマユリ", href: "/plants/54" },
          ],
        },
      },
      {
        id: "dicot",
        type: "phylo",
        position: { x: 720, y: 190 },
        data: { label: "双子葉類", note: "網状脈・花弁4〜5枚が多い。バラ科・キク科など", tone: "group" },
      },
      {
        id: "monocot",
        type: "phylo",
        position: { x: 720, y: 350 },
        data: { label: "単子葉類", note: "平行脈・花被片3の倍数が多い。イネ科・ユリ科など", tone: "group" },
      },
    ],
    edges: [
      edge("land-moss", "land", "moss", "維管束なし"),
      edge("land-fern", "land", "fern", "維管束"),
      edge("fern-gymno", "fern", "gymno", "種子"),
      edge("gymno-angio", "gymno", "angio", "花・果実"),
      edge("angio-dicot", "angio", "dicot"),
      edge("angio-monocot", "angio", "monocot"),
    ],
  },
  dicot: {
    height: 430,
    nodes: [
      {
        id: "angio",
        type: "phylo",
        position: { x: 0, y: 145 },
        data: { label: "被子植物", note: "花と果実をもつ大グループ", tone: "root" },
      },
      {
        id: "basal",
        type: "phylo",
        position: { x: 250, y: 20 },
        data: {
          label: "基部に近い双子葉類",
          note: "花被片多数・螺旋状。花弁と萼の境界が曖昧",
          tone: "early",
          examples: [
            { name: "ハクモクレン", href: "/plants/27" },
            { name: "ドクダミ", href: "/plants/40" },
          ],
        },
      },
      {
        id: "eudicot",
        type: "phylo",
        position: { x: 250, y: 180 },
        data: { label: "真正双子葉類", note: "花粉・葉脈・花のつくりが整理された主要系統", tone: "flower" },
      },
      {
        id: "free",
        type: "phylo",
        position: { x: 500, y: 115 },
        data: {
          label: "離弁花の傾向",
          note: "花弁が1枚ずつ独立。バラ科・マメ科・アブラナ科など",
          tone: "group",
          examples: [
            { name: "ソメイヨシノ", href: "/plants/1" },
            { name: "フジ", href: "/plants/25" },
            { name: "ナズナ", href: "/plants/83" },
          ],
        },
      },
      {
        id: "fused",
        type: "phylo",
        position: { x: 500, y: 285 },
        data: {
          label: "合弁花の傾向",
          note: "花弁の基部が合着。筒状・唇形・頭状花序に発展",
          tone: "group",
          examples: [
            { name: "タンポポ", href: "/plants/11" },
            { name: "ホトケノザ", href: "/plants/34" },
            { name: "リンドウ", href: "/plants/38" },
          ],
        },
      },
    ],
    edges: [
      edge("angio-basal", "angio", "basal", "早期分岐"),
      edge("angio-eudicot", "angio", "eudicot", "主要系統"),
      edge("eudicot-free", "eudicot", "free"),
      edge("eudicot-fused", "eudicot", "fused", "より派生"),
    ],
  },
  monocot: {
    height: 430,
    nodes: [
      {
        id: "monocot",
        type: "phylo",
        position: { x: 0, y: 145 },
        data: { label: "単子葉類", note: "子葉1枚・平行脈・花被片3の倍数が基本", tone: "root" },
      },
      {
        id: "aroid",
        type: "phylo",
        position: { x: 250, y: 20 },
        data: {
          label: "基底的単子葉類",
          note: "仏炎苞と肉穂花序。水辺・湿地に多い",
          tone: "early",
          examples: [
            { name: "ミズバショウ", href: "/plants/140" },
            { name: "マムシグサ", href: "/plants/138" },
          ],
        },
      },
      {
        id: "core",
        type: "phylo",
        position: { x: 250, y: 180 },
        data: { label: "主要な単子葉類", note: "葉鞘・球根・根茎などで多様化", tone: "flower" },
      },
      {
        id: "commelinids",
        type: "phylo",
        position: { x: 500, y: 115 },
        data: {
          label: "コメリナ類",
          note: "葉鞘が茎を包む。ツユクサ科・イネ科など",
          tone: "group",
          examples: [
            { name: "ツユクサ", href: "/plants/15" },
            { name: "ススキ", href: "/plants/41" },
            { name: "エノコログサ", href: "/plants/53" },
          ],
        },
      },
      {
        id: "lilioids",
        type: "phylo",
        position: { x: 500, y: 285 },
        data: {
          label: "ユリ類",
          note: "花被片6枚・球根や根茎。ユリ科・アヤメ科・ヒガンバナ科など",
          tone: "group",
          examples: [
            { name: "カタクリ", href: "/plants/42" },
            { name: "ヤマユリ", href: "/plants/54" },
            { name: "カキツバタ", href: "/plants/94" },
            { name: "スイセン", href: "/plants/98" },
          ],
        },
      },
    ],
    edges: [
      edge("monocot-aroid", "monocot", "aroid", "早期分岐"),
      edge("monocot-core", "monocot", "core"),
      edge("core-commelinids", "core", "commelinids"),
      edge("core-lilioids", "core", "lilioids"),
    ],
  },
  gymno: {
    height: 430,
    nodes: [
      {
        id: "gymno",
        type: "phylo",
        position: { x: 0, y: 145 },
        data: { label: "裸子植物", note: "種子が果実に包まれない。古い種子植物の系統", tone: "root" },
      },
      {
        id: "ginkgo",
        type: "phylo",
        position: { x: 250, y: 20 },
        data: {
          label: "イチョウ目",
          note: "現生1属1種。扇形葉・二又脈の独立系統",
          tone: "early",
          examples: [{ name: "イチョウ", href: "/plants/5" }],
        },
      },
      {
        id: "conifer",
        type: "phylo",
        position: { x: 250, y: 180 },
        data: { label: "針葉樹の主要系統", note: "葉は針状・鱗片状・線形。乾燥や寒冷に強い", tone: "seed" },
      },
      {
        id: "cones",
        type: "phylo",
        position: { x: 500, y: 115 },
        data: {
          label: "球果植物",
          note: "球果に種子がつく。マツ科・ヒノキ科など",
          tone: "group",
          examples: [
            { name: "クロマツ", href: "/plants/10" },
            { name: "アカマツ", href: "/plants/22" },
            { name: "ヒノキ", href: "/plants/8" },
            { name: "スギ", href: "/plants/9" },
          ],
        },
      },
      {
        id: "taxales",
        type: "phylo",
        position: { x: 500, y: 285 },
        data: {
          label: "イチイ目",
          note: "球果を作らず、仮種皮や花托で種子を守る",
          tone: "group",
          examples: [
            { name: "イチイ", href: "/plants/36" },
            { name: "イヌマキ", href: "/plants/147" },
          ],
        },
      },
    ],
    edges: [
      edge("gymno-ginkgo", "gymno", "ginkgo", "独立系統"),
      edge("gymno-conifer", "gymno", "conifer"),
      edge("conifer-cones", "conifer", "cones", "球果あり"),
      edge("conifer-taxales", "conifer", "taxales", "球果なし"),
    ],
  },
}

const mobilePositions: Record<FlowVariant, Record<string, { x: number; y: number }>> = {
  plant: {
    land: { x: 0, y: 220 },
    moss: { x: 220, y: 20 },
    fern: { x: 220, y: 145 },
    gymno: { x: 220, y: 270 },
    angio: { x: 0, y: 560 },
    dicot: { x: 220, y: 560 },
    monocot: { x: 220, y: 740 },
  },
  dicot: {
    angio: { x: 0, y: 170 },
    basal: { x: 220, y: 20 },
    eudicot: { x: 220, y: 170 },
    free: { x: 0, y: 340 },
    fused: { x: 220, y: 340 },
  },
  monocot: {
    monocot: { x: 0, y: 170 },
    aroid: { x: 220, y: 20 },
    core: { x: 220, y: 170 },
    commelinids: { x: 0, y: 340 },
    lilioids: { x: 220, y: 340 },
  },
  gymno: {
    gymno: { x: 0, y: 170 },
    ginkgo: { x: 220, y: 20 },
    conifer: { x: 220, y: 170 },
    cones: { x: 0, y: 340 },
    taxales: { x: 220, y: 340 },
  },
}

const mobileHeightByVariant: Record<FlowVariant, number> = {
  plant: 920,
  dicot: 560,
  monocot: 560,
  gymno: 560,
}

export const PhylogeneticFlow = ({
  variant,
  caption,
}: {
  variant: FlowVariant
  caption: string
}) => {
  const flow = dataByVariant[variant]
  const [isNarrow, setIsNarrow] = useState(false)
  const displayFlow = useMemo(() => {
    if (!isNarrow) return flow

    const positions = mobilePositions[variant]
    return {
      ...flow,
      height: mobileHeightByVariant[variant],
      nodes: flow.nodes.map((node) => ({
        ...node,
        position: positions[node.id] ?? node.position,
      })),
    }
  }, [flow, isNarrow, variant])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)")
    const update = () => setIsNarrow(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return (
    <figure style={{ margin: "0 0 1rem" }}>
      <div
        style={{
          height: displayFlow.height,
          minHeight: 360,
          border: "1px solid #3c4a3d",
          borderRadius: 8,
          overflow: "hidden",
          background: "#1f241f",
        }}
      >
        <ReactFlow
          key={`${variant}-${isNarrow ? "narrow" : "wide"}`}
          nodes={displayFlow.nodes}
          edges={displayFlow.edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.14 }}
          minZoom={0.45}
          maxZoom={1.4}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#3a463a" gap={20} />
          <Controls showInteractive={false} style={{ background: "#263026", border: "1px solid #3c4a3d" }} />
          <MiniMap
            nodeColor={(node) => toneStyles[(node.data as PhyloNodeData).tone].border}
            maskColor="rgba(0,0,0,0.45)"
            style={{ background: "#232923", border: "1px solid #3c4a3d" }}
          />
        </ReactFlow>
      </div>
      <figcaption style={{ color: "#9aa89a", fontSize: "0.76rem", lineHeight: 1.6, marginTop: "0.55rem" }}>
        {caption}
      </figcaption>
    </figure>
  )
}
