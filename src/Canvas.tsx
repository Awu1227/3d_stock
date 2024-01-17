import React,{ useState,useEffect } from 'react'
import { Canvas ,useFrame,} from '@react-three/fiber'
import { Html, Text, OrbitControls, } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { Card, Table, type TableColumnsType  } from 'antd'
import { getInfo } from './utils/request';

interface TBoxProps  {
  position: number[],
  title: string
}
interface DataType {
  key: React.Key;
  f3: number;
  f31: number;
  f14: number;
}
const Box: React.FC<TBoxProps> = ({position,title})=> {
  const [time, setTime] = useState('')
    const [hovered, hover] = useState(null)
  const [tableData, setTableData] = useState({
    diff: [],
    total: 0,
  })
  
  useEffect(() => {
    getInfo(['0.300001', '1.603097', '1.601096', '0.000821', '0.002337']).then((res:any) =>  {
        res.data.diff = res.data.diff.map(item => {
          const obj = item
          obj.key = obj.f12
          return obj
        })
      console.log('res', res);
      
      setTableData(res.data)
    })
  },[])
  useFrame(() => {
    const nowTime = Date.now()
    const hours =  new Date(nowTime).getHours() < 10 ? '0'+new Date(nowTime).getHours(): new Date(nowTime).getHours()
    const minutes =  new Date(nowTime).getMinutes() < 10 ? '0'+new Date(nowTime).getMinutes(): new Date(nowTime).getMinutes()
    const seconds = new Date(nowTime).getSeconds() < 10 ? '0'+new Date(nowTime).getSeconds(): new Date(nowTime).getSeconds()
    const time = `${hours}:${minutes}:${seconds}`
    setTime(time)
})

  const columns: TableColumnsType<DataType> = [
    {
    title: '名称',
      dataIndex: 'f14',
  },
  {
    title: '价格',
    dataIndex: 'f31',
  },
  {
    title: '涨跌幅',
    dataIndex: 'f3',
    render: (f3) => (
      <>
        {
          f3 +'%'
        }
      </>
    )
  },
  

];
  return (
    <group>
      <Text  fontSize={1.4} strokeWidth={1} depthOffset={1} strokeColor={'red'} position={[position[0],2.6,position[2]]} >
          {time}
          <meshStandardMaterial color="red" toneMapped={false} />
      </Text>
       <Select enabled={hovered}>
        <mesh  position={[position[0], position[1], position[2]]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
      <boxGeometry args={[4,4,0.5]}  />
      <meshNormalMaterial/>
      <Html occlude distanceFactor={1.5} position={[0, 0, 0.26]} transform>
        <Card title={title} bordered={false} style={{ width: 800}} headStyle={{textAlign:'center'}} >
          <Table columns={columns} dataSource={tableData.diff} />
      </Card>
      </Html>
        </mesh>
        </Select>
    </group>

  )
}



function CanvasApp() {

  return (
    <Canvas camera={{ position: [10, 0, 10], fov: 25 }}>
      
      <ambientLight color={'lightblue'}/>
      <pointLight position={[10, 10, 5]} color={'red'} intensity={10}/>
      <pointLight position={[-10, -10, -10]} />

      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor={0xff0000} edgeStrength={10} width={2000} />
        </EffectComposer>
      <Box position={[0,0,0]}  title={'板块2'} />
      </Selection>
      <OrbitControls makeDefault />
    </Canvas>
  )
}

export default CanvasApp;
