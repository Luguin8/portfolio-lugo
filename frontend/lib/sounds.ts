/**
 * Bloodborne-style UI sounds – Web Audio API synthesis
 * All sounds are generated procedurally. No audio files required.
 * AudioContext is initialized on first user interaction (browser policy).
 *
 * NOTE: Los sonidos del juego original están protegidos por derechos de autor.
 * Estos son sonidos sintetizados que evocan la misma atmósfera gótica/mecánica.
 */

let _ctx: AudioContext | null = null;
let _soundEnabled = true;

/** Llamar al primer gesto de usuario (click/keydown) */
export function initAudioContext(): void {
    if (typeof window === "undefined" || _ctx) return;
    try {
        _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
        // Browser doesn't support Web Audio
    }
}

export function setSoundEnabled(enabled: boolean): void {
    _soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
    return _soundEnabled;
}

function ctx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!_ctx) initAudioContext();
    return _ctx;
}

// ── Core tone builder ─────────────────────────────────────────
interface ToneOptions {
    freq: number;
    duration: number;
    type?: OscillatorType;
    vol?: number;
    delay?: number;
    /** Frequency to ramp to at end */
    freqEnd?: number;
    /** Attack time in seconds */
    attack?: number;
}

function tone(opts: ToneOptions): void {
    const c = ctx();
    if (!c || !_soundEnabled) return;

    const { freq, duration, type = "sine", vol = 0.5, delay = 0, freqEnd, attack = 0.006 } = opts;

    const osc = c.createOscillator();
    const gain = c.createGain();

    // Subtle filtering to soften harsh digital sounds
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 4000;
    filter.Q.value = 0.5;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);

    osc.type = type;
    const now = c.currentTime + delay;

    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), now + duration * 0.8);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol * 0.4, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration + 0.01);
}

// White noise burst (for whoosh/impact effects)
function noise(duration: number, vol = 0.15, delay = 0): void {
    const c = ctx();
    if (!c || !_soundEnabled) return;

    const bufferSize = c.sampleRate * duration;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
    }

    const source = c.createBufferSource();
    source.buffer = buffer;

    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.8;

    const gain = c.createGain();
    const now = (c.currentTime) + delay;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);

    source.start(now);
    source.stop(now + duration + 0.01);
}

// ── BB UI Sounds ──────────────────────────────────────────────

/**
 * Menu navigate / hover – muy corto, clic metálico tenue.
 * Equivalente al "tick" al mover el cursor en el inventario.
 */
export function playNavigate(): void {
    tone({ freq: 1200, duration: 0.055, type: "triangle", vol: 0.35, freqEnd: 900 });
}

/**
 * Menu select / click principal – dos tonos, más pesado.
 * Equivalente al sonido de confirmar en el menú.
 */
export function playSelect(): void {
    tone({ freq: 950, duration: 0.04, type: "square", vol: 0.30 });
    tone({ freq: 500, duration: 0.12, type: "triangle", vol: 0.22, delay: 0.035, freqEnd: 350 });
}

/**
 * Panel / modal abrir – swoosh bajo + campana tenue.
 * Equivalente al sonido de abrir un panel de lore.
 */
export function playOpen(): void {
    noise(0.18, 0.12);
    tone({ freq: 280, duration: 0.08, type: "sine", vol: 0.20 });
    tone({ freq: 560, duration: 0.22, type: "sine", vol: 0.18, delay: 0.06, freqEnd: 480 });
}

/**
 * Panel / modal cerrar – golpe sordo descendente.
 */
export function playClose(): void {
    tone({ freq: 420, duration: 0.10, type: "triangle", vol: 0.30, freqEnd: 280 });
    noise(0.12, 0.08, 0.04);
}

/**
 * INSIGHT: ON – secuencia ascensional mística (3 notas).
 * "Has ganado Insight."
 */
export function playInsightGain(): void {
    tone({ freq: 360, duration: 0.18, type: "sine", vol: 0.35, attack: 0.012 });
    tone({ freq: 540, duration: 0.18, type: "sine", vol: 0.32, delay: 0.14, attack: 0.010 });
    tone({ freq: 810, duration: 0.30, type: "sine", vol: 0.28, delay: 0.28, attack: 0.010, freqEnd: 780 });
    noise(0.25, 0.06, 0.28);
}

/**
 * INSIGHT: OFF – secuencia descendente.
 * "Has perdido Insight."
 */
export function playInsightLoss(): void {
    tone({ freq: 700, duration: 0.14, type: "sine", vol: 0.30, freqEnd: 560 });
    tone({ freq: 490, duration: 0.14, type: "sine", vol: 0.26, delay: 0.12, freqEnd: 380 });
    tone({ freq: 320, duration: 0.25, type: "triangle", vol: 0.22, delay: 0.22, freqEnd: 200 });
}

/**
 * Error / fallo – disonancia baja.
 */
export function playError(): void {
    tone({ freq: 220, duration: 0.28, type: "sawtooth", vol: 0.28, freqEnd: 180 });
    tone({ freq: 295, duration: 0.28, type: "sawtooth", vol: 0.14 });
}

/**
 * Formulario enviado / éxito – campanadas suaves.
 */
export function playSubmit(): void {
    tone({ freq: 550, duration: 0.12, type: "sine", vol: 0.20, attack: 0.01 });
    tone({ freq: 825, duration: 0.12, type: "sine", vol: 0.20, delay: 0.10, attack: 0.01 });
    tone({ freq: 1100, duration: 0.25, type: "sine", vol: 0.18, delay: 0.20, attack: 0.01, freqEnd: 1050 });
}

/**
 * Hover ligero sobre imágenes / elementos secundarios.
 */
export function playHoverLight(): void {
    tone({ freq: 900, duration: 0.04, type: "triangle", vol: 0.18 });
}

/**
 * Flechas de galería / navegación interna.
 */
export function playGalleryNav(): void {
    tone({ freq: 780, duration: 0.06, type: "triangle", vol: 0.28, freqEnd: 650 });
}
