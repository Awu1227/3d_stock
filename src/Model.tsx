
import { useGLTF } from '@react-three/drei'

export default function Model() {
  const gltf = useGLTF("/3d_stock/models/billboard/scene.gltf")
  
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  )
}
