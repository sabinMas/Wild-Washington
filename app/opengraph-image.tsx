import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0f2d20 0%, #1f4d37 42%, #f5efe2 42%, #f5efe2 100%)",
          color: "#111827",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.16), transparent 26%), radial-gradient(circle at 82% 18%, rgba(164,88,28,0.16), transparent 20%), radial-gradient(circle at 74% 78%, rgba(45,90,61,0.12), transparent 24%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "54%",
            padding: "56px 52px",
            color: "#f8f4ea",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Built with Codex
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                lineHeight: 0.95,
                fontWeight: 700,
                maxWidth: "90%",
              }}
            >
              Wild Washington
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.3,
                maxWidth: "88%",
                color: "rgba(248,244,234,0.86)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Explore at-risk species through comparison charts, habitat context, and classroom-ready learning paths.
            </div>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {["8 species", "1980-2024 data", "maps + comparison"].map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  background: "rgba(248,244,234,0.12)",
                  border: "1px solid rgba(248,244,234,0.2)",
                  fontSize: 22,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "46%",
            padding: "44px 40px 44px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                  background: "#fffaf2",
                  borderRadius: 28,
                  padding: 24,
                  boxShadow: "0 18px 40px rgba(20, 28, 24, 0.12)",
                }}
              >
                <div style={{ display: "flex", fontSize: 20, color: "#6b6760", fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: 2 }}>
                  Species snapshot
                </div>
                <div style={{ display: "flex", fontSize: 38, color: "#1f4d37", fontWeight: 700 }}>
                  Southern Resident Orca
                </div>
                <div style={{ display: "flex", fontSize: 22, color: "#6b6760", fontFamily: "Arial, sans-serif" }}>
                  74 whales in 2024
                </div>
                <div style={{ display: "flex", height: 110, alignItems: "flex-end", gap: 12 }}>
                  {[92, 80, 78, 70, 74].map((value, index) => (
                    <div
                      key={`${value}-${index}`}
                      style={{
                        display: "flex",
                        width: 26,
                        height: value,
                        borderRadius: 999,
                        background: index === 4 ? "#a4581c" : "#1b4d72",
                        opacity: index === 4 ? 1 : 0.75,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 164,
                  background: "#efe7d8",
                  borderRadius: 28,
                  padding: 24,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", fontSize: 20, color: "#6b6760", fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: 2 }}>
                  Compare
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", width: "100%", height: 4, borderRadius: 999, background: "#1b4d72" }} />
                  <div style={{ display: "flex", width: "100%", height: 4, borderRadius: 999, background: "#2d5a3d" }} />
                  <div style={{ display: "flex", width: "100%", height: 4, borderRadius: 999, background: "#8b2a2a" }} />
                </div>
                <div style={{ display: "flex", fontSize: 22, color: "#1e1c17", fontFamily: "Arial, sans-serif" }}>
                  Honest baseline-normalized trends
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              {["Learn", "Map", "Act"].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "16px 18px",
                    borderRadius: 22,
                    background: "#fffaf2",
                    color: "#1f4d37",
                    fontSize: 24,
                    fontWeight: 700,
                    boxShadow: "0 10px 26px rgba(20, 28, 24, 0.08)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
