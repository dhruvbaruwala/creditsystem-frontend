import { useState, useEffect, useRef } from "react";

export default function LandingPage({ onLogin, onRegister }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    { icon: "✦", title: "AI Image Generation", desc: "Transform text into stunning visuals instantly. Powered by advanced AI — no design skills needed.", cost: "5 credits", color: "#ff6b6b", glow: "rgba(255,107,107,0.3)" },
    { icon: "⬡", title: "QR Code Generator", desc: "Convert any URL or text into scannable QR codes. Download as PNG, share anywhere.", cost: "3 credits", color: "#4ecdc4", glow: "rgba(78,205,196,0.3)" },
    { icon: "→", title: "URL Shortener", desc: "Compress long URLs into sharp, trackable short links. Monitor click analytics in real time.", cost: "2 credits", color: "#ffe66d", glow: "rgba(255,230,109,0.3)" },
  ];

  const stats = [
    { value: "10", label: "Free credits on signup", suffix: "" },
    { value: "500", label: "Free API requests daily", suffix: "+" },
    { value: "3", label: "Powerful services", suffix: "" },
    { value: "100", label: "Uptime guaranteed", suffix: "%" },
  ];

  const plans = [
    { name: "Free", price: "$0", credits: "10 credits", limit: "10 req/day", color: "#666" },
    { name: "Basic", price: "$4.99", credits: "100 credits", limit: "50 req/day", color: "#4ecdc4" },
    { name: "Pro", price: "$19.99", credits: "500 credits", limit: "200 req/day", color: "#ff6b6b", popular: true },
    { name: "Enterprise", price: "$49.99", credits: "2000 credits", limit: "Unlimited", color: "#ffe66d" },
  ];

  return (
    <div style={{ background: "#030308", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflowX: "hidden", color: "#fff" }}>

      <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)", left: mousePos.x - 300, top: mousePos.y - 300, pointerEvents: "none", zIndex: 0, transition: "left 0.1s, top 0.1s" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 50 ? "rgba(3,3,8,0.9)" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900 }}>Q</div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Quotix<span style={{ color: "#667eea" }}>io</span></span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["Services", "Plans", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onLogin} style={{ padding: "9px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.05)"} onMouseLeave={e => e.target.style.background = "transparent"}>Login</button>
          <button onClick={onRegister} style={{ padding: "9px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", color: "#fff", cursor: "pointer" }}
            onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>Get Started Free →</button>
        </div>
      </nav>

      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)", top: "20%", left: "20%", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(118,75,162,0.12) 0%, transparent 70%)", top: "30%", right: "15%", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(102,126,234,0.3)", background: "rgba(102,126,234,0.08)", fontSize: 13, color: "#a78bfa", marginBottom: 32, animation: "fadeUp 0.6s ease forwards" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
          Credit-Based Resource & Quota Management
        </div>

        <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: -3, marginBottom: 24, animation: "fadeUp 0.7s ease 0.1s both" }}>
          <span style={{ display: "block", color: "#fff" }}>Manage Every</span>
          <span style={{ display: "block", background: "linear-gradient(135deg, #667eea 0%, #f093fb 50%, #ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Request. Every Credit.</span>
          <span style={{ display: "block", color: "#fff" }}>Every Service.</span>
        </h1>

        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.7, marginBottom: 44, animation: "fadeUp 0.7s ease 0.2s both" }}>
          Quotixio is a plug-and-play credit system for any website. Give users free credits, charge per service, and scale without limits.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.7s ease 0.3s both" }}>
          <button onClick={onRegister} style={{ padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", color: "#fff", cursor: "pointer", boxShadow: "0 0 40px rgba(102,126,234,0.4)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 60px rgba(102,126,234,0.6)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 40px rgba(102,126,234,0.4)"; }}>Start Free — 10 Credits →</button>
          <button onClick={onLogin} style={{ padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 600, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}>Sign In</button>
        </div>

        <div style={{ marginTop: 80, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.7s ease 0.4s both" }}>
          {[{ icon: "🎨", text: "AI Image Generation", sub: "5 credits" }, { icon: "⬡", text: "QR Code Generator", sub: "3 credits" }, { icon: "🔗", text: "URL Shortener", sub: "2 credits" }].map((card, i) => (
            <div key={i} style={{ padding: "14px 20px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(10px)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(102,126,234,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{ fontSize: 22 }}>{card.icon}</span>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{card.text}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{card.sub}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: "40px 30px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{stat.value}{stat.suffix}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#667eea", textTransform: "uppercase", marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1 }}>Three powerful services.<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>Pay only what you use.</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {services.map((service, i) => (
              <div key={i} id={`service-${i}`} data-observe style={{ padding: "40px 36px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.4s", opacity: visible[`service-${i}`] ? 1 : 0, transform: visible[`service-${i}`] ? "translateY(0)" : "translateY(30px)", transitionDelay: `${i * 0.1}s` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = service.color + "40"; e.currentTarget.style.boxShadow = `0 20px 60px ${service.glow}`; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: service.color + "15", border: `1px solid ${service.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: service.color, marginBottom: 24, fontWeight: 900 }}>{service.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>{service.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 24 }}>{service.desc}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: service.color + "15", border: `1px solid ${service.color}30`, fontSize: 13, fontWeight: 700, color: service.color }}>{service.cost}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#4ecdc4", textTransform: "uppercase", marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: -2, marginBottom: 70 }}>Simple as 1, 2, 3</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
            {[{ step: "01", title: "Register Free", desc: "Sign up in seconds. Get 10 free credits instantly — no credit card needed.", color: "#667eea" }, { step: "02", title: "Use Services", desc: "Generate images, create QR codes, shorten URLs. Credits deduct automatically.", color: "#f093fb" }, { step: "03", title: "Buy More Credits", desc: "Running low? Purchase a plan that fits your needs. Upgrade anytime.", color: "#ff6b6b" }].map((item, i) => (
              <div key={i} id={`step-${i}`} data-observe style={{ textAlign: "left", transition: "all 0.5s", opacity: visible[`step-${i}`] ? 1 : 0, transform: visible[`step-${i}`] ? "translateY(0)" : "translateY(20px)", transitionDelay: `${i * 0.15}s` }}>
                <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -4, color: item.color, opacity: 0.2, lineHeight: 1, marginBottom: 16 }}>{item.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#ffe66d", textTransform: "uppercase", marginBottom: 16 }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: -2 }}>Start free.<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>Scale when ready.</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
            {plans.map((plan, i) => (
              <div key={i} id={`plan-${i}`} data-observe style={{ padding: "32px 28px", borderRadius: 20, background: plan.popular ? "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(240,147,251,0.05))" : "rgba(255,255,255,0.02)", border: plan.popular ? "1px solid rgba(255,107,107,0.3)" : "1px solid rgba(255,255,255,0.06)", position: "relative", transition: "all 0.5s", opacity: visible[`plan-${i}`] ? 1 : 0, transform: visible[`plan-${i}`] ? "translateY(0)" : "translateY(30px)", transitionDelay: `${i * 0.1}s` }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: "#ff6b6b", color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>Most Popular</div>}
                <div style={{ fontSize: 15, fontWeight: 700, color: plan.color, marginBottom: 16 }}>{plan.name}</div>
                <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: -2, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>one time</div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[plan.credits, plan.limit].map((feature, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                      <span style={{ color: plan.color, fontSize: 16 }}>✓</span>{feature}
                    </div>
                  ))}
                </div>
                <button onClick={onRegister} style={{ width: "100%", marginTop: 24, padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: plan.popular ? "#ff6b6b" : "rgba(255,255,255,0.06)", border: "none", color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.target.style.opacity = "0.8"} onMouseLeave={e => e.target.style.opacity = "1"}>
                  {plan.price === "$0" ? "Get Started Free" : `Get ${plan.name}`} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ padding: "60px", borderRadius: 24, background: "linear-gradient(135deg, rgba(102,126,234,0.08) 0%, rgba(118,75,162,0.05) 100%)", border: "1px solid rgba(102,126,234,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: "#667eea", textTransform: "uppercase", marginBottom: 16 }}>For Businesses</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>Embed Quotixio into any website</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 32 }}>Get a unique API key. Paste one script tag. Your users get credits, your services get protected. Think Stripe — but for quotas.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Unique API key per business", "Complete user isolation", "Real-time quota monitoring", "Custom service pricing"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ color: "#667eea", fontSize: 18 }}>✦</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "monospace", fontSize: 13 }}>
              <div style={{ color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>// Integrate in seconds</div>
              <div style={{ color: "#667eea" }}>&lt;script</div>
              <div style={{ paddingLeft: 16, color: "#4ecdc4" }}>src=<span style={{ color: "#ffe66d" }}>"quotixio.vercel.app/widget.js"</span></div>
              <div style={{ paddingLeft: 16, color: "#4ecdc4" }}>data-api-key=<span style={{ color: "#ffe66d" }}>"your-key"</span></div>
              <div style={{ color: "#667eea" }}>&gt;&lt;/script&gt;</div>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>// That's it. Your users now have credits.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 40px 120px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, letterSpacing: -3, lineHeight: 1.05, marginBottom: 24 }}>
            Ready to start?<br />
            <span style={{ background: "linear-gradient(135deg, #667eea, #f093fb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>It's free.</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginBottom: 44 }}>10 free credits. No credit card. No commitment.</p>
          <button onClick={onRegister} style={{ padding: "18px 48px", borderRadius: 14, fontSize: 18, fontWeight: 800, background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", color: "#fff", cursor: "pointer", boxShadow: "0 0 60px rgba(102,126,234,0.5)", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 0 80px rgba(102,126,234,0.7)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 60px rgba(102,126,234,0.5)"; }}>Create Free Account →</button>
        </div>
      </section>

      <footer style={{ padding: "30px 40px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.25)", position: "relative", zIndex: 1, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>Q</div>
          Quotixio — Credit & Quota Management System
        </div>
        <div>Built for MCA Final Semester Seminar</div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030308; }
        ::-webkit-scrollbar-thumb { background: rgba(102,126,234,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
