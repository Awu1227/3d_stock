
import { Html, useGLTF } from '@react-three/drei'
import { Card, Table, type TableColumnsType } from 'antd'
import { useEffect, useState } from 'react';
import { getInfo } from './utils/request';
interface DataType {
  key: React.Key;
  f3: number;
  f31: number;
  f14: number;
}

export default function Model({title}) {
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
  }, [])
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
  }]
  const gltf = useGLTF("/3d_stock/models/billboard/scene.gltf")

  return (
    <>
      <primitive object={gltf.scene} scale={0.4} >
      </primitive>
      <mesh  scale={[1,0.88,1]} position={[-0.34,2.54,1.8]}  castShadow visible={false}>
      <planeGeometry args={[2.9, 2, -1]}  />
      <meshStandardMaterial metalness={1} roughness={0} />
        <Html occlude distanceFactor={1.5} position={[0, 0, 0.001]} transform>
          <Card title={title} bordered={false} style={{ width: 780}} headStyle={{textAlign:'center'}} >
            <Table columns={columns} dataSource={tableData.diff} />
        </Card>
        </Html>
      </mesh>
    </>
  )
}
