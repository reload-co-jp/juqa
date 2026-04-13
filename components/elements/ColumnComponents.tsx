import React from 'react';
import Link from 'next/link';

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
  name,
  href,
  id,
  points,
  tip,
}: {
  name: string
  href: string
  id?: string
  points: string[]
  tip: string
}) => (
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
      {id && (
        <img
          src={`/images/plants/${id}-0.webp`}
          alt={name}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
        />
      )}
      <Link
        href={href}
        style={{
          fontWeight: "bold",
          color: "#7cbe8c",
          fontSize: "1.1rem",
          textDecoration: "none",
        }}
      >
        {name} →
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
