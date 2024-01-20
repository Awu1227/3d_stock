import React,{ useState,useEffect } from 'react'
import { Canvas ,useFrame} from '@react-three/fiber'
import {  Text, OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { getInfo } from './utils/request';
import Model from './Model';
import { button, useControls } from 'leva';
import Text_3D from './Text_3D';
interface TBoxProps  {
  position: number[],
}


const Box: React.FC<TBoxProps> = ({position})=> {
  
  
  const [time, setTime] = useState('')
  useEffect(() => {
    getInfo(['0.300001', '1.603097', '1.601096', '0.000821', '0.002337']).then((res:any) =>  {
        res.data.diff = res.data.diff.map(item => {
          const obj = item
          obj.key = obj.f12
          return obj
        })
      console.log('res', res);
      
    })
  }, [])
  
  useFrame(() => {
    const nowTime = Date.now()
    const hours =  new Date(nowTime).getHours() < 10 ? '0'+new Date(nowTime).getHours(): new Date(nowTime).getHours()
    const minutes =  new Date(nowTime).getMinutes() < 10 ? '0'+new Date(nowTime).getMinutes(): new Date(nowTime).getMinutes()
    const seconds = new Date(nowTime).getSeconds() < 10 ? '0'+new Date(nowTime).getSeconds(): new Date(nowTime).getSeconds()
    const time = `${hours}:${minutes}:${seconds}`
    setTime(time)
})


  return (
    <group>
      <Text  fontSize={1.4} strokeWidth={1} depthOffset={1} strokeColor={'red'} position={[position[0],4.6,position[2]]} >
          {time}
          <meshStandardMaterial color="red" toneMapped={false} />
      </Text>
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={10} radius={5} ambient={0.5} position={[5, 2, 2]} bias={0.001} />
        </AccumulativeShadows>
    </group>

  )
}



function CanvasApp() {
  const { autoRotate, text, shadow, ...config } = useControls({
    text: 'Inter',
    backside: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 0, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: '#ff9cf5',
    gColor: '#ff7eb3',
    shadow: '#750d57',
    autoRotate: false,
    screenshot: button(() => {
      // Save the canvas as a *.png
      const link = document.createElement('a')
      link.setAttribute('download', 'canvas.png')
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
      link.click()
    })
  })
  
  return (
    <Canvas shadows camera={{ position: [10, 20, 24], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <color attach="background" args={['#f2f2f5']} />
      <Text_3D config={config} rotation={[0, 0, 0]} position={[0, 6, -1.25]}>
        {text}
      </Text_3D>
      {/* <Video /> */}
      <Model title={'上证指数'} />
      <ambientLight color={'lightblue'}/>
      <pointLight position={[10, 10, 5]} color={'red'} intensity={10}/>
      <pointLight position={[-10, -10, -10]} />
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor={0xff0000} edgeStrength={10} width={2000} />
        </EffectComposer>
      <Box position={[-0.4, 2, 1.6]} />

      <Env />
          
        <AccumulativeShadows frames={100} color={shadow} colorBlend={5} toneMapped={true} alphaTest={0.9} opacity={1} scale={300} position={[0, -1.01, 0]}>
        <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
      </AccumulativeShadows>
      <OrbitControls   minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.1}/>
    </Canvas>
  )
}
function Env() {
    const [, setHour] = useState('')
  useFrame(() => {
    const nowTime = Date.now()
    const hours =  new Date(nowTime).getHours() < 10 ? '0'+new Date(nowTime).getHours(): new Date(nowTime).getHours()+''
    setHour(hours)
})
  return <Environment   files={[
      'px.jpg',
      'nx.jpg',
      'py.jpg',
      'ny.jpg',
      'pz.jpg',
      'nz.jpg'
    ]}
    path="/3d_stock/textures/skyboxsun25deg/" background blur={0} />
}
export default CanvasApp;
