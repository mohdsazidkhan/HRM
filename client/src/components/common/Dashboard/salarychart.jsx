import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
export const SalaryChart = ({ balancedata = {} }) => {
    const chartData = []
    const balances = (balancedata && balancedata.balance) ? balancedata.balance : []
    for (let index = 0; index < balances.length; index++) {
        chartData.push({
            month: balances[index]["expensemonth"],
            SalriesPaid: Number(balances[index]["totalexpenses"]) || 0,
            AvailableAmount: Number(balances[index]["availableamount"]) || 0,
        })
    }
    const chartConfig = {
        desktop: {
            label: "Salaries Paid",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Available Balance",
            color: "hsl(var(--chart-2))",
        },
    }

    let trendingUp = 0

    // Calculate trending only when we have at least two data points and previous value isn't zero
    if (chartData.length >= 2 && chartData[chartData.length - 2]["AvailableAmount"] !== 0) {
        const latest = chartData[chartData.length - 1]["AvailableAmount"]
        const prev = chartData[chartData.length - 2]["AvailableAmount"]
        const difference = latest - prev
        trendingUp += Math.round((difference * 100) / prev)
    }
    return (
        <div className="flex flex-col gap-2 h-auto">
            <Card className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg lg:text-xl">Available Salary Amount: <span className="font-semibold">{chartData.length > 0 ? chartData[chartData.length - 1]["AvailableAmount"] : 0}</span></CardTitle>
                    <CardDescription className="text-sm">Salaries & Balance</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" className="p-2 rounded-md ring-1 ring-gray-200/60 bg-white/90 backdrop-blur" />}
                                className="p-[2px] flex gap-1 items-center min-[250px]:text-xs sm:text-xs"
                            />
                            <Area
                                dataKey="SalriesPaid"
                                type="monotone"
                                fill="var(--color-mobile)"
                                fillOpacity={0.35}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="AvailableAmount"
                                type="monotone"
                                fill="var(--color-desktop)"
                                fillOpacity={0.35}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm text-gray-600">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Trending up by {trendingUp}% this month
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                {chartData.length > 0 ? `${chartData[0]["month"]} 2024 - ${chartData[chartData.length - 1]["month"]} 2024` : null}
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}