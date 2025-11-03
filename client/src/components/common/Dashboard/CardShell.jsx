export const CardShell = ({ title, subtitle, actions = null, children }) => {
    return (
        <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
            {(title || actions || subtitle) && (
                <div className="flex items-center justify-between px-3 py-2 border-b">
                    <div>
                        {title ? <p className="font-semibold leading-tight">{title}</p> : null}
                        {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
                    </div>
                    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
                </div>
            )}
        </div>
    )
}


