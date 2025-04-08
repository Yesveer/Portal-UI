
'use client'

import React, { useEffect } from 'react'
import TeacherMolecules from '~/components/molecule/ERP/Dashboard/Teacher'
import useRequestHook from '~/hooks/requestHook'

function ERPTeacherDash() {
    const [fetchData, data, isLoading, error]=useRequestHook('dashboard/teacher',"GET", null);
    useEffect(()=>{
     fetchData()
    },[])
  return (
    <TeacherMolecules />
  )
}

export default ERPTeacherDash