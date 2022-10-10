import React, { useRef, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import Effect from './MatrixRain'

const MatrixRainCanvas: React.FC = () => {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const effect = new Effect(canvas.width, canvas.height)
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight - 4;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.globalCompositeOperation = 'source-over'
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 100;
    const nextFrame = 1000 / fps;
    let timer = 0;


    const render = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      if (timer > nextFrame) {
        ctx.textAlign = 'center';
        ctx.fillStyle = theme === 'dark' ? 'rgba(0,0,0,0.09)' : 'rgba(255, 251, 235, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#14B8A6';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    const handleResize = () => {
      if (canvasRef?.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize)
    };
  }, [theme]);



  return (
    <canvas className='w-full h-full' ref={canvasRef}>
      your browser dont support canvas tag
    </canvas>
  );
}

export default MatrixRainCanvas
