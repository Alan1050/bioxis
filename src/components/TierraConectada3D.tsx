"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";

export default function TierraConectada3D() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02070d, 0.024);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
    camera.position.set(0, 0.18, 7.35);

    const root = new THREE.Group();
    root.rotation.set(-0.16, -0.58, 0);
    scene.add(root);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const textureUrls = {
      earth: "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
      specular: "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
      clouds: "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
      moon: "https://threejs.org/examples/textures/planets/moon_1024.jpg",
    };

    const earthTexture = loader.load(textureUrls.earth);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = 8;

    const specularTexture = loader.load(textureUrls.specular);
    specularTexture.anisotropy = 8;

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2.15, 128, 128),
      new THREE.MeshPhongMaterial({
        map: earthTexture,
        specularMap: specularTexture,
        specular: new THREE.Color(0x2f4455),
        shininess: 18,
        emissive: new THREE.Color(0x020812),
        emissiveIntensity: 0.06,
      }),
    );
    root.add(earth);

    const nightTexture = loader.load(createNightLightsTexture());
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = 8;

    const nightSide = new THREE.Mesh(
      new THREE.SphereGeometry(2.158, 128, 128),
      new THREE.MeshBasicMaterial({
        map: nightTexture,
        color: 0xffd58a,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(nightSide);

    const cloudTexture = loader.load(textureUrls.clouds);
    cloudTexture.colorSpace = THREE.SRGBColorSpace;

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(2.19, 128, 128),
      new THREE.MeshLambertMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      }),
    );
    root.add(clouds);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.27, 96, 96),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color(0x79d8ff) } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.56 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.1);
            gl_FragColor = vec4(glowColor, intensity * 0.58);
          }
        `,
      }),
    );
    root.add(atmosphere);

    scene.add(new THREE.AmbientLight(0x6f91b8, 0.46));

    const key = new THREE.DirectionalLight(0xffffff, 4.8);
    key.position.set(-4.8, 2.5, 4.2);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x6cd9ff, 1.15);
    rim.position.set(3.8, 0.55, -3.6);
    scene.add(rim);

    const network = new THREE.Group();
    root.add(network);

    const cyan = new THREE.Color(0x5ff6ff);
    const blue = new THREE.Color(0x54a9ff);

    const orbitDefinitions = [
      { radius: 3.04, tilt: [0.65, 0.28, -0.15], width: 0.007, opacity: 0.52 },
      { radius: 3.42, tilt: [-0.28, 0.72, 0.82], width: 0.005, opacity: 0.34 },
      { radius: 3.72, tilt: [1.24, -0.34, 0.08], width: 0.004, opacity: 0.26 },
      { radius: 2.86, tilt: [-0.78, -0.12, 0.42], width: 0.0035, opacity: 0.3 },
    ] as const;

    const orbitGroups = orbitDefinitions.map((def, index) => {
      const group = new THREE.Group();
      group.rotation.set(def.tilt[0], def.tilt[1], def.tilt[2]);
      group.userData.speed = 0.0016 + index * 0.00035;
      network.add(group);

      group.add(makeOrbit(def.radius, def.width, def.opacity, cyan));

      for (let i = 0; i < 4; i += 1) {
        const angle = (Math.PI * 2 * i) / 4 + index * 0.45;
        const satellite = makeSatellite();
        satellite.position.set(Math.cos(angle) * def.radius, Math.sin(angle) * def.radius, 0);
        satellite.rotation.z = angle + Math.PI / 2;
        group.add(satellite);
      }

      return group;
    });

    const cityPoints = [
      { lat: 37.77, lon: -122.42 },
      { lat: 19.43, lon: -99.13 },
      { lat: -23.55, lon: -46.63 },
      { lat: 51.5, lon: -0.12 },
      { lat: 35.68, lon: 139.76 },
      { lat: 1.35, lon: 103.82 },
      { lat: -33.86, lon: 151.21 },
      { lat: 40.71, lon: -74.01 },
      { lat: -34.6, lon: -58.38 },
      { lat: 28.61, lon: 77.2 },
    ];

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8ffff,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
    });

    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x5ff6ff,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    cityPoints.forEach((point, index) => {
      const pos = latLonToVector3(point.lat, point.lon, 2.24);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(index % 3 === 0 ? 0.045 : 0.032, 20, 20),
        nodeMaterial,
      );
      marker.position.copy(pos);
      network.add(marker);

      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), pulseMaterial.clone());
      pulse.position.copy(pos.clone().multiplyScalar(1.006));
      pulse.userData.phase = index * 0.7;
      network.add(pulse);
    });

    const links = [
      [0, 1],
      [1, 2],
      [2, 8],
      [0, 7],
      [7, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [1, 3],
      [2, 5],
      [8, 0],
      [9, 5],
    ];

    links.forEach(([a, b], index) => {
      const start = latLonToVector3(cityPoints[a].lat, cityPoints[a].lon, 2.28);
      const end = latLonToVector3(cityPoints[b].lat, cityPoints[b].lon, 2.28);
      network.add(makeArc(start, end, 0.42 + (index % 3) * 0.14, Math.random() > 0.42 ? cyan : blue));
    });

    const starField = makeStarField();
    scene.add(starField);

    const moonTexture = loader.load(textureUrls.moon);
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 48, 48),
      new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 0.95 }),
    );
    moon.position.set(3.05, 2.25, -1.35);
    scene.add(moon);

    const grid = makeBackgroundGrid();
    scene.add(grid);

    const pointer = {
      dragging: false,
      x: 0,
      y: 0,
      targetRotX: root.rotation.x,
      targetRotY: root.rotation.y,
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.dragging = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.dragging) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.targetRotY += dx * 0.006;
      pointer.targetRotX = THREE.MathUtils.clamp(pointer.targetRotX + dy * 0.004, -0.95, 0.95);
    };

    const onPointerUp = (event: PointerEvent) => {
      pointer.dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + event.deltaY * 0.004, 5.4, 11.4);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      if (!pointer.dragging) pointer.targetRotY += 0.0013;

      root.rotation.x += (pointer.targetRotX - root.rotation.x) * 0.08;
      root.rotation.y += (pointer.targetRotY - root.rotation.y) * 0.08;
      earth.rotation.y += 0.0009;
      nightSide.rotation.y = earth.rotation.y;
      clouds.rotation.y += 0.0015;
      moon.rotation.y += 0.002;
      starField.rotation.y += 0.00008;
      grid.position.x = Math.sin(t * 0.13) * 0.2 + 0.7;

      orbitGroups.forEach((group, index) => {
        group.rotation.z += group.userData.speed;
        group.children.forEach((child, childIndex) => {
          if (childIndex > 0) child.rotation.y = t * 1.6 + index;
        });
      });

      network.children.forEach((child) => {
        if (child.userData.phase !== undefined) {
          const pulse = 0.85 + Math.sin(t * 2.8 + child.userData.phase) * 0.22;
          child.scale.setScalar(pulse);
          const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          material.opacity = 0.22 + Math.sin(t * 2.8 + child.userData.phase) * 0.12;
        }
      });

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points)) return;
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });

      [earthTexture, specularTexture, nightTexture, cloudTexture, moonTexture].forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} style={styles.host}>
      <canvas ref={canvasRef} aria-label="Escena 3D de la Tierra con orbitas y satelites" style={styles.canvas} />
    </div>
  );
}

function makeOrbit(radius: number, tubeRadius: number, opacity: number, color: THREE.Color) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.52, 0, Math.PI * 2);
  const points = curve.getPoints(220).map((point) => new THREE.Vector3(point.x, point.y, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.LineLoop(
    geometry,
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );

  const glow = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tubeRadius, 8, 192),
    new THREE.MeshBasicMaterial({
      color: 0x4ff6ff,
      transparent: true,
      opacity: opacity * 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  glow.scale.y = 0.52;

  const group = new THREE.Group();
  group.add(line, glow);
  return group;
}

function makeSatellite() {
  const group = new THREE.Group();

  const metal = new THREE.MeshStandardMaterial({ color: 0xc8d3d8, metalness: 0.82, roughness: 0.28 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x56616a, metalness: 0.86, roughness: 0.32 });
  const foil = new THREE.MeshStandardMaterial({
    color: 0xd5a23c,
    metalness: 0.78,
    roughness: 0.36,
    emissive: new THREE.Color(0x1b0f03),
    emissiveIntensity: 0.16,
  });
  const panelMaterial = new THREE.MeshStandardMaterial({
    map: createSolarPanelTexture(),
    color: 0xbfe9ff,
    metalness: 0.18,
    roughness: 0.24,
    emissive: new THREE.Color(0x09304f),
    emissiveIntensity: 0.34,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.14), [
    metal,
    metal,
    foil,
    foil,
    darkMetal,
    metal,
  ]);
  group.add(body);

  const sensor = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 24), darkMetal);
  sensor.rotation.x = Math.PI / 2;
  sensor.position.z = 0.09;
  group.add(sensor);

  const panelGeometry = new THREE.BoxGeometry(0.34, 0.135, 0.012);
  const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  const rightPanel = leftPanel.clone();
  leftPanel.position.x = -0.36;
  rightPanel.position.x = 0.36;
  group.add(leftPanel, rightPanel);

  const leftBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 10), metal);
  leftBoom.rotation.z = Math.PI / 2;
  leftBoom.position.x = -0.18;
  const rightBoom = leftBoom.clone();
  rightBoom.position.x = 0.18;
  group.add(leftBoom, rightBoom);

  const dish = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.045, 32, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xe5ecef,
      metalness: 0.72,
      roughness: 0.2,
      side: THREE.DoubleSide,
    }),
  );
  dish.rotation.x = Math.PI / 2;
  dish.position.set(0, -0.14, 0.03);
  group.add(dish);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.22, 8), metal);
  antenna.position.y = 0.21;
  group.add(antenna);

  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.014, 12, 12),
    new THREE.MeshBasicMaterial({
      color: 0xb8ffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    }),
  );
  tip.position.y = 0.33;
  group.add(tip);

  group.rotation.x = 0.2;
  group.scale.setScalar(0.56);
  return group;
}

function makeArc(start: THREE.Vector3, end: THREE.Vector3, lift: number, color: THREE.Color) {
  const middle = start.clone().add(end).normalize().multiplyScalar(2.35 + lift);
  const curve = new THREE.QuadraticBezierCurve3(start, middle, end);

  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(curve.getPoints(70)),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function makeStarField() {
  const group = new THREE.Group();
  const starGeometry = new THREE.BufferGeometry();
  const starPositions: number[] = [];

  for (let i = 0; i < 650; i += 1) {
    const r = 28 + Math.random() * 42;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    starPositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    );
  }

  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  group.add(
    new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xbdf8ff,
        size: 0.035,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
    ),
  );

  return group;
}

function makeBackgroundGrid() {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({
    color: 0x75eaff,
    transparent: true,
    opacity: 0.055,
    depthWrite: false,
  });

  for (let i = -9; i <= 9; i += 1) {
    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-9, i, -8), new THREE.Vector3(9, i, -8)]),
        material,
      ),
    );
    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -6, -8), new THREE.Vector3(i, 6, -8)]),
        material,
      ),
    );
  }

  group.position.set(0.7, 0.1, -3.8);
  group.rotation.z = -0.04;
  return group;
}

function createSolarPanelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;

  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#071a2e");
  gradient.addColorStop(0.45, "#0d5c8a");
  gradient.addColorStop(1, "#061324");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(177, 239, 255, 0.72)";
  ctx.lineWidth = 2;

  for (let x = 0; x <= canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  ctx.beginPath();
  ctx.moveTo(18, 8);
  ctx.lineTo(98, 8);
  ctx.lineTo(48, 88);
  ctx.lineTo(0, 88);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createNightLightsTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const cityClusters = [
    [585, 356, 95, 52],
    [514, 392, 60, 36],
    [1012, 330, 116, 54],
    [1108, 387, 78, 44],
    [1430, 365, 130, 62],
    [1568, 430, 92, 46],
    [1652, 530, 82, 42],
    [604, 590, 62, 42],
    [620, 690, 48, 58],
    [1306, 496, 52, 32],
    [1518, 590, 54, 36],
  ];

  cityClusters.forEach(([x, y, w, h]) => {
    const count = Math.round((w + h) * 1.8);

    for (let i = 0; i < count; i += 1) {
      const px = x + (Math.random() - 0.5) * w;
      const py = y + (Math.random() - 0.5) * h;
      const radius = 0.8 + Math.random() * 2.4;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 5.5);
      glow.addColorStop(0, "rgba(255, 225, 152, 0.95)");
      glow.addColorStop(0.25, "rgba(255, 168, 86, 0.46)");
      glow.addColorStop(1, "rgba(255, 168, 86, 0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, radius * 5.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.globalCompositeOperation = "destination-in";
  const vignette = ctx.createLinearGradient(0, 0, canvas.width, 0);
  vignette.addColorStop(0, "rgba(255,255,255,0)");
  vignette.addColorStop(0.18, "rgba(255,255,255,0.9)");
  vignette.addColorStop(0.72, "rgba(255,255,255,0.92)");
  vignette.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/png");
}

const styles = {
  host: {
    position: "relative",
    width: "100%",
    height: "100vh",
    minHeight: 560,
    overflow: "hidden",
    background: "#02070d",
    color: "#fff",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
    cursor: "grab",
  },
  hud: {
    position: "absolute",
    left: "clamp(16px, 4vw, 52px)",
    top: "clamp(16px, 4vw, 48px)",
    width: "min(360px, calc(100vw - 32px))",
    padding: "18px 18px 16px",
    border: "1px solid rgba(148, 241, 255, 0.22)",
    borderRadius: 8,
    background: "rgba(7, 18, 28, 0.68)",
    boxShadow: "0 18px 70px rgba(0, 0, 0, 0.38)",
    backdropFilter: "blur(14px)",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "clamp(1.25rem, 3vw, 2rem)",
    lineHeight: 1.05,
    letterSpacing: 0,
  },
  copy: {
    margin: 0,
    color: "rgba(223, 252, 255, 0.78)",
    fontSize: "0.92rem",
    lineHeight: 1.45,
  },
  signature: {
    position: "absolute",
    left: "clamp(16px, 4vw, 52px)",
    bottom: "clamp(14px, 3vw, 34px)",
    color: "rgba(223, 252, 255, 0.54)",
    fontSize: "0.78rem",
  },
} satisfies Record<string, CSSProperties>;
