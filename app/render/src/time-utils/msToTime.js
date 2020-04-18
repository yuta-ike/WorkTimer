export default function msToTime(duration) {
  const hour = Math.floor(duration / 3600000);
  const minute = Math.floor((duration - 3600000 * hour) / 60000);
  const second = Math.floor((duration - 3600000 * hour - minute * 60000) / 1000)
  return { hour, minute, second }
}