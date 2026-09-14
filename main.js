/* ============================================================
   VOID SYSTEMS — Terminal / OS Simulator
   Author: MuncixOp
   ============================================================ */

/* ---------- OS DETECTION ---------- */
const ua = navigator.userAgent;
const os = (() => {
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac|Darwin/.test(ua)) return 'mac';
  if (/Win/.test(ua)) return 'win';
  if (/Linux/.test(ua)) return 'linux';
  return 'linux';
})();
const mob = os === 'ios' || os === 'android' || matchMedia('(max-width:700px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.add('os-' + os);

/* ---------- AUDIO ENGINE ---------- */
let actx = null;
let audioEnabled = true;

function audio() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function noiseBuf(a, dur) {
  const b = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function playKey() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'square'; o1.frequency.value = 600 + Math.random() * 600;
    o2.type = 'sawtooth'; o2.frequency.value = 1200 + Math.random() * 1200;
    o2.detune.value = Math.random() * 50 - 25;
    g.gain.setValueAtTime(.02, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .03);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .03); o2.start(t); o2.stop(t + .03);
    const n = a.createBufferSource(), ng = a.createGain();
    n.buffer = noiseBuf(a, .02); ng.gain.setValueAtTime(.012, t);
    ng.gain.exponentialRampToValueAtTime(.001, t + .02);
    n.connect(ng); ng.connect(a.destination); n.start
