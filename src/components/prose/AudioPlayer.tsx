"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [1, 1.25, 1.5, 2];
const SKIP = 10; // matches the replay_10 / forward_10 icons

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export default function AudioPlayer({
  src,
  title = "Listen to this article",
  subtitle,
}: {
  src: string;
  title?: string;
  subtitle?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrent(audio.currentTime);
    const onProgress = () => {
      if (audio.buffered.length) setBuffered(audio.buffered.end(audio.buffered.length - 1));
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onError = () => setFailed(true);

    // Metadata can load before this effect attaches, so seed from the element.
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
      setCurrent(audio.currentTime);
    }

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("progress", onProgress);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("progress", onProgress);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setFailed(true));
    else audio.pause();
  }

  function seekTo(seconds: number) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds)) return;
    audio.currentTime = Math.min(Math.max(seconds, 0), duration || audio.duration || 0);
    setCurrent(audio.currentTime);
  }

  function cycleSpeed() {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? Math.min(100, (buffered / duration) * 100) : 0;
  const meta = subtitle ?? (duration > 0 ? `Audio · ${formatTime(duration)}` : "Audio");

  return (
    <div className={`mw-audio${playing ? " is-playing" : ""}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mw-audio__head">
        <button
          type="button"
          className="mw-audio__play"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            {playing ? "pause" : "play_arrow"}
          </span>
        </button>

        <div className="mw-audio__meta">
          <div className="mw-audio__title">{title}</div>
          <div className="mw-audio__sub">
            {failed ? "Audio unavailable" : meta}
            <span className="mw-audio__eq" aria-hidden="true">
              <i /><i /><i /><i />
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mw-audio__speed"
          onClick={cycleSpeed}
          aria-label={`Playback speed ${speed}x`}
        >
          {speed}&times;
        </button>
      </div>

      <div className="mw-audio__scrub">
        <span className="mw-audio__time">{formatTime(current)}</span>
        <div className="mw-audio__track">
          <span className="mw-audio__buffered" style={{ width: `${bufferedPct}%` }} />
          <span className="mw-audio__fill" style={{ width: `${progress}%` }} />
          <span className="mw-audio__thumb" style={{ left: `${progress}%` }} />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Seek"
            className="mw-audio__range"
          />
        </div>
        <span className="mw-audio__time">
          {duration > 0 ? `-${formatTime(duration - current)}` : "0:00"}
        </span>
      </div>

      <div className="mw-audio__controls">
        <button type="button" onClick={() => seekTo(current - SKIP)} aria-label={`Back ${SKIP} seconds`}>
          <span className="material-symbols-rounded" aria-hidden="true">replay_10</span>
        </button>
        <button type="button" onClick={() => seekTo(current + SKIP)} aria-label={`Forward ${SKIP} seconds`}>
          <span className="material-symbols-rounded" aria-hidden="true">forward_10</span>
        </button>
        <span className="mw-audio__spacer" />
        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          <span className="material-symbols-rounded" aria-hidden="true">
            {muted ? "volume_off" : "volume_up"}
          </span>
        </button>
        <a href={src} download aria-label="Download audio">
          <span className="material-symbols-rounded" aria-hidden="true">download</span>
        </a>
      </div>
    </div>
  );
}
