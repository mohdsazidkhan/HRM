import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export const ErrorPopup = ({ error }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-5">
            <div className="rounded-lg border border-red-200 bg-red-50 shadow-lg ring-1 ring-red-200/60 backdrop-blur p-4 max-w-md">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center rounded-full bg-red-100 p-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-600 hover:bg-red-100"
                        onClick={() => setVisible(false)}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}