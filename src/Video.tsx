import { Suspense } from 'react'
import { useVideoTexture, useTexture } from '@react-three/drei'
import pic from '/images/10.jpg'
import video from '/videos/10.mp4'
console.log('pic',pic);


export default function Video() {
  return (
    <mesh scale={[1,0.8,1]} position={[-0.34,2.54,1.8]}>
      <planeGeometry args={[2.9, 2, 1]}  />
      <Suspense fallback={<FallbackMaterial url={pic} />}>
        <VideoMaterial url={video} />
      </Suspense>
    </mesh>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture as any} toneMapped={false} />
}