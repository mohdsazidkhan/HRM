export const KeyDetailsBox = ({icon: Icon, image, dataname, data}) => {
    return (
        <div className="keydetail-box-container w-full">
            <div className="m-2 flex items-center justify-between rounded-2xl p-4 sm:p-3 lg:p-4 shadow-sm ring-1 ring-gray-200/60 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-shadow">

                <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-2">
                        {Icon ? <Icon className="w-6 h-6" /> : (image ? <img src={image} alt="" className="w-8 h-8"/> : null)}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-3xl sm:text-2xl xl:text-4xl font-extrabold tracking-tight">{data}</p>
                        <p className="text-sm sm:text-xs xl:text-sm font-medium text-gray-500">{dataname?.toUpperCase()}</p>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <div className="text-xs text-gray-400">2025</div>
                </div>

            </div>
        </div>
    )
}