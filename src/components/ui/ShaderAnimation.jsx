"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const vertexShader = `void main() { gl_Position = vec4( position, 1.0 ); }`
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float isDark;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        vec3 color = vec3(0.0);
        
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            float effect = 0.002 * float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
            color[j] += effect;
          }
        }
        
        // Base background colors
        vec3 darkBg = vec3(0.0, 0.0, 0.0);
        vec3 lightBg = vec3(1.0, 1.0, 1.0);
        
        vec3 bg = mix(lightBg, darkBg, isDark);
        
        // Invert shader lines for light mode
        vec3 finalColor;
        if (isDark > 0.5) {
            finalColor = bg + color;
        } else {
            // Dark lines on light background
            finalColor = bg - color * 0.8; 
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    
    const isDarkMode = document.documentElement.classList.contains('dark')
    
    const uniforms = { 
      time: { value: 1.0 }, 
      resolution: { value: new THREE.Vector2() },
      isDark: { value: isDarkMode ? 1.0 : 0.0 }
    }
    
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    onResize()
    window.addEventListener("resize", onResize)

    // Observer for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      uniforms.isDark.value = isDark ? 1.0 : 0.0
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }
    sceneRef.current = { renderer, animationId: 0 }
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      observer.disconnect()
      if (sceneRef.current && sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full overflow-hidden" />
}
