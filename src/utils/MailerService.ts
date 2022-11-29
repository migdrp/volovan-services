///<reference path="../types/types.d.ts" />
import { Logger } from '../utils';
import sgMail from '@sendgrid/mail';


const log = new Logger('Mailer Service');


const sendTicketsEmail = async (tickets: Entities.Tickets.TicketData[], event: Entities.Events.EventData, buyOrder: Entities.Orders.OrderData, personsData: Entities.Persons.PersonData[]) => {

  return new Promise((resolve, reject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    let allTicketsMessage = tickets.map(ticket => {
      const currentPerson = personsData.filter(person => person.id === ticket.person)[0];
      return htmlTicketTemplate({
        eventDate: getDate(event.dateTimes[0]),
        dateTime: getDateTime(event.dateTimes[0]),
        eventName: event.name,
        eventTime: getTime(event.dateTimes[0]),
        fullName: `${currentPerson.firstNames} ${currentPerson.lastNames}`,
        orderId: buyOrder.id,
        ticketUrl: ticket.url
      }) + htmlWhiteSpace;
    }).join(' ');


    const template = htmlHead + allTicketsMessage + htmlEnd;

    const msg = {
      to: buyOrder.customerEmail, // Change to your recipient
      from: 'volovan.productions@gmail.com', // Change to your verified sender
      subject: `Accesos ${event.name}`,
      html: template,
    }

    sgMail.send(msg)
      .then(() => {
        log.debug('Email sent to: ', buyOrder.customerEmail)
        resolve(true);
      })
      .catch((error) => {
        log.error(error);
        reject(new Error(error))
      })
  })
}

const getDateTime = (timestamp: number) => {
  if (typeof timestamp !== "number") timestamp = parseInt(timestamp);
  const date = new Date(timestamp);
  const datestring = date.toLocaleString("MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "medium",
    timeStyle: "medium"
  });
  //console.log(datestring);
  return datestring;
};

const getDate = (timestamp: number) => {
  if (typeof timestamp !== "number") timestamp = parseInt(timestamp);
  const date = new Date(timestamp);
  const datestring = date.toLocaleString("MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "long",
    timeStyle: "short",
  });
  //console.log(datestring);
  return datestring;
};

const getTime = (timestamp: number) => {
  if (typeof timestamp !== "number") timestamp = parseInt(timestamp);
  const date = new Date(timestamp);
  const datestring = date.toLocaleString("MX", {
    timeZone: "America/Mexico_City",
    timeStyle: "medium"
  });
  //console.log(datestring);
  return datestring;
};

const htmlTicketTemplate = ({ eventDate, eventTime, fullName, orderId, dateTime, eventName, ticketUrl }): string => {
  return /*html*/`
  <div class="card-info">
    <div class="card-header">
      <img class="logo-img" src="https://cdn.discordapp.com/attachments/1030260555912597514/1039556602761584671/Volovan_Productions_Logo_Pin.png" alt="Volovan Productions Logo." />
      <div class="header-text">
        <h1>Acceso Adquirido</h1>
        <span class="title-span">Enviado desde Volovan 💌</span>
      </div>
    </div>
    <br /><br />
    <h2>Datos del propietario:</h2>
    <div class="contacto-container"><span class="contacto-span">Nombre:</span><span class="datos-span">${fullName}</span></div>
    <div class="contacto-container"><span class="contacto-span">Folio:</span><span class="datos-span">${orderId}</span></div>
    <div class="contacto-container"><span class="contacto-span">Fecha:</span><span class="datos-span">${dateTime}</span></div>
    <div class="contacto-container"><span class="contacto-span">Evento:</span><span class="datos-span">${eventName}</span></div>
    <br />
    <h2>¡Gracias por tu compra!</h2>
    <p>Te esperamos el ${eventDate}, para cualquier duda o comentario contáctanos a traves del sitio oficial de Volovan Productions. Los accesos no son transferibles.</p>
    <div class="qr-container">
      <img alt="qr" title="qr" style="display:block" width="200" height="200" src="${ticketUrl}" alt="QR">
    </div><br />
    <span class="title-span"><a target="_blank" href="https://www.volovanproductions.com/"> Sitio Web</a></span>
    <br /><br />
  </div>
`;
}

const htmlWhiteSpace = "<br /><br /><br /><br />"


const htmlHead = /* html */`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">

  <style type="text/css">
    .card-info {
      margin-left: 5px !important;
      margin-top: 5px !important;
      border-radius: 10px 10px 10px 10px;
      background-color: #414141;
      width: 500px;
      height: auto;
      margin: 0;
      font-family: 'Roboto', 'Noto', sans-serif;
      display: block;
      margin-top: 15px;
      position: relative;
    }

    .card-header {
      text-align: center;
      border-radius: 10px 10px 0px 0px;
      padding: 35px 50px;
      height: auto;
      background-color: #292929;
      display: flex;
      position: relative;
      align-items: center;
    }

    .logo-img {
      width: 65px;
      height: 65px;
      display: block;
      position: relative;
      padding: 0 20px;
    }

    .header-text {
      text-align: left;
    }

    .header-text span {
      padding: 0;
    }


    .card-info h1 {
      font-size: 22px;
      color: #f3a93a;
      font-weight: bold;
      margin: 0px;
      padding: 0px;
    }

    .card-info h2 {
      font-size: 18px;
      color: #f37c3b;
      padding: 0px 30px 0px 45px;
      font-weight: bold;
      text-align: left;
    }

    .card-info span {
      font-size: 13px;

    }

    .title-span {
      color: #bbbbbb;
      font-weight: lighter;
      text-align: center;
      align-self: end;
      margin-bottom: 18px;
      padding: 0px 20px;
    }

    .card-info p {
      font-size: 15px;
      color: #bbbbbb;
      font-weight: normal;
      padding: 10px 45px;
      text-align: left;
    }

    .card-info a {
      text-align: center;
      padding: 40px 10px 30px 10px;
      font-size: 15px;
      color: #bbbbbb;
      width: 65%;
      height: 60px;
      font-weight: normal;
      line-height: 40px;
    }

    .categorias-span {
      text-align: left !important;
      color: #bbbbbb !important;
      margin-left: 25px;
      margin-top: 20px;
      padding: 0px !important;
    }

    .contacto-span {
      height: 30px;
      text-align: left !important;
      color: #f3a93a !important;
      margin-left: 45px;
      font-weight: bold;
      font-size: 15px !important;
      padding: 0px !important;
    }

    .datos-span {
      text-align: left !important;
      color: #bbbbbb !important;
      margin-left: 13px;
      padding: 0px 30px !important;
    }

    .contacto-container {
      margin-top: 5px;
    }

    .qr-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      padding: 20px 150px;
    }

    .qr-container img {
      width: 200px;
      height: 200px;
    }
  </style>
</head>
`;

const htmlEnd = '</html>';

export {
  sendTicketsEmail
}