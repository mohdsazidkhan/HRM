import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRSalary } from "@/redux/Thunks/HRSalaryThunk";
import { CreateSalaryDialogBox, UpdateSalaryDialogBox, DeleteSalaryDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, DollarSign, Calendar, Wallet } from "lucide-react";

export const HRSalariesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRSalaryReducer);

    useEffect(() => {
        dispatch(HandleGetHRSalary());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRSalary());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Salaries" actions={<CreateSalaryDialogBox />}>
                <div className="text-xs text-gray-500">Manage employee salary records and payments</div>
            </CardShell>
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                {Array.isArray(data) && data.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Basic Pay</TableHead>
                                <TableHead>Net Pay</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-right w-[180px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((sal) => (
                                <TableRow key={sal._id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span>{sal.employee?.firstname} {sal.employee?.lastname}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1"><Wallet className="w-4 h-4 text-gray-400" />{sal.basicpay} {sal.currency}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1"><DollarSign className="w-4 h-4 text-gray-400" />{sal.netpay} {sal.currency}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4 text-gray-400" />{new Date(sal.duedate).toLocaleDateString()}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <UpdateSalaryDialogBox salary={sal} />
                                            <DeleteSalaryDialogBox salaryID={sal._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-sm text-gray-500 p-3">No salary records.</div>
                )}
            </div>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load salaries"}</div>
            )}
        </div>
    )
}


