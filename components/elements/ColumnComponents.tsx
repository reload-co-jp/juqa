import React from 'react';
import Link from 'next/link';
import { plants } from '../../lib/data/plant';

export const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div
    style={{
      background: "#2d2d2d",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    <h2
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#7cbe8c",
        margin: "0 0 1rem",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

export const PlantCard = ({
  plantId,
  points,
  tip,
}: {
  plantId: number;
  points: string[];
  tip: string;
}) => {
  const plant = plants.find((p) => p.id === plantId);
  if (!plant) return null;

  return (
    <div
      style={{
        background: "#242424",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <img
          src={`/images/plants/${plant.id}-0.webp`}
          alt={plant.japanese_name}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
        />
        <Link
          href={`/plants/${plant.id}`}
          style={{
            fontWeight: "bold",
            color: "#7cbe8c",
            fontSize: "1.1rem",
            textDecoration: "none",
          }}
        >
          {plant.japanese_name} →
        </Link>
      </div>
      <ul
        style={{
          margin: "0 0 0.5rem",
          paddingLeft: "1.2rem",
          color: "#ccc",
          fontSize: "0.875rem",
          lineHeight: 1.8,
        }}
      >
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div
        style={{
          background: "#1e3d1f",
          borderRadius: "6px",
          padding: "0.5rem 0.75rem",
          color: "#a0d0a2",
          fontSize: "0.8rem",
        }}
      >
        💡 {tip}
      </div>
    </div>
  );
};
