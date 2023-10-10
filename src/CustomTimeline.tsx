import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
  TimelineGroupBase,
  TimelineItemBase,
  Unit
} from "react-calendar-timeline";

import generateFakeData from './generateFakeData'

export const CustomTimeline = () => {
    // const groups: TimelineGroupBase[] = [
    //     {
    //         id: '1',
    //         title: 'abc'
    //     },
    //     {
    //         id: '2',
    //         title: '2'
    //     },
    //     {
    //         id: '3',
    //         title: '3'
    //     }
    // ];
    // const items: TimelineItemBase<Date>[] = [
    //     // {
    //     //     id: '1',
    //     //     group: '1',
    //     //     start_time: new Date(),
    //     //     end_time: new Date(new Date().getTime() + 1005464641561651650),
    //     //     style: {backgroundColor: 'blue', color: 'black'}
    //     // },
    //     {
    //         id: '2',
    //         group: '2',
    //         start_time: moment(),
    //         end_time: moment().add(1, 'hour'),
    //         // style: {backgroundColor: 'blue', color: 'black'}
    //     }
    // ];

    const {groups, items} = generateFakeData(10)

    const defaultTimeStart = new Date();
    const defaultTimeEnd = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

    const displayLimit = {
      min: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).getTime(),
      max: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).getTime()
    }

    const limitScroll = (visibleTimeStart: number, visibleTimeEnd: number, updateScrollCanvas: (start: number, end: number) => void) => {
      if (visibleTimeStart < displayLimit.min && visibleTimeEnd > displayLimit.max) {
        updateScrollCanvas(displayLimit.min, displayLimit.max)
      } else if (visibleTimeStart < displayLimit.min) {
        updateScrollCanvas(displayLimit.min, displayLimit.min + (visibleTimeEnd - visibleTimeStart))
      } else if (visibleTimeEnd > displayLimit.max) {
        updateScrollCanvas(displayLimit.max - (visibleTimeEnd - visibleTimeStart), displayLimit.max)
      } else {
        updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
      }
    };

    return (
        <Timeline
          groups={groups}
          items={items}
          // keys={keys}
          sidebarContent={<div>Above The Left</div>}
          itemTouchSendsClick={false}
          // stackItems
          itemHeightRatio={0.75}
          canMove={false}
          canResize={false}
          buffer={1}
          maxZoom={86400 * 1000}
          onTimeChange={limitScroll}
          // onZoom={(timelineContext, unit) => {console.log(timelineContext, unit)}}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
        >
          <TimelineHeaders className="sticky">
            <TodayMarker date={new Date()} interval={5000}>
              {({ styles, date }) => {
                // console.log(date)
                return <div style={{ ...styles, backgroundColor: "red" }} />;
              }}
            </TodayMarker>
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>Left</div>;
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      );
    };
    
    // <DateHeader
    //   unit="primaryHeader"
    //   intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
    //     console.log({ getIntervalProps, intervalContext });
    //     return (
    //       <div {...getIntervalProps()}>
    //         {intervalContext.intervalText}
    //         {/* {data.example} */}
    //       </div>
    //     );
    //   }}
    // />
