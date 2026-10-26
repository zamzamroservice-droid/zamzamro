import * as THREE from 'three';

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  draw(ctx);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** "AQUA ERA." wordmark for the brushed band — small vertical AQUA beside a bold ERA. */
export function aquaEraTexture() {
  return canvasTexture(512, 160, (ctx) => {
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(40,44,52,0.55)';
    ctx.shadowBlur = 6;
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(46, 84);
    ctx.rotate(-Math.PI / 2);
    ctx.font = '600 24px Jost, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.textAlign = 'center';
    ctx.fillText('AQUA', 0, 0);
    ctx.restore();
    ctx.font = '700 104px Jost, "Michroma", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('ERA', 66, 86);
    ctx.font = '600 22px Jost, sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('TM', 292, 122);
  });
}

/** "°core SERIES" + bold "ZEMPURE®" badge (Michroma) for the lower front. White ink; tinted by the material. */
export function zempureTexture() {
  return canvasTexture(1024, 300, (ctx) => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'right';
    ctx.font = '700 96px Jost, sans-serif';
    ctx.fillText('core', 958, 110);
    ctx.font = '600 22px Jost, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SERIES', 950, 140);
    ctx.beginPath();
    ctx.arc(724, 52, 9, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.letterSpacing = '8px';
    ctx.font = '400 100px Michroma, Jost, sans-serif';
    ctx.fillText('ZEMPURE', 960, 262);
    ctx.font = '500 26px Jost, sans-serif';
    ctx.letterSpacing = '0px';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(988, 200, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText('R', 988, 209);
  });
}

/** Black control strip: Power / Full / Alert icons with labels, a divider and "drink on time" (as on Zempure). */
export function panelTexture() {
  return canvasTexture(1024, 128, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, '#1d1f24');
    g.addColorStop(1, '#0f1013');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(2, 2, 1020, 124, 26);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 3;
    // power
    ctx.beginPath();
    ctx.arc(110, 50, 13, -Math.PI * 0.32, Math.PI * 1.32);
    ctx.stroke();
    ctx.fillRect(108.5, 32, 3, 16);
    // full (tank with waves)
    ctx.strokeRect(222, 37, 22, 26);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(225, 46 + i * 6);
      ctx.quadraticCurveTo(233, 42 + i * 6, 241, 46 + i * 6);
      ctx.stroke();
    }
    // alert (warning triangle)
    ctx.beginPath();
    ctx.moveTo(352, 34);
    ctx.lineTo(368, 63);
    ctx.lineTo(336, 63);
    ctx.closePath();
    ctx.stroke();
    ctx.fillRect(350.5, 43, 3, 11);
    ctx.fillRect(350.5, 57, 3, 3);
    // divider
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(470, 26, 2, 76);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '600 17px Jost, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText('POWER', 110, 98);
    ctx.fillText('FULL', 233, 98);
    ctx.fillText('ALERT', 352, 98);
    ctx.font = 'italic 400 34px Jost, sans-serif';
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0px';
    ctx.fillText('drink on time', 610, 66);
    ctx.fillRect(610, 80, 330, 2);
  });
}

/** Fine vertical ribs for the tank front (colour map) — smoked for Charcoal Black, frosted for Pearl White. */
export function ribTexture(light = false) {
  const stops = light ? ['#9aa1aa', '#eef1f4', '#c9ced5', '#8e959e'] : ['#24272d', '#6d737e', '#454a53', '#1d2025'];
  const tex = canvasTexture(512, 64, (ctx) => {
    const ribs = 64;
    const w = 512 / ribs;
    for (let i = 0; i < ribs; i++) {
      const g = ctx.createLinearGradient(i * w, 0, (i + 1) * w, 0);
      g.addColorStop(0, stops[0]);
      g.addColorStop(0.32, stops[1]);
      g.addColorStop(0.5, stops[2]);
      g.addColorStop(1, stops[3]);
      ctx.fillStyle = g;
      ctx.fillRect(i * w, 0, w, 64);
    }
  });
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** Same ribs as a bump map, so highlights ripple across the tank. */
export function ribBump() {
  const tex = canvasTexture(
    512,
    8,
    (ctx) => {
      const ribs = 64;
      const w = 512 / ribs;
      for (let i = 0; i < ribs; i++) {
        const g = ctx.createLinearGradient(i * w, 0, (i + 1) * w, 0);
        g.addColorStop(0, '#000');
        g.addColorStop(0.5, '#fff');
        g.addColorStop(1, '#000');
        ctx.fillStyle = g;
        ctx.fillRect(i * w, 0, w, 8);
      }
    },
    false,
  );
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** Vertical streak texture that scrolls along the water stream to suggest flow. */
export function flowTexture() {
  const tex = canvasTexture(
    32,
    256,
    (ctx) => {
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillRect(0, 0, 32, 256);
      for (let i = 0; i < 14; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.35 + ((i * 37) % 60) / 100})`;
        ctx.fillRect((i * 11) % 28, (i * 53) % 256, 3, 30 + ((i * 17) % 40));
      }
    },
    false,
  );
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
