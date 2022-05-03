import { ResponsiveLine } from '@nivo/line';

const LineComponent = (props) => {
    const { data } = props;
    return <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 210, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'year',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'crimes per 1000 people in Finland',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
        colors={{ scheme: "category10" }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: -60,
                translateY: 210,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)'
            }
        ]}
        animate={false}
    />
}
export default LineComponent;