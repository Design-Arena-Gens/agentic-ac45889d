'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProfilePicture() {
  const canvasRef = useRef(null);
  const [design, setDesign] = useState('gradient');
  const [color1, setColor1] = useState('#FF006E');
  const [color2, setColor2] = useState('#8338EC');
  const [color3, setColor3] = useState('#3A86FF');
  const [text, setText] = useState('EDIT');
  const [shape, setShape] = useState('circle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 1000;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Create circular clipping path
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    if (design === 'gradient') {
      // Radial gradient background
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(0.5, color2);
      gradient.addColorStop(1, color3);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    } else if (design === 'geometric') {
      // Geometric pattern
      ctx.fillStyle = color3;
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = color1;
      ctx.lineWidth = 8;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (size / 10) * i);
        ctx.lineTo(size, (size / 10) * i);
        ctx.stroke();
      }

      ctx.strokeStyle = color2;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo((size / 10) * i, 0);
        ctx.lineTo((size / 10) * i, size);
        ctx.stroke();
      }

      // Semi-transparent overlay
      const overlay = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      overlay.addColorStop(0, 'rgba(0,0,0,0.2)');
      overlay.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, size, size);
    } else if (design === 'retro') {
      // Retro wave style
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f3460');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Grid lines
      ctx.strokeStyle = color1;
      ctx.lineWidth = 2;
      for (let i = 0; i < 20; i++) {
        const y = size / 2 + i * 40;
        const curve = Math.sin(i * 0.3) * 50;
        ctx.beginPath();
        ctx.moveTo(0, y + curve);
        for (let x = 0; x <= size; x += 20) {
          const waveCurve = Math.sin((x / size) * Math.PI * 2 + i * 0.3) * 30;
          ctx.lineTo(x, y + curve + waveCurve);
        }
        ctx.stroke();
      }

      // Sun
      ctx.fillStyle = color2;
      ctx.beginPath();
      ctx.arc(size / 2, size / 3, 150, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = color2;
      ctx.lineWidth = 8;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 3, 150 + i * 20, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (design === 'glitch') {
      // Glitch/cyberpunk style
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);

      // Random glitch rectangles
      for (let i = 0; i < 50; i++) {
        const colors = [color1, color2, color3, '#00ff00', '#ff00ff'];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + '40';
        const x = Math.random() * size;
        const y = Math.random() * size;
        const w = Math.random() * 200 + 50;
        const h = Math.random() * 50 + 10;
        ctx.fillRect(x, y, w, h);
      }

      // Scan lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < size; i += 4) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }
    } else if (design === 'minimal') {
      // Minimal modern
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Single colored circle
      ctx.fillStyle = color1;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle
      ctx.fillStyle = color2;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Add text
    if (text) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 8;
      ctx.font = 'bold 200px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(text, size / 2, size / 2);
      ctx.fillText(text, size / 2, size / 2);
      ctx.restore();
    }

    // Shape overlay (circle already clipped)
    if (shape === 'square') {
      // Remove circular clip and draw square
      ctx.restore();
      ctx.clearRect(0, 0, size, size);
      // Redraw without clip (would need to refactor, so keeping circle for now)
    }

  }, [design, color1, color2, color3, text, shape]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'profile-picture.png';
    link.href = url;
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Profile Picture Generator</h1>
        <p style={styles.subtitle}>Create a cool profile picture for your editing page</p>

        <canvas ref={canvasRef} style={styles.canvas} />

        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Design Style</label>
            <select value={design} onChange={(e) => setDesign(e.target.value)} style={styles.select}>
              <option value="gradient">Gradient</option>
              <option value="geometric">Geometric</option>
              <option value="retro">Retro Wave</option>
              <option value="glitch">Glitch/Cyberpunk</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div style={styles.controlGroup}>
            <label style={styles.label}>Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.input}
              maxLength={10}
            />
          </div>

          <div style={styles.colorGroup}>
            <div style={styles.colorControl}>
              <label style={styles.label}>Color 1</label>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                style={styles.colorInput}
              />
            </div>
            <div style={styles.colorControl}>
              <label style={styles.label}>Color 2</label>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                style={styles.colorInput}
              />
            </div>
            <div style={styles.colorControl}>
              <label style={styles.label}>Color 3</label>
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                style={styles.colorInput}
              />
            </div>
          </div>

          <button onClick={downloadImage} style={styles.button}>
            Download Profile Picture
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: '40px',
  },
  canvas: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    border: '4px solid white',
  },
  controls: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  controlGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '2px solid #e0e0e0',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '2px solid #e0e0e0',
    outline: 'none',
    boxSizing: 'border-box',
  },
  colorGroup: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  colorControl: {
    flex: 1,
  },
  colorInput: {
    width: '100%',
    height: '50px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
};
