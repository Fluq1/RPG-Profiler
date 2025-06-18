import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup - optimized for performance
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: false, // Disable antialiasing for performance
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1); // Force lowest pixel ratio for performance
    
    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);
    
    // Create a magical circle
    const circleGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
    const circleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.7
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);
    
    // Create inner circle
    const innerCircleGeometry = new THREE.CircleGeometry(0.7, 32);
    const innerCircleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00aaff,
      transparent: true,
      opacity: 0.5
    });
    const innerCircle = new THREE.Mesh(innerCircleGeometry, innerCircleMaterial);
    innerCircle.position.z = -0.1;
    scene.add(innerCircle);
    
    // Create outer circle
    const outerCircleGeometry = new THREE.RingGeometry(1.2, 1.3, 32);
    const outerCircleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0066ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const outerCircle = new THREE.Mesh(outerCircleGeometry, outerCircleMaterial);
    outerCircle.position.z = -0.2;
    scene.add(outerCircle);
    
    // Create runes (3D objects)
    const runeGroup = new THREE.Group();
    
    // Create 5 runes around the circle
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const x = Math.cos(angle) * 1.5;
      const y = Math.sin(angle) * 1.5;
      
      const runeGeometry = new THREE.TetrahedronGeometry(0.2);
      const runeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
      });
      const rune = new THREE.Mesh(runeGeometry, runeMaterial);
      rune.position.set(x, y, 0);
      rune.rotation.z = angle;
      runeGroup.add(rune);
    }
    
    scene.add(runeGroup);
    
    // Create magical particles
    const particlesGeometry = new THREE.BufferGeometry();
    
    // Calculate the visible area at the camera's z position
    const fov = camera.fov * (Math.PI / 180);
    const depth = camera.position.z;
    const height = 2 * Math.tan(fov / 2) * depth;
    const width = height * camera.aspect;
    
    // Increase particle count for full coverage
    const particlesCount = 300; // Increase as needed for density
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Distribute particles in a box that covers the visible area
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * width * 1.2;   // x: fill beyond edges
      posArray[i3 + 1] = (Math.random() - 0.5) * height * 1.2; // y: fill beyond edges
      posArray[i3 + 2] = (Math.random() - 0.8) * 12; // z: spread in depth for parallax
    
      colorArray[i3] = 0.1;
      colorArray[i3 + 1] = 0.3 + Math.random() * 0.5;
      colorArray[i3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    particlesGeometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(posArray, 3)
    );
    
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorArray, 3)
    );
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create a group for all objects to move together
    const magicGroup = new THREE.Group();
    magicGroup.add(circle);
    magicGroup.add(innerCircle);
    magicGroup.add(outerCircle);
    magicGroup.add(runeGroup);
    magicGroup.add(particles);
    scene.add(magicGroup);
    
    // Mouse tracking
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create eye texture
    const createEyeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // Draw white of the eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(256, 256, 250, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw iris
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 150);
      gradient.addColorStop(0, '#0088ff');
      gradient.addColorStop(0.8, '#004488');
      gradient.addColorStop(1, '#002244');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(256, 256, 150, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw pupil
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(256, 256, 75, 0, Math.PI * 2);
      ctx.fill();
      
      // Add highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(200, 200, 40, 0, Math.PI * 2);
      ctx.fill();
      
      return new THREE.CanvasTexture(canvas);
    };

    // Create a plane with the eye texture instead of a sphere
    const eyeGeometry = new THREE.PlaneGeometry(1.4, 1.4);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      map: createEyeTexture(),
      transparent: true,
      opacity: 1.0,
      side: THREE.FrontSide
    });
    
    // Use a group to properly orient the eye
    const eyeGroup = new THREE.Group();
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    
    // Position the eye slightly forward
    eye.position.z = 0.1;
    
    eyeGroup.add(eye);
    eyeGroup.position.z = 0.1;
    
    scene.add(eyeGroup);

    // Remove the old inner circle
    scene.remove(innerCircle);
    magicGroup.remove(innerCircle);
    magicGroup.add(eyeGroup);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth follow mouse
      target.x = mouse.x * 3;
      target.y = mouse.y * 3;
      
      // Move the entire magic group toward mouse position
      magicGroup.position.x += (target.x - magicGroup.position.x) * 0.05;
      magicGroup.position.y += (target.y - magicGroup.position.y) * 0.05;
      
      // Calculate subtle eye movement based on mouse position
      const maxMovement = 0.1; // Reduced movement for subtle effect
      const eyeMovementX = -mouse.x * maxMovement;
      const eyeMovementY = -mouse.y * maxMovement;
      
      // Apply subtle movement to the eye
      eye.position.x = eyeMovementX;
      eye.position.y = eyeMovementY;
      
      // Add slight "breathing" movement to appear alive
      eye.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.02;
      eye.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.02;
      
      // Rotate elements for magical effect
      runeGroup.rotation.z += 0.005;
      
      // Reduced 3D rotation effect
      magicGroup.rotation.x = mouse.y * 0.1;  // Reduced from 0.2
      magicGroup.rotation.y = mouse.x * 0.1;  // Reduced from 0.15
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      circleGeometry.dispose();
      circleMaterial.dispose();
      innerCircleGeometry.dispose();
      innerCircleMaterial.dispose();
      outerCircleGeometry.dispose();
      outerCircleMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}
    />
  );
};

export default AnimatedBackground;
