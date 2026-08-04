import type { IconType } from "react-icons";
type Props = {
  title: string;
  value: number;
  color: string;
  icon: IconType;
};

function StatCard({ title, value, color, icon: Icon }: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderLeft: `6px solid ${color}`,
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      {/* Icon */}

      <div
        style={{
          fontSize: "35px",
          color: color,
          marginBottom: "15px"
        }}
      >
        <Icon />
      </div>

      {/* Title */}

      <h3
        style={{
          color: "#64748b",
          marginBottom: "15px"
        }}
      >
        {title}
      </h3>

      {/* Value */}

      <h1
        style={{
          color: color,
          fontSize: "40px",
          margin: 0
        }}
      >
        {value}
      </h1>

    </div>
  );
}

export default StatCard;