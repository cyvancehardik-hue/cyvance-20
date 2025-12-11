import { useRef, useCallback } from 'react';

type SoundType = 'alert' | 'success' | 'error' | 'step' | 'toggle' | 'critical' | 'scan';

export const useSimulationFeedback = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'alert':
          oscillator.frequency.setValueAtTime(880, now);
          oscillator.frequency.setValueAtTime(440, now + 0.1);
          oscillator.frequency.setValueAtTime(880, now + 0.2);
          gainNode.gain.setValueAtTime(0.15, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'success':
          oscillator.frequency.setValueAtTime(523, now);
          oscillator.frequency.setValueAtTime(659, now + 0.1);
          oscillator.frequency.setValueAtTime(784, now + 0.2);
          gainNode.gain.setValueAtTime(0.12, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          oscillator.start(now);
          oscillator.stop(now + 0.35);
          break;

        case 'error':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(200, now);
          oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          break;

        case 'step':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.setValueAtTime(800, now + 0.05);
          gainNode.gain.setValueAtTime(0.08, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
          oscillator.start(now);
          oscillator.stop(now + 0.12);
          break;

        case 'toggle':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(400, now);
          oscillator.frequency.setValueAtTime(600, now + 0.08);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;

        case 'critical':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(220, now);
          oscillator.frequency.setValueAtTime(440, now + 0.1);
          oscillator.frequency.setValueAtTime(220, now + 0.2);
          oscillator.frequency.setValueAtTime(440, now + 0.3);
          gainNode.gain.setValueAtTime(0.12, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;

        case 'scan':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(300, now);
          oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.4);
          gainNode.gain.setValueAtTime(0.06, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, [getAudioContext]);

  const triggerHaptic = useCallback((pattern: 'light' | 'medium' | 'heavy' | 'double' | 'triple') => {
    if (!navigator.vibrate) return;

    try {
      switch (pattern) {
        case 'light':
          navigator.vibrate(30);
          break;
        case 'medium':
          navigator.vibrate(50);
          break;
        case 'heavy':
          navigator.vibrate(100);
          break;
        case 'double':
          navigator.vibrate([30, 50, 30]);
          break;
        case 'triple':
          navigator.vibrate([20, 30, 20, 30, 20]);
          break;
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }, []);

  const feedbackStep = useCallback((isDefense: boolean) => {
    playSound('step');
    triggerHaptic('light');
  }, [playSound, triggerHaptic]);

  const feedbackAlert = useCallback(() => {
    playSound('alert');
    triggerHaptic('double');
  }, [playSound, triggerHaptic]);

  const feedbackSuccess = useCallback(() => {
    playSound('success');
    triggerHaptic('medium');
  }, [playSound, triggerHaptic]);

  const feedbackError = useCallback(() => {
    playSound('error');
    triggerHaptic('heavy');
  }, [playSound, triggerHaptic]);

  const feedbackToggle = useCallback(() => {
    playSound('toggle');
    triggerHaptic('light');
  }, [playSound, triggerHaptic]);

  const feedbackCritical = useCallback(() => {
    playSound('critical');
    triggerHaptic('triple');
  }, [playSound, triggerHaptic]);

  const feedbackScan = useCallback(() => {
    playSound('scan');
    triggerHaptic('light');
  }, [playSound, triggerHaptic]);

  return {
    playSound,
    triggerHaptic,
    feedbackStep,
    feedbackAlert,
    feedbackSuccess,
    feedbackError,
    feedbackToggle,
    feedbackCritical,
    feedbackScan,
  };
};
