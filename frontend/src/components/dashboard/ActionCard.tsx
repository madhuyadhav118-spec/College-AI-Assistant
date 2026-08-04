import type { IconType } from "react-icons";

type Props = {
  title: string;
  icon: IconType;
  color: string;
};

function ActionCard({ title, icon: Icon, color }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        cursor: "pointer",
        transition: "all .3s ease",
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)";
      }}
    >
      <Icon
        size={38}
        color={color}
        style={{ marginBottom: "15px" }}
      />

      <h3>{title}</h3>
    </div>
  );
}

export default ActionCard;