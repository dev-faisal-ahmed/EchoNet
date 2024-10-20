export const rootEmailTemplate = (message: string) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notification</title>
        <style>
          *,
          html,
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <main
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 100vh;
            margin: 0 auto;
          "
        >
          <section
            style="
              padding: 20px;
              border: 2px solid #f1f1f1;
              min-width: 450px;
              max-width: 500px;
              border-radius: 10px;
            "
          >
            <h1
              style="
                font-size: 1.5rem;
                text-align: center;
                color: #3b82f6;
                font-weight: bolder;
                border-bottom: 2px solid #f1f1f1;
                padding-bottom: 10px;
              "
            >
              EchoNet
            </h1>
            <div style="margin-top: 10px">${message}</div>
          </section>
        </main>
      </body>
    </html>
`;
};
