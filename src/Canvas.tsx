import React,{ useState,useEffect } from 'react'
import { Canvas ,useFrame} from '@react-three/fiber'
import {  Text, OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { getInfo } from './utils/request';
import Model from './Model';
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
    <group visible={false}>
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

  return (
    <Canvas shadows camera={{ position: [10, 20, 24], fov: 25 }}>
      {/* <Video /> */}
      <Model title={'上证指数'} />
      <ambientLight color={'lightblue'}/>
      <pointLight position={[10, 10, 5]} color={'red'} intensity={10}/>
      <pointLight position={[-10, -10, -10]} />
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor={0xff0000} edgeStrength={10} width={2000} />
        </EffectComposer>
        <Box position={[0, 2, 0]}  />
      <Env />
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
