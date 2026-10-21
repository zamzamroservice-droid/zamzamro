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
    ctx.beginPath();
    ctx.arc(290, 118, 9, 0, Math.PI * 2);
    ctx.fill();
  });
}

/** "°core SERIES" + outlined "SHAPURE" badge (Michroma) for the lower front. */
export function shapureTexture() {
  return canvasTexture(1024, 300, (ctx) => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'right';
    ctx.font = '700 92px Jost, sans-serif';
    ctx.fillText('core', 960, 108);
    ctx.font = '600 22px Jost, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SERIES', 948, 138);
    ctx.beginPath();
    ctx.arc(732, 52, 9, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.stroke();
  });
}

/** Black control strip: power / full / purify icons with labels, and "drink on time". */
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
    // purify (drop)
    ctx.beginPath();
    ctx.moveTo(352, 34);
    ctx.bezierCurveTo(366, 52, 366, 62, 352, 64);
    ctx.bezierCurveTo(338, 62, 338, 52, 352, 34);
    ctx.stroke();
    ctx.font = '600 17px Jost, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText('POWER', 110, 98);
    ctx.fillText('FULL', 233, 98);
    ctx.fillText('PURIFY', 352, 98);
    ctx.font = 'italic 400 34px Jost, sans-serif';
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0px';
    ctx.fillText('drink on time', 650, 66);
    ctx.fillRect(650, 80, 300, 2);
  });
}

/** Fine vertical ribs for the smoked tank front (colour map). */
export function ribTexture() {
  const tex = canvasTexture(512, 64, (ctx) => {
    const ribs = 64;
    const w = 512 / ribs;
    for (let i = 0; i < ribs; i++) {
      const g = ctx.createLinearGradient(i * w, 0, (i + 1) * w, 0);
      g.addColorStop(0, '#24272d');
      g.addColorStop(0.32, '#6d737e');
      g.addColorStop(0.5, '#454a53');
      g.addColorStop(1, '#1d2025');
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
