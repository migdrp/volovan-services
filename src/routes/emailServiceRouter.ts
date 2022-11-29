import bodyParser from 'body-parser';
import express from 'express';
import { Logger, sendTicketsEmail } from '../utils';
import { volovanDb } from '../adapters';

const log = new Logger('Email Service Router');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/manual', async (req, res) => {
  log.debug('Email Service Online');

  if (!req.body || !req.body.orderId) {
    res.json({
      status: 'error',
      message: 'You must provide the orderId'
    });
  }

  const orderId = req.body.orderId;

  const orderFound = await volovanDb.findByQuery({ id: orderId, deleted: false }, 'orders') as Entities.Orders.OrderData[];

  if (orderFound.length === 0) {
    res.json({
      status: 'error',
      message: 'The orderId not exist.'
    });
    return
  }

  if (orderFound[0].status !== 'paid') {
    res.json({
      status: 'error',
      message: 'Order has no payment assigned.'
    });
    return
  }

  const eventFound = await volovanDb.findByQuery({ id: orderFound[0].event, deleted: false }, 'events') as Entities.Events.EventData[];
  if (eventFound.length === 0) {
    res.json({
      status: 'error',
      message: 'Order event not found.'
    });
    return
  }

  const persons = await volovanDb.findByQuery({ id: { $in: orderFound[0].persons }, deleted: false }, 'persons') as Entities.Persons.PersonData[];
  if (persons.length === 0) {
    res.json({
      status: 'error',
      message: 'Order persons not found.'
    });
    return
  }

  const tickets = await volovanDb.findByQuery({ person: { $in: orderFound[0].persons }, event: orderFound[0].event }, 'tickets') as Entities.Tickets.TicketData[];
  if (tickets.length === 0) {
    res.json({
      status: 'error',
      message: 'Order tickets not found.'
    });
    return
  }

  const sendEmail = await sendTicketsEmail(tickets, eventFound[0], orderFound[0], persons);

  if (!sendEmail) {
    res.json({
      status: 'error',
      message: 'Error sending tickets email..'
    });
    return
  }


  res.json({
    status: 'Success',
    message: `Email correctly sent to ${orderFound[0].customerEmail}`
  })
  return

});


export default router;
