import React, { ReactNode } from 'react'
import { getResume } from '../helpers/resume'
import BadgeIcon from '@mui/icons-material/Badge'
import GroupIcon from '@mui/icons-material/Group';
import BiotechIcon from '@mui/icons-material/Biotech';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MedicationIcon from '@mui/icons-material/Medication';
const CardResume = ({ icon, title, total, background }: { icon: ReactNode, title: string, total: string, background: string }) => {
  return <div style={{ background: '#484A49', padding: '1em', borderRadius: '10px' }}>
    <div style={{ display: 'flex', gap: '1.5em' }}>
      <div>
        <div style={{ background, width: "80px", height: "80px", display: 'grid', placeItems: 'center', borderRadius: '10px' }}>
          {/* <icon  sx={{ fontSize:"50px" }} /> */}
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>
        <p style={{ fontWeight: 'bold',textTransform:'uppercase' }} >{title}</p>
        <p style={{ fontSize: '1.8em' }}>{total}</p>
      </div>
    </div>
    <div style={{ background, width: "100%", padding: '3px', marginTop: '1em' }}></div>
  </div>
}
// 
export const Resume = () => {

  const [resume, setResume] = React.useState<any>({})

  React.useEffect(() => {
    getResume()
      .then(resume => {
        setResume(resume.data);
      })
  }, [])

  return (
    <>
      {
        Object.keys(resume).length !== 0 &&
        <div style={{ marginBottom: '2em',display:"flex",justifyContent:"center",gap:"1em",flexWrap:"wrap",width:"100%" }}>
          {<CardResume icon={<BadgeIcon sx={{ fontSize: "60px" }} />} background="rgb(216, 127, 5)" title='Empleados' total={resume.Empleados} />}
          {<CardResume icon={<GroupIcon sx={{ fontSize: "60px" }} />} background="#459A4D" title='Clientes' total={resume.Clientes} />}
          {<CardResume icon={<MedicationIcon sx={{ fontSize: "60px" }} />} background="#F85844" title='Productos' total={resume.Productos} />}
          {<CardResume icon={<BiotechIcon sx={{ fontSize: "60px" }} />} background="#6C747E" title='Laboratorios' total={resume.Laboratorios} />}
          {<CardResume icon={<ShoppingCartIcon sx={{ fontSize: "60px" }} />} background="#00A0C7" title='Compras' total={resume.Compras} />}
        </div>
      }
    </>
  )
}
