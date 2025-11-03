import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRCalendar } from "@/redux/Thunks/HRCalendarThunk";
import { CreateEventDialogBox, UpdateEventDialogBox, DeleteEventDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { Calendar, FileText } from "lucide-react";

export const HRCorporateCalendarPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRCalendarReducer);

    useEffect(() => { dispatch(HandleGetHRCalendar()); }, [dispatch]);
    useEffect(() => { if (fetchData) dispatch(HandleGetHRCalendar()); }, [dispatch, fetchData]);
    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Corporate Calendar" actions={<CreateEventDialogBox />}>
                <div className="text-xs text-gray-500">Manage corporate events and important dates</div>
            </CardShell>
            <div className="grid gap-3">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((ev) => (
                        <div key={ev._id} className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="font-semibold">{ev.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm ml-6">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>Date: {ev.date ? new Date(ev.date).toLocaleDateString() : "-"}</span>
                                    </div>
                                    {ev.description && (
                                        <div className="flex items-start gap-2 text-sm ml-6">
                                            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                                            <span className="text-gray-600">{ev.description}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <UpdateEventDialogBox event={ev} />
                                    <DeleteEventDialogBox eventID={ev._id} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500 p-3">No events.</div>
                )}
            </div>
            {error?.status && <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load events"}</div>}
        </div>
    )
}


