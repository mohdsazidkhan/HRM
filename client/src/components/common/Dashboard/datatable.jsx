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
        for (let index = 0; index < noticeArray.length; index++) {
            const notice = noticeArray[index]
            const createdBy = notice.createdby 
                ? `${notice.createdby.firstname || ""} ${notice.createdby.lastname || ""}`.trim()
                : "System"
            Notices.push(
                {
                    noticeID: index + 1,
                    noticeTitle: notice.title || "No Title",
                    noticeAudience: notice.audience || "All",
                    noticeCreatedBy: createdBy,
                }
            )
        }
    }

    console.log("Notice array", Notices)

    return (
        <div className="overflow-auto h-full">
            <div className="mx-3 my-2">
                <div className="flex items-center justify-between">
                    <p className="text-xl xl:text-2xl font-bold">Recent Notices</p>
                </div>
            </div>
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur mx-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-gray-500">ID</TableHead>
                            <TableHead className="text-gray-500">Title</TableHead>
                            <TableHead className="text-gray-500">Audience</TableHead>
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
                                <TableCell className="text-right">{Notice.noticeCreatedBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}