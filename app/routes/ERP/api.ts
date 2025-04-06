const ERP_URL = import.meta.env.VITE_ERP_URL; 


export const uploadExcelFile = async (
    url: string,
    file: File,
  ): Promise<{ success: boolean; results?: any; error?: string }> => {
    try {
      const token = localStorage.getItem("token");
      const domainName = localStorage.getItem("domainName");
  
      if (!token) throw new Error("Authentication token not found");
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("domainName", domainName || ""); // If you want to send domainName optionally
  
      const response = await fetch(`${import.meta.env.VITE_ERP_URL}/api/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload");
      }
  
      return { success: true, results: data.results };
    } catch (error) {
      console.error("Bulk upload error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };
  