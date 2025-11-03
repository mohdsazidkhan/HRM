import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRBalance } from "@/redux/Thunks/HRBalanceThunk";
import { CreateBalanceDialogBox, UpdateBalanceDialogBox, DeleteBalanceDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { DollarSign, FileText } from "lucide-react";

export const HRBalancePage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRBalanceReducer);

    useEffect(() => { dispatch(HandleGetHRBalance()); }, [dispatch]);
    useEffect(() => { if (fetchData) dispatch(HandleGetHRBalance()); }, [dispatch, fetchData]);
    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Balance" actions={<CreateBalanceDialogBox />}>
                <div className="text-xs text-gray-500">Track financial balance entries and transactions</div>
            </CardShell>
            <div className="grid gap-3">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((bl) => (
                        <div key={bl._id} className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-gray-500" />
                                        <span className="font-semibold">Amount: {bl.amount}</span>
                                    </div>
                                    {bl.description && (
                                        <div className="flex items-start gap-2 text-sm ml-6">
                                            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                            <span className="text-gray-600">{bl.description}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <UpdateBalanceDialogBox balance={bl} />
                                    <DeleteBalanceDialogBox balanceID={bl._id} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500 p-3">No balance entries.</div>
                )}
            </div>
            {error?.status && <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load balance"}</div>}
        </div>
    )
}


