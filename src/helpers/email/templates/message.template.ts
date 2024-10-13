interface IArgs {
  message: string;
  date: string;
  imageUrl: string;
  senderName: string;
}

export const messageTemplate = ({
  message,
  imageUrl,
  date,
  senderName,
}: IArgs) => {
  if (!imageUrl)
    return `
    <p>Message : "${message}"</p>
    <p style="margin-top: 4px">Sent At : ${date}</p>
  `;

  return `
      <p>${senderName} sent you this message along with an image</p>
      <p>Message: "${message}"</p>
      <p style="margin-top: 4px">Sent At : ${date}</p>
  `;
};
