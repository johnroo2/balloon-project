import { Maximize } from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [jumpscareStarted, setJumpscareStarted] = useState(false);
  const [phase, setPhase] = useState<'waiting' | 'gif-playing' | 'gif-paused' | 'flash-intermediate' | 'zoom-phase' | 'foohoo-gif' | 'static-haha' | 'flashing'>('waiting');
  const [isZooming, setIsZooming] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (phase === 'gif-playing') {
      const gifDuration = 4000;
      
      const gifTimer = setTimeout(() => {
        setPhase('gif-paused');
      }, gifDuration);

      return () => clearTimeout(gifTimer);
    }

    if (phase === 'gif-paused') {
      const pauseTimer = setTimeout(() => {
        setPhase('flash-intermediate');
      }, 1500);

      return () => clearTimeout(pauseTimer);
    }

    if (phase === 'flash-intermediate') {
      const blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
        }, 75);
      }, 500);

      const blinkTimer2 = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
        }, 75);
      }, 1000);
      const blinkTimer3 = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
        }, 75);
      }, 1100);

      const intermediateTimer = setTimeout(() => {
        setPhase('zoom-phase');
      }, 1500);

      return () => {
        clearTimeout(blinkTimer);
        clearTimeout(blinkTimer2);
        clearTimeout(blinkTimer3);
        clearTimeout(intermediateTimer);
      };
    }

    if (phase === 'zoom-phase') {
      const zoomStartTimer = setTimeout(() => {
        setIsZooming(true);
      }, 1575);

      const zoomEndTimer = setTimeout(() => {
        setPhase('foohoo-gif');
        setIsZooming(false);
      }, 1750);

      return () => {
        clearTimeout(zoomStartTimer);
        clearTimeout(zoomEndTimer);
      };
    }

    if (phase === 'foohoo-gif') {
      const foohooTimer = setTimeout(() => {
        setPhase('static-haha');
      }, 2000);

      return () => {
        clearTimeout(foohooTimer);
      };
    }

    if (phase === 'static-haha') {
      const staticHahaTimer = setTimeout(() => {
        setPhase('flashing');
      }, 1000);

      return () => {
        clearTimeout(staticHahaTimer);
      };
    }

    if (phase === 'flashing') {
      const flashInterval = setInterval(() => {
        setIsVisible(prev => !prev);
      }, 25); 

      return () => {
        clearInterval(flashInterval);
      };
    }
  }, [phase]);

  const startJumpscare = async () => {
    try {
      const element = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
      
      setJumpscareStarted(true);
      setPhase('gif-playing');
    } catch (error) {
      console.error("Fullscreen request failed:", error);
      setJumpscareStarted(true);
      setPhase('gif-playing');
    }
  };

  if (!jumpscareStarted) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center">
        <Maximize className='text-white' size={30} onClick={startJumpscare} />
        <p className='text-white text-sm font-mono mt-2'>(Epilepsy Warning)</p>
      </div>
    );
  }

  if (phase === 'gif-playing' || phase === 'gif-paused') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div style={{ 
          width: '100vw', 
          height: '100vh',
          position: 'relative'
        }}>
          <Image
            src="/scary-scary-face.gif"
            alt="Scary GIF"
            fill
            className="object-cover"
            priority
            unoptimized 
          />
        </div>
      </div>
    );
  }

  if (phase === 'flash-intermediate') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'relative',
            opacity: isBlinking ? 0 : 1
          }}
        >
          <Image
            src="/maxresdefault.jpg"
            alt="Intermediate Jumpscare"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  if (phase === 'zoom-phase') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'relative',
            transform: isZooming ? 'scale(3.5)' : 'scale(1)',
            transition: 'transform 0.05s linear'
          }}
        >
          <Image
            src="/hq720.jpg"
            alt="Zoom Jumpscare"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  if (phase === 'foohoo-gif') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div style={{ 
          width: '100vw', 
          height: '100vh',
          position: 'relative'
        }}>
          <Image
            src="/foohoo.gif"
            alt="Foohoo Jumpscare"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  if (phase === 'static-haha') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'relative'
          }}
        >
          <Image
            src="/haha.png"
            alt="Static Haha"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  if (phase === 'flashing') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <div 
          className={`transition-opacity duration-75 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'relative'
          }}
        >
          <Image
            src="/haha.png"
            alt="Jumpscare"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return null;
}