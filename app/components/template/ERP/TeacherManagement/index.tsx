"use client";
import React from "react";
import TeachersPage from "~/components/molecule/ERP/Teacher-Management/teacherpage";
import { ToastProvider } from "~/components/ui/toast-container";

function ERPTeacherManage() {
  return (
    <ToastProvider>
      <TeachersPage />
    </ToastProvider>
  );
}

export default ERPTeacherManage;
