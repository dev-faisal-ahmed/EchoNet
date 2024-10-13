interface IArgs {
  senderName: string;
  message: string;
}

export const friendTemplate = ({ senderName, message }: IArgs) => {
  return `
    <p style="text-align: center">
      <b>${senderName}</b> ${message}
    </p>  
  `;
};
