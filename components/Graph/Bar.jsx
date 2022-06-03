import { ResponsiveBar } from '@nivo/bar'

export default function Bar({ datas, cur }) {
    // const amount = `amount`;
    const ValueOutside = ({ bars }) =>
        bars.map(bar => {
            const {
                key,
                width,
                height,
                x,
                y,
                data: { value },
            } = bar
            return (
                <g key={key} transform={`translate(${x}, ${y})`}>
                    <text
                        transform={`translate(${width + 45}, ${height / 1.6})`}
                        textAnchor="middle"
                        fontSize="11px">
                        {cur} ${value.toLocaleString()}
                    </text>
                </g>
            )
        })

    return (
        <div className="h-[175px]">
            <ResponsiveBar
                width={440}
                height={170}
                data={datas}
                keys={['amount']}
                indexBy="label"
                margin={{ top: 0, right: 100, bottom: 20, left: 0 }}
                valueScale={{ type: 'linear' }}
                layout="horizontal"
                colors={['#DE1B1B', '#FA8E8E', '#F5BC76', '#FFDE86', '#8CC73F']}
                colorBy="index"
                enableLabel={false}
                animate={false}
                padding={0.15}
                axisTop={null}
                axisRight={null}
                axisLeft={null}
                axisBottom={null}
                enableGridY={false}
                role="application"
                fillDirection="right"
                valueFormat=" >-$,.2d"
                tooltip={({ label, value }) => (
                    <span className="px-2 py-2 text-xs rounded-md bg-gray-50">
                        {label.slice(9)}:
                        <strong>
                            {' '}
                            <span>
                                {cur}$ {value.toLocaleString()}
                            </span>{' '}
                        </strong>
                    </span>
                )}
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    'markers',
                    'legends',
                    'annotations',
                    props => <ValueOutside {...props} />,
                ]}
                legends={[
                    {
                        // dataFrom: 'value',
                        data: datas.map((item, index) => ({
                            color: [
                                '#8CC73F',
                                '#FFDE86',
                                '#F5BC76',
                                '#FA8E8E',
                                '#DE1B1B',
                            ][index],
                            id: item.order,
                            label: [
                                'Not Due',
                                '0-30 days',
                                '31-60 days',
                                '61-90 days',
                                '90+ days',
                            ][index],
                        })),
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        translateX: 100,
                        translateY: 20,
                        itemsSpacing: 2,
                        itemWidth: 80,
                        itemHeight: 15,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 15,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 0.5,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    )
}
