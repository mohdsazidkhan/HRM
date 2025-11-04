import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export const DataTable = ({ noticedata }) => {
    console.log("This is notice data", noticedata)
    const Notices = [
        // {
        //     invoice: "INV001",
        //     paymentStatus: "Paid",
        //     totalAmount: "$250.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV002",
        //     paymentStatus: "Pending",
        //     totalAmount: "$150.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV003",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$350.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV004",
        //     paymentStatus: "Paid",
        //     totalAmount: "$450.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV005",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV006",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV007",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV008",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV009",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV010",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV011",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV012",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV013",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV014",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV015",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV016",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV017",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV018",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV019",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
        // {
        //     invoice: "INV020",
        //     paymentStatus: "Paid",
        //     totalAmount: "$550.00",
        //     paymentMethod: "PayPal",
        // },
        // {
        //     invoice: "INV021",
        //     paymentStatus: "Pending",
        //     totalAmount: "$200.00",
        //     paymentMethod: "Bank Transfer",
        // },
        // {
        //     invoice: "INV022",
        //     paymentStatus: "Unpaid",
        //     totalAmount: "$300.00",
        //     paymentMethod: "Credit Card",
        // },
    ]

    if (noticedata) {
        // Handle admin format: noticedata.notices (array)
        // Handle employee format: noticedata.notice (array)
        const noticeArray = noticedata.notices || noticedata.notice || []
        // Sort by createdAt desc if available and limit to 5 recent
        const recent = [...noticeArray].sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)).slice(0, 5)
        for (let index = 0; index < recent.length; index++) {
            const notice = recent[index]
            const createdBy = notice.createdby 
                ? `${notice.createdby.firstname || ""} ${notice.createdby.lastname || ""}`.trim()
                : "System"
            Notices.push(
                {
                    noticeID: index + 1,
                    noticeTitle: notice.title || "No Title",
                    noticeAudience: notice.audience || "All",
                    noticeCreatedBy: createdBy,
                    noticeCreatedAt: notice.createdAt || null,
                }
            )
        }
    }

    console.log("Notice array", Notices)

    const initialMode = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table"
    const [viewMode, setViewMode] = useState(initialMode)

    return (
        <div className="overflow-auto h-full">
            <div className="flex items-center justify-between px-4 mb-2">
                <div className="font-semibold">Recent Notices</div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">View:</span>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "list" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("list")}>List</button>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "grid" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("grid")}>Grid</button>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "table" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("table")}>Table</button>
                </div>
            </div>

            {/* Table view */}
            <div className={`rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur mx-2 overflow-x-auto ${viewMode !== "table" ? "hidden" : "block"}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-gray-500">ID</TableHead>
                            <TableHead className="text-gray-500">Title</TableHead>
                            <TableHead className="text-gray-500">Audience</TableHead>
                            <TableHead className="text-gray-500">Date</TableHead>
                            <TableHead className="text-right text-gray-500">Created By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Notices.map((Notice) => (
                            <TableRow key={Notice.noticeID} className="hover:bg-gray-50/70">
                                <TableCell className="font-semibold">{Notice.noticeID}</TableCell>
                                <TableCell className="font-medium">{Notice.noticeTitle}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100 px-2 py-[2px] text-xs">
                                        {Notice.noticeAudience}
                                    </span>
                                </TableCell>
                                <TableCell>{Notice.noticeCreatedAt ? new Date(Notice.noticeCreatedAt).toLocaleDateString() : "-"}</TableCell>
                                <TableCell className="text-right">{Notice.noticeCreatedBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* List view */}
            {viewMode === "list" && (
                <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur mx-2">
                    {Notices.map((n) => (
                        <div key={n.noticeID} className="p-3 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <div className="font-medium truncate">{n.noticeTitle}</div>
                                <div className="text-xs text-gray-500">{n.noticeAudience} • {n.noticeCreatedAt ? new Date(n.noticeCreatedAt).toLocaleDateString() : "-"}</div>
                            </div>
                            <div className="shrink-0 text-xs text-gray-500">{n.noticeCreatedBy}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Grid view */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-2">
                    {Notices.map((n) => (
                        <div key={n.noticeID} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                            <div className="font-medium">{n.noticeTitle}</div>
                            <div className="text-xs text-gray-500">{n.noticeAudience}</div>
                            <div className="text-xs text-gray-500">{n.noticeCreatedAt ? new Date(n.noticeCreatedAt).toLocaleDateString() : "-"}</div>
                            <div className="text-xs text-gray-500">{n.noticeCreatedBy}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}