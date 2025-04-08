'use client'
import { Admin4Card } from "~/components/molecule/ERP/Dashboard/Admin/Dashboard/adminCard"
import RevenueChart from "~/components/molecule/ERP/Dashboard/Admin/Dashboard/adminRevenueChart"
import { EventsCard } from "~/components/molecule/ERP/Dashboard/eventsCard"
import { BirthdayCard } from "~/components/molecule/ERP/Dashboard/birthdayCard"
import { CalendarDashboard } from "~/components/molecule/ERP/Dashboard/calender"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { WobbleCardOverview } from "~/components/molecule/ERP/Dashboard/Admin/Overview/heading"
import { FeaturesSection } from "~/components/molecule/ERP/Dashboard/Admin/Overview/feature"
import { ProductHelp } from "~/components/molecule/ERP/Dashboard/Admin/Overview/producthelp"
import { empDashboardHeadingImage } from "~/images"
import useRequestHook from "~/hooks/requestHook"
import { useEffect } from "react"

const HeadinCardData = {
    title: "Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!",
    description: "With over 100,000 mothly active bot users, Gippity AI is the most popular AI platform for developers.",
    image: empDashboardHeadingImage,
};

export default function ERPAdminTemplete() {
    const [fetchData, data, isLoading, error, reset]=useRequestHook('dashboard/admin',"GET", null);
    useEffect(()=>{
     fetchData()
    },[])
    return (
        <>
            <Tabs defaultValue="dashboard" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="pb-3 m-5">
                        <h1 className="text-gray-800 dark:text-gray-200">Welcome to <span className="font-bold text-blue-500">VSAY ERP Portal! ,</span> let's make today productive.</h1>
                    </div>
                    <WobbleCardOverview data={HeadinCardData} />
                    <FeaturesSection />
                    <h4 className="text-3xl m-5 lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                        Packed with Support
                    </h4>
                    <div className="m-5">
                        <ProductHelp />
                    </div>
                </TabsContent>
                <TabsContent value="dashboard">
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 md:gap-6 md:py-6">
                                <Admin4Card data={data} />
                            </div>
                        </div>
                    </div>
                    <RevenueChart />
                    <div className="flex flex-1 flex-col ml-5">
                        <div className="@container/main flex flex-1 flex-col gap-4">
                            <div className="flex gap-6 md:gap-8 md:py-6">
                                <CalendarDashboard />
                                <BirthdayCard />
                                <EventsCard />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}