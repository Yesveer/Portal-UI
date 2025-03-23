// "use client"

// import { ChevronRight, type LucideIcon } from "lucide-react"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "~/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "~/components/ui/sidebar"

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     enableSidebar: string
//     isActive?: boolean
//     dropdown?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) =>
//           item.dropdown ? (
//             <Collapsible
//               key={item.title}
//               asChild
//               defaultOpen={item.isActive}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon />}
//                     <span>{item.title}</span>
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items?.map((subItem) => (
//                       <SidebarMenuSubItem key={subItem.title}>
//                         <SidebarMenuSubButton asChild>
//                           <a href={subItem.url}>
//                             <span>{subItem.title}</span>
//                           </a>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               </SidebarMenuItem>
//             </Collapsible>
//           ) : (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton tooltip={item.title} asChild>
//                 <a href={item.url} className="flex items-center">
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )
//         )}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }

"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar"

export function NavMain({
  items,
  enableSidebar,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    dropdown?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  enableSidebar: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isHighlighted = enableSidebar === item.title

          return item.dropdown ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isHighlighted ? "text-blue-500 font-semibold" : ""}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubHighlighted = enableSidebar === subItem.title

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={subItem.url}
                              className={isSubHighlighted ? "text-blue-500 font-semibold" : ""}
                            >
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={isHighlighted ? "bg-white shadow-sm" : ""}
              >
                <a href={item.url} className="flex items-center">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
