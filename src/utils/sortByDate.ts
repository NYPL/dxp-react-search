import { EventItem } from "../components/events/EventCollection";

export default function sortByDate(dataArray: [EventItem]) {
  const copyArray = [...dataArray];
  return copyArray.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
