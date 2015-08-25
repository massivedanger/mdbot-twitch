export default function handlePart() {
  return (channel, username) => {
    console.log(`[${channel}] ${username} left!`);
  };
}