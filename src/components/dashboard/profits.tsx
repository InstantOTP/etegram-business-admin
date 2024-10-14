'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllProfits } from '@/app/data/dashboard';
import { useTimeFrame } from '@/hooks/usetimeframe';
import { formatter } from '@/lib/utils';

const chartConfig = {
  totalAmount: {
    label: 'Total Amount',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ProfitsChart() {
  const [timeRange, setTimeRange] = React.useState('Weekly');
  const [data, setData] =
    React.useState<{ totalAmount: number; date: string }[]>();

  const { startDate, endDate } = useTimeFrame(timeRange);
  //   console.log(startDate);
  //   console.log(endDate)

  async function getData() {
    const data = await getAllProfits(startDate, endDate);
    if (data) {
      setData(data);
      return data;
    } else {
      return [];
    }
  }
  const renderCustomBarLabel = ({
    payload,
    x,
    y,
    width,
    height,
    value,
  }: {
    payload: any;
    x: any;
    y: any;
    width: any;
    height: any;
    value: any;
  }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill='#fff'
        textAnchor='middle'
        dy={10}
      >{` ${formatter().format(value)}`}</text>
    );
  };

  //   console.log(data);

  React.useEffect(() => {
    if (startDate && endDate) {
      getData();
    }
  }, [startDate, endDate]);

  return (
    <Card>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle className='text-foreground'>Intantotp Profits</CardTitle>
          <CardDescription>
            Showing Profits for the last{' '}
            {timeRange === 'Weekly' ? 'Week' : 'Month'}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger
            className='w-[160px] rounded-lg sm:ml-auto'
            aria-label='Select a value'
          >
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem
              value='Monthly'
              className='rounded-lg'
            >
              Last Month
            </SelectItem>
            <SelectItem
              value='Weekly'
              className='rounded-lg'
            >
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={data}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Bar
              dataKey='totalAmount'
              type='natural'
              fill='var(--color-totalAmount)'
              radius={4}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
