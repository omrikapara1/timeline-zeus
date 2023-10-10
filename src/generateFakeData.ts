import faker from 'faker'
import randomColor from 'randomcolor'
import moment from 'moment'
import { TimelineGroupBase, TimelineItemBase } from 'react-calendar-timeline'

export default function (groupCount = 30, itemCount = 1000, daysInPast = 30) {
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups: TimelineGroupBase[] = [{
    id: '1',
    title: 'a',
  }]
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.name.firstName(),
      rightTitle: faker.name.lastName(),
    })
  }

  let items: TimelineItemBase<any>[] = [{
    id: '1',
    title: 'aaaa',
    group: '1',
    start_time: moment(),
    end_time: moment
  }]
  for (let i = 0; i < itemCount; i++) {
    const startDate = faker.date.recent(daysInPast).valueOf() + (daysInPast * 0.3) * 86400 * 1000
    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    const endValue = moment(startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000).valueOf()

    items.push({
      id: i + '',
      group: faker.random.number({ min: 1, max: groups.length }) + '',
      title: faker.hacker.phrase(),
      start_time: startValue,
      end_time: endValue,
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
    })
  }

  items = items.sort((a: any, b: any) => b - a)

  return { groups, items }
}
