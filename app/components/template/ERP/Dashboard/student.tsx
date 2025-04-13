
'use client'

import React, { useEffect } from 'react'
import StudentMolecule from '~/components/molecule/ERP/Dashboard/Student';
import useRequestHook from '~/hooks/requestHook'

function ERPStudentDash() {
    const [fetchData, data, isLoading, error]=useRequestHook('dashboard/student',"GET", null);
    useEffect(()=>{
     fetchData()
    },[])
  return (
    <StudentMolecule data={data} />
  )
}

export default ERPStudentDash