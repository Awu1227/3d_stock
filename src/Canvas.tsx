import { useState,useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import {Table,Image } from 'antd'

function Box() {
    const [visible, setVisible] = useState(false);

  const [tableData, setTableData] = useState({
    products: [],
    limit: 0,
    skip:0
  })
  useEffect(() => {
    fetch('https://dummyjson.com/products')
  .then(res => res.json())
      .then(json => {
        console.log(json);
        
    setTableData(json)
  });
  },[])


  const columns = [
    {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Image',
    dataIndex: 'images',
    key:"images",
     render: (images: string[]) => (
        <>
         {images.map((tag) => (
           <Image src={tag} width={40} preview={{        onVisibleChange: (value) => {
            setVisible(value);
          },}}></Image>
          ))}
        </>
      )
  },

];
  return (
    <mesh scale={visible?0.001:1}>
      <boxGeometry args={[5,5,1]}  />
      <meshNormalMaterial/>
      <Html occlude distanceFactor={1.5} position={[0, 0, 0.51]} transform visible={!visible}>
        {/* <Switch checkedChildren="夜晚" unCheckedChildren="白天" defaultChecked onChange={switchChange}/> */}
        {/* <Slider
          style={{ width: 100 }}
          min={0.5}
          max={1}
          step={0.01}
          value={size}
          onChange={(value) => ((controls.enabled = false), set(value))}
          onAfterChange={() => (controls.enabled = true)}
        /> */}
        <Table columns={columns} dataSource={tableData.products} />
      </Html>
    </mesh>
  )
}



function CanvasApp() {

  return (
    <Canvas camera={{ position: [2, 1, 5], fov: 25 }}>
      
      <ambientLight color={'lightblue'}/>
      <pointLight position={[10, 10, 5]} color={'red'} intensity={10}/>
      <pointLight position={[-10, -10, -10]} />
      <Box />
      <OrbitControls makeDefault />
    </Canvas>
  )
}

export default CanvasApp;
