import { Loader2 } from "lucide-react"

export const Loading = ({ height }) => {
    return (
        <div className={`${height ? height : `h-screen`} w-full flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-blue-50 via-white to-purple-50`}>
            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-lg">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
    )
}