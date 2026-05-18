import { useEffect, useRef } from 'react'

const CURVE_COUNT = 5
const PARTICLE_COUNT = 260

export default function EnergyWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    let width = 0
    let height = 0

    let animationId = 0
    let time = 0

    let particles = []

    // ===== BEZIER =====

    const cubicBezier = (
      p0,
      p1,
      p2,
      p3,
      t
    ) => {
      const u = 1 - t

      const tt = t * t
      const uu = u * u

      const uuu = uu * u
      const ttt = tt * t

      return {
        x:
          uuu * p0.x +
          3 * uu * t * p1.x +
          3 * u * tt * p2.x +
          ttt * p3.x,

        y:
          uuu * p0.y +
          3 * uu * t * p1.y +
          3 * u * tt * p2.y +
          ttt * p3.y,
      }
    }

    // ===== CURVES =====

    const createCurve = (
      index,
      phase
    ) => {
      const base =
        index / (CURVE_COUNT - 1)

      return {
        start: {
          x: width * 0.1,
          y: height * 0.88,
        },

        cp1: {
          x: width * 0.28,
          y:
            height *
            (
              0.92 -
              base * 0.28 +
              Math.sin(
                phase + index * 0.9
              ) *
                0.04
            ),
        },

        cp2: {
          x: width * 0.62,
          y:
            height *
            (
              0.37 -
              base * 0.15 +
              Math.cos(
                phase * 1.1 +
                  index * 0.7
              ) *
                0.04
            ),
        },

        end: {
          x: width * 0.92,
          y: height * 0.12,
        },

        weight: 1.2 + base * 0.9,

        alpha: 0.14 + base * 0.12,

        glow: index === 2,
      }
    }

    const pointOnCurve = (
      curve,
      t
    ) => {
      return cubicBezier(
        curve.start,
        curve.cp1,
        curve.cp2,
        curve.end,
        t
      )
    }

    // ===== PARTICLES =====

    const createParticles = () => {
      particles = Array.from(
        { length: PARTICLE_COUNT },
        (_, index) => ({
          curveIndex:
            index % CURVE_COUNT,

          t: Math.random(),

          speed:
            0.0009 +
            Math.random() * 0.0011,

          size:
            0.7 + Math.random() * 1.6,

          alpha:
            0.4 + Math.random() * 0.5,

          drift:
            (Math.random() - 0.5) * 18,

          bright:
            Math.random() < 0.18,

          phase:
            Math.random() *
            Math.PI *
            2,
        })
      )
    }

    // ===== RESIZE =====

    const resizeCanvas = () => {
      width =
        canvas.width =
        canvas.offsetWidth || 600

      height =
        canvas.height =
        canvas.offsetHeight || 600

      ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
      )

      ctx.imageSmoothingEnabled =
        true

      createParticles()

      ctx.clearRect(
        0,
        0,
        width,
        height
      )
    }

    // ===== DRAW CURVES =====

    const drawCurves = (curves) => {
      curves.forEach((curve) => {
        ctx.beginPath()

        const steps = 96

        for (
          let i = 0;
          i <= steps;
          i += 1
        ) {
          const point =
            pointOnCurve(
              curve,
              i / steps
            )

          if (i === 0) {
            ctx.moveTo(
              point.x,
              point.y
            )
          } else {
            ctx.lineTo(
              point.x,
              point.y
            )
          }
        }

        ctx.lineWidth = curve.glow
          ? 2.4
          : 1.4

        ctx.strokeStyle = curve.glow
          ? 'rgba(168,237,255,0.94)'
          : `rgba(89,203,255,${curve.alpha})`

        ctx.lineCap = 'round'

        ctx.shadowColor = curve.glow
          ? 'rgba(87,225,255,0.32)'
          : 'rgba(88,202,255,0.2)'

        ctx.shadowBlur = curve.glow
          ? 18
          : 9

        ctx.stroke()

        ctx.shadowBlur = 0
      })
    }

    // ===== GLOW =====

    const drawGlow = (curve) => {
      const center =
        pointOnCurve(curve, 0.48)

      const gradient =
        ctx.createRadialGradient(
          center.x,
          center.y,
          0,
          center.x,
          center.y,
          width * 0.18
        )

      gradient.addColorStop(
        0,
        'rgba(122,211,255,0.24)'
      )

      gradient.addColorStop(
        0.35,
        'rgba(38,130,255,0.09)'
      )

      gradient.addColorStop(
        1,
        'rgba(3,19,43,0)'
      )

      ctx.fillStyle = gradient

      ctx.fillRect(
        0,
        0,
        width,
        height
      )
    }

    // ===== PARTICLES RENDER =====

    const drawParticles = (
      curves
    ) => {
      particles.forEach((particle) => {
        particle.t += particle.speed

        if (particle.t > 1) {
          particle.t -= 1
        }

        const curve =
          curves[particle.curveIndex]

        const point =
          pointOnCurve(
            curve,
            particle.t
          )

        const next =
          pointOnCurve(
            curve,
            Math.min(
              particle.t + 0.01,
              1
            )
          )

        const dx = next.x - point.x
        const dy = next.y - point.y

        const length =
          Math.hypot(dx, dy) || 1

        const nx = -dy / length
        const ny = dx / length

        const driftX =
          nx * particle.drift +
          Math.sin(
            time * 1.6 +
              particle.phase
          ) *
            4

        const driftY =
          ny * particle.drift +
          Math.cos(
            time * 1.3 +
              particle.phase
          ) *
            3

        const x = point.x + driftX
        const y = point.y + driftY

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          particle.size,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          particle.bright
            ? `rgba(234,253,255,${particle.alpha})`
            : `rgba(104,203,255,${
                particle.alpha * 0.72
              })`

        ctx.fill()

        if (particle.bright) {
          ctx.shadowColor =
            'rgba(219,252,255,0.7)'

          ctx.shadowBlur = 10

          ctx.fill()

          ctx.shadowBlur = 0
        }
      })
    }

    // ===== MAIN LOOP =====

    const render = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      ctx.fillStyle =
        'rgba(2,8,19,0.18)'

      ctx.fillRect(
        0,
        0,
        width,
        height
      )

      const curves = Array.from(
        { length: CURVE_COUNT },
        (_, index) =>
          createCurve(index, time)
      )

      drawCurves(curves)

      drawGlow(curves[2])

      drawParticles(curves)

      time += 0.009

      animationId =
        requestAnimationFrame(render)
    }

    resizeCanvas()

    window.addEventListener(
      'resize',
      resizeCanvas
    )

    animationId =
      requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(
        animationId
      )

      window.removeEventListener(
        'resize',
        resizeCanvas
      )
    }
  }, [])

  return (
    <div className="energy-wave">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}