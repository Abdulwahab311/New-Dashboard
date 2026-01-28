// ============================================
// EXIT COMPONENT (Exit.jsx)
// ============================================
import React, { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_BASEURL } from "../../../config.js";

export default function Exit({ title = "ACTIEVE DEALS 2e CONTRACTFASE EXIT" }) {
  const [open, setOpen] = useState(true);
  const [counts, setCounts] = useState({ red: 0, orange: 0, grey: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZorgData = async () => {
      try {
        const res = await axios.get(`${REACT_APP_BASEURL}/sales/getSales`);
        const data = Array.isArray(res.data) ? res.data : res.data.data;

        const zorgPipeline = data.find(
          (p) => p.pipelineKey?.toLowerCase() === "zorg",
        );

        if (zorgPipeline && zorgPipeline.stages) {
          let red = 0; // Deals delayed (>20 days)
          let orange = 0; // Deals in progress (1-20 days)
          let grey = 0; // Empty stages

          zorgPipeline.stages.forEach((stage) => {
            const dealCount = stage.count || 0;
            const avgDays = stage.avgTimeToAdvanceDays || 0;

            if (dealCount === 0) {
              grey++;
            } else if (avgDays > 20) {
              red++;
            } else {
              orange++;
            }
          });

          setCounts({ red, orange, grey });
        }
      } catch (err) {
        console.error("Error fetching ZORG data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchZorgData();
  }, []);

  const pills = [
    { value: counts.red, bg: "#E81C1C", label: "Delayed", badge: true },
    { value: counts.orange, bg: "#FF7800", label: "In Progress" },
    { value: counts.grey, bg: "#9CA3AF", label: "Not Started" },
  ];

  return (
    <div style={{ borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flex: 1,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "DM Sans",
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {title}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {pills.map((p, i) => (
              <div
                key={i}
                style={{
                  background: p.bg,
                  color: "#FFFFFF",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {p.value}
                {p.badge && <span style={{ fontSize: "10px" }}>!</span>}
              </div>
            ))}
          </div>
        </div>

        {/* <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            border: "none",
            color: "#9CA3AF",
            cursor: "pointer",
            fontSize: "12px",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </button> */}
      </div>
    </div>
  );
}
